import React, {useState, useEffect} from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import auth from '@react-native-firebase/auth'

import Login from '../Screen/Login.js'
import Home from '../Screen/Home.js'

const AuthRoot = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  // Handle user state changes
  function onAuthStateChanged (user) {
    //Before i set the user i can put "rememeber me" option as a conodition to know wether to set the user or not
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' />
      </View>
    )

  //Replace with user stacks later
  return user? <Home /> : <Login />
}

export default AuthRoot
