import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import auth from '@react-native-firebase/auth';


const Home = () => {
  const onSignout = () => {
      auth()
  .signOut()
  .then(() => console.log('User signed out!'));
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', paddingVertical: 80}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}> HOME PAGE </Text>
          <Text style={{fontSize: 16, textAlign: 'center'}}> This screen is for log in and sign out testing purposes, the actual home page and navigation will be implemented later</Text>
          <TouchableOpacity
            style={{
              width: 230,
              backgroundColor: 'grey',
              borderRadius: 9,
              padding: 5,
              marginTop: 24,
            }}
            onPress={onSignout}>
            <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>
              تسجيل الخروج
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Home
