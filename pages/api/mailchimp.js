import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_API_SERVER
})

export default async function ping(req, res) {
    const { email } = req.body

    try {
        const response = await mailchimp.ping.get()
        console.log(response)

        return res.status(201).json({ error: '' })
    } catch (err) {
        return res.status(500).json({ error: error.message || error.toString() })
    }
}