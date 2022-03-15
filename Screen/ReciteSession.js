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
import ob from './OpenMicrophone.js';
import functions , {firebase} from '@react-native-firebase/functions'

const ReciteSession = ({navigation, route}) => {
  functions().useFunctionsEmulator('http://localhost:5001');
  const [DownLoadURI, setDownLoadURI] = useState('');
  const [IsRecording, setIsRecording] = useState(false);
  const [BodyText, setBodyText] = useState('إضغط زر المايكروفون لنبدأ');
  const [recordID, setRecordId] = useState()
  const [onePass, setOnePass] = useState(0);

  if (onePass == 0) {
    setRecordId(Math.floor(100000 + Math.random() * 90000).toString());
    setOnePass(1);
  }


  const finishRecord = () => {
    console.log('before: ' + IsRecording);
    setIsRecording(!IsRecording);

    if (IsRecording) {
      console.log('stopped rec ')
      // ob.onStopRecord(recordID)
      // //====================== TEMP FIX, change timeout later ====================
      // setTimeout(() => {
      // transcriptAudio()
      // }, 3000);
    } else {
    console.log('he is recording');
    const { data } =  firebase.functions().httpsCallable('micrecognizeStream')();
    
    //ob.onStartRecord( Math.floor(100000 + Math.random() * 90000));
    
    }
  };

  const transcriptAudio = async () => {
    console.log("=============REC ID=============")
    console.log(recordID)
    try {
      // setDownLoadURI(
      //   await storage()
      //     .ref('records/helloModhi.m4a') //name in storage in firebase console
      //     .getDownloadURL(),
      // );
      //console.log('in google ' + DownLoadURI);

      let body = JSON.stringify({
        config: {
          encoding: 'FLAC',
          sampleRateHertz: 44100,
          languageCode: 'ar-SA',
          audio_channel_count: 2,
        },
        audio: {
          // audio is "how old is the Brooklyn Bridge"
          uri: 'gs://thaheen-af3bc.appspot.com/ReciteSession/'+recordID+'.flac',
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
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BackButton />
        <SpeechBubble
          style={
            (TitleStyles.SoftShadow,
            [
              {
                top: 80,
              },
            ])
          }
        />
        <Text style={[TitleStyles.smallText, {fontSize: 25, top: -110}]}>
          {BodyText}
        </Text>
      </View>

      <ReciteRectangle
        style={{
          position: 'absolute',
          top: 290,
        }}
      />
      <Thaheen
        height={200}
        style={{
          right: -130,
          top: 320,
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
    </SafeAreaView>
  );
};
export default ReciteSession;
