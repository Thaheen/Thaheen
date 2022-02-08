import React from 'react';
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
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import Top2Lines from '../assets/images/top2Lines.svg';
import TopBox from '../assets/images/TopBox.svg';
//import {FloatingLabelInput} from 'react-native-floating-label-input';
import AnimalPicker from '../Screen/AnimalPicker.js';
import auth from '@react-native-firebase/auth';
//import {AfterEffectsOutlined} from 'react-basil';
const StudentProfile = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFFFFF',
        height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <TopBox style={[{position: 'absolute', top: 0, Right: 250}]}></TopBox>
      <Top2Lines
        style={[
          TitleStyles.shadowOffset,
          {position: 'absolute', top: 0, left: 0},
        ]}
      />
      <Text style={TitleStyles.HeaderTitle}>الملف الشخصي</Text>

      {/* size of the animal picker need to be changed */}
      <View style={{top: 60, left: 150, marginBottom: 50}}>
        <AnimalPicker />
      </View>

      <Text style={TitleStyles.profileText}>الاسم كامل </Text>
      <TextInput style={TitleStyles.textInput} value={'الغالية'}>
        {/* retrieve data */}{' '}
      </TextInput>

      <Text style={TitleStyles.profileText}> اسم المستخدم </Text>
      <TextInput style={TitleStyles.textInput} value={'Gmohammad'}>
        {/* retrieve data */}
      </TextInput>

      <Text style={TitleStyles.profileText}> المستوى </Text>
      <TextInput style={TitleStyles.textInput} value={'اخرى'}>
        {/* retrieve data */}
      </TextInput>

      <View>
        <Text style={TitleStyles.profileText}> اسم المدرسة </Text>
        <TextInput style={TitleStyles.textInput} value={'لا يوجد'}>
          {/* retrieve data */}
        </TextInput>
      </View>

      <TouchableOpacity
        style={[
          TitleStyles.Button,
          {
            backgroundColor: '#DAE2E9',
            alignSelf: 'center',
            width: 300,
            marginTop: 70,
          },
        ]}
        // onPress={onSignout}
      >
        <Text
          style={TitleStyles.ButtonText}
          onPress={() => {
            navigation.navigate('ChildList');
          }}>
          تسجيل الخروج
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default StudentProfile;
