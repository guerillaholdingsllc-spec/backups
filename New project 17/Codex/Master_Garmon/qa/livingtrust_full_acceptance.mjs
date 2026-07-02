import { chromium } from "playwright";

const BASE_URL = process.env.LIVINGTRUST_BASE_URL || "https://trustchainservices.com/livingtrust";
const API_URL = process.env.LIVINGTRUST_API_URL || `${BASE_URL}/api`;
const unique = Date.now();

const trustCases = [
  ["CA", "Individual revocable living trust", "base", "home, bank accounts, brokerage, life insurance"],
  ["TX", "Joint revocable living trust", "family", "home, ranch land, vehicles, firearms, LLC interest"],
  ["FL", "Family revocable living trust", "family", "homestead, retirement accounts, life insurance, jewelry"],
  ["NY", "Single parent revocable trust", "base", "condo, bank accounts, 529 plan, digital assets"],
  ["NV", "Asset protection review trust", "family", "rental property, brokerage, business interest, crypto"],
  ["WA", "Blended family living trust", "family", "home, separate property, life insurance, business interests"],
  ["OR", "Pet and family care trust", "base", "home, pet care reserve, bank accounts, collectibles"],
  ["AZ", "Retirement-focused living trust", "base", "home, IRA beneficiary review, annuity, POD accounts"],
  ["CO", "Digital asset living trust", "base", "home, crypto wallets, domains, online business accounts"],
  ["GA", "Minor children family trust", "family", "home, guardianship notes, education funds, vehicles"],
  ["NC", "Business owner living trust", "family", "S corporation shares, home, life insurance, operating agreement"],
  ["IL", "Special needs review trust", "family", "home, special needs beneficiary notes, brokerage, life insurance"],
  ["PA", "No-contest family trust", "base", "home, family conflict notes, bank accounts, heirlooms"],
  ["OH", "Firearms inventory living trust", "base", "home, firearms, safe storage, vehicles, bank accounts"],
  ["MI", "Cabin and lake property trust", "family", "primary home, lake cabin, boat, brokerage, heirs"],
  ["MA", "High asset review trust", "family", "home, taxable brokerage, art, jewelry, life insurance"],
  ["TN", "Probate avoidance trust", "base", "home, bank accounts, truck, life insurance"],
  ["VA", "Military family living trust", "family", "home, survivor benefits notes, vehicles, retirement accounts"],
  ["NJ", "Elder care planning trust", "base", "home, bank accounts, long-term care concerns, POD accounts"],
  ["LA", "Civil-law issue review trust", "family", "home, forced-heirship review notes, bank accounts, minerals"]
];

const requiredFields = {
  fullName: `Acceptance Test ${unique}`,
  email: `qa+${unique}@example.com`,
  address: "100 Test Avenue, Sacramento, CA 95814",
  successorTrustee: "Jordan Trustee, sibling",
  beneficiaries: "Maya Beneficiary, adult daughter; Noah Beneficiary, minor son with guardian notes",
  distributionPlan: "Equal shares, staged at ages 25, 30, and 35, with HEMS discretion before final distribution",
  assetSummary: "Primary home, bank accounts, investment accounts, vehicles, life insurance, jewelry, and digital assets",
  realEstate: "Primary residence titled in grantor name; possible rental property review",
  bankAccounts: "Checking, savings, and credit union accounts",
  investmentAccounts: "Brokerage, ETFs, individual stocks, Treasury holdings",
  retirementAccounts: "401(k), Roth IRA, pension beneficiary review",
  lifeInsurance: "Term life policy with beneficiary designation review needed",
  vehicles: "Two vehicles titled in grantor name",
  businessInterests: "LLC membership interest and operating agreement review",
  firearms: "Locked firearms and state-specific transfer review",
  jewelryValuables: "Jewelry, watches, heirlooms, and appraisals",
  digitalAssets: "Password manager, crypto wallet, domains, cloud storage",
  debtsLiabilities: "Mortgage, credit cards, possible tax installment plan",
  safeDepositStorage: "Safe deposit box and original documents location",
  beneficiaryDesignations: "Life insurance, retirement, POD/TOD accounts need consistency check",
  excludedAssets: "Retirement accounts and restricted assets may need separate handling",
  specialInstructions: "Blended family notes, sentimental gifts, trustee conflict concerns"
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function postJson(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }
  return { response, data };
}

function buildPayload([state, trustType, packageType, assetSummary], index) {
  return {
    grantor: {
      fullName: `QA ${state} ${trustType} ${index}`,
      email: `qa+${unique}-${index}@example.com`,
      state,
      address: `${100 + index} Review Street, Test City, ${state} 90000`
    },
    questionnaire: {
      trustType,
      successorTrustee: "Jordan Trustee, sibling, then Casey Backup, adult child",
      beneficiaries: "Two adult children equally; one minor grandchild contingent; special needs flag if applicable",
      distributionPlan: "Equal shares with trustee discretion for health, education, maintenance, and support",
      beneficiaryDesignations: "Retirement, life insurance, POD, TOD, and brokerage beneficiaries require review",
      excludedAssets: "Retirement accounts and restricted assets should be handled separately unless counsel approves",
      specialInstructions: "Confirm state signing, funding, fiduciary conflict, and family-risk issues"
    },
    clauses: [
      "Spendthrift Clause",
      "Discretionary Distribution Clause",
      "Incapacity Clause",
      "Trustee Removal & Succession",
      "Digital Assets Clause",
      "Pour-Over Will Integration"
    ],
    assets: [
      { type: "General asset inventory", description: assetSummary },
      { type: "Real estate", description: "Primary residence and possible out-of-state real property review" },
      { type: "Bank and cash accounts", description: "Checking, savings, CDs, money market" },
      { type: "Stocks, bonds, and brokerage", description: "Taxable brokerage, ETFs, bonds, Treasury holdings" },
      { type: "Life insurance", description: "Policy owner, insured, beneficiaries, death benefit" },
      { type: "Digital assets and online accounts", description: "Crypto, password manager, cloud files, domains" }
    ],
    packageType,
    previewAccepted: true
  };
}

async function testUi() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.goto(`${BASE_URL}/?qa=${unique}`, { waitUntil: "networkidle" });
  await assertVisible(page, "text=Protect your family plan");

  const tabs = [
    ["Overview", "A private intake experience"],
    ["Intake", "Gather the facts a reviewer needs"],
    ["Protections", "clauses selected"],
    ["Review", "UPL disclaimer"],
    ["Resources", "State trust resources"],
    ["Case Desk", "Daily operating view"],
    ["Marketing", "Go-to-market plan"]
  ];
  for (const [button, marker] of tabs) {
    await page.getByRole("button", { name: button, exact: true }).click();
    await assertVisible(page, `text=${marker}`);
  }

  await page.getByRole("button", { name: "Intake", exact: true }).click();
  for (const [name, value] of Object.entries(requiredFields)) {
    await page.locator(`[name="${name}"]`).fill(value);
  }
  await page.locator('[name="state"]').selectOption("CA");
  await page.locator(".priceCard", { hasText: "Family Trust Prep" }).click();
  await assertVisible(page, "text=$997");
  await page.locator(".priceCard", { hasText: "Annual Maintenance" }).click();
  await assertVisible(page, "text=$149");
  await page.locator(".priceCard", { hasText: "Base Trust Prep" }).click();
  await assertVisible(page, "text=$397");

  await page.getByRole("button", { name: "Review this intake" }).click();
  await page.waitForSelector(".assistantResult, .status.error", { timeout: 45000 });
  const assistantError = await page.locator(".status.error").count();
  assert(assistantError === 0, "Intake assistant returned an error in the UI");

  await page.getByRole("button", { name: "Protections", exact: true }).click();
  await page.locator(".clause input[type='checkbox']").first().click();
  await page.locator(".clause header").first().click();
  await assertVisible(page, "text=Should");

  await page.getByRole("button", { name: "Case Desk", exact: true }).click();
  await page.getByRole("button", { name: "Refresh brief" }).click();
  await page.waitForSelector(".opsScorecard, .status.error", { timeout: 45000 });
  const opsError = await page.locator(".status.error").count();
  assert(opsError === 0, "Case Desk operations brief returned an error in the UI");

  await page.getByRole("button", { name: "Marketing", exact: true }).click();
  await page.locator("input").nth(0).fill("California");
  await page.locator("input").nth(1).fill("homeowners and blended families");
  await page.getByRole("button", { name: "Build lead brief" }).click();
  await page.waitForSelector(".leadBriefResult, .status.error", { timeout: 45000 });
  const leadError = await page.locator(".status.error").count();
  assert(leadError === 0, "Marketing lead brief returned an error in the UI");

  assert(consoleErrors.length === 0, `Browser console errors: ${consoleErrors.join(" | ")}`);
  await browser.close();
  return { tabs: tabs.length, inputsFilled: Object.keys(requiredFields).length, consoleErrors };
}

async function assertVisible(page, selector) {
  await page.waitForSelector(selector, { timeout: 30000, state: "visible" });
}

async function testApiCases() {
  const results = [];
  for (let i = 0; i < trustCases.length; i += 1) {
    const testCase = trustCases[i];
    const payload = buildPayload(testCase, i + 1);
    const { response, data } = await postJson("/generate-trust", payload);
    assert(response.status === 201, `Case ${i + 1} ${testCase[0]} failed with ${response.status}: ${JSON.stringify(data).slice(0, 500)}`);
    assert(data.trustId, `Case ${i + 1} ${testCase[0]} did not return trustId`);
    assert(data.checkoutUrl, `Case ${i + 1} ${testCase[0]} did not return checkoutUrl`);
    results.push({
      case: i + 1,
      state: testCase[0],
      trustType: testCase[1],
      packageType: testCase[2],
      status: response.status,
      trustId: data.trustId,
      checkoutUrlHost: new URL(data.checkoutUrl).host
    });
  }
  return results;
}

async function testMaintenanceCheckout() {
  const { response, data } = await postJson("/checkout/maintenance", {
    email: `maintenance+${unique}@example.com`,
    fullName: "Maintenance QA Customer",
    state: "CA"
  });
  assert(response.status === 201, `Maintenance checkout failed with ${response.status}: ${JSON.stringify(data).slice(0, 500)}`);
  assert(data.checkoutUrl, "Maintenance checkout did not return checkoutUrl");
  return { status: response.status, checkoutUrlHost: new URL(data.checkoutUrl).host };
}

async function main() {
  const startedAt = new Date().toISOString();
  const ui = await testUi();
  const apiCases = await testApiCases();
  const maintenance = await testMaintenanceCheckout();
  const report = {
    startedAt,
    finishedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    apiUrl: API_URL,
    ui,
    apiCases,
    maintenance,
    summary: {
      uiTabsChecked: ui.tabs,
      inputBoxesFilled: ui.inputsFilled,
      trustCasesCompleted: apiCases.length,
      maintenanceCheckoutCompleted: true
    }
  };
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
