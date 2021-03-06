import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../Components/BackButton.js';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout';
import WhiteCurve from '../assets/images/WhiteCurve.svg';
import ThaheenStanding from '../assets/images/ThaheenStanding';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import quran from '../Components/quran.json';
import functions, {firebase} from '@react-native-firebase/functions';
import StartMicrophone from '../assets/images/StartMicrophone.svg';
import StopMicrophone from '../assets/images/StopMicrophone.svg';
import Anthem from '../assets/images/Anthem.svg';

const Instruction = ({navigation, route}) => {
  const key = route.params.keyword;

  const classID = route.params.ClassID;
  const studentID = route.params.StudentID;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DAE2E9',
        //flexDirection: 'row',
        // alignItems: 'center',
      }}>
      <StatusBar translucent backgroundColor="#DAE2E9" />
      <ScrollView>
        <Text style={[TitleStyles.sectionTitle, {marginTop: 40}]}>
          ملاحظة هامة !
        </Text>
        <BackButton />
        <View
          style={[
            TitleStyles.MemorizationContainer,
            {height: 575, paddingLeft: 9, paddingRight: 15,marginTop: 120},
          ]}>

          {key == 'class' && (
            <Text
              style={[TitleStyles.sectionTitle, {marginTop: 20, fontSize: 25}]}>
              مُعلمينا الرائعين ..
              {'\n'}
              <Text style={[TitleStyles.smallText, {textAlign: 'left'}]}>
                نحيطكم علمًا ان النص المضاف من قبلكم سيضاف للطلاب حتى يستطيعون
                استذكاره وحفظه قبل البدء بعملية التسميع لذا لا تنسوا ان تقسّموا
                النص لهم بإستخدام الفاصلة حتى يتمكنون من حفظ النص بطريقة تجزيء
                النص
                {'\n'}
              </Text>
            </Text>
          )}
          {key == 'student' && (
            <Text
              style={[TitleStyles.sectionTitle, {marginTop: 30, fontSize: 23}]}>
              أولياء الامور وأبنائهم الرائعين ..
              {'\n'}
              <Text style={[TitleStyles.smallText, {textAlign: 'left'}]}>
                نحيطكم علمًا ان النص المضاف من قبلكم سيضاف الى قائمة نصوصي حتى
                يستطيعون ابنائكم استذكاره وحفظه قبل البدء بعملية التسميع
              </Text>
            </Text>
          )}

          <Text
            style={[
              TitleStyles.smallText,
              {textAlign: 'left', color: '#B41E13'},
            ]}>
            مثال على كيف يجب ان يضاف النص :
            <Anthem />
           {'\n'}
            <Text
              style={[
                TitleStyles.smallText,
                {textAlign: 'left', color: '#B41E13'},
              ]}>
         
              تستطيعون اضافة او عدم الفاصلة حسب ماتروه كتجزيء مناسب .
            </Text>
          </Text>

          <TouchableOpacity
            style={[
              TitleStyles.Button,
              {
                backgroundColor: '#DAE2E9',
                alignSelf: 'center',
                width: 150,
                marginTop:20
              },
            ]}
            onPress={() => {
              if (key == 'class') {
                navigation.navigate('RecordVoice', {
                  ClassID: classID,
                  keyword: 'class',
                });
              } else {
                navigation.navigate('RecordVoice', {
                  StudentID: studentID,
                  keyword: 'student',
                });
              }
            }}>
            <Text style={TitleStyles.ButtonText}>حسنًا</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 310}}>
          <WhiteCurve />
        </View>

        {/* <ThaheenStanding
          style={[{position: 'relative', bottom: 170, right: -260, zIndex: 3}]}
          width={135}
          height={135}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Instruction;
