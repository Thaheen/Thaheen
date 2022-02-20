import React, {useState, useEffect} from 'react'
import {View, Text, ActivityIndicator} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import '../i18n.js'
import AuthStack from './AuthStack.js'

import InstructorTab from './InstructorTab.js'
import ParentStack from './ParentStack.js'
import StudentTab from './StudentTab.js'

import {UserInfoContext} from './UserInfoContext'
import {NavigationContainer} from '@react-navigation/native'

const AuthRoot = () => {
  // Set an initializing state whilst Firebase connects
  const {user, setUser, rememeber, student} = React.useContext(UserInfoContext)
  const [initializing, setInitializing] = useState(true)

  // Handle user state changes
  function onAuthStateChanged (userstate) {
    if (userstate != null) {
      firestore()
        .collection('Parents Accounts')
        .doc(userstate.uid)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot.exists) setUser(documentSnapshot)
        })
      firestore()
        .collection('Instructors Accounts')
        .doc(userstate.uid)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot.exists) setUser(documentSnapshot)
        })
    } else {
      setUser(userstate)
    }
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

  return (
    <NavigationContainer>
      {user ? (
        user.ref.parent.id === 'Parents Accounts' ? (
          student ? (
            <StudentTab />
          ) : (
            <ParentStack />
          )
        ) : (
          <InstructorTab />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}

export default AuthRoot
