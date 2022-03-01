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
import Ombre from '../assets/images/OmbreBackground.svg';
import BackButton from '../Components/BackButton.js';
import Cell from '../assets/images/cell.svg';
import Plus from '../assets/images/Plus.svg';
import Unlock from '../assets/images/Unlock.svg';
import DropDownPicker from 'react-native-dropdown-picker';
import SuccessModel from '../Components/SuccessModel';
import AddChildModel from '../Components/AddChildModel';
import ErrorModel from '../Components/ErrorModel';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CreateClass = ({navigation, route}) => {
  const user = auth().currentUser;

  // Class Community attributes
  const [className, setClassName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [schoolName, setSchoolName] = useState('');
  DropDownPicker.setListMode('SCROLLVIEW');
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([
    {label: 'القرآن', value: 'القرآن'},
    {label: 'التوحيد', value: 'التوحيد'},
    {label: 'الفقه', value: 'الفقه'},
    {label: 'الحديث', value: 'الحديث'},
    {label: 'التجويد', value: 'التجويد'},
    {label: 'التفسير', value: 'التفسير'},
    {label: 'لغتي', value: 'لغتي'},
    {label: 'آخرى', value: 'آخرى'},
  ]);
    const [StudentList, setStudentList] = useState([]);
  const [passcode, setPasscode] = useState();

  const [onePass, setOnePass] = useState(0);

  if (onePass == 0) {
    setPasscode(Math.floor(100000 + Math.random() * 90000).toString());
    setOnePass(1);
  }

  //Alert Success modal
  const [modalVisible, setModalVisible] = useState(false);

  //Alert Error modal
  const [ErrormodalVisible, setErrormodalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');

  // Add Child Model
  const [AddmodalVisible, setAddmodalVisible] = useState(false);

  // To Check If The Field Contains Symbols
  const IsValidfield = field => {
    const RegxOfNames =
      /^[a-zA-Z0-9\s\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\u0621-\u064A\u0660-\u0669 ]*$/;
    return RegxOfNames.test(field);
  };

  const IsValidCapacity = val => {
    const RegxPass = /^[0-9]*$/;
    return RegxPass.test(val);
  };


const setStudentArray = userArray =>{
  setStudentList(userArray)
  console.log('StudentList')
  console.log(StudentList)

}
  const submit = () => {
    //Checking If Any Required Field Is Empty
    if (className == '' || subject == '' || capacity == '') {
      setErrorMessage('جميع الحقول مطلوبة');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    // Checking Validaty Of Fields
    if (IsValidfield(schoolName) == false) {
      setErrorMessage('يجب ان يحتوي اسم المدرسة على حروف وأرقام فقط');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    if (IsValidCapacity(capacity) == false) {
      setErrorMessage('سعة الفصل يجب ان تكون مكونة من ارقام انجليزية فقط');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    // Checking If Any Field Is Over the Spesified Length

    if (
      className.replace(/\s+/g, '').length > 30 ||
      className.replace(/\s+/g, '').length < 2
    ) {
      setErrorMessage(
        'حقل "اسم الفصل" يجب ألا يقل عن حرفين وألا يتجاوز ٣٠ حرف',
      );
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    if (schoolName.replace(/\s+/g, '').length > 40) {
      setErrorMessage('حقل "اسم المدرسة" يجب ألا يتجاوز ٤٠ حرف');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    if (capacity < 2 || capacity > 100) {
      setErrorMessage(
        'سعة الفصل يجب ألا تقل عن طالبين وألا تتجاوز عن ١٠٠ طالب',
      );
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }
     console.log('StudentList2')
      console.log(StudentList)


    firestore()
      .collection('ClassCommunity')
      .add({
        Name: className,
        Subject: subject,
        Capacity: capacity,
        SchoolName: schoolName,
        Passcode: passcode,
        StudentList: StudentList,
        InstructorID: user.uid,
      })
      .then(() => {
        setModalVisible(!modalVisible);
      });
  };

  return (
    <SafeAreaView
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FFF',
      }}>
      <Ombre style={[{position: 'absolute', top: 0}]} />

      <StatusBar />
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width: 350,
            height: 500,
            borderRadius: 25,
            shadowColor: '#000',
            shadowOffset: {
              width: 3,
              height: 6,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8.3,
            elevation: 13,
            padding: 25,
            marginTop: 70,
          }}>
          <SuccessModel
            message={
              'تم إنشاء الفصل بنجاح،\n رمز الدخول للفصل هو \n' + passcode
            }
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

          <AddChildModel
            modalVisible={AddmodalVisible}
            setModalVisible={setAddmodalVisible}
            sentFunction={setStudentArray}
          />

          <ErrorModel
            message={ErrorMessage}
            modalVisible={ErrormodalVisible}
            setModalVisible={setErrormodalVisible}
          />
          <Cell
            width="300"
            height="80"
            viewBox="0 0 38 37"
            style={[
              {position: 'relative', top: -60, marginBottom: -60},
              I18nManager.isRTL ? {right: 0} : {left: 0},
            ]}
          />
          <Text style={[TitleStyles.sectionTitle]}>إنشاء فصل</Text>

          {/*CLASS NAME INPUT*/}
          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="اسم الفصل"
              placeholderTextColor={'#C3C7CA'}
              style={[
                Platform.OS === 'android' ? TitleStyles.shadowOffset : null,
                TitleStyles.input,
                {shadowColor: '#000', padding: 10},
              ]}
              onChangeText={text => setClassName(text)}
              value={className}
              underlineColorAndroid="transparent"
              color="black"
            />
          </View>

          {/*SUBJECT NAME INPUT*/}
          <View
            style={[TitleStyles.shadowOffset, {zIndex: 1000, elevation: 1000}]}>
            <DropDownPicker
              style={[
                TitleStyles.dropDownStyle,
                Platform.OS === 'android' ? TitleStyles.shadowOffset : null,
                {marginTop: 15},
              ]}
              textStyle={TitleStyles.categoryText}
              containerStyle={{}}
              dropDownContainerStyle={{
                borderColor: '#C7C7CD',
                backgroundColor: '#f2f4f7',
              }}
              placeholderStyle={{color: '#C7C7CD'}}
              open={open}
              value={subject}
              items={subjects}
              setOpen={setOpen}
              setValue={setSubject}
              setItems={setSubjects}
              placeholder="المادة"
              onChangeValue={value => setSubject(value)}
            />
          </View>

          {/*SCHOOL NAME INPUT*/}
          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="اسم المدرسة (اختياري)"
              placeholderTextColor={'#C3C7CA'}
              style={[
                Platform.OS === 'android' ? TitleStyles.shadowOffset : null,
                TitleStyles.input,
                {shadowColor: '#000', padding: 10, marginTop: 15},
              ]}
              onChangeText={text => setSchoolName(text)}
              value={schoolName}
              underlineColorAndroid="transparent"
              color="black"
            />
          </View>

          {/*CAPACITY INPUT*/}
          <View style={TitleStyles.shadowOffset}>
            <TextInput
              placeholder="سعة الفصل"
              placeholderTextColor={'#C3C7CA'}
              style={[
                Platform.OS === 'android' ? TitleStyles.shadowOffset : null,
                TitleStyles.input,
                {shadowColor: '#000', padding: 10, marginTop: 15},
              ]}
              onChangeText={number => setCapacity(number)}
              keyboardType="number-pad"
              maxLength={3}
              value={capacity}
              underlineColorAndroid="transparent"
              color="black"
            />
          </View>

          <View
            style={[
              TitleStyles.InstructorCard,
              {
                position: 'relative',
                marginTop: 20,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                width: 300,
                padding: 0,
              },
            ]}>
            <TouchableOpacity>
              <View
                style={[
                  TitleStyles.InstructorSubCard,
                  {height: 50, width: 150, borderRightWidth: 0},
                ]}>
                <Unlock />
                <Text style={TitleStyles.smallText}>إنشاء رمز للفصل</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setAddmodalVisible(!AddmodalVisible);
              }}>
              <View
                style={[
                  TitleStyles.InstructorSubCard,
                  {height: 50, width: 150, borderRightWidth: 0},
                ]}>
                <Plus width="35" height="37" />
                <Text style={TitleStyles.smallText}>أضف طلاب</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            TitleStyles.Button,
            {
              backgroundColor: '#DAE2E9',
              alignSelf: 'center',
              padding: 5,
              width: 285,
              marginTop: 40,
            },
          ]}>
          <Text
            style={TitleStyles.ButtonText}
            onPress={() => {
              submit();
            }}>
            إنشاء الفصل
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <BackButton/>

    </SafeAreaView>
  );
};
export default CreateClass;
