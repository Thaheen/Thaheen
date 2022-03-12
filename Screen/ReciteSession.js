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
import Creds from '../auth/thaheen-af3bc-7e4c624cf1aa.json'

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
          encoding: 'FLAC',
          sampleRateHertz: 44100,
          languageCode: 'ar-SA',
          audio_channel_count: 2,
        },
        audio: {
          // audio is "how old is the Brooklyn Bridge"
          uri: 'gs://thaheen-recite/salam (1).flac',
        },
      });

      let response = await fetch(
        'https://speech.googleapis.com/v1/speech:recognize?key=' +
          'AIzaSyAHRHxTUVdJSjWg6rflJXNWNR1jhhZoGn0',
        {
          headers: {
            Authorization : Creds ,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        },
      );
      let responseJson = await response.json();

      console.log(responseJson)

      const transcription = responseJson.results
        .map(result => result.alternatives[0].transcript)
          .join('\n');
          console.log(`Transcription: ${transcription}`);
    
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
