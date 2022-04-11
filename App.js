import React from 'react'
import {UserInfoContextProvider} from './auth/UserInfoContext'
import AuthRoot from './auth/AuthRoot'
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const App = () => {
  PushNotificationIOS.requestPermissions();
  return (
    <UserInfoContextProvider>
      <AuthRoot />
    </UserInfoContextProvider>
  )
}

export default App
