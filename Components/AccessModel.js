import React, {useState, useRef, useEffect} from 'react';
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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  I18nManager,
} from 'react-native';

import TitleStyles from '../Styles/Titles';
import firestore from '@react-native-firebase/firestore';
import {SvgUri} from 'react-native-svg';
import ErrorVector from '../assets/images/ErrorVector.svg';
import CheckVector from '../assets/images/CheckVector.svg';
import {useNavigation} from '@react-navigation/native';
import ErrorModel from '../Components/ErrorModel';

const AccessModel = ({modalVisible, setModalVisible, studentID}) => {
  //Success modal
  let textInput = useRef(null);
  const InputLenght = 6;
  const [passcodeVal, setPasscodeval] = useState('');

  const [isValidPasscode, setIsValidPasscode] = useState('');
  const navigation = useNavigation();

  // Error model
  const [ErrormodalVisible, setErrormodalVisible] = useState(false);

  useEffect(() => {
    const studentsPasscode = firestore()
      .collection('Student')
      .doc(studentID)
      .onSnapshot(snapshot => {
        setIsValidPasscode(snapshot.data().Passcode);
      });
    return studentsPasscode;
  }, []);

  const onChangeText = val => {
    setPasscodeval(val);
  };

  /* componentDidMount = () => {
    textInput.focus();
  };*/
  useEffect(() => {
    if (passcodeVal.length == 6 && isValidPasscode == passcodeVal) {
      console.log('VALID');
      setModalVisible(!modalVisible);
      setPasscodeval('');
      navigation.navigate('WelcomeScreen');
      return;
    } else if (passcodeVal.length == 6 && isValidPasscode != passcodeVal) {
      console.log('INVALID');
      setErrormodalVisible(!ErrormodalVisible);
    }
  }, [passcodeVal]);

  return (
    <View style={{flex: 1}}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
            height: '100%',
          }}>
          <KeyboardAvoidingView
            KeyboardVerticalOffset={50}
            behavior={'padding'}
            style={{flex: 1, alignItems: 'center', padding: 10}}>
            <View style={TitleStyles.modalContent}>
              <Text
                style={[
                  TitleStyles.subTitle,
                  {
                    textAlign: I18nManager.isRTL ? 'left' : 'right',
                    fontFamily: 'AJannatLT-Bold',
                  },
                ]}>
                ادخل رمز الدخول
              </Text>

              <TextInput
                ref={input => (textInput = input)}
                onChangeText={onChangeText}
                style={{width: 0, height: 0}}
                value={passcodeVal}
                maxLenght={InputLenght}
                returnKeyType="done"
                keyboardType="numeric"
              />

              <View style={TitleStyles.containerInput}>
                {Array(InputLenght)
                  .fill()
                  .map((data, index) => (
                    <View key={index} style={TitleStyles.cellView}>
                      <Text
                        style={TitleStyles.cellText}
                        onPress={() => textInput.focus()}>
                        {passcodeVal && passcodeVal.length > 0
                          ? passcodeVal[index]
                          : ''}
                      </Text>
                    </View>
                  ))}
              </View>

              {/*
               <TouchableOpacity
                  style={[
                    TitleStyles.AlertButton,
                    {backgroundColor: '#DAE2E9'},
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={TitleStyles.ButtonText}>دخول </Text>
                </TouchableOpacity>
                
                */}
              <TouchableOpacity
                style={[TitleStyles.AlertButton, {backgroundColor: '#DAE2E9'}]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={TitleStyles.ButtonText}>إلغاء </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
        <ErrorModel
          message={'رمز الدخول غير صحيح، حاول مره اخرى'}
          modalVisible={ErrormodalVisible}
          setModalVisible={setErrormodalVisible}
        />
      </Modal>
    </View>
  );
};

export default AccessModel;
