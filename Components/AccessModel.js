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
import {UserInfoContext} from '../auth/UserInfoContext';

const AccessModel = ({modalVisible, setModalVisible, studentID, type}) => {
  //Success modal
  let textInput = useRef(null);
  const InputLenght = 6;
  const [passcodeVal, setPasscodeval] = useState('');
  const {setStudent} = React.useContext(UserInfoContext);
  const [isValidPasscode, setIsValidPasscode] = useState('');
  const [StudentUsername, setStudentUsername] = useState('');

  const navigation = useNavigation();
  const [studentSnapShot, setStudnetSnapShot] = useState();

  // Error model
  const [ErrormodalVisible, setErrormodalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const studentsPasscode = firestore()
      .collection('Student')
      .doc(studentID)
      .onSnapshot(snapshot => {
        setStudentUsername(snapshot.data().Username);
        setIsValidPasscode(snapshot.data().Passcode);
        setStudnetSnapShot(snapshot);
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
    let isCancelled = true;
    let unmounted = false;
    if (type == 'class') {
      if (passcodeVal.length == 6) {
        firestore()
          .collection('ClassCommunity')
          .where('Passcode', '==', passcodeVal)
          .onSnapshot(snapshot => {
            if (snapshot.size != 0) {
              snapshot.forEach(documentSnapshot => {
                firestore()
                  .collection('ClassCommunity')
                  .doc(documentSnapshot.id)
                  .onSnapshot(insidesnapshot => {
                    if (insidesnapshot.get('StudentList') != null) {
                      if (
                        !insidesnapshot
                          .data()
                          .StudentList.includes(StudentUsername)
                      ) {
                        console.log('student added');
                        insidesnapshot.ref
                          .update({
                            StudentList:
                              firestore.FieldValue.arrayUnion(StudentUsername),
                          })
                          .then(() => {
                            setModalVisible(!modalVisible);
                            setPasscodeval('');
                            return () => {
                              unmounted = true;
                            };
                          });

                        isCancelled = false;
                      } else {
                        if (isCancelled) {
                          console.log('student exists');
                          setPasscodeval('');
                          setErrorMessage('لقد سبق لك التسجيل في هذا الفصل');
                          setErrormodalVisible(!ErrormodalVisible);
                          return () => {
                            unmounted = true;
                          };
                        }
                      }
                    } else {
                      insidesnapshot.ref
                        .update({
                          StudentList:
                            firestore.FieldValue.arrayUnion(StudentUsername),
                        })
                        .then(() => {
                          setModalVisible(!modalVisible);
                          setPasscodeval('');
                          return;
                        });
                    }
                  });
              });
            } else {
              setErrorMessage('رمز الدخول غير صحيح، حاول مره اخرى');
              setErrormodalVisible(!ErrormodalVisible);
            }
          });
      }
    } else {
      if (passcodeVal.length == 6 && isValidPasscode == passcodeVal) {
        console.log('VALID');
        setModalVisible(!modalVisible);
        setPasscodeval('');
        setStudent(studentSnapShot);
        navigation.reset({
          index: 0,
          routes: [{name: 'StudentTab'}],
        })
        return;
      } else if (passcodeVal.length == 6 && isValidPasscode != passcodeVal) {
        console.log('INVALID');
        setErrorMessage('رمز الدخول غير صحيح، حاول مره اخرى');
        setErrormodalVisible(!ErrormodalVisible);
      }
    }
    isCancelled = true;
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
          message={ErrorMessage}
          modalVisible={ErrormodalVisible}
          setModalVisible={setErrormodalVisible}
        />
      </Modal>
    </View>
  );
};

export default AccessModel;
