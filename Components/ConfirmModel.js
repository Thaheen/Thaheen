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
import ConfirmVector from '../assets/images/ConfirmVector.svg';

const ConfirmModel = ({message, modalVisible, setModalVisible ,sentFunction , ID }) => {
  //Success modal
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View
          style={{
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
            height: '100%',
          }}>
          <View style={TitleStyles.modalContent}>
            <ConfirmVector
              width={120}
              height={120}
              style={{marginLeft: 80, marginTop: -75}}
            />
            <Text
              style={[
                TitleStyles.subTitle,
                {textAlign: 'center', fontWeight: 'bold'},
              ]}>
              {message}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#DAE2E9',
                borderRadius: 50,
              }}>
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: '#FFFFFF',
                    width: '50%',
                    borderWidth: 1,
                    borderColor: '#DAE2E9',
                    borderRadius: 25,
                  },
                ]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={TitleStyles.ButtonText}>الغاء </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{width: '50%', borderRadius: 25}]}
                onPress={() => 
                sentFunction(ID)}>
                <Text style={TitleStyles.ButtonText}>حسنا </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmModel;
