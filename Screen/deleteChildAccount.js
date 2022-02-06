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
import SuccessModel from '../Components/SuccessModel';
import ErrorModel from '../Components/ErrorModel';
import auth from '@react-native-firebase/auth';

const deleteChildAccount = () => {
  //const user = AfaadFirebase.auth().currentUser ;

  //child id

  //Success modal **should be moved to the child list file**
  const [modalVisible, setModalVisible] = useState(false);

  // Error model **should be moved to the child list file**
  const [ErrormodalVisible, setErrormodalVisible] = useState(false);

  const [ErrorMessage, setErrorMessage] = useState('');


const submit = () => {
  firestore()
  .collection('Student')
  .doc('nc48YeOIYKo79KIw5vZH') // it's should be replaced with the child id params
  .delete()
  .then(() => {
    setModalVisible(!modalVisible)
  });
  };

  return (
    <View>
      <SuccessModel
        message={'تم حذف الطفل بنجاح'}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ErrorModel
        message={ErrorMessage}
        modalVisible={ErrormodalVisible}
        setModalVisible={setErrormodalVisible}
      />     
    </View>
  );
};

export default deleteChildAccount;
