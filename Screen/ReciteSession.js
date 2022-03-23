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
  FlatList,
  I18nManager,
  Platform,
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
import functions, {firebase} from '@react-native-firebase/functions';
import ColoredText from '../Components/ColoredText.js';

const ReciteSession = ({navigation, route}) => {
  // functions().useFunctionsEmulator('http://localhost:5001');
  const [DownLoadURI, setDownLoadURI] = useState('');
  const [IsRecording, setIsRecording] = useState(false);
  const [dialog, setDialog] = useState('إضغط زر المايكروفون لنبدأ');
  const [recordID, setRecordId] = useState();
  const [textBody, setTextBody] = useState();
  const [textHead, setTextHead] = useState();
  const [onePass, setOnePass] = useState(0);
  const [doneRecite, setDoneRecite] = useState(false);
  const textID = route.params.TextID;
  const [coloredWords, setColoredWords] = useState([]);
  const [numOfmistakes, setnumOfmistakes] = useState();
  const taggedWords = [];

  //gives random ID to the records
  if (onePass == 0) {
    setRecordId(Math.floor(100000 + Math.random() * 90000).toString());
    setOnePass(1);
  }

  useEffect(() => {
    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener('focus', () => {
      setDoneRecite(false);
    });
    return () => unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const Text = firestore()
      .collection('Student Text')
      .doc(route.params.TextID)
      .onSnapshot(querySnapshot => {
        setTextBody(
          querySnapshot.data().TextBody.replace(/إ|أ|آ/g, 'ا').split(' '),
        );
        setTextHead(querySnapshot.data().TextHead);
      });
    return Text;
  }, []);

  const finishRecord = async () => {
    setIsRecording(!IsRecording);

    if (IsRecording) {
      await ob.onStopRecord(recordID);
      //====================== TEMP FIX, change timeout later ====================
      setTimeout(() => {
        transcriptAudio();
      }, 3000);
    } else {
      //const { data } =  firebase.functions().httpsCallable('micrecognizeStream')();

      ob.onStartRecord(Math.floor(100000 + Math.random() * 90000));
    }
  };

  const transcriptAudio = async () => {
    console.log('REC ID: ' + recordID);
    try {
      let body = JSON.stringify({
        config: {
          encoding: 'FLAC',
          sampleRateHertz: Platform.OS === 'ios' ? 44100 : 48000,
          languageCode: 'ar-SA',
          audio_channel_count: Platform.OS === 'ios' ? 2 : 1,
        },
        audio: {
          // audio is "how old is the Brooklyn Bridge"
          uri:
            'gs://thaheen-af3bc.appspot.com/ReciteSession/' +
            recordID +
            '.flac',
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

      compare(transcription);
    } catch (error) {
      console.log(error + '<-----here ');
    }
  };

  const compare = transcription => {
    var counter = 0;
    const transcriptArray = transcription.split(' ');

    console.log('Before loop ==', textBody);
    for (let i = 0, j = 0; i < textBody.length; i++, j++) {
      taggedWords.push({
        Text: textBody[i],
        color: 'Black',
      });

      console.log('The word ' + transcriptArray[i]);

      if (textBody.length - 1 == i && !(transcriptArray[j] == textBody[i])) {
        console.log('inside first condition ' + i);

        taggedWords.pop();
        taggedWords.push({
          Text: textBody[i],
          color: 'Red',
        });
        ++counter;
      } else {
        if (transcriptArray[j] !== textBody[i]) {
          if (transcriptArray[j] !== textBody[i + 1]) {
            console.log(
              'Text Body word : ' +
                textBody[i] +
                ' Text Body Next Word ' +
                textBody[i + 1] +
                ' transcript word ' +
                transcriptArray[i] +
                ' iteration ' +
                i,
            );
            taggedWords.pop();
            taggedWords.push({
              Text: textBody[i],
              color: 'Red',
            });
            ++counter;
          } // end small if
          else {
            taggedWords.pop();
            taggedWords.push({
              Text: textBody[i],
              color: 'Red',
            });
            ++counter;
            taggedWords.push({
              Text: textBody[++i],
              color: 'Black',
            });
          } // end else
        } // large if
      } // end else
    }
    setDoneRecite(true);
    setnumOfmistakes(counter);
    setColoredWords(taggedWords);

  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DAE2E9',
        ...(Platform.OS === 'android' ? {paddingTop: 20} : null),
      }}>
      <StatusBar translucent backgroundColor="#DAE2E9" />
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
        {!doneRecite ? (
          <Text style={[TitleStyles.smallText, {fontSize: 25, top: -110}]}>
            {dialog}
          </Text>
        ) : null}

        {doneRecite ? (
          <FlatList
            style={[
              {
                padding: 10,
                height: '100%',
                marginLeft: 25,
                flex: 1,
                top: -210,
                textAlign: 'center',
              },
            ]}
            data={coloredWords}
            numColumns={5}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <ColoredText word={item.Text} color={item.color} />
            )}
          />
        ) : null}
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

        {IsRecording ? (
          <TouchableOpacity onPress={() => finishRecord()}>
            <StopMicrophone height={100} />
          </TouchableOpacity>
        ) : doneRecite ? (
          <TouchableOpacity
            style={[
              TitleStyles.Button,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#F5C5AD',
                alignSelf: 'center',
                width: 200,
                borderRadius:30,
              },
            ]}
            onPress={() => navigation.navigate('Feedback', {
              textID: route.params.TextID,
              totalWords: textBody.length,
              mistakesNum: numOfmistakes,
            })} >
            <Text style={TitleStyles.ButtonText}>استعراض النتيجة</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => finishRecord()}>
            <StartMicrophone height={100} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
export default ReciteSession;
