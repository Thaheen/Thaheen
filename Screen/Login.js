import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import TitleStyles from '../Styles/Titles'

import Top2Lines from '../assets/images/top2Lines.svg'
import Bottom2Lines from '../assets/images/bottom2Lines.svg'

const Login = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DAE2E9',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Top2Lines style={{position: 'absolute', top: 0, left: 0}} />
      <Bottom2Lines style={{position: 'absolute', bottom: 0, right: 0}} />
      <StatusBar />
      <ScrollView style={{paddingHorizontal: 10}}>
        <View
          style={{
            margin: 20,
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            borderRadius: 25,
            padding: 25,
            shadowColor: '#000000',
            shadowOffset: {
              width: 3,
              height: 9,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 10,
          }}>
          <Text
            style={{
              fontFamily: 'AJannatLT-Bold',
              fontSize: 35,
              color: '#43515F',
              textAlign: 'center',
            }}>
            تسجيل الدخول
          </Text>
          <TextInput
            placeholder='البريد الإلكتروني'
            placeholderTextColor={'#C8CBCD'}
            style={[
              TitleStyles.input,
              {
                marginBottom: 10,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 4,
              },
            ]}
            color='black'
          />
          <TextInput
            placeholder='كلمة المرور'
            placeholderTextColor={'#C8CBCD'}
            style={[
              TitleStyles.input,
              {
                marginBottom: 10,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 4,
              },
            ]}
            color='black'
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
            }}>
            <Text style={styles.smallText}>تذكرني</Text>
            <Text style={styles.smallText}>نسيت كلمة المرور؟</Text>
          </View>
          <TouchableOpacity style={TitleStyles.Button}>
            <Text style={TitleStyles.ButtonText}>دخــــول</Text>
          </TouchableOpacity>
          <Text style={[{textAlign: 'center'}, styles.smallText]}>
            ليس لديك حساب مسبق؟{' '}
            <Text style={{textDecorationLine: 'underline'}}>إنشاء حساب</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  smallText: {
    fontFamily: 'AJannatLT-Bold',
    color: '#43515F',
    fontSize: 16,
  },
})

export default Login
