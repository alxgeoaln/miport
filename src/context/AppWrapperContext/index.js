import { createContext, useEffect, useState } from 'react'

export const AppContext = createContext({
  loaded: false,
  setLoaded: () => undefined,
  isMobile: false,
})

const AppWrapper = ({ children }) => {
  const [loaded, setLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppWrapper
