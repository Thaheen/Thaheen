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
} from 'react-native';

import TitleStyles from '../Styles/Titles';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import {SvgUri} from 'react-native-svg';
import Top2Lines from '../assets/images/top2Lines.svg';
import Bottom2Lines from '../assets/images/bottom2Lines.svg';
import BackBtn from '../assets/images/BackBtn.svg';
import SuccessModel from '../Components/SuccessModel';
import ErrorModel from '../Components/ErrorModel';
import auth from '@react-native-firebase/auth';

const AddChildAccount = ({navigation}) => {
  const user = auth().currentUser; 

  DropDownPicker.setListMode('SCROLLVIEW');
  const [ChildName, setChildName] = useState('');
  const [ChildAccount, setChildAccount] = useState('');
  const [ChildPasscode, setChildPasscode] = useState('');
  const [repeatChildPasscode, setrepeatChildPasscode] = useState('');

  const [grade, setGrade] = useState('');
  const [open, setOpen] = useState(false);
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
  const [ChildSchool, setChildSchool] = useState('');

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

  //chech if Username only use letters and numbers
  const onValidUsername = val => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(val);
  };

  //when submit button is pressed perform this
  const submit = () => {
    // Checking for empty fields
    if (
      ChildName == '' ||
      ChildAccount == '' ||
      ChildPasscode == '' ||
      repeatChildPasscode == '' ||
      grade == ''
    ) {
      setErrorMessage('جميع الحقول مطلوبة');
      setErrormodalVisible(!ErrormodalVisible);

      return;
    }
    if (IsValidfield(ChildName) == false) {
      setErrorMessage('حقل "اسم الطفل" يجب ان يحتوي على حروف فقط');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    if (onValidUsername(ChildAccount) == false) {
      setErrorMessage(
        'حقل "اسم المستخدم" يجب ان يحتوي على حروف انجليزية و ارقام فقط',
      );
      setErrormodalVisible(!ErrormodalVisible);

      return;
    }
    if (
      ChildName.replace(/\s+/g, '').length > 30 ||
      ChildName.replace(/\s+/g, '').length < 2
    ) {
      setErrorMessage('حقل اسم الطفل يجب ألا يقل عن حرفين وألا يتجاوز ٣٠ حرف');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    if (ChildPasscode !== repeatChildPasscode) {
      setErrorMessage('.رمز الدخول وتأكيد رمز الدخول يجب أن تتطابق');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    if (ChildPasscode.length != 6) {
      setErrorMessage('رمز الدخول يجب ان يكون مكون من ٦ ارقام فقط');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    firestore()
      .collection('Student')
      .add({
        Username: ChildAccount,
        Fullname: ChildName,
        Grade: grade,
        SchoolName: ChildSchool,
        Passcode: ChildPasscode,
         ParentID: user.uid
      })
      .then(() => {
        setModalVisible(!modalVisible);
      });
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
        <View>
          <BackBtn
            style={[
              TitleStyles.shadowOffset,
              {position: 'absolute', right: 138},
            ]}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        <Top2Lines
          style={[
            TitleStyles.shadowOffset,
            {position: 'absolute', top: 0, right: 0},
          ]}
        />
        <Bottom2Lines
          style={[
            TitleStyles.shadowOffset,
            {position: 'absolute', bottom: 0, left: 0},
          ]}
        />

        <SuccessModel
          message={'تمت إضافة الطفل بنجاح'}
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
          <Text style={[TitleStyles.sectionTitle, {marginBottom: 20}]}>
            إضافة حساب طفل
          </Text>
          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="اسم الطفل"
              placeholderTextColor={'#C3C7CA'}
              style={[TitleStyles.input]}
              onChangeText={text => setChildName(text)}
              value={ChildName}
              underlineColorAndroid="transparent"
              color="black"
            />
          </View>

          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="@ اسم المستخدم "
              placeholderTextColor={'#C3C7CA'}
              style={TitleStyles.input}
              onChangeText={text => setChildAccount(text)}
              value={ChildAccount}
              underlineColorAndroid="transparent"
              color="black"
            />
          </View>

          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="رمز الدخول "
              placeholderTextColor={'#C3C7CA'}
              style={TitleStyles.input}
              onChangeText={text => setChildPasscode(text)}
              keyboardType="number-pad"
              maxLength={6}
              value={ChildPasscode}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              color="black"
            />
          </View>

          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="تأكيد رمز الدخول "
              placeholderTextColor={'#C3C7CA'}
              style={TitleStyles.input}
              onChangeText={text => setrepeatChildPasscode(text)}
              value={repeatChildPasscode}
              keyboardType="number-pad"
              maxLength={6}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              color="black"
            />
          </View>

          <View
            style={[TitleStyles.shadowOffset, {zIndex: 1000, elevation: 1000}]}>
            <DropDownPicker
              style={TitleStyles.dropDownStyle}
              textStyle={TitleStyles.categoryText}
              containerStyle={{}}
              dropDownContainerStyle={{
                borderColor: '#C7C7CD',
                backgroundColor: '#f2f4f7',
              }}
              placeholderStyle={{color: '#C7C7CD'}}
              open={open}
              value={gradeValue}
              items={ChildGrade}
              setOpen={setOpen}
              setValue={setgradeValue}
              setItems={setChildGrade}
              placeholder="المرحلة الدراسية"
              onChangeValue={value => setGrade(value)}
            />
          </View>

          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="اسم المدرسة (اختياري)"
              placeholderTextColor={'#C3C7CA'}
              style={TitleStyles.input}
              onChangeText={text => setChildSchool(text)}
              value={ChildSchool}
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
            <Text style={TitleStyles.ButtonText}>إضافة حساب</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AddChildAccount;
