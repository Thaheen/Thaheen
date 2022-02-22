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
import {UserInfoContext} from '../auth/UserInfoContext';
const StudentProfile = ({navigation, route}) => {
  const user = auth().currentUser;

  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [userGrade, setGrade] = useState('');
  const [userSchoolName, setSchoolName] = useState('');
  const [userPic, setuserPic] = useState('');
  const {student} = React.useContext(UserInfoContext);
  //const studentID = route.params.studentID;
  //console.log('-------------------');
  //console.log(route.params.studentID);
  //console.log('-------------------');

  useEffect(() => {
    const studentsInfo = firestore()
      .collection('Student')
      .doc(student ? student.id : route.params.studentID)
      .onSnapshot(snapshot => {
        setFullName(snapshot.data().Fullname);
        setUserName(snapshot.data().Username);
        setGrade(snapshot.data().Grade);
        setSchoolName(snapshot.data().SchoolName);
        setuserPic(snapshot.data().pic);
      });
    return studentsInfo;
  }, []);

  if (userSchoolName.length == 0) {
    setSchoolName('لا يوجد');
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFFFFF',
        height: '100%',
        ...Platform.OS === 'android' ? {paddingTop: 20, } : null
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <TopBox style={[{position: 'absolute', top: 0, Right: 250}]}> </TopBox>

      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
        ]}
      />

      <Text
        style={[
          TitleStyles.HeaderTitle,
          {textAlign: I18nManager.isRTL ? 'left' : 'right', paddingRight: 30},
        ]}>
        الملف الشخصي
      </Text>

      {/* size of the animal picker need to be changed */}
      <View style={{top: 60, left: 150, marginBottom: 50}}>
        <AnimalPicker
          pic={student ? student.data().pic : route.params.studentPic}
        />
      </View>
      <ScrollView>
        <Text style={TitleStyles.profileText}>الاسم كامل </Text>
        <TextInput
          style={TitleStyles.textInput}
          value={fullName}
          editable={false}></TextInput>

        <Text style={TitleStyles.profileText}> اسم المستخدم </Text>
        <TextInput
          style={TitleStyles.textInput}
          value={userName}
          editable={false}></TextInput>

        <Text style={TitleStyles.profileText}> المستوى </Text>
        <TextInput
          style={TitleStyles.textInput}
          value={userGrade}
          editable={false}></TextInput>

        <View>
          <Text style={TitleStyles.profileText}> المرحلة الدراسية </Text>
          <TextInput
            style={TitleStyles.textInput}
            value={userSchoolName}
            editable={false}></TextInput>
        </View>

        <TouchableOpacity
          style={[
            TitleStyles.Button,
            {
              backgroundColor: '#DAE2E9',
              alignSelf: 'center',
              width: 300,
              marginTop: 70,
              marginBottom: 40,
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default StudentProfile;
