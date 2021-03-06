import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  useColorScheme,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {utils} from '@react-native-firebase/app';
import {UserInfoContext} from '../auth/UserInfoContext';
import {useNavigation} from '@react-navigation/native';
import storage, { firebase } from '@react-native-firebase/storage';
import { FFmpegKit } from 'ffmpeg-kit-react-native';


import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVModeIOSOption
} from 'react-native-audio-recorder-player';

import Microphone from '../assets/images/Microphone.svg';

//the ref of record voice code
// https://instamobile.io/react-native-tutorials/react-native-record-audio-play/?ref=hackernoon.com
class OpenMicrophone extends Component {
    // const navigation = useNavigation();
  constructor(props) {
    super(props);
    this.state = {
      recordSecs: 0,
      recordTime:'00:00:00',
      record: '',
      RecFlag: false,
      recID:'',
      
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }

  //contain a uri
  onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    // this.state.modalVisible = !this.state.modalVisible;
    const path = Platform.OS === 'android' ? null : 'hello.m4a';
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioRecorderPlayer.addRecordBackListener(e => {
    });
    console.log(`uri: ${uri}`);
  };

  onStopRecord = async (recordID , transcriptAudio) => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    const defaultStorageBucket = storage();
    const storageRef = firebase.app().storage().ref();
    

    this.audioRecorderPlayer.removeRecordBackListener();
    this.record = result;
  
    console.log(this.record)

    let Flacpath= this.record.split("hello.m4a")
    FlacpathString= Flacpath[0]+Math.floor(100000 + Math.random() * 90000).toString()+'output.flac'

     FFmpegKit.execute('-i '+this.record+' -f flac '+FlacpathString).then(async (session) => {
      storageRef
      .child( 'ReciteSession/'+recordID+ '.flac')
        .putFile(FlacpathString)
        .then(() => {
          console.log('Record Sent !!!!!!');
          transcriptAudio()
        })
        .catch(e => console.log('error:', e));

    });
    this.RecFlag = true;
    
  };

 uploadAudio = async (rec) => {
        // const uriParts = this.record.split(".");
        // const fileType = uriParts[uriParts.length - 1];

        const defaultStorageBucket = storage();
        const storageRef = firebase.app().storage('gs://thaheen-recite.appspot.com').ref();

        const random = Math.floor(100000 + Math.random() * 90000);
        
        console.log(rec)
        console.log("=============UPLOAD=============")

        storageRef
          .child( 'records/'+ random + '.flac')
          .putFile(rec)
          .then(() => {
            console.log('Sent!!!!!!!!');
          })
          .catch(e => console.log('error:', e));

  };
retrieveRecord = async (title) => {
    console.log('onStartPlay');
    storage()
      .ref('records/' + title + '.m4a') //name in storage in firebase console
      .getDownloadURL()
      .then(url => {
        const msg = this.audioRecorderPlayer.startPlayer(url);
        this.audioRecorderPlayer.setVolume(1.0);
        console.log(msg);
        this.audioRecorderPlayer.addPlayBackListener(e => {
          if (e.current_position === e.duration) {
            console.log('finished');
            this.audioRecorderPlayer.stopPlayer();
          }      
        });
      })
      .catch(e => console.log('Errors while downloading => ', e));
  };
  
}

const ob = new OpenMicrophone();

export default ob;
