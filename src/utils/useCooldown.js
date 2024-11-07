import { useState, useCallback } from "react"

function useCooldown(initialCooldown = 60) {
  const [isCooldownActive, setIsCooldownActive] = useState(false)
  const [countdown, setCountdown] = useState(initialCooldown)

  const startCooldown = useCallback(() => {
    setIsCooldownActive(true)
    setCountdown(initialCooldown)

    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(intervalId)
          setIsCooldownActive(false)
          return initialCooldown
        }
        return prev - 1
      })
    }, 1000)
  }, [initialCooldown])

  return { isCooldownActive, countdown, startCooldown }
}

export default useCooldown