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

const StudentEditProfile = ({navigation, route}) => {
  const user = auth().currentUser;

  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [userGrade, setGrade] = useState('');
  const [userSchoolName, setSchoolName] = useState('');
  const [userPic, setuserPic] = useState('');
  const {student} = React.useContext(UserInfoContext);
  //New Data
  const [NewfullName, setNewFullName] = useState('');
  const [NewuserName, setNewUserName] = useState('');
  const [NewuserGrade, setNewGrade] = useState('');
  const [NewuserSchoolName, setNewSchoolName] = useState('');

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
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <View style={[TitleStyles.BlueContianer]}>
        <Text style={[TitleStyles.ProfileTitle]}>البيانات الشخصية</Text>
        <View style={[TitleStyles.WhiteContianer]}>
          <View style={{top: 15, alignSelf: 'center', marginBottom: 0}}>
            <AnimalPicker
              pic={student ? student.data().pic : route.params.studentPic}
            />
          </View>

          <Text style={[TitleStyles.Profilename]}>{fullName}</Text>
          <Text style={[TitleStyles.ProfileUsername]}>{userName}</Text>

          <TouchableOpacity
            style={[
              TitleStyles.EditBtn,
              {
                backgroundColor: '#FFFFFF',
                // alignSelf: 'center',
                // width: 300,
                //marginTop: 10,
                // marginBottom: 40,
              },
            ]}
            onPress={() => {}}>
            <Text style={[TitleStyles.ProfileUsername]}>تحديث البيانات</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
        ]}
      />

      {/* size of the animal picker need to be changed */}
      <View style={{top: 60, left: 150, marginBottom: 100}}></View>
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
              // height: 40,
              ///   marginTop: 20,
              //marginBottom: 20,
            },
          ]}
          // onPress={onSignout}
        >
          <Text
            style={TitleStyles.ButtonText}
            onPress={() => {
              // navigation.navigate('ChildList');
            }}>
            تسجيل خروج
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default StudentEditProfile;
