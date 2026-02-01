import mailchimp from "../../lib/mailchimp";

export default async function handler(req, res) {
  try {
    const response = await mailchimp.ping.get();
    console.log(response);

    return res.status(201).json({ error: "" });
  } catch (err) {
    return res.status(500).json({ error: err.message || err.toString() });
  }
}
