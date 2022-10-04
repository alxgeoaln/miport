import { createContext, useEffect, useState } from 'react'

export const AppContext = createContext({
  loaded: false,
  setLoaded: () => undefined,
  isMobile: false,
  setCountdownFinished: () => undefined,
  countdownFinished: false,
})

const AppWrapper = ({ children }) => {
  const [loaded, setLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [countdownFinished, setCountdownFinished] = useState(false)

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true)
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        loaded,
        setLoaded,
        isMobile,
        countdownFinished,
        setCountdownFinished,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppWrapper
