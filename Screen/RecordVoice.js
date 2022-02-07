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
  Platform,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import {SvgUri} from 'react-native-svg';
import BackGround from '../assets/images/BackGround.svg';
import SuccessModel from '../Components/SuccessModel';
import ErrorModel from '../Components/ErrorModel';
import Error from '../Components/ErrorModel';
import Top2Lines from '../assets/images/top2Lines.svg';
import Bottom2Lines from '../assets/images/bottom2Lines.svg';
import BackButton from '../Components/BackButton';

const RecordVoice: () => Node = () => {
  const [Title, setTitle] = useState('');
  const [HomeWork, setHomeWork] = useState('');
  return (
    <View>
      <SafeAreaView
        style={{
          backgroundColor: '#DAE2E9',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BackGround
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 16,
            bottom: 0,
          }}
        />
        <Text style={TitleStyles.ButtonText}>إضافة واجب جديد </Text>

        <TextInput
          placeholder=" عنوان النص "
          placeholderTextColor={'#C3C7CA'}
          style={TitleStyles.Title}
          onChangeText={text => setTitle(text)}
          value={Title}
          underlineColorAndroid="transparent"
          color="black"
        />

        <TextInput
          placeholder="أدخل عنوان النص "
          placeholderTextColor={'#C3C7CA'}
          style={TitleStyles.TextArea}
          onChangeText={text => setHomeWork(text)}
          value={HomeWork}
          underlineColorAndroid="transparent"
          color="black"
        />
        <TouchableOpacity
          style={[
            TitleStyles.Button,
            TitleStyles.shadowOffset,
            {marginBottom: 20, marginTop: 20, width: '50%'},
          ]}
          onPress={() => submit()}>
          <Text style={TitleStyles.ButtonText}>إضافـــــة </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default RecordVoice;
