import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  I18nManager,
} from 'react-native'
import TitleStyles from '../Styles/Titles'
import WhiteBackground from '../assets/images/whiteBackground.svg'
import OrangeBackground from '../assets/images/orangeBackground.svg'
import DotsGroup from '../assets/images/dotsGroup.svg'
import WhiteANDblue from '../assets/images/whiteANDblue.svg'
import ThaheenStanding from '../assets/images/ThaheenStanding.svg'
import auth from '@react-native-firebase/auth'
import BackButton from '../Components/BackButton'

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DAE2E9',
      }}>
      <StatusBar />
      <BackButton />
      <WhiteBackground style={{position: 'absolute', bottom: 0}} />
      <OrangeBackground style={{position: 'absolute', bottom: 0}} />
      <DotsGroup
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          {position: 'absolute', bottom: '30%', alignSelf: 'center'},
        ]}
      />
      <WhiteANDblue
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          {position: 'absolute', bottom: 0},
          I18nManager.isRTL ? {right: 0} : {left: 0},
        ]}
      />
      <Text
        style={[
          TitleStyles.HeaderTitle,
          {
            textAlign: 'center',
            marginTop: Platform.OS === 'ios' ? '15%' : '25%',
            fontSize: 40,
          },
        ]}>
        هل أنت مستعد؟
      </Text>
      <View
        style={{
          flex: 1,
          marginBottom: '20%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <ThaheenStanding style={I18nManager.isRTL ? {right: 20} : {left: 20}} />

        <TouchableOpacity
          style={[
            TitleStyles.Button,
            {
              backgroundColor: '#DAE2E9',
              alignSelf: 'center',
              width: 300,
              marginTop: 0,
            },
          ]}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'StudentHome'}],
            })
          }}>
          <Text style={TitleStyles.ButtonText}>ابدأ التعلم</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen
