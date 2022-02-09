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
import ErrorVector from '../assets/images/ErrorVector.svg';
import CheckVector from '../assets/images/CheckVector.svg';

const AccessModel = ({modalVisible, setModalVisible}) => {
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
                {textAlign: 'right', fontWeight: 'bold'},
              ]}>
              ادخل رمز الدخول
            </Text>
            <TouchableOpacity
              style={[TitleStyles.AlertButton, {backgroundColor: '#DAE2E9'}]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={TitleStyles.ButtonText}>دخول </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[TitleStyles.AlertButton, {backgroundColor: '#DAE2E9'}]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={TitleStyles.ButtonText}>إلغاء </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AccessModel;
