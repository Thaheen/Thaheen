import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
  Platform,
  I18nManager
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import {SvgUri} from 'react-native-svg';
import CheckVector from '../assets/images/CheckVector.svg';
import SuccessModel from '../Components/SuccessModel';
import ErrorModel from '../Components/ErrorModel';
import Error from '../Components/ErrorModel';
import Top2Lines from '../assets/images/top2Lines.svg';
import Bottom2Lines from '../assets/images/bottom2Lines.svg';
import BackButton from '../Components/BackButton';
const SignUp: () => Node = () => {
  DropDownPicker.setListMode('SCROLLVIEW');
  const [FullName, setFullName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  // Error model

  const [ErrormodalVisible, setErrormodalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  // DropDown
  const [open, setOpen] = useState(false);
  const [SelectedValue, setSelectedValue] = useState(null);

  const [items, setItems] = useState([
    {label: 'ولي/ـة امر', value: 'ولي/ـة امر'},
    {label: 'معلم/ـة', value: 'معلم/ـة'},
  ]);

  const IsValidPass = password => {
    const strongPass = new RegExp(
      // "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    return strongPass.test(password);
  };
  const IsValidPhone = phone => {
    const RegxPhone = /^[0-9]*$/;
    return RegxPhone.test(phone);
  };

  const IsValidPhoneStart = phone => {
    var regex = new RegExp(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/);
    return regex.test(phone);
  };

  //Success modal
  const [modalVisible, setModalVisible] = useState(false);

  // Check if name contain numbers
  const IsValidfield = field => {
    const RegxOfNames = /^[a-zA-Z\s\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]*$/;
    return RegxOfNames.test(field);
  };

  console.log('done');
  //when submit button is pressed perform this
  const submit = () => {
    // Checking for empty fields
    if (
      FullName == '' ||
      Email == '' ||
      Phone == '' ||
      Password == '' ||
      ConfirmPassword == '' ||
      SelectedValue == null
    ) {
      setErrorMessage('جميع الحقول مطلوبة');
      setErrormodalVisible(!ErrormodalVisible);

      return;
    }
    if (IsValidfield(FullName) == false) {
      setErrorMessage('حقل الاسم الكامل يجب أن يحتوي على حروف فقط');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }
    if (
      FullName.replace(/\s+/g, '').length > 30 ||
      FullName.replace(/\s+/g, '').length < 2
    ) {
      setErrorMessage(
        'حقل الاسم الكامل يجب ألا يقل عن حرفين وألا يتجاوز ٣٠ حرف',
      );
      setErrormodalVisible(!ErrormodalVisible);

      return;
    }
    if (IsValidPhone(Phone) == false) {
      setErrorMessage(' يجب ان يكون رقم الهاتف من أرقام إنجليزية فقط ');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }
    if (IsValidPhoneStart(Phone) == false) {
      setErrorMessage('يجب أن يبدأ الرقم بـ 05 ويتبعه 8 خانات فقط');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    if (IsValidPass(Password) == false) {
      setErrorMessage('كلمة السر لا تستوفي الشروط المطلوبة');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    if (Password !== ConfirmPassword) {
      setErrorMessage('كلمة المرور وتأكيد رمز كلمة المررور يجب أن تتطابق');
      setErrormodalVisible(!ErrormodalVisible);
      return;
      return;
    }

    if (SelectedValue == 'ولي/ـة امر') {
      auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then(response => {
          const user = auth().currentUser;
          firestore().collection('Parents Accounts').doc(user.uid).set({
            fullName: FullName,
            email: Email,
            phone: Phone,
            type: SelectedValue,
          });
        })
        .then(() => {
          setModalVisible(!modalVisible);
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              setErrorMessage('البريد الألكتروني غير صحيح ');
              setErrormodalVisible(!ErrormodalVisible);
              console.log('User account signed in!');
              break;

            case 'auth/network-request-failed':
              setErrorMessage('الرجاء التحقق من الأتصال بالانترنت');
              setErrormodalVisible(!ErrormodalVisible);
              console.log('User account signed in!');
              break;

            case 'auth/email-already-in-use':
              setErrorMessage('البريد الألكتروني مسجل من قبل');
              setErrormodalVisible(!ErrormodalVisible);
              console.log('User account signed in!');
              break;

            case 'auth/phone-number-already-exists':
              setErrorMessage('رقم الجوال مسجل من قبل');
              setErrormodalVisible(!ErrormodalVisible);
              console.log('User account signed in!');
              break;
          }
        });
    } else {
      auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then(response => {
          const user = auth().currentUser;
          firestore().collection('Instructors Accounts').doc(user.uid).set({
            fullName: FullName,
            email: Email,
            phone: Phone,
            type: SelectedValue,
          });
        })
        .then(() => {
          setModalVisible(!modalVisible);
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/invalid-email':
              setErrorMessage('البريد الألكتروني غير صحيح ');
              setErrormodalVisible(!ErrormodalVisible);
              console.log('User account signed in!');
              break;

            case 'auth/network-request-failed':
              setErrorMessage('الرجاء التحقق من الأتصال بالانترنت');
              setErrormodalVisible(!ErrormodalVisible);
              console.log('User account signed in!');
              break;

            case 'auth/email-already-in-use':
              setErrorMessage('البريد الألكتروني مسجل من قبل');
              setErrormodalVisible(!ErrormodalVisible);
              console.log('User account signed in!');
              break;

            case 'auth/phone-number-already-exists':
              setErrorMessage('رقم الجوال مسجل من قبل');
              setErrormodalVisible(!ErrormodalVisible);
              console.log('User account signed in!');
              break;
          }
        });
    } // else end
  };

  return (
    <View>
      <SafeAreaView
        style={{
          backgroundColor: '#DAE2E9',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BackButton />
        <Top2Lines
          style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
        ]}
        />
        <Bottom2Lines
          style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL ? RTLlayout.Bottom2LinesAR : RTLlayout.Bottom2LinesEN,
        ]}
        />
        <SuccessModel
          message={'تم إنشاء الحساب بنجاح'}
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
            backgroundColor: '#FFFFFF',
            width: 355,
            borderRadius: 25,
            shadowColor: '#000',
            shadowOffset: {
              width: 3,
              height: 9,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.3,
            elevation: 13,
            padding: 25,
            marginTop: 70,
          }}>
          <Text style={[TitleStyles.sectionTitle, {marginBottom: 3}]}>
            إنشاء حساب
          </Text>
          <Text style={TitleStyles.WarningText}>*جميـع الحقول مطلوبـــة</Text>
          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="*الاسم الكامل"
              placeholderTextColor={'#C3C7CA'}
              style={[
                Platform.OS === 'android' ? TitleStyles.shadowOffset : null,
                TitleStyles.input,
                {shadowColor: '#000'},
              ]}
              onChangeText={text => setFullName(text)}
              value={FullName}
              underlineColorAndroid="transparent"
              color="black"
            />
          </View>
          <View
            style={[TitleStyles.shadowOffset, {zIndex: 1000, elevation: 1000}]}>
            <DropDownPicker
              style={[TitleStyles.dropDownStyle, Platform.OS === 'android' ? TitleStyles.shadowOffset : null]}
              textStyle={TitleStyles.categoryText}
              containerStyle={{}}
              dropDownContainerStyle={{
                borderColor: '#C7C7CD',
                backgroundColor: '#f2f4f7',
              }}
              placeholderStyle={{color: '#C7C7CD'}}
              open={open}
              value={SelectedValue}
              items={items}
              setOpen={setOpen}
              setValue={setSelectedValue}
              setItems={setItems}
              placeholder="*نوع الحساب"
              onChangeValue={value => setSelectedValue(value)}
            />
          </View>

          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="البريد الالكتروني "
              placeholderTextColor={'#C3C7CA'}
              style={[
                Platform.OS === 'android' ? TitleStyles.shadowOffset : null,
                TitleStyles.input,
                {shadowColor: '#000'},
              ]}
              onChangeText={text => setEmail(text)}
              value={Email}
              underlineColorAndroid="transparent"
              color="black"
            />
          </View>

          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="* رقم الجوال مثال : ٠٥٠ او ٩٦٦"
              placeholderTextColor={'#C3C7CA'}
              style={[
                Platform.OS === 'android' ? TitleStyles.shadowOffset : null,
                TitleStyles.input,
                {shadowColor: '#000'},
              ]}
              onChangeText={text => setPhone(text)}
              keyboardType="number-pad"
              value={Phone}
              underlineColorAndroid="transparent"
              color="black"
              returnKeyType="done"
            />
          </View>

          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="*كلمة المرور"
              placeholderTextColor={'#C3C7CA'}
              style={[
                Platform.OS === 'android' ? TitleStyles.shadowOffset : null,
                TitleStyles.input,
                {shadowColor: '#000'},
              ]}
              onChangeText={text => setPassword(text)}
              value={Password}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              color="black"
            />
          </View>
          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="*تأكيد كلمة المرور"
              placeholderTextColor={'#C3C7CA'}
              style={[
                Platform.OS === 'android' ? TitleStyles.shadowOffset : null,
                TitleStyles.input,
                {shadowColor: '#000'},
              ]}
              onChangeText={text => setConfirmPassword(text)}
              value={ConfirmPassword}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              color="black"
            />
          </View>

          <TouchableOpacity
            style={[
              TitleStyles.Button,
              TitleStyles.shadowOffset,
              {marginBottom: 30, marginTop: 30},
            ]}
            onPress={() => submit()}>
            <Text style={TitleStyles.ButtonText}>إنشاء حساب</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUp;
