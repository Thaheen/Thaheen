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
  Button,
  Platform,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import firestore from '@react-native-firebase/firestore';
import {LogBox} from 'react-native';
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
import {utils} from '@react-native-firebase/app';
import {UserInfoContext} from '../auth/UserInfoContext';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import ErrorVector from '../assets/images/ErrorVector.svg';
import CheckVector from '../assets/images/CheckVector.svg';
import SelectDropdown from 'react-native-select-dropdown';
import TheArrow from '../assets/images/TheArrow.svg';
import Deadline from '../assets/images/deadline.svg';
import Loader from 'react-native-modal-loader';
import Close from '../assets/images/Close.svg';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Microphone from '../assets/images/Microphone.svg';
import OldHomeWorks from '../assets/images/OldHomeWorks.svg';
import RecordingMicrophone from '../assets/images/RecordingMicrophone.svg';
import Camera from '../assets/images/Camera.svg';
import quran from '../Components/quran.json';
import DateTimePicker from 'react-native-modal-datetime-picker';

//the ref of record voice code
// https://instamobile.io/react-native-tutorials/react-native-record-audio-play/?ref=hackernoon.com
class RecordVoice extends Component {
  //LogBox.ignoreAllLogs();//Ignore all log notifications
  // const navigation = useNavigation();
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
      ErrormodalVisible: false,
      errorMessage: '',
      record: '',
      setLocalpath: '',
      MideaResponse: '',
      image: null,
      uploading: false,
      googleResponse: null,
      ImageUri: '',
      DownLoadURI: '',
      HomeWork: null,
      Title: null,
      textValue: 'يتم التسجيل الان...',
      responseReceived: false,
      queryText: '',
      RecFlag: false,
      SucessfulModalVisible: false,
      isDateTimePickerVisible: false,
      day: null,
      loading: false,
      Picked: false,
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = date => {
    console.log('A date has been picked: ', date);
    this.setState({day: date});
    this.setState({Picked: true});

    this.hideDateTimePicker();
  };
  //contain a uri
  onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
        } else {
          return;
        }
      } catch (err) {
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
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioRecorderPlayer.addRecordBackListener(e => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      });
    });
  };

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
      RecFlag: true,
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
    var storageRef = storage().ref();
    storageRef
      .child('records/' + this.state.Title + '.m4a')
      .putFile(this.record)
      .then(() => {
        console.log('Sent!');
        console.log('title' + this.state.Title);
      })
      .catch(e => console.log('error:', e));
  };
  retrieveRecord = async () => {
    console.log('onStartPlay');
    storage()
      .ref('records/' + this.title + '.m4a') //name in storage in firebase console
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

  onModalPress = () => {
    this.setState({
      textValue: 'تم إيقاف التسجيل...',
    });
    this.onStopRecord();
  };
  onReRecoed = () => {
    this.setState({
      textValue: 'يتم التسجيل الان ...',
    });
    this.onStartRecord();
  };

  onRecoed = () => {
    this.setState({
      modalVisible: true,
    });
    this.onStartRecord();
  };

  handleInputTextChange = newText => {
    this.setState({queryText: newText});
  };

  onSucssfulModalPress = () => {
    this.setState({
      SucessfulModalVisible: false,
    });
    if (this.props.route.params.keyword == 'student') {
      this.props.navigation.navigate('StudentHome');
    } else
      this.props.navigation.navigate('InsClassInfo', {
        classKey: this.props.route.params.ClassID,
      });
  };
  //////////////////////////////OCR SECTION //////////////////////////////////////////////

  onSelectImagePress = () =>
    launchImageLibrary('photo', this.onMediaSelectCallBack);

  // contain pic uri
  onMediaSelectCallBack = async media => {
    this.MideaRespons = media;

    if (!media.didCancel) {
      media.assets.map(({uri}) => {
        this.setLocalpath = uri;
      });

      const reference = await storage().ref('OCR/' + this.Title);
      // path to existing file on filesystem
      const pathToFile = this.setLocalpath;
      // uploads file
      await reference.putFile(pathToFile);
      this.submitToGoogle();
    }
  };

  handleChange(text) {
    this.setState({HomeWork: text});
  }

  handleChangeTitle(text) {
    this.setState({Title: text});
  }

  submitToGoogle = async () => {
    this.setState({loading: true});
    try {
      this.DownLoadURI = await storage()
        .ref('OCR/' + this.Title) //name in storage in firebase console
        .getDownloadURL()

        .catch(e => console.log('Errors while downloading => ', e));

      console.log('in google ' + this.DownLoadURI);

      let body = JSON.stringify({
        requests: [
          {
            features: [
              // {type: 'LABEL_DETECTION', maxResults: 10},
              // {type: 'LANDMARK_DETECTION', maxResults: 5},
              // {type: 'FACE_DETECTION', maxResults: 5},
              // {type: 'LOGO_DETECTION', maxResults: 5},
              {type: 'TEXT_DETECTION', maxResults: 5},
              {type: 'SAFE_SEARCH_DETECTION', maxResults: 5},
              //No need to these features fff
              // {type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5},

              // {type: 'IMAGE_PROPERTIES', maxResults: 5},
              // {type: 'CROP_HINTS', maxResults: 5},
              // {type: 'WEB_DETECTION', maxResults: 5},
            ],
            image: {
              source: {
                imageUri: this.DownLoadURI,
              },
            },
          },
        ],
      });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
          'AIzaSyAHRHxTUVdJSjWg6rflJXNWNR1jhhZoGn0', //AIzaSyCLNN-xsz-fNLI-NsPLzcp1xnBrewZ2npQ
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        },
      );
      let responseJson = await response.json();

      JSON.stringify(responseJson.responses[0].fullTextAnnotation.text);

      this.setState({
        googleResponse: responseJson.responses[0].fullTextAnnotation.text,
        uploading: false,
        responseReceived: true,
        HomeWork: responseJson.responses[0].fullTextAnnotation.text,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        ErrormodalVisible: true,
        errorMessage: 'حدث خطأ ما ، الرجاء المحاولة مرة اخرى',
        loading: false,
      });
    }
  };

  ////////////////////////////////// MAIN UPLOADING METHOD ///////////////////////////

  UploadHomeWork = async () => {
    if (
      this.state.HomeWork == null ||
      this.state.Title == null ||
      (this.state.day == null && this.props.route.params.keyword == 'class')
    ) {
      this.setState({
        ErrormodalVisible: true,
        errorMessage: 'عذراً جميع الحقول مطلوبة',
      });
      console.log('Error model ' + this.state.ErrormodalVisible);
      console.log('home in if ' + this.state.HomeWork);
      return;
    }
    if (this.state.RecFlag == true) {
      console.log('with record');
      this.uploadAudio();
    }

    // console.log(
    //   this.props.route.params.StudentID + ',' + this.props.route.params.ClassID,
    // );

    if (this.props.route.params.keyword == 'student') {
      console.log('id in student ' + this.props.route.params.StudentID); //true
      firestore()
        .collection('Student Text')
        .add({
          TextBody: this.state.HomeWork,
          TextHead: this.state.Title,
          Studentid: this.props.route.params.StudentID,
          // Deadline: this.state.day,
          Record: this.state.RecFlag,
          Feedback: {
            score: 0,
            trial: 0,
            mistakes: 0,
          },
        });
      this.setState({SucessfulModalVisible: true});
    }

    if (this.props.route.params.keyword == 'class') {
      console.log('id in instructor  ' + this.props.route.params.ClassID);
      firestore().collection('Instructor Text').add({
        TextBody: this.state.HomeWork,
        TextHead: this.state.Title,
        ClassId: this.props.route.params.ClassID,
        Deadline: this.state.day,
        Record: this.state.RecFlag,
        Feedback: {},
      });
      this.setState({SucessfulModalVisible: true});
    }
  }; //end of the method

  render() {
    let {image} = this.state;
    const {ClassID} = this.props.route.params;

    const {StudentID} = this.props.route.params;

    console.log('the key word ' + this.props.route.params.keyword);
    console.log('student id ' + StudentID);
    // console.log('class id ' + ClassID);
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View>
          <SafeAreaView
            style={{
              backgroundColor: '#DAE2E9',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              ...(Platform.OS === 'android' ? {paddingTop: 20} : null),
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
            <BackButton />

            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.ErrormodalVisible}>
              <View
                style={{
                  backgroundColor: 'rgba(52, 52, 52, 0.5)',
                  height: '100%',
                }}>
                <View style={TitleStyles.modalContent}>
                  <ErrorVector
                    width={120}
                    height={120}
                    style={{marginLeft: 80, marginTop: -75}}
                  />
                  <Text
                    style={[
                      TitleStyles.subTitle,
                      {textAlign: 'center', fontFamily: 'AJannatLT-Bold'},
                    ]}>
                    {this.state.errorMessage}
                  </Text>
                  <TouchableOpacity
                    style={[
                      TitleStyles.AlertButton,
                      {backgroundColor: '#DAE2E9'},
                    ]}
                    onPress={() => this.setState({ErrormodalVisible: false})}>
                    <Text style={TitleStyles.ButtonText}>حسنا </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Text style={TitleStyles.ButtonText}>إضافة واجب جديد </Text>

            <TextInput
              placeholder=" عنوان النص "
              placeholderTextColor={'#C3C7CA'}
              style={TitleStyles.Title}
              onChangeText={text => this.handleChangeTitle(text)}
              value={this.state.Title}
              underlineColorAndroid="transparent"
              color="black"
            />
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                borderColor: '#DAE2E9',
                borderWidth: 2,
                width: '80%',
                height: '30%',

                paddingLeft: 12,
              }}>
              <TextInput
                placeholder=" أدخل النص "
                placeholderTextColor={'#C3C7CA'}
                style={TitleStyles.TextArea}
                onChangeText={text => this.handleChange(text)}
                value={this.state.HomeWork}
                underlineColorAndroid="transparent"
                color="black"
                multiline
              />

              <TouchableOpacity
                style={{position: 'absolute'}}
                onPress={() => this.onSelectImagePress()}>
                <Camera
                  style={{
                    left: 260,
                    top: 2,
                    position: 'absolute',
                    backgroundColor: 'white',
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#DAE2E9',
                borderRadius: 10,

                width: '80%',
                alignItems: 'flex-start',
                marginTop: 20,
              }}>
              <TouchableOpacity onPress={() => this.onRecoed()}>
                <Microphone />
              </TouchableOpacity>
            </View>
            {this.state.RecFlag == true && (
              <Text
                style={[
                  TitleStyles.smallText,
                  {marginTop: 10, color: '#c78b6d'},
                ]}>
                {' '}
                * تم ارفاق الصوت{' '}
              </Text>
            )}
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#DAE2E9',
                borderRadius: 10,

                width: '80%',
                alignItems: 'flex-start',
                marginTop: 20,
              }}>
              <>
                {/* <Button title="Show DatePicker" onPress={this.showDateTimePicker} /> */}
                {this.props.route.params.keyword == 'class' && (
                  <TouchableOpacity onPress={() => this.showDateTimePicker()}>
                    <Deadline />
                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this.handleDatePicked}
                      onCancel={this.hideDateTimePicker}
                    />
                  </TouchableOpacity>
                )}
              </>
            </View>
            {this.state.Picked == true && (
              <Text
                style={[
                  TitleStyles.smallText,
                  {marginTop: 10, color: '#c78b6d'},
                ]}>
                {' '}
                * تم تحديد يوم التسليم{' '}
              </Text>
            )}
            <Loader loading={this.state.loading} color="#F5C5AD" />
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}>
              <View
                style={{
                  backgroundColor: 'rgba(52, 52, 52, 0.5)',
                  height: '100%',
                }}>
                <Close
                  width={50}
                  height={50}
                  style={{
                    position: 'absolute',
                    marginLeft: 20,
                    marginTop: 230,
                    zIndex: 4,
                  }}
                  onPress={() => this.setState({modalVisible: false})}
                />

                <View
                  style={[TitleStyles.modalContent, {alignItems: 'center'}]}>
                  <RecordingMicrophone
                    width={120}
                    height={120}
                    style={{marginLeft: 10, marginTop: -75}}
                  />
                  <Text
                    style={[
                      TitleStyles.subTitle,
                      {textAlign: 'center', fontWeight: 'bold'},
                    ]}>
                    {this.state.textValue}
                  </Text>

                  <TouchableOpacity
                    style={[
                      TitleStyles.AlertButton,
                      {backgroundColor: '#DAE2E9', width: '50%'},
                    ]}
                    onPress={() => this.onModalPress()}>
                    <Text style={TitleStyles.ButtonText}>ايقاف </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      TitleStyles.AlertButton,
                      {backgroundColor: '#DAE2E9', width: '50%'},
                    ]}
                    onPress={() => this.onStartPlay()}>
                    <Text style={TitleStyles.ButtonText}>تشغيل </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      TitleStyles.AlertButton,
                      {backgroundColor: '#DAE2E9', width: '50%'},
                    ]}
                    onPress={() => this.onReRecoed()}>
                    <Text style={TitleStyles.ButtonText}>إعادة التسجيل </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      TitleStyles.AlertButton,
                      {backgroundColor: '#DAE2E9', width: '50%'},
                    ]}
                    onPress={() => this.setState({modalVisible: false})}>
                    <Text style={TitleStyles.ButtonText}>اضافة الصوت </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.SucessfulModalVisible}>
              <View
                style={{
                  backgroundColor: 'rgba(52, 52, 52, 0.5)',
                  height: '100%',
                }}>
                <View style={TitleStyles.modalContent}>
                  <CheckVector
                    width={120}
                    height={120}
                    style={{marginLeft: 80, marginTop: -75}}
                  />
                  <Text
                    style={[
                      TitleStyles.subTitle,
                      {textAlign: 'center', fontFamily: 'AJannatLT-Bold'},
                    ]}>
                    {'تمت اضافة الواجب بنجاح'}
                  </Text>
                  <TouchableOpacity
                    style={[
                      TitleStyles.AlertButton,
                      {backgroundColor: '#DAE2E9'},
                    ]}
                    onPress={() => this.onSucssfulModalPress()}>
                    <Text style={TitleStyles.ButtonText}>{'حسنا'} </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              style={[
                TitleStyles.Button,
                TitleStyles.shadowOffset,
                {marginBottom: 10, marginTop: 40, width: '50%'},
              ]}
              onPress={() => this.UploadHomeWork()}>
              <Text style={TitleStyles.ButtonText}>إضافة الواجب </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default RecordVoice;
