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
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import Top2Lines from '../assets/images/top2Lines.svg';
import TopBox from '../assets/images/TopBox.svg';
import AnimalPicker from '../Screen/AnimalPicker.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import BackButton from '../Components/BackButton.js';
//import {AfterEffectsOutlined} from 'react-basil';

const StudentProfile = ({navigation, route}) => {
  const user = auth().currentUser;

  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [userGrade, setGrade] = useState('');
  const [userSchoolName, setSchoolName] = useState('');
  const [userPic, setuserPic] = useState('');

  //const studentID = route.params.studentID;
  //console.log('-------------------');
  //console.log(route.params.studentID);
  //console.log('-------------------');

  useEffect(() => {
    const studentsInfo = firestore()
      .collection('Student')
      .doc(route.params.studentID)
      .onSnapshot(snapshot => {
        setFullName(snapshot.data().Fullname);
        setUserName(snapshot.data().Username);
        setGrade(snapshot.data().Grade);
        setSchoolName(snapshot.data().SchoolName);
        setuserPic(snapshot.data().pic);
      });
    return studentsInfo;
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFFFFF',
        height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <TopBox style={[{position: 'absolute', top: 0, Right: 250}]}></TopBox>

      <Top2Lines
        style={[
          TitleStyles.shadowOffset,
          {position: 'absolute', top: 0, left: 0},
        ]}
      />

      <Text style={TitleStyles.HeaderTitle}>الملف الشخصي</Text>

      {/* size of the animal picker need to be changed */}
      <View style={{top: 60, left: 150, marginBottom: 50}}>
        <AnimalPicker pic={route.params.studentPic} />
      </View>

      <Text style={TitleStyles.profileText}>الاسم كامل </Text>
      <TextInput style={TitleStyles.textInput} value={fullName}></TextInput>

      <Text style={TitleStyles.profileText}> اسم المستخدم </Text>
      <TextInput style={TitleStyles.textInput} value={userName}></TextInput>

      <Text style={TitleStyles.profileText}> المستوى </Text>
      <TextInput style={TitleStyles.textInput} value={userGrade}></TextInput>

      <View>
        <Text style={TitleStyles.profileText}> اسم المدرسة </Text>
        <TextInput
          style={TitleStyles.textInput}
          value={userSchoolName}></TextInput>
      </View>

      <TouchableOpacity
        style={[
          TitleStyles.Button,
          {
            backgroundColor: '#DAE2E9',
            alignSelf: 'center',
            width: 300,
            marginTop: 70,
          },
        ]}
        // onPress={onSignout}
      >
        <Text
          style={TitleStyles.ButtonText}
          onPress={() => {
            navigation.navigate('ChildList');
          }}>
          رجوع
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default StudentProfile;
