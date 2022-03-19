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
const TextType = ({modalVisible, setModalVisible, goBackCalled, classKey}) => {
  const navigation = useNavigation();

  //Success modal
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{backgroundColor: 'rgba(52, 52, 52, 0.5)', height: '100%'}}>
          <View style={TitleStyles.modalContent}>
            <Text
              style={[
                TitleStyles.subTitle,
                {textAlign: 'center', fontFamily: 'AJannatLT-Bold'},
              ]}>
              {' '}
              نوع النص
            </Text>
            <View style={[{flexDirection: 'row', alignSelf: 'center'}]}>
              <TouchableOpacity
                style={[TitleStyles.textTypeBox]}
                onPress={() => {
                  navigation.navigate('QuranHW', {
                    ClassID: classKey,
                    keyword: 'class',
                  });
                  setModalVisible(!modalVisible);
                  // if (goBackCalled) navigation.goBack();
                }}>
                <Text style={TitleStyles.ButtonText}>سورة من القرآن </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[TitleStyles.textTypeBox]}
                onPress={() => {
                  navigation.navigate('RecordVoice', {
                    ClassID: classKey,
                    keyword: 'class',
                  });
                  setModalVisible(!modalVisible);
                  // if (goBackCalled) navigation.goBack();
                }}>
                <Text style={TitleStyles.ButtonText}>نص عادي </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TextType;
