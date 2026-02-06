import { mailchimp } from "../../lib/mailchimp";

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

function getMailchimpErrorMessage(error) {
  const title = error?.response?.body?.title;

  if (title === "Member Exists") {
    return "You're already subscribed!";
  }

  if (title === "Invalid Resource") {
    return "Seems like a spam email?";
  }

  return "Something went wrong.";
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(500).json({ message: "Was not a GET or POST" });
  }

  if (req.method === "GET") {
    const response = await mailchimp.ping.get();
    return res.status(200).json(response);
  }

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
      ip: getClientIp(req),
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

    return res.status(200).json({ message: "You are now subscribed!" });
  } catch (error) {
    console.log("Mailchimp subscription error:", error);
    return res.status(400).json({ message: getMailchimpErrorMessage(error) });
  }
}
