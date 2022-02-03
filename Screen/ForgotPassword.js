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
import Bottom2Lines from '../assets/images/bottom2Lines.svg';
import Envelope from '../assets/images/Envelope.svg';

const ForgotPassword = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DAE2E9',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Top2Lines
        style={[
          TitleStyles.shadowOffset,
          {position: 'absolute', top: 0, left: 0},
        ]}
      />

      <Bottom2Lines
        style={[
          TitleStyles.shadowOffset,
          {position: 'absolute', bottom: 0, right: 0},
        ]}
      />
      <StatusBar />

      <View
        style={{
          marginLeft: 30,
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
          borderRadius: 25,
          padding: 25,
          shadowColor: '#000000',
          shadowOffset: {
            width: 3,
            height: 9,
          },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 10,
        }}>
        <Text
          style={{
            fontFamily: 'AJannatLT-Bold',
            fontSize: 35,
            color: '#43515F',
            textAlign: 'center',
          }}>
          استرجاع كلمة المرور
        </Text>

        <TextInput
          placeholder="البريد الإلكتروني"
          placeholderTextColor={'#C8CBCD'}
          style={[
            TitleStyles.input,
            {
              marginBottom: 10,
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 4,
            },
          ]}
          color="black"
        />

        <TouchableOpacity style={TitleStyles.Button}>
          <Text style={TitleStyles.ButtonText}>استرجاع</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
