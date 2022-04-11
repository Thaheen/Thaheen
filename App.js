import React from 'react'
import {Platform} from 'react-native';
import {UserInfoContextProvider} from './auth/UserInfoContext'
import AuthRoot from './auth/AuthRoot'
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const App = () => {
  if(Platform.OS === 'ios'){
  PushNotificationIOS.requestPermissions();
  }
  return (
    <UserInfoContextProvider>
      <AuthRoot />
    </UserInfoContextProvider>
  )
}

export default App
