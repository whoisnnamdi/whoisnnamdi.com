import { useEffect, useState } from 'react'

// Client-side bot detection utilities
export const useBotDetection = () => {
  const [isBot, setIsBot] = useState(false)
  const [detectionComplete, setDetectionComplete] = useState(false)

  useEffect(() => {
    const performBotDetection = async () => {
      try {
        // Check if running in browser environment
        if (typeof window === 'undefined') {
          setDetectionComplete(true)
          return
        }

        // Basic browser capability checks
        const hasCanvas = !!document.createElement('canvas').getContext
        const hasWebGL = !!window.WebGLRenderingContext
        const hasLocalStorage = !!window.localStorage
        const hasSessionStorage = !!window.sessionStorage
        
        // Check for headless browser indicators
        const isHeadless = (
          !hasCanvas ||
          !hasWebGL ||
          !hasLocalStorage ||
          !hasSessionStorage ||
          navigator.webdriver ||
          window.navigator.webdriver ||
          window.callPhantom ||
          window._phantom ||
          window.__nightmare ||
          window.Buffer
        )

        // Check user interaction capabilities
        const hasUserInteraction = (
          'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
        )

        // Simple timing check - bots often have different timing patterns
        const startTime = performance.now()
        await new Promise(resolve => setTimeout(resolve, 100))
        const endTime = performance.now()
        const timingConsistent = Math.abs((endTime - startTime) - 100) < 50

        // Check for common bot user agents (backup to server-side detection)
        const userAgent = navigator.userAgent.toLowerCase()
        const botUserAgentPatterns = [
          'bot', 'crawler', 'spider', 'scraper', 'headless'
        ]
        const hasBotUserAgent = botUserAgentPatterns.some(pattern => 
          userAgent.includes(pattern)
        )

        const botScore = [
          isHeadless,
          !timingConsistent,
          hasBotUserAgent,
          !hasUserInteraction
        ].filter(Boolean).length

        // If 2 or more indicators, likely a bot
        setIsBot(botScore >= 2)
        setDetectionComplete(true)

      } catch (error) {
        console.error('Bot detection error:', error)
        setIsBot(false) // Fail open - allow if detection fails
        setDetectionComplete(true)
      }
    }

    performBotDetection()
  }, [])

  return { isBot, detectionComplete }
}

// Generate a simple challenge token for additional verification
export const generateChallengeToken = () => {
  if (typeof window === 'undefined') return null
  
  try {
    // Simple browser fingerprinting for challenge
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillText('BotDetection', 2, 2)
    
    const fingerprint = canvas.toDataURL()
    const timestamp = Date.now()
    const random = Math.random()
    
    // Simple hash function
    const simpleHash = (str) => {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32-bit integer
      }
      return hash.toString(36)
    }
    
    return simpleHash(`${fingerprint}-${timestamp}-${random}`)
  } catch (error) {
    console.error('Challenge token generation failed:', error)
    return null
  }
}

// Enhanced subscription hook with bot detection
export const useSecureSubscribe = () => {
  const { isBot, detectionComplete } = useBotDetection()
  
  const subscribe = async (email, source, inputRef) => {
    // Wait for bot detection to complete
    if (!detectionComplete) {
      console.log('Bot detection not complete, waiting...')
      return { message: 'Please wait...' }
    }

    // If detected as bot, fail silently
    if (isBot) {
      console.log('Bot detected, blocking subscription')
      if (inputRef.current) {
        inputRef.current.value = ""
        inputRef.current.placeholder = "You are now subscribed!"
      }
      return { message: "You are now subscribed!" }
    }

    // Generate challenge token
    const challengeToken = generateChallengeToken()
    
    try {
      const res = await fetch('/api/subscribe', {
        body: JSON.stringify({
          email: email,
          merge: {
            'SOURCE': source
          },
          ...(challengeToken && { challengeToken })
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })

      const response = await res.json()
      return response
    } catch (error) {
      console.error('Subscription error:', error)
      return { message: 'Something went wrong.' }
    }
  }

  return { subscribe, isBot, detectionComplete }
}