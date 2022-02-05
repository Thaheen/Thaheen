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
import BackBtn from '../assets/images/BackBtn.svg';
import TopBox from '../assets/images/TopBox.svg';

const ChildList = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
      }}>
        <TopBox style={[{position: 'absolute', top: 0 , left: -25}]}/>
        <Text style={[TitleStyles.HeaderTitle, {textAlign:'right', paddingRight: 50}]}>من أنت؟</Text>
        <BackBtn
          style={[
            TitleStyles.shadowOffset,
            {position: 'absolute', right: 15, top:50},
          ]}
        />
      <Top2Lines
        style={[
          TitleStyles.shadowOffset,
          {position: 'absolute', top: 0, left: 0},
        ]}
      />
      <TouchableOpacity 
      style={[TitleStyles.Button , 
      {backgroundColor: '#DAE2E9', 
      alignSelf:'center',
      width:300,
      position:'absolute',
      top:650,
        }]}>
          <Text style={TitleStyles.ButtonText}>إضافة حساب طفل جديد</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChildList;
