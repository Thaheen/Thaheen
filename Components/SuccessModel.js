import React , { useState }  from 'react';
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
  TouchableOpacity
} from 'react-native';

import TitleStyles from '../Styles/Titles'
import firestore from '@react-native-firebase/firestore';
import { SvgUri } from 'react-native-svg';
import  CheckVector  from '../assets/images/CheckVector.svg'


const SuccessModel = ({message, modalVisible, setModalVisible}) =>  {
    //Success modal 
  return (
    <View >
           <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
            >
              <View style={{backgroundColor:'rgba(52, 52, 52, 0.5)', height: '100%' }}>
                <View style={TitleStyles.modalContent}>
                <CheckVector width={120} height={120} style={{marginLeft:80 , marginTop:-75}} />
                    <Text style={[TitleStyles.subTitle , {textAlign:'center' , fontWeight:'bold'}]}>{message}</Text>
                     <TouchableOpacity
                        style={[TitleStyles.Button , TitleStyles.shadowOffset,{backgroundColor:'#DAE2E9'}]}
                         onPress={() => setModalVisible(!modalVisible)} >
                        <Text  style={TitleStyles.ButtonText} >حسنا </Text>
                      </TouchableOpacity>

                </View>
              </View>
              
            </Modal>
    </View>
  );
};



export default SuccessModel;
