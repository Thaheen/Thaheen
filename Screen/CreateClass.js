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

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CreateClass = ({navigation, route}) => {

  const user = auth().currentUser;

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', paddingVertical: 80}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}> Create Class </Text>          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CreateClass;
