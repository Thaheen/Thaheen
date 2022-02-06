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
const studentProfile = () => {
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
    </SafeAreaView>
  );
};

export default studentProfile;
