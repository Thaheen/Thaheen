import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import { PushNotification } from '../Components/Notifications.js'

const StudentNotifications = () => {

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', paddingVertical: 80}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}> Student Notifications </Text>     

          <TouchableOpacity
          onPress={()=>PushNotification('Hi', 'This is a test')}
          >
          <Text>Click To Get Notifications</Text>
          </TouchableOpacity>     
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default StudentNotifications
