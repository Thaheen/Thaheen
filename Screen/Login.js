import React, {useState} from 'react'
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
  Platform
} from 'react-native'
import TitleStyles from '../Styles/Titles'

import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Top2Lines from '../assets/images/top2Lines.svg'
import Bottom2Lines from '../assets/images/bottom2Lines.svg'
import auth from '@react-native-firebase/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = () => {
    if (email !== '' && password !== '') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account signed in!')
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!')
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!')
          }

          console.error(error)
        })
    } else {
      console.error('empty email or password or both')
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DAE2E9',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          {position: 'absolute', top: 0, left: 0},
        ]}
      />
      <Bottom2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          {position: 'absolute', bottom: 0, right: 0},
        ]}
      />
      <StatusBar />
      <ScrollView>
        <View
          style={{
            margin: 25,
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

          <View style={Platform.OS === 'ios' ? TitleStyles.shadowOffset : null}>
            <TextInput
              placeholder='البريد الإلكتروني'
              placeholderTextColor={'#C8CBCD'}
              style={[Platform.OS === 'android' ? TitleStyles.shadowOffset : null, TitleStyles.input,{shadowColor: '#000'}]}
              color='black'
              onChangeText={text => setEmail(text)}
              value={email}
              textContentType='emailAddress'
              clearButtonMode='while-editing'
              keyboardType='email-address'
            />
          </View>

          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder='كلمة المرور'
              placeholderTextColor={'#C8CBCD'}
              style={[Platform.OS === 'android' ? TitleStyles.shadowOffset : null, TitleStyles.input,{shadowColor: '#000'}]}
              color='black'
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={true}
              textContentType='password'
              clearButtonMode='while-editing'
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
            }}>
            <BouncyCheckbox
              size={20}
              fillColor='#F5C5AD'
              style={{flexDirection: 'row-reverse'}}
              iconStyle={{borderRadius: 3, marginLeft: 10}}
              text='تذكرني'
              textStyle={styles.smallText}
            />

            <Text
              onPress={() => {
                alert('You tapped the button!')
              }}
              style={styles.smallText}>
              نسيت كلمة المرور؟
            </Text>
          </View>
          <TouchableOpacity style={TitleStyles.Button} onPress={onLogin}>
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
    textDecorationLine: 'none',
  },
})

export default Login
