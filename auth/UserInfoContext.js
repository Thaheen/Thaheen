import React, {useState} from 'react'

export const UserInfoContext = React.createContext()

export const UserInfoContextProvider = ({children}) => {
  const [user, setUser] = useState()
  const [rememberEmail, setRememberEmail] = useState()

  return (
    <UserInfoContext.Provider value={{user, setUser, rememberEmail, setRememberEmail}}>
      {children}
    </UserInfoContext.Provider>
  )
}
