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
import Top2Lines from '../assets/images/top2Lines.svg';
import TopBox from '../assets/images/TopBox.svg';
import AnimalPicker from '../Screen/AnimalPicker.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import BackButton from '../Components/BackButton.js';

const InstructorProfile = ({navigation, route}) => {
  //VIEW , EDIT PROFILE

  const user = auth().currentUser;

  //const [fullName, setFullName] = useState('');
  // const [Email, setEmail = useState('');
  // const [PhoneNum, setPhoneNum] = useState('');

  /*
  useEffect(() => {
    const InstructorInfo = firestore()
      .collection('Instructors Accounts')
    //  .doc(route.params.studentID)
      .onSnapshot(snapshot => {
        setFullName(snapshot.data().Fullname);
        setEmail(snapshot.data().email);
        setPhoneNum(snapshot.data().Phone);
      });
    return InstructorInfo;
  }, []);*/

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFFFFF',
        height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <Text> HERE IS THE INSTRUCTOR PROFILE</Text>
    </SafeAreaView>
  );
};
export default InstructorProfile;
