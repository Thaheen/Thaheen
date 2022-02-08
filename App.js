import React from 'react'
import {UserInfoContextProvider} from './auth/UserInfoContext'
import AuthRoot from './auth/AuthRoot'

const App = () => {
  return (
    <UserInfoContextProvider>
      <AuthRoot />
    </UserInfoContextProvider>
  )
}

export default App
