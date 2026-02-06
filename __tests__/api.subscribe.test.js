jest.mock('@mailchimp/mailchimp_marketing', () => ({
  ping: { get: jest.fn() },
  lists: { addListMember: jest.fn() },
  setConfig: jest.fn(),
}))

const subscribe = require('../pages/api/subscribe').default || require('../pages/api/subscribe')
const mailchimp = require('@mailchimp/mailchimp_marketing')

function createRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader: function (k, v) { this.headers[k] = v },
    write: function (b) { this.body = (this.body || '') + b },
    end: function (b) { if (b) this.write(b) },
    status: function (c) { this.statusCode = c; return this },
    json: function (obj) { this.body = obj; return this },
  }
}

describe('subscribe api', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('GET returns Mailchimp ping response', async () => {
    mailchimp.ping.get.mockResolvedValueOnce({ health_status: "Everything's Chimpy!" })

    const req = { method: 'GET', body: {}, headers: {} }
    const res = createRes()

    await subscribe(req, res)

    expect(mailchimp.ping.get).toHaveBeenCalledTimes(1)
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ health_status: "Everything's Chimpy!" })
  })

  test('rejects invalid HTTP method', async () => {
    const req = { method: 'PUT', body: {}, headers: {} }
    const res = createRes()

    await subscribe(req, res)

    expect(res.statusCode).toBe(500)
    expect(res.body).toMatchObject({ message: 'Was not a GET or POST' })
  })

  test('rejects missing email with 201 and error message', async () => {
    const req = { method: 'POST', body: { email: '', merge: { SOURCE: 'Hero' } }, headers: {} }
    const res = createRes()
    await subscribe(req, res)
    expect(res.statusCode).toBe(201)
    expect(res.body).toMatchObject({ error: 'Email is required' })
  })

  test('blocks spam-like source gracefully', async () => {
    const req = { method: 'POST', body: { email: 'a@b.co', merge: { SOURCE: 'newsletter' } }, headers: {} }
    const res = createRes()
    await subscribe(req, res)
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ message: 'You are now subscribed!' })
    expect(mailchimp.lists.addListMember).not.toHaveBeenCalled()
  })

  test('uses form-encoded merge[SOURCE] fallback when merge is missing', async () => {
    mailchimp.lists.addListMember.mockResolvedValueOnce({ id: 'x' })
    const req = { method: 'POST', body: { email: 'a@b.co', 'merge[SOURCE]': 'Hero Form' }, headers: {} }
    const res = createRes()

    await subscribe(req, res)

    expect(res.statusCode).toBe(200)
    expect(mailchimp.lists.addListMember).toHaveBeenCalledWith(
      process.env.MAILCHIMP_AUDIENCE_ID,
      expect.objectContaining({
        email_address: 'a@b.co',
        status: 'subscribed',
        merge_fields: { SOURCE: 'Hero Form' },
      }),
    )
  })

  test('successful subscription returns 200', async () => {
    mailchimp.lists.addListMember.mockResolvedValueOnce({ id: 'x' })
    const req = { method: 'POST', body: { email: 'a@b.co', merge: { SOURCE: 'Hero' } }, headers: {} }
    const res = createRes()
    await subscribe(req, res)
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ message: 'You are now subscribed!' })
  })

  test('member exists returns 400 with friendly message', async () => {
    mailchimp.lists.addListMember.mockRejectedValueOnce({ response: { body: { title: 'Member Exists' } } })
    const req = { method: 'POST', body: { email: 'a@b.co', merge: { SOURCE: 'Hero' } }, headers: {} }
    const res = createRes()
    await subscribe(req, res)
    expect(res.statusCode).toBe(400)
    expect(res.body).toMatchObject({ message: "You're already subscribed!" })
  })

  test('invalid resource returns spam hint message', async () => {
    mailchimp.lists.addListMember.mockRejectedValueOnce({ response: { body: { title: 'Invalid Resource' } } })
    const req = { method: 'POST', body: { email: 'a@b.co', merge: { SOURCE: 'Hero' } }, headers: {} }
    const res = createRes()

    await subscribe(req, res)

    expect(res.statusCode).toBe(400)
    expect(res.body).toMatchObject({ message: 'Seems like a spam email?' })
  })
})

