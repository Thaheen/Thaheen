import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native'

const StudentClass = () => {

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', paddingVertical: 80}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}> Student Class </Text>          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default StudentClass
