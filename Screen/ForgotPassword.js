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
  I18nManager
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout'
import Top2Lines from '../assets/images/top2Lines.svg';
import Bottom2Lines from '../assets/images/bottom2Lines.svg';
import Envelope from '../assets/images/Envelope.svg';
import BackButton from '../Components//BackButton.js';
import auth from '@react-native-firebase/auth';
import ErrorModel from '../Components/ErrorModel';
import SuccessModel from '../Components/SuccessModel';


const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  //Success modal
  const [modalVisible, setModalVisible] = useState(false);

  // Error model
  const [ErrormodalVisible, setErrormodalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');

  const resetPassword = () => {
    if (email !== '') {
      auth()
        .sendPasswordResetEmail(email)

        .then(function () {
          //set the alert modal
          //Check if the email received
          setErrorMessage(
            'تم إرسال رابط إعادة تعيين كلمة المرور، يرجى التحقق من بريدك الإلكتروني',
          );
          setErrormodalVisible(!ErrormodalVisible);
        })

        .catch(function (error) {
          // Error occurred. Inspect error.code.
          if (error.code == 'auth/invalid-email') {
            //set the alert modal
            setErrorMessage('الرجاء إدخال البريد الإلكتروني بالشكل الصحيح');
            setErrormodalVisible(!ErrormodalVisible);
          }

          if (error.code == 'auth/user-not-found') {
            //set the alert modal
            setErrorMessage('لا يوجد مستخدم بهذا البريد الإلكتروني');
            setErrormodalVisible(!ErrormodalVisible);
          }
        });
    } else {
      //set the alert modal
      //if empty
      setErrorMessage('الرجاء تعبئة البريد الإلكتروني');
      setErrormodalVisible(!ErrormodalVisible);
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

<BackButton/>

      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
        ]}
      />

      <SuccessModel
        message={
          'تم إرسال رابط إعادة تعيين كلمة المرور، يرجى التحقق من بريدك الإلكتروني'
        }
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
          I18nManager.isRTL ? RTLlayout.Bottom2LinesAR : RTLlayout.Bottom2LinesEN,
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
        <View style={Platform.OS === 'ios' ? TitleStyles.shadowOffset : null}>
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
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          textContentType="emailAddress"
          clearButtonMode="while-editing"
        />
        </View>

        <TouchableOpacity style={TitleStyles.Button} onPress={resetPassword}>
          <Text style={TitleStyles.ButtonText}>استرجاع</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
