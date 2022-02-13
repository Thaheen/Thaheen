import React, {useState, useEffect} from 'react';
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
  PermissionsAndroid,
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
import storage from '@react-native-firebase/storage';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import Microphone from '../assets/images/Microphone.svg';
import RecordingMicrophone from '../assets/images/RecordingMicrophone.svg';
//the ref of record voice code
// https://instamobile.io/react-native-tutorials/react-native-record-audio-play/?ref=hackernoon.com
class RecordVoice extends Component {


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
      modalVisible: false,
      record: '',
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }

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
    this.state.modalVisible = !this.state.modalVisible;
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
    this.state.modalVisible = !this.state.modalVisible;
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);

    this.record = result;
  };

  onStartPlay = async e => {
    console.log('onStartPlay');
    const path = Platform.OS === 'android' ? null : 'hello.m4a';
    const msg = await this.audioRecorderPlayer.startPlayer(path);
    this.audioRecorderPlayer.setVolume(1.0);
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener(e => {
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

  uploadAudio = async () => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          try {
            resolve(xhr.response);
          } catch (error) {
            console.log('error:', error);
          }
        };
        xhr.onerror = e => {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', this.record, true);
        xhr.send(null);
      });
      if (blob != null) {
        console.log('the bloob ' + blob);

        // const uriParts = this.record.split(".");
        // const fileType = uriParts[uriParts.length - 1];
        var storageRef = storage().ref();
        storageRef
          .child('records/helloModhi2.m4a')
          .putFile(this.record)
          .then(() => {
            console.log('Sent!');
          })
          .catch(e => console.log('error:', e));
      } else {
        console.log('erroor with blob');
      }
    } catch (error) {
      console.log('error:', error);
    }
  };

  retrieveRecord = async () => {
    console.log('onStartPlay');
    storage()
      .ref('records/helloModhi2.m4a') //name in storage in firebase console
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
          this.setState({
            currentPositionSec: e.current_position,
            currentDurationSec: e.duration,
            playTime: this.audioRecorderPlayer.mmssss(
              Math.floor(e.current_position),
            ),
            duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          });
        });
      })
      .catch(e => console.log('Errors while downloading => ', e));
  };

  render() {
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

          <TouchableOpacity
            style={[
              {
                marginBottom: 20,
                marginTop: 20,
                width: '50%',
                alignItems: 'center',
              },
            ]}
            onPress={() => this.onStartRecord()}>
            <Microphone width={30} height={30} />
            <Text style={[TitleStyles.subTitle]}>تسجيل الصوت</Text>
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}>
            <View
              style={{
                backgroundColor: 'rgba(52, 52, 52, 0.5)',
                height: '100%',
              }}>
              <View style={[TitleStyles.modalContent, {alignItems: 'center'}]}>
                <RecordingMicrophone
                  width={120}
                  height={120}
                  style={{marginTop: -71}}
                />
                <Text
                  style={[
                    TitleStyles.subTitle,
                    {textAlign: 'center', fontWeight: 'bold'},
                  ]}>
                  يتم التسجيل الان...
                </Text>

                <TouchableOpacity
                  style={[
                    TitleStyles.AlertButton,
                    {backgroundColor: '#DAE2E9', width: '50%'},
                  ]}
                  onPress={() => this.onStopRecord()}>
                  <Text style={TitleStyles.ButtonText}>ايقاف </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={[
              TitleStyles.Button,
              TitleStyles.shadowOffset,
              {marginBottom: 20, marginTop: 20, width: '50%'},
            ]}
            onPress={() => this.onStartPlay()}>
            <Text style={TitleStyles.ButtonText}>تشغيل </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              TitleStyles.Button,
              TitleStyles.shadowOffset,
              {marginBottom: 20, marginTop: 20, width: '50%'},
            ]}
            onPress={() => this.retrieveRecord()}>
            <Text style={TitleStyles.ButtonText}>rerteive </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              TitleStyles.Button,
              TitleStyles.shadowOffset,
              {marginBottom: 20, marginTop: 20, width: '50%'},
            ]}
            onPress={() => this.uploadAudio()}>
            <Text style={TitleStyles.ButtonText}>إضافـــــة </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}

export default RecordVoice;
