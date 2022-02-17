import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native'

const StudentNotifications = () => {

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', paddingVertical: 80}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}> Student Notifications </Text>          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default StudentNotifications
