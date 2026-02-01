import mailchimp from "../../lib/mailchimp";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await mailchimp.ping.get();

    res.status(200).json(response);
  } else if (req.method === "POST") {
    const { email, merge } = req.body;

    if (!email) {
      return res.status(201).json({ error: "Email is required" });
    }

    // Handle both JSON format (merge.SOURCE) and form-urlencoded (merge[SOURCE])
    const source = merge?.SOURCE || req.body["merge[SOURCE]"] || "";
    const isSpamSource =
      source.toLowerCase().includes("newsletter") || !source.trim();

    if (isSpamSource) {
      // Log blocked spam attempt
      console.log("Blocked spam signup attempt:", {
        email,
        source,
        timestamp: new Date().toISOString(),
        ip:
          req.headers["x-forwarded-for"] ||
          req.connection?.remoteAddress ||
          req.socket?.remoteAddress ||
          "unknown",
      });

      // Return success response to avoid tipping off bots
      return res.status(200).json({ message: "You are now subscribed!" });
    }

    try {
      await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          SOURCE: source,
        },
      });

      res.status(200).json({ message: "You are now subscribed!" });
    } catch (error) {
      console.log("Mailchimp subscription error:", error);
      if (
        error.response &&
        error.response.body &&
        error.response.body.title == "Member Exists"
      ) {
        res.status(400).json({ message: "You're already subscribed!" });
      } else if (
        error.response &&
        error.response.body &&
        error.response.body.title == "Invalid Resource"
      ) {
        res.status(400).json({ message: "Seems like a spam email?" });
      } else {
        res.status(400).json({ message: "Something went wrong." });
      }
    }
  } else {
    res.status(500).json({ message: "Was not a GET or POST" });
  }
}
