import React, {useState} from 'react';
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
  Alert,
  Platform,
  I18nManager,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout';
import Top2Lines from '../assets/images/top2Lines.svg';
import Bottom2Lines from '../assets/images/bottom2Lines.svg';
import Envelope from '../assets/images/Envelope.svg';
import BackButton from '../Components//BackButton.js';
import auth from '@react-native-firebase/auth';
import ErrorModel from '../Components/ErrorModel';
import SuccessModel from '../Components/SuccessModel';
import firestore from '@react-native-firebase/firestore';
import {UserInfoContext} from '../auth/UserInfoContext';

const ResetPasscode = ({navigation, route}) => {
  const [NewPasscode, setNewPasscode] = useState('');
  const {student} = React.useContext(UserInfoContext);
  //Success modal
  const [modalVisible, setModalVisible] = useState(false);

  // Error model
  const [ErrormodalVisible, setErrormodalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');

  const IsValidPasscode = val => {
    const RegxPass = /^[0-9]*$/;
    return RegxPass.test(val);
  };

  const resetPasscode = () => {
    // Checking for empty fields
    if (NewPasscode == '') {
      setErrorMessage(' حقل رمز الدخول مطلوب');
      setErrormodalVisible(!ErrormodalVisible);
      return;
    }

    if (NewPasscode != '') {
      /* if (ChildPasscode !== repeatChildPasscode) {
        setErrorMessage('.رمز الدخول وتأكيد رمز الدخول يجب أن تتطابق');
        setErrormodalVisible(!ErrormodalVisible);
        return;
      }*/

      if (NewPasscode.length != 6) {
        setErrorMessage('رمز الدخول يجب ان يكون مكون من ٦ ارقام فقط');
        setErrormodalVisible(!ErrormodalVisible);
        return;
      }

      if (IsValidPasscode(NewPasscode) == false) {
        setErrorMessage('رمز الدخول يجب ان يكون مكون من ارقام انجليزية فقط');
        setErrormodalVisible(!ErrormodalVisible);

        return;
      }
      firestore()
        .collection('Student')
        .doc(student ? student.id : route.params.studentID)
        .update({
          Passcode: NewPasscode,
        });

      setModalVisible(!modalVisible);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DAE2E9',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <BackButton />

      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
        ]}
      />

      <SuccessModel
        message={'تم إعادة تعيين رمز الدخول بنجاح'}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <ErrorModel
        message={ErrorMessage}
        modalVisible={ErrormodalVisible}
        setModalVisible={setErrormodalVisible}
      />

      <Bottom2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL
            ? RTLlayout.Bottom2LinesAR
            : RTLlayout.Bottom2LinesEN,
        ]}
      />
      <StatusBar />

      <View
        style={{
          marginLeft: 20,
          alignSelf: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
          borderRadius: 25,
          padding: 25,
          width: '90%',
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
            fontSize: 30,
            color: '#43515F',
            textAlign: 'center',
          }}>
          إعادة تعيين رمز الدخول
        </Text>
        <View style={Platform.OS === 'ios' ? TitleStyles.shadowOffset : null}>
          <TextInput
            placeholder="رمز الدخول "
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
            onChangeText={text => setNewPasscode(text)}
            value={NewPasscode}
            underlineColorAndroid="transparent"
            // textContentType="emailAddress"
            clearButtonMode="while-editing"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={TitleStyles.Button} onPress={resetPasscode}>
          <Text style={TitleStyles.ButtonText}>إعادة تعيين رمز الدخول</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasscode;
