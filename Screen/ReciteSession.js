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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import BackButton from '../Components/BackButton.js';
import ReciteRectangle from '../assets/images/ReciteRectangle.svg';
import {UserInfoContext} from '../auth/UserInfoContext';
import storage from '@react-native-firebase/storage';
import Creds from '../auth/thaheen-af3bc-7e4c624cf1aa.json';
import StartMicrophone from '../assets/images/StartMicrophone.svg';
import StopMicrophone from '../assets/images/StopMicrophone.svg';
import Thaheen from '../assets/images/ThaheenStanding.svg';
import SpeechBubble from '../assets/images/SpeechBubble.svg';

const ReciteSession = ({navigation, route}) => {
  const [DownLoadURI, setDownLoadURI] = useState('');

  const [IsRecording, setIsRecording] = useState(false);

  const finishRecord = () => {
    setIsRecording(!IsRecording);
    if (IsRecording) {
      transcriptAudio();
    }
  };

  const transcriptAudio = async () => {
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
            Authorization: Creds,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        },
      );
      let responseJson = await response.json();

      console.log(responseJson);

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
        backgroundColor: '#DAE2E9',
        ...(Platform.OS === 'android' ? {paddingTop: 20} : null),
      }}>
      <BackButton />
      <View>
        <SpeechBubble
          style={
            (TitleStyles.shadowOffset,
            [
              {
                position: 'absolute',
                top: 50,
              },
            ])
          }
        />

        <ReciteRectangle
          style={{
            position: 'absolute',
            top: 250,
          }}
        />
        <Thaheen
          height={200}
          style={{
            right: -130,
            top: 350,
          }}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            top: 400,
          }}>
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#DAE2E9',
              width: 390,
              height: 100,
              top: 50,
            }}></View>
          <TouchableOpacity onPress={() => finishRecord()}>
            {IsRecording ? (
              <StopMicrophone height={100} />
            ) : (
              <StartMicrophone height={100} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ReciteSession;
