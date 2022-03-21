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
import ProfileColor from '../assets/images/ProfileColor.svg';
import CurveLine from '../assets/images/CurveLine.svg';
import Podium from '../assets/images/podium.svg';
import AnimalPicker from '../Screen/AnimalPicker.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import BackButton from '../Components/BackButton.js';
import {UserInfoContext} from '../auth/UserInfoContext';
import SuccessModel from '../Components/SuccessModel';
import ErrorModel from '../Components/ErrorModel';

const InstructorProfile = ({navigation, route}) => {
  //VIEW , EDIT PROFILE

  const onSignout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const {user} = React.useContext(UserInfoContext);

  const [FullName, setFullName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNum, setPhoneNum] = useState('');

  //New Data
  const [NewfullName, setNewFullName] = useState('');
  const [NewEmail, setNewEmail] = useState('');
  const [NewPhoneNum, setNewPhoneNum] = useState('');

  //Success modal
  const [modalVisible, setModalVisible] = useState(false);

  // Error model
  const [ErrormodalVisible, setErrormodalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');

  // Check if name contain numbers
  const IsValidfield = field => {
    const RegxOfNames = /^[a-zA-Z\s\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]*$/;
    return RegxOfNames.test(field);
  };

  const IsValidPhone = phone => {
    const RegxPhone = /^[0-9]*$/;
    return RegxPhone.test(phone);
  };

  const IsValidPhoneStart = phone => {
    var regex = new RegExp(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/);
    return regex.test(phone);
  };

  useEffect(() => {
    const InstructorInfo = firestore()
      .collection('Instructors Accounts')
      .doc(user.id)
      .onSnapshot(snapshot => {
        setFullName(snapshot.data().fullName);
        setEmail(snapshot.data().email);
        setPhoneNum(snapshot.data().phone);
      });
    return InstructorInfo;
  }, []);

  const UpdateInfo = () => {
    // Checking for empty fields
    if ((NewfullName == '') & (NewEmail == '') & (NewPhoneNum == '')) {
      setErrorMessage(' لم يتم اضافة معلومات جديدة ');
      setErrormodalVisible(!ErrormodalVisible);

      return;
    }

    if (NewfullName != '') {
      if (IsValidfield(NewfullName) == false) {
        setErrorMessage('حقل الاسم الكامل يجب أن يحتوي على حروف فقط');
        setErrormodalVisible(!ErrormodalVisible);
        return;
      }

      if (
        NewfullName.replace(/\s+/g, '').length > 30 ||
        NewfullName.replace(/\s+/g, '').length < 2
      ) {
        setErrorMessage(
          'حقل الاسم الكامل يجب ألا يقل عن حرفين وألا يتجاوز ٣٠ حرف',
        );
        setErrormodalVisible(!ErrormodalVisible);

        return;
      }

      firestore().collection('Instructors Accounts').doc(user.id).update({
        fullName: NewfullName,
      });
      setModalVisible(!modalVisible);
    }

    if (NewPhoneNum != '') {
      if (IsValidPhone(NewPhoneNum) == false) {
        setErrorMessage(' يجب ان يكون رقم الهاتف من أرقام إنجليزية فقط ');
        setErrormodalVisible(!ErrormodalVisible);
        return;
      }

      if (IsValidPhoneStart(NewPhoneNum) == false) {
        setErrorMessage('يجب أن يبدأ الرقم بـ 05 ويتبعه 8 خانات فقط');
        setErrormodalVisible(!ErrormodalVisible);
        return;
      }

      firestore().collection('Instructors Accounts').doc(user.id).update({
        phone: NewPhoneNum,
      });
      setModalVisible(!modalVisible);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFFFFF',
        height: '100%',
        paddingBottom: Platform.OS === 'ios' ? 100 : 65,
        ...(Platform.OS === 'android' ? {marginTop: 20} : null),
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

      <View
        style={{
          position: 'absolute',
        }}>
        <ProfileColor />
      </View>
      <Text style={[TitleStyles.ProfileTitle]}>البيانات الشخصية</Text>
      <ScrollView>
        <View style={[TitleStyles.circle]}>
          <Podium />
        </View>
        <Text style={[TitleStyles.Profilename2]}>أ.{FullName} </Text>
        <TouchableOpacity
          style={[
            TitleStyles.EditBtn,
            {
              backgroundColor: '#FFFFFF',
              zIndex: 1,
            },
          ]}
          onPress={() => {
            UpdateInfo();
          }}>
          <Text style={[TitleStyles.ProfileUsername]}>تحديث البيانات</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: -100,
          }}>
          <CurveLine />
        </View>

        <View
          style={{
            marginTop: -80,
            marginBottom: 60,
          }}>
          <Text style={TitleStyles.profileText}>الاسم كامل </Text>
          <TextInput
            style={TitleStyles.textInput}
            placeholder={FullName}
            placeholderTextColor={'#808182'}
            value={NewfullName}
            editable={true}
            selectTextOnFocus={true}
            onChangeText={text => setNewFullName(text)}></TextInput>

          <Text style={TitleStyles.profileText}> البريد الإلكترني </Text>
          <TextInput
            style={TitleStyles.textInput}
            placeholder={Email}
            placeholderTextColor={'#AEAEAE'}
            //  value={NewfullName}
            editable={false}
            selectTextOnFocus={true}
            // onChangeText={text => setNewEmail(text)}
          ></TextInput>

          <Text style={TitleStyles.profileText}> رقم الهاتف </Text>
          <TextInput
            style={TitleStyles.textInput}
            placeholder={PhoneNum}
            placeholderTextColor={'#808182'}
            //  value={NewfullName}
            editable={true}
            selectTextOnFocus={true}
            onChangeText={text => setNewPhoneNum(text)}></TextInput>
        </View>

        <TouchableOpacity
          style={[
            TitleStyles.Button,
            {
              backgroundColor: '#DAE2E9',
              alignSelf: 'center',
              width: 283,
              // height: 40,
              //marginTop: 20,
              marginBottom: 50,
            },
          ]}
          // onPress={onSignout}
        >
          <Text
            style={TitleStyles.ButtonText}
            onPress={() => {
              onSignout();
            }}>
            تسجيل خروج
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default InstructorProfile;
