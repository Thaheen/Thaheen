import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  I18nManager,
  VirtualizedList,
  useRef,
} from 'react-native';
import {FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../Components/BackButton.js';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout';
import WhiteCurve from '../assets/images/WhiteCurve.svg';
import ThaheenStanding from '../assets/images/ThaheenStanding';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SwipeArrow from '../assets/images/SwipeArrow.svg';
import Creds from '../auth/thaheen-af3bc-7e4c624cf1aa.json';
import StartMicrophone from '../assets/images/StartMicrophone.svg';
import StopMicrophone from '../assets/images/StopMicrophone.svg';
import Thaheen from '../assets/images/ThaheenStanding.svg';
import SpeechBubble from '../assets/images/SpeechBubble.svg';
import ob from './OpenMicrophone.js';
import functions, {firebase} from '@react-native-firebase/functions';
import ColoredText from '../Components/ColoredText.js';
import Loader from 'react-native-modal-loader';
import ErrorModel from '../Components/ErrorModel';

const Chunking = ({navigation, route}) => {
  // Error model
  const [ErrormodalVisible, setErrormodalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [textBody, setTextBody] = useState('');
  const [myArray, updateMyArray] = useState([]);

   var chunk=[];
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(0);
  const [chunkCounter, setChunkCounter] = useState(1);

  const [onePass, setOnePass] = useState(0);
  const [doneRecite, setDoneRecite] = useState(false);
  const [coloredWords, setColoredWords] = useState([]);
  const [numOfmistakes, setnumOfmistakes] = useState();
  const [loading, setLoading] = useState(false);
var taggedWords=[];
 const [ FinalResult,setFinalResult] = useState([]);
  const [DownLoadURI, setDownLoadURI] = useState('');
  const [IsRecording, setIsRecording] = useState(false);
  const [dialog, setDialog] = useState('إضغط زر المايكروفون لنبدأ');
  const [recordID, setRecordId] = useState();

  if (onePass == 0) {
    setRecordId(Math.floor(100000 + Math.random() * 90000).toString());
    setOnePass(1);
  }

  // retrive the text
  useEffect(() => {
    const MemorizationText = firestore()
      .collection('Student Text')
      .doc(route.params.TextID)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setTextBody(snapshot.data().TextBody);
        } else {
          firestore()
            .collection('Instructor Text')
            .doc(route.params.TextID)
            .onSnapshot(Qsnapshot => {
              console.log('in instructor text');
              setTextBody(Qsnapshot.data().TextBody);
            });
        }
      });

    return MemorizationText;
  }, []);

  if (textBody.indexOf('،') || textBody.indexOf(',') > -1) {
    var FullText = textBody.split('،');
  }

  var cont = 0;
  ShowMoreChuncks = () => {
    if (counter <= FullText.length - 1) {
      console.log(' before the counts :' + counter);
      updateMyArray(arr => [...arr, FullText[counter]]);
      setCounter(counter => counter + 1);
      chunk = FullText[counter].split(" ")
      console.log('-----------------------------');
      console.log('chucnk :' + chunk.length);
      console.log(' After the counts :' + cont);
    } else {
    }
  };

  const newTextTag = myArray.map(type => (
    <Text style={[TitleStyles.smallText, {textAlign: 'center', marginTop: 20}]}>
      {type}
    </Text>
  ));

  ////////// Mic //////////

  const finishRecord = async () => {
    setIsRecording(!IsRecording);

    if (IsRecording) {
      await ob.onStopRecord(recordID, transcriptAudio);
      setLoading(true);
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

      compare(transcription , chunk);
    } catch (error) {
      console.log(error + '<-----here ');

      setErrorMessage('حدث خطأ ما ، الرجاء إعادة المراجعة');
      setErrormodalVisible(!ErrormodalVisible);
      setLoading(false);
    }

    setLoading(false);
  };

  const compare = ({transcription,textBody}) => {
    var counter = 0;
    // from google >> transcription
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
   setFinalResult(arr => [...arr, taggedWords[i]]);
    }
    setDoneRecite(true);
    setColoredWords(taggedWords);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DAE2E9',
      }}>

      <Text style={[TitleStyles.sectionTitle, {marginTop: 30}]}>
        هيا لنبدأ المراجعة
      </Text>
      <BackButton />
      <View style={[TitleStyles.MemorizationContainer]}>
        <Text
          style={[TitleStyles.sectionTitle, {marginTop: 20, fontSize: 20}]}
          onPress={ShowMoreChuncks}>
          اظهار المزيد من النص
        </Text>

        <>{newTextTag}</>

   {/* <FlatList
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
            data={FinalResult}
            numColumns={5}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <ColoredText word={item.Text} color={item.color} />
            )}
          /> */}

      </View>

      <View style={{marginTop: 310}}>
        <WhiteCurve />
      </View>

      <ThaheenStanding
        style={[{position: 'absolute', bottom: 50, right: -20}]}
        width={170}
        height={170}
      />
      <Loader loading={loading} color="#F5C5AD" />
      <ErrorModel
        message={ErrorMessage}
        modalVisible={ErrormodalVisible}
        setModalVisible={setErrormodalVisible}
      />
      <View
        style={{
         
    zIndex:3,
    position:"absolute",
    top:580,
    left:140

        }}>
    
        {IsRecording ? (
          <TouchableOpacity onPress={() => finishRecord()}>
            <StopMicrophone height={100} />
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

export default Chunking;
