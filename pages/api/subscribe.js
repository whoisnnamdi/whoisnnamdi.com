import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER
})

export default async (req, res) => {
    if (req.method === "GET") {
        const response = await mailchimp.ping.get()

        res.status(200).json(response)
    } else if (req.method === "POST") {
        const { email, merge, challengeToken } = req.body

        if (!email) {
            return res.status(201).json({ error: "Email is required" })
        }

        // Enhanced bot detection using middleware headers
        const botDetection = req.headers['x-bot-detection']
        const botUserAgent = req.headers['x-bot-user-agent'] || req.headers['user-agent'] || ''
        const botOrigin = req.headers['x-bot-origin'] || req.headers['origin'] || ''
        
        // Check if request was flagged as suspicious by middleware
        if (botDetection === 'suspicious') {
            console.log('Blocked suspicious bot attempt:', {
                email,
                userAgent: botUserAgent,
                origin: botOrigin,
                timestamp: new Date().toISOString(),
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                detection: 'middleware-flagged'
            });
            
            // Return success response to avoid tipping off bots
            return res.status(200).json({ message: "You are now subscribed!" });
        }

        // Anti-spam: Check for suspicious sources (existing logic)
        const source = merge?.SOURCE || '';
        const isSpamSource = source.toLowerCase().includes('newsletter') || !source.trim();
        
        if (isSpamSource) {
            // Log blocked spam attempt
            console.log('Blocked spam signup attempt:', {
                email,
                source,
                timestamp: new Date().toISOString(),
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                detection: 'source-based'
            });
            
            // Return success response to avoid tipping off bots
            return res.status(200).json({ message: "You are now subscribed!" });
        }

        // Additional validation for email patterns commonly used by bots
        const suspiciousEmailPatterns = [
            /^[a-z0-9]{10,}@gmail\.com$/i, // Random string Gmail accounts
            /^test.*@.*\.com$/i, // Test emails
            /^.*\+.*@.*\.com$/i, // Plus-addressing (often used by bots)
            /^.*noreply.*@.*$/i, // Noreply emails
        ];
        
        const isSuspiciousEmail = suspiciousEmailPatterns.some(pattern => pattern.test(email));
        
        if (isSuspiciousEmail) {
            console.log('Blocked suspicious email pattern:', {
                email,
                timestamp: new Date().toISOString(),
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                detection: 'email-pattern'
            });
            
            return res.status(200).json({ message: "You are now subscribed!" });
        }

        // Validate challenge token if present (additional security layer)
        if (!challengeToken && process.env.NODE_ENV === 'production') {
            console.log('Missing challenge token:', {
                email,
                timestamp: new Date().toISOString(),
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                detection: 'missing-challenge'
            });
            
            return res.status(200).json({ message: "You are now subscribed!" });
        }
        
        try {
            await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    "SOURCE": merge.SOURCE
                }
            })

            res.status(200).json({ message: "You are now subscribed!" })
        } catch (error) {
            console.log('Mailchimp subscription error:', error);
            if (error.response && error.response.body && error.response.body.title == "Member Exists") {
                res.status(400).json({ message: "You're already subscribed!" })
            } else if (error.response && error.response.body && error.response.body.title == "Invalid Resource") {
                res.status(400).json({ message: "Seems like a spam email?" })
            } else {
                res.status(400).json({ message: "Something went wrong." })
            }
        }
    } else {
        res.status(500).json({ message: "Was not a GET or POST" })
    }
}
