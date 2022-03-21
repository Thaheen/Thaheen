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
import {SvgUri} from 'react-native-svg';
import CheckVector from '../assets/images/CheckVector.svg';
import {useNavigation} from '@react-navigation/native';
import Close from '../assets/images/Close.svg';

import Pen from '../assets/images/Pen.svg';
import UserRead from '../assets/images/UserRead.svg';

const TextType = ({
  modalVisible,
  setModalVisible,
  goBackCalled,
  classKey,
  studentID,
  keyWord,
  callBackFunction,
}) => {
  const navigation = useNavigation();

  //Success modal
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{backgroundColor: 'rgba(52, 52, 52, 0.5)', height: '100%'}}>
          <View style={TitleStyles.modalContent}>
            <Close
              height="40"
              width="40"
              style={[{position: 'absolute', top: 20, left: 20, zIndex: 2}]}
              onPress={callBackFunction}
            />
            <Text
              style={[
                TitleStyles.subTitle,
                {textAlign: 'center', fontFamily: 'AJannatLT-Bold'},
              ]}>
              {' '}
              نوع النص
            </Text>
            <View
              style={[
                {flexDirection: 'row', alignSelf: 'center', marginBottom: 20},
              ]}>
              <TouchableOpacity
                style={[TitleStyles.textTypeBox, {alignItems: 'center'}]}
                onPress={() => {
                  if (keyWord == 'class') {
                    navigation.navigate('RecordVoice', {
                      ClassID: classKey,
                           keyword : 'class',
                    });
                    setModalVisible(!modalVisible);
                  } else {
                    navigation.navigate('RecordVoice', {
                      StudentID: studentID,
                      keyword : 'student',
                    });
                    setModalVisible(!modalVisible);
                  }
                }}>
                <Pen style={[{marginTop: 25}]} />
                <Text style={TitleStyles.TextTypefont}>نص عــــادي </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[TitleStyles.textTypeBox, {alignItems: 'center'}]}
                onPress={() => {
                  if (keyWord == 'class') {
                    navigation.navigate('QuranHW', {
                      ClassID: classKey,
                      keyword : 'class',
                    });
                    setModalVisible(!modalVisible);
                  } else {
                    navigation.navigate('QuranHW', {
                      StudentID: studentID,
                      keyword : 'student',

                    });
                    setModalVisible(!modalVisible);
                  }
                }}>
                <UserRead style={[{marginTop: 25}]} />
                <Text style={TitleStyles.TextTypefont}>سورة من القرآن </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TextType;
