import React, {useState, useEffect} from 'react';
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
  I18nManager,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout';
import Top2Lines from '../assets/images/top2Lines.svg';
import TopBox from '../assets/images/TopBox.svg';
import AnimalPicker from '../Screen/AnimalPicker.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import BackButton from '../Components/BackButton.js';
import {UserInfoContext} from '../auth/UserInfoContext';
import storage from '@react-native-firebase/storage';

const ReciteSession = ({navigation, route}) => {
  const [DownLoadURI, setDownLoadURI] = useState('');
  const submitToGoogle = async () => {
    try {
      setDownLoadURI(
        await storage()
          .ref('records/helloModhi.m4a') //name in storage in firebase console
          .getDownloadURL(),
      );

      console.log('in google ' + DownLoadURI);

      let body = JSON.stringify({
        config: {
          languageCode: 'ar-SA',
          alternativeLanguageCodes: ['en-US'],
        },
        audio: {
          uri: 'gs://thaheen-af3bc.appspot.com/records/helloModhi.m4a',
        },
      });

      let response = await fetch(
        'https://speech.googleapis.com/v1/speech:recognize?key=' +
          'AIzaSyAHRHxTUVdJSjWg6rflJXNWNR1jhhZoGn0',
        {
          headers: {
            Authorization:"Bearer ya29.A0ARrdaM8rvnhkS4IeSr7lDkPp2VqDerKXlco9_Kz71SPVAffAGqGam9KRXAD-h0BftWeddU7j4PAX0kgfqjceBppDEJL8TnbrKIZB2dk19FINe1a9-zo3v-BZx3UuFp6iYql95lveKOrrY--NZIXx2BSWk5bg",
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        },
      );
      let responseJson = await response.json();

      JSON.stringify(responseJson);

      console.log(responseJson);
    } catch (error) {
      console.log(error + '<-----here ');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        ...(Platform.OS === 'android' ? {paddingTop: 20} : null),
      }}>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 25,
            paddingHorizontal: 12,
          }}
          onPress={() => {
            submitToGoogle();
          }}>
          <Text style={TitleStyles.smallText}>ابدأ التسميع</Text>
        </TouchableOpacity>
      </View>

      {/* end bottom container */}

      {/* <BottomBar /> */}
    </SafeAreaView>
  );
};
export default ReciteSession;
