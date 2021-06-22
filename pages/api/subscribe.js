import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER
})

export default async function subscribe(req, res) {
    const { email, merge } = req.body

    if (!email) {
        return res.status(400).json({ error: 'Email is required' })
    }

    try {
        await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                "SOURCE": merge.SOURCE
            }
        })

        return res.status(201).json({ error: '' })
    } catch (error) {
        if (error.response.body.title === "Member Exists") {
            return res.status(500).json({ error: "You're already subscribed!" })
        } else if (error.response.body.title === "Invalid Resource") {
            return res.status(500).json({ error: "Seems like a spam email?" })
        }
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}