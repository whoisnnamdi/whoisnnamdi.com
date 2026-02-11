import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'

export const useSubscribe = () => {
  const router = useRouter()

  const subscribe = async (email, source, inputRef) => {
    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: email,
        merge: {
          'SOURCE': source
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const response = await res.json()

    console.log(response.message)
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current.placeholder = response.message
    }

    if (response.message === "You are now subscribed!") {
      Fathom.trackGoal('8O6T9QOR', 0)
      router.push("/thank-you-subscribe")
    }

    return response
  }

  return subscribe
}