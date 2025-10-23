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
})

