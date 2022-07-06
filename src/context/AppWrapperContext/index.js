import { createContext, useState } from 'react'

export const AppContext = createContext({
  loaded: false,
  setLoaded: () => undefined,
})

const AppWrapper = ({ children }) => {
  const [loaded, setLoaded] = useState(true)

  return (
    <AppContext.Provider
      value={{
        loaded,
        setLoaded,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppWrapper
