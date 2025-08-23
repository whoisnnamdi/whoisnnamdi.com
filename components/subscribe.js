import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import { useSecureSubscribe } from './botdetection'

export const useSubscribe = () => {
  const router = useRouter()
  const { subscribe: secureSubscribe, isBot, detectionComplete } = useSecureSubscribe()

  const subscribe = async (email, source, inputRef) => {
    // Use secure subscribe with bot detection
    const response = await secureSubscribe(email, source, inputRef)

    console.log(response.message)
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current.placeholder = response.message
    }

    // Only track goal and redirect if not a bot and actually successful
    if (response.message === "You are now subscribed!" && !isBot) {
      Fathom.trackGoal('8O6T9QOR', 0)
      router.push("/thank-you-subscribe")
    }

    return response
  }

  return { subscribe, isBot, detectionComplete }
}

// Legacy export for backward compatibility
export default useSubscribe