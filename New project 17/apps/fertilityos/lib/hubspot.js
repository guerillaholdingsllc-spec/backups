const formMap = {
  FertilityFund: process.env.HUBSPOT_FINANCING_FORM_GUID,
  MaleGenesis: process.env.HUBSPOT_MALEGENESIS_FORM_GUID,
  IVFCompare: process.env.HUBSPOT_CLINIC_FORM_GUID
};

export async function sendHubSpotLead({ brand, payload, context }) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = formMap[brand];
  if (!portalId || !formGuid) {
    return { configured: false };
  }

  const fields = Object.entries({
    email: payload.email,
    firstname: payload.firstName,
    lastname: payload.lastName,
    phone: payload.phone,
    company: payload.employer,
    state: payload.state,
    city: payload.location,
    fertilityos_brand: brand,
    fertilityos_interest: payload.interest || payload.type
  })
    .filter(([, value]) => value)
    .map(([name, value]) => ({ name, value: String(value) }));

  const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields,
      context: {
        pageUri: context?.referer || process.env.NEXT_PUBLIC_SITE_URL,
        pageName: `${brand} MVP`,
        hutk: payload.hutk
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "Consent to process fertility education and inquiry information.",
          communications: []
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`HubSpot rejected lead submission with ${response.status}`);
  }
  return { configured: true };
}
