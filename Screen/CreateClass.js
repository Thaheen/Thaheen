import React, {useState, useEffect} from 'react';
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
  I18nManager,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout';
import Ombre from '../assets/images/OmbreBackground.svg';
import BackButton from '../Components/BackButton.js';
import ClassInputFields from '../Components/ClassInputFields';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CreateClass = ({navigation, route}) => {
  return (
    <SafeAreaView
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingBottom:25
      }}>
      <Ombre style={[{position: 'absolute', top: 0}]} />

      <StatusBar />
      <ScrollView style={{alignSelf: 'stretch'}}>
        <ClassInputFields
          type={'create'}
          title={'إنشاء فصل'}
          buttonText={'إنشاء الفصل'}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateClass;
