jest.mock('@mailchimp/mailchimp_marketing', () => ({
  ping: { get: jest.fn() },
  setConfig: jest.fn(),
}))

const handler = require('../pages/api/mailchimp').default || require('../pages/api/mailchimp')
const mailchimp = require('@mailchimp/mailchimp_marketing')

function createRes() {
  return {
    statusCode: 200,
    body: null,
    status(c) { this.statusCode = c; return this },
    json(obj) { this.body = obj; return this },
  }
}

describe('mailchimp ping api', () => {
  test('returns 201 on success', async () => {
    mailchimp.ping.get.mockResolvedValueOnce({})
    const res = createRes()
    await handler({ body: {} }, res)
    expect(res.statusCode).toBe(201)
  })

  test('returns 500 and error message on failure', async () => {
    mailchimp.ping.get.mockRejectedValueOnce(new Error('boom'))
    const res = createRes()
    await handler({ body: {} }, res)
    expect(res.statusCode).toBe(500)
    expect(res.body.error).toContain('boom')
  })
})

