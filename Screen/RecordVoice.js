import React, {useState} from 'react';
import type {Node} from 'react';
import {Component} from 'react';
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
import AudioRecorderPlayer, { 
 AVEncoderAudioQualityIOSType,
 AVEncodingOption, 
 AudioEncoderAndroidType,
 AudioSet,
 AudioSourceAndroidType, 
} from 'react-native-audio-recorder-player';

class RecordVoice extends Component {
  
//const [Title, setTitle] = useState('');
//const [HomeWork, setHomeWork] = useState('');

  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }

   onStartRecord = async () => {
    
    const path = 'hello.m4a';
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      });
    });
    console.log(`uri: ${uri}`);
  };

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };

  onStartPlay = async (e) => {
    console.log('onStartPlay');
    const path = 'Desktop/hello.m4a'
    const msg = await this.audioRecorderPlayer.startPlayer(path);
    this.audioRecorderPlayer.setVolume(1.0);
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };
  render(){
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
          //value={Title}
          underlineColorAndroid="transparent"
          color="black"
        />

        <TextInput
          placeholder="أدخل عنوان النص "
          placeholderTextColor={'#C3C7CA'}
          style={TitleStyles.TextArea}
          onChangeText={text => setHomeWork(text)}
         // value={HomeWork}
          underlineColorAndroid="transparent"
          color="black"
        />

        <Text>{this.state.recordTime}</Text>
        <TouchableOpacity
          style={[
            TitleStyles.Button,
            TitleStyles.shadowOffset,
            {marginBottom: 20, marginTop: 20, width: '50%'},
          ]}
          onPress={() =>  this.onStartRecord()}
          >
          <Text style={TitleStyles.ButtonText}>تسجيل </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            TitleStyles.Button,
            TitleStyles.shadowOffset,
            {marginBottom: 20, marginTop: 20, width: '50%'},
          ]}
          onPress={() =>  this.onStopRecord()}
          >
          <Text style={TitleStyles.ButtonText}>ايقاف </Text>
        </TouchableOpacity>

<Text>{this.state.playTime}</Text>
        <TouchableOpacity
          style={[
            TitleStyles.Button,
            TitleStyles.shadowOffset,
            {marginBottom: 20, marginTop: 20, width: '50%'},
          ]}
          onPress={() =>  this.onStartPlay()}
          >
          <Text style={TitleStyles.ButtonText}>تشغيل </Text>
        </TouchableOpacity>

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
  }
};

export default RecordVoice;