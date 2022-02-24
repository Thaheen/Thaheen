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

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFFFFF',
        height: '100%',
        paddingBottom: Platform.OS === 'ios' ? 100 : 65,
        ...Platform.OS === 'android' ? {marginTop: 20, } : null
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
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
            // alignSelf: 'center',
            // width: 300,
            //marginTop: 10,
            // marginBottom: 40,
          },
        ]}
        onPress={() => {
          //UpdateInfo();
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
          //  value={NewfullName}
          editable={true}
          // selectTextOnFocus={true}
          // onChangeText={text => setNewFullName(text)}
        ></TextInput>

        <Text style={TitleStyles.profileText}> البريد الإلكترني </Text>
        <TextInput
          style={TitleStyles.textInput}
          placeholder={Email}
          placeholderTextColor={'#808182'}
          //  value={NewfullName}
          // editable={true}
          selectTextOnFocus={true}
          onChangeText={text => setNewFullName(text)}></TextInput>

        <Text style={TitleStyles.profileText}> رقم الهاتف </Text>
        <TextInput
          style={TitleStyles.textInput}
          placeholder={PhoneNum}
          placeholderTextColor={'#808182'}
          //  value={NewfullName}
          editable={true}
          selectTextOnFocus={true}
          // onChangeText={text => setNewFullName(text)}
        ></TextInput>
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
