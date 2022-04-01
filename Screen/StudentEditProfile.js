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
import SuccessModel from '../Components/SuccessModel';
import ErrorModel from '../Components/ErrorModel';
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
  //const [NewuserName, setNewUserName] = useState('');
  const [NewGrade, setNewGrade] = useState('');
  const [NewSchoolName, setNewSchoolName] = useState('');

  //For dropwdown
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

  //Success modal
  const [modalVisible, setModalVisible] = useState(false);

  // Error model
  const [ErrormodalVisible, setErrormodalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');

  //Check for username uniquness
  const [isUnique, setisUnique] = useState(true);

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

  // Check if name contain numbers
  const IsValidfield = field => {
    const RegxOfNames = /^[a-zA-Z\s\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]*$/;
    return RegxOfNames.test(field);
  };

  /*firestore()
    .collection('Student')
    .where('Username', '==', NewuserName)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.size != 0) {
        setisUnique(false);
      } else setisUnique(true);
    });*/

  const isUniqueUsername = username => {};
  //chech if Username only use letters and numbers
  const onValidUsername = val => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(val);
  };

  const UpdateInfo = () => {
    // Checking for empty fields
    if (
      (NewfullName == '') &
      // (NewuserName == '') &
      (NewGrade == '') &
      (NewSchoolName == '')
    ) {
      setErrorMessage(' لم يتم اضافة معلومات جديدة ');
      setErrormodalVisible(!ErrormodalVisible);

      return;
    }

    if (NewfullName != '') {
      if (IsValidfield(NewfullName) == false) {
        setErrorMessage('حقل "اسم الطفل" يجب ان يحتوي على حروف فقط');
        setErrormodalVisible(!ErrormodalVisible);
        return;
      }

      if (
        NewfullName.replace(/\s+/g, '').length > 30 ||
        NewfullName.replace(/\s+/g, '').length < 2
      ) {
        setErrorMessage(
          'حقل "اسم الطفل" يجب ألا يقل عن حرفين وألا يتجاوز ٣٠ حرف',
        );
        setErrormodalVisible(!ErrormodalVisible);
        return;
      }

      firestore()
        .collection('Student')
        .doc(student ? student.id : route.params.studentID)
        .update({
          Fullname: NewfullName,
        });
      setModalVisible(!modalVisible);
    }
    /*if (NewuserName != '') {
      if (isUnique == false) {
        setErrorMessage('حقل "اسم المستخدم" مسجل مسبقا');
        setErrormodalVisible(!ErrormodalVisible);
        return;
      }

      if (
        NewuserName.replace(/\s+/g, '').length > 30 ||
        NewuserName.replace(/\s+/g, '').length < 2
      ) {
        setErrorMessage(
          'حقل "اسم المستخدم" يجب ألا يقل عن حرفين وألا يتجاوز ٣٠ حرف',
        );
        setErrormodalVisible(!ErrormodalVisible);
        return;
      }

      if (onValidUsername(NewuserName) == false) {
        setErrorMessage(
          'حقل "اسم المستخدم" يجب ان يحتوي على حروف انجليزية و ارقام فقط',
        );
        setErrormodalVisible(!ErrormodalVisible);

        return;
      }
      firestore()
        .collection('Student')
        .doc(student ? student.id : route.params.studentID)
        .update({
          Username: NewuserName,
        });
      setModalVisible(!modalVisible);
    }*/

    if (NewSchoolName.length != 0) {
      if (
        NewSchoolName.replace(/\s+/g, '').length > 30 ||
        NewSchoolName.replace(/\s+/g, '').length < 2
      ) {
        setErrorMessage(
          'حقل "اسم المدرسة" يجب ألا يقل عن حرفين وألا يتجاوز ٣٠ حرف',
        );
        setErrormodalVisible(!ErrormodalVisible);
        return;
      }

      firestore()
        .collection('Student')
        .doc(student ? student.id : route.params.studentID)
        .update({
          SchoolName: NewSchoolName,
        });
      setModalVisible(!modalVisible);
    }

    if (NewGrade != '') {
      firestore()
        .collection('Student')
        .doc(student ? student.id : route.params.studentID)
        .update({
          Grade: NewGrade,
        });
      setModalVisible(!modalVisible);
    }
  };
  /*const UpdateGrade = () => {
    firestore()
      .collection('Student')
      .doc(student ? student.id : route.params.studentID)
      .update({
        Grade: NewGrade,
      });
    setModalVisible(!modalVisible);
    return;
  };*/

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFFFFF',
        height: '100%',
        ...(Platform.OS === 'android' ? {paddingTop: 20} : null),
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <SuccessModel
        message={'تم تحديث معلوماتك بنجاج'}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <ErrorModel
        message={ErrorMessage}
        modalVisible={ErrormodalVisible}
        setModalVisible={setErrormodalVisible}
      />
      <StatusBar translucent backgroundColor="#DAE2E9" />
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
          onPress={() => {
            UpdateInfo();
          }}>
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
      <ScrollView style={{zIndex: -1, height: 'auto'}}>
        <Text style={TitleStyles.profileText}>الاسم كامل </Text>
        <TextInput
          style={TitleStyles.textInput}
          placeholder={fullName}
          placeholderTextColor={'#808182'}
          value={NewfullName}
          editable={true}
          selectTextOnFocus={true}
          onChangeText={text => setNewFullName(text)}></TextInput>

        <Text style={TitleStyles.profileText}> اسم المستخدم </Text>
        <TextInput
          style={TitleStyles.textInput}
          placeholder={userName}
          placeholderTextColor={'#AEAEAE'}
          //value={NewuserName}
          editable={false}
          selectTextOnFocus={true}
          // onChangeText={text => setNewUserName(text)}
        ></TextInput>

        <Text style={TitleStyles.profileText}> المرحلة الدارسية </Text>

        <View style={[{zIndex: 1000, elevation: 1000}]}>
          <DropDownPicker
            style={[TitleStyles.dropDownStyle2]}
            textStyle={TitleStyles.categoryText}
            dropDownContainerStyle={{
              borderColor: '#C7C7CD',
              backgroundColor: '#f2f4f7',
              width: '90%',
              marginLeft: 20,
            }}
            labelStyle={{fontSize: 16, color: '#808182'}}
            placeholderStyle={{fontSize: 16, color: '#808182'}}
            open={open}
            value={gradeValue}
            items={ChildGrade}
            setOpen={setOpen}
            setValue={setgradeValue}
            setItems={setChildGrade}
            placeholder={userGrade}
            onChangeValue={value => setNewGrade(value)}
          />
        </View>

        <View>
          <Text style={TitleStyles.profileText}> اسم المدرسة </Text>
          <TextInput
            style={TitleStyles.textInput}
            value={NewSchoolName}
            editable={true}
            placeholder={userSchoolName}
            placeholderTextColor={'#808182'}
            selectTextOnFocus={true}
            onChangeText={text => setNewSchoolName(text)}></TextInput>
        </View>

        <TouchableOpacity
          style={[
            TitleStyles.Button,
            {
              backgroundColor: '#DAE2E9',
              alignSelf: 'center',
              width: 283,
              marginTop: 40,
              marginBottom: Platform.OS === 'ios' ? 100 : 90,
              // height: 40,
              ///   marginTop: 20,
              //marginBottom: 20,
            },
          ]}
          // onPress={onSignout}
        >
          <Text
            style={[TitleStyles.ButtonText]}
            onPress={() => {
              setStudent();
              navigation.reset({
                index: 0,
                routes: [{name: 'ChildList'}],
              });
            }}>
            تسجيل خروج
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default StudentEditProfile;
