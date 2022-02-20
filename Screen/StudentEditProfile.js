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
import DropDownPicker from 'react-native-dropdown-picker';

const StudentEditProfile = ({navigation, route}) => {
  const user = auth().currentUser;

  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [userGrade, setGrade] = useState('');
  const [userSchoolName, setSchoolName] = useState('');
  const [userPic, setuserPic] = useState('');
  const {student, setStudent} = React.useContext(UserInfoContext);
  //New Data
  const [NewfullName, setNewFullName] = useState('');
  const [NewuserName, setNewUserName] = useState('');
  const [NewuserGrade, setNewGrade] = useState('');
  const [NewuserSchoolName, setNewSchoolName] = useState('');

  const [open, setOpen] = useState(false);
  DropDownPicker.setListMode('SCROLLVIEW');
  const [gradeValue, setgradeValue] = useState(null);
  const [ChildGrade, setChildGrade] = useState([
    {label: 'أولى ابتدائي', value: 'أولى ابتدائي'},
    {label: 'ثاني إبتدائي', value: 'ثاني إبتدائي'},
    {label: 'ثالث إبتدائي', value: 'ثالث إبتدائي'},
    {label: 'رابع إبتدائي', value: 'رابع إبتدائي'},
    {label: 'خامس إبتدائي', value: 'خامس إبتدائي'},
    {label: 'سادس إبتدائي', value: 'سادس إبتدائي'},
    {label: 'آخرى', value: 'آخرى'},
  ]);

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
      <StatusBar backgroundColor="#DAE2E9" />
      <View style={[TitleStyles.BlueContianer, {position: 'absolute'}]} />
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
      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
        ]}
      />

      {/* size of the animal picker need to be changed */}
      <ScrollView>
        <Text style={TitleStyles.profileText}>الاسم كامل </Text>
        <TextInput
          style={TitleStyles.textInput}
          value={fullName}
          editable={true}></TextInput>

        <Text style={TitleStyles.profileText}> اسم المستخدم </Text>
        <TextInput
          style={TitleStyles.textInput}
          value={userName}
          editable={true}></TextInput>

        <Text style={TitleStyles.profileText}> المرحلة الدارسية </Text>

        <View
        // style={[TitleStyles.shadowOffset, {zIndex: 1000, elevation: 1000}]}
        >
          <DropDownPicker
            style={[
              TitleStyles.dropDownStyle2,
              Platform.OS === 'android' ? TitleStyles.shadowOffset : null,
            ]}
            textStyle={TitleStyles.categoryText}
            containerStyle={{}}
            dropDownContainerStyle={{
              borderColor: '#C7C7CD',
              backgroundColor: '#f2f4f7',
            }}
            placeholderStyle={{color: '#808182'}}
            open={open}
            value={gradeValue}
            items={ChildGrade}
            setOpen={setOpen}
            setValue={setgradeValue}
            setItems={setChildGrade}
            placeholder={userGrade}
            onChangeValue={value => setGrade(value)}
          />
        </View>

        <View>
          <Text style={TitleStyles.profileText}> اسم المدرسة </Text>
          <TextInput
            style={TitleStyles.textInput}
            value={userSchoolName}
            editable={true}></TextInput>
        </View>

        <TouchableOpacity
          style={[
            TitleStyles.Button,
            {
              backgroundColor: '#DAE2E9',
              alignSelf: 'center',
              width: 283,
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
             setStudent();
            }}>
            تسجيل خروج
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default StudentEditProfile;
