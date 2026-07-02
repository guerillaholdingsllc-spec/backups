const crypto = require("node:crypto");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = req.body || {};
    const grantor = payload.grantor || {};
    if (!grantor.fullName || !grantor.email || !grantor.state) {
      return res.status(422).json({ error: "Grantor name, email, and state are required." });
    }

    const trustId = crypto.randomUUID();
    const origin = req.headers.origin || `https://${req.headers.host}`;

    return res.status(201).json({
      trustId,
      status: "awaiting_payment",
      checkoutUrl: `${origin}/livingtrust?trustId=${trustId}&review=queued&demoCheckout=true`,
      message: "Your trust package intake was received. Production delivery requires Stripe, PostgreSQL, email, and attorney review credentials to be configured."
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
