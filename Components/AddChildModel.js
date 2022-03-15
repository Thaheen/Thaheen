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
  I18nManager,
} from 'react-native';

import TitleStyles from '../Styles/Titles';
import firestore from '@react-native-firebase/firestore';
import {SvgUri} from 'react-native-svg';
import IDVector from '../assets/images/IDVector.svg';
import ErrorModel from '../Components/ErrorModel';
import SuccessModel from '../Components/SuccessModel';

const ConfirmModel = ({modalVisible, setModalVisible, sentFunction}) => {
  const [ChildAccount, setChildAccount] = useState('');

  // Success Model
  const [SuccessModalVisible, setSuccessModalVisible] = useState(false);

  // Error model
  const [ErrormodalVisible, setErrormodalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');

  const [studentUsername, setstudentUsername] = useState([]);

  const [isFound, setisFound] = useState(false);

  const onValidUsername = val => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(val);
  };

  firestore()
    .collection('Student')
    .where('Username', '==', ChildAccount)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.size == 0) {
        setisFound(false);
      } else setisFound(true);
    });

  const submit = () => {
    if (ChildAccount == '') {
      setErrorMessage('الرجاء اضافة اسم مستخدم');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    if (onValidUsername(ChildAccount) == false) {
      setErrorMessage(
        'حقل "اسم المستخدم" يجب ان يحتوي على حروف انجليزية و ارقام فقط',
      );
      setErrormodalVisible(!ErrormodalVisible);
      setChildAccount('');
      return;
    }

    if (studentUsername.includes(ChildAccount)) {
      setErrorMessage('تم تسجيل اسم الطالب مسبقا');
      setErrormodalVisible(!ErrormodalVisible);
      setChildAccount('');
      return;
    }

    if (isFound == false) {
      setErrorMessage('اسم المستخدم غير موجود');
      setErrormodalVisible(!ErrormodalVisible);
      setChildAccount('');
      return;
    }

    studentUsername.push(ChildAccount);
    setSuccessModalVisible(!SuccessModalVisible);
    setChildAccount('');
    console.log(studentUsername);
  };

  const Close = () => {
    setModalVisible(!modalVisible);
    sentFunction(studentUsername);
    setChildAccount('');
    setstudentUsername([]);
  };

  //Success modal
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            backgroundColor: 'rgba(52, 52, 52, 0.5)',
            height: '100%',
          }}>
          <View style={TitleStyles.modalContent}>
            <IDVector
              width={90}
              height={90}
              style={{marginLeft: 95, marginTop: -75}}
            />
            <View style={[TitleStyles.shadowOffset, {marginTop: 30}]}>
              <TextInput
                placeholder="  @ اسم المستخدم "
                placeholderTextColor={'#C3C7CA'}
                style={[
                  Platform.OS === 'android' ? TitleStyles.shadowOffset : null,
                  TitleStyles.input,
                  {shadowColor: '#000'},
                ]}
                onChangeText={text => setChildAccount(text)}
                value={ChildAccount}
                underlineColorAndroid="transparent"
                color="black"
              />
            </View>
            <View
              style={{
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#DAE2E9',
                borderRadius: 50,
                marginTop: 50,
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
                onPress={() => Close()}>
                <Text style={TitleStyles.ButtonText}>إغلاق </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[{width: '50%', borderRadius: 25}]}
                onPress={() => submit()}>
                <Text style={TitleStyles.ButtonText}>اضافة </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ErrorModel
          message={ErrorMessage}
          modalVisible={ErrormodalVisible}
          setModalVisible={setErrormodalVisible}
        />

        <SuccessModel
          message={'تم تسجيل الطالب بنجاح'}
          modalVisible={SuccessModalVisible}
          setModalVisible={setSuccessModalVisible}
        />
      </Modal>
    </View>
  );
};

export default ConfirmModel;
