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
 // const user = auth().currentUser;

  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [userGrade, setGrade] = useState('');
  const [userSchoolName, setSchoolName] = useState('');
  const [userPic, setuserPic] = useState('');
  const {student, user} = React.useContext(UserInfoContext);
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
        ...(Platform.OS === 'android' ? {paddingTop: 20} : null),
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <StatusBar translucent backgroundColor="#DAE2E9" />
      <View style={[TitleStyles.BlueContianer, {position: 'absolute'}]} />
      
      <Text style={[TitleStyles.ProfileTitle]}> بيانات الطالب</Text>
      <View style={[TitleStyles.WhiteContianer]}>
        <View style={{top: 15, alignSelf: 'center', marginBottom: 0}}>
          <AnimalPicker
            pic={student ? student.data().pic : route.params.studentPic}
          />
        </View>

        <Text style={[TitleStyles.Profilename]}>{fullName}</Text>
        <Text style={[TitleStyles.ProfileUsername]}>{userName}</Text>

       {user.ref.parent.id === 'Parents Accounts' ?  <TouchableOpacity
          style={[
            TitleStyles.EditBtn,
            {
              backgroundColor: '#FFFFFF',
              // alignSelf: 'center',
              width: 173,
              //marginTop: 10,
              // marginBottom: 40,
            },
          ]}
          onPress={() => {
            navigation.navigate('ResetPasscode', {
              studentID: route.params.studentID,
            });
          }}>
          <Text style={[TitleStyles.ProfileUsername]}> تحديث رمز الدخول</Text>
        </TouchableOpacity> : null}
      </View>
      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
        ]}
      />

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
          <Text style={TitleStyles.profileText}> اسم المدرسة </Text>
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
              marginBottom: Platform.OS === 'ios' ? 100 : 90

            },
          ]}
          // onPress={onSignout}
        >
          <Text
            style={TitleStyles.ButtonText}
            onPress={() => {
              navigation.goBack();
            }}>
            رجوع
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default StudentProfile;
