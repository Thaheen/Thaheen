import React, {useState, useEffect, Fragment} from 'react';
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
  FlatList,
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
import {utils} from '@react-native-firebase/app';
import {UserInfoContext} from '../auth/UserInfoContext';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import ErrorVector from '../assets/images/ErrorVector.svg';
import CheckVector from '../assets/images/CheckVector.svg';
import SelectDropdown from 'react-native-select-dropdown';
import TheArrow from '../assets/images/TheArrow.svg';
import Deadline from '../assets/images/deadline.svg';
import Icon from 'react-native-vector-icons';
import SearchableDropdown from 'react-native-searchable-dropdown';
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
import {SearchBar} from 'react-native-elements';
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
      ErrormodalVisible: false,
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
      QuranModal: false,
      SurahNum: 1,
      from: 0,
      to: 0,
      isDateTimePickerVisible: false,
      day: null,
      SurahFiltered: [],
      Surah: [],
      isSearching: false,
      searchList: [],
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
      RecFlag: true,
    });
    console.log(result);
    this.record = result;
    This.RecFlag = true;
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
          .child('records/' + this.state.Title + '.m4a')
          .putFile(this.record)
          .then(() => {
            console.log('Sent!');
            console.log('title' + this.state.Title);
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
  //////
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

    this.props.navigation.goBack();
  };

  // Calculate Surah
  Ayaharray = versusNum => {
    let ar = [];
    for (let i = 1; i <= versusNum; i++) {
      ar[i - 1] = i;
    }
    return ar;
  };
  //Get Surah Ayah according to the given index from-to
  GetSurah = SurahAyat => {
    let ar = [];
    let j = 0;
    for (let i = this.state.from; i <= this.state.to; i++) {
      ar[j] = SurahAyat[i - 1];

      j++;
    }
    return ar;
  };
  ////////////////////////////////// MAIN UPLOADING METHOD ///////////////////////////

  UploadHomeWork = async () => {
    if (this.state.HomeWork == null || this.state.Title == null) {
      this.setState({ErrormodalVisible: true});
      console.log('Error model ' + this.state.ErrormodalVisible);
      console.log('home in if ' + this.state.HomeWork);
      return;
    }
    if (this.state.RecFlag == true) {
      console.log('with record');
      this.uploadAudio();
    }
    console.log(
      this.props.route.params.StudentID + ',' + this.props.route.params.ClassID,
    );
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
        Feedback: {},
        Record: this.state.RecFlag,
      });
      this.setState({SucessfulModalVisible: true});
    }
  }; //end of the method

  //Search Surah Method
  searchSurah = textToSearch => {
    if (textToSearch != ' ') {
      this.state.isSearching = true;
      this.setState({
        SurahFiltered: this.state.Surah.filter(element =>
          element.includes(textToSearch),
        ),
      });
    }

    if (textToSearch == ' ') {
      this.state.isSearching = false;
    }

    console.log('Surah Filtered');
    console.log(this.state.isSearching);
    console.log(this.state.SurahFiltered);
  };

  render() {
    let {image} = this.state;
    const {ClassID} = this.props.route.params;
    const {StudentID} = this.props.route.params;
    console.log('Surah Name ' + this.state.TextType);

    //Get Surah names
    this.state.Surah = quran.data.map(function (item) {
      return item.name;
    });

    let totalVerses;
    let ayat;

    // const totalVerses = quran.data[this.state.SurahNum].total_verses;
    // console.log('Total verses: ' + totalVerses);

    //Get the total versed of each surah
    if (this.state.isSearching == true && this.state.TextType != null) {
      for (let i = 0; i <= 113; i++) {
        if (quran.data[i].name == this.state.TextType) {
          totalVerses = quran.data[i].total_verses;
          ayat = quran.data[i].verses.map(function (item) {
            return item.text;
          });
        }
      }
    } else {
      totalVerses = quran.data[this.state.SurahNum].total_verses;
      ayat = quran.data[this.state.SurahNum].verses.map(function (item) {
        return item.text;
      });
    }
    console.log('Total verses: ' + totalVerses);

    //Get the selected Surah
    // const ayat = quran.data[this.state.SurahNum].verses.map(function (item) {
    //   return item.text;
    // });

    //From To Ayah
    const FromAyah = this.Ayaharray(totalVerses);
    const ToAyah = this.Ayaharray(totalVerses);
    const versesLength = FromAyah.length;
    console.log('FromAyah');
    console.log(FromAyah);
    for (var ayah in FromAyah) {
      FromAyah[ayah] = {
        id: (parseInt(ayah) + 1).toString(),
        name: (parseInt(ayah) + 1).toString(),
      };
      ToAyah[ayah] = {
        id: (parseInt(ayah) + 1).toString(),
        name: (parseInt(ayah) + 1).toString(),
      };
    }

    //Get the selected Surah with given index from-to
    //There is a problem but it can be fixed later
    const SurahAyat = this.GetSurah(ayat);

    //the home work ayat should be cleaned
    this.state.HomeWork = SurahAyat + '';

    this.state.HomeWork = this.state.HomeWork.replace(
      new RegExp(
        String.fromCharCode(
          1617,
          124,
          1614,
          124,
          1611,
          124,
          1615,
          124,
          1612,
          124,
          1616,
          124,
          1613,
          124,
          1618,
        ),
        'g',
      ),
      '',
    );

    this.state.HomeWork = this.state.HomeWork.replace(/إ|ٱ|أ|آ|آ/g, 'ا')
      .replace(/مۡ|مۡ |مٰـ|مٰ|مۢ|مٓ/g, 'م')
      .replace(/بۛ|بۡ/g, 'ب')
      .replace(/لۡ|لٰ/g, 'ل')
      .replace(/سۡ/g, 'س')
      .replace(/حۡ/g, 'ح')
      .replace(/عٰ|عۡ/g, 'ع');

    console.log('Home work');
    console.log(this.state.HomeWork);
    this.state.Title = this.state.TextType;

    const items = [
      //name key is must.It is to show the text in front
      {id: 1, name: '1angellist'},
      {id: 2, name: '2codepen'},
      {id: 3, name: '3envelope'},
      {id: 4, name: 'etsy'},
      {id: 5, name: 'facebook'},
      {id: 6, name: 'foursquare'},
      {id: 7, name: 'github-alt'},
      {id: 8, name: 'github'},
      {id: 9, name: 'gitlab'},
      {id: 10, name: 'instagram'},
    ];
    return (
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
                  {'عذراً جميع الحقول مطلوبة'}
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
          <View
            style={{
              height: 35,
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              zIndex: 2,
            }}>
            <TouchableOpacity
              style={TitleStyles.buttonStyle2}
              onPress={() => this.setState({QuranModal: true})}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {this.state.TextType != null && (
                  <Text
                    style={[TitleStyles.dropdownButtonText, {marginLeft: 10}]}>
                    {this.state.TextType}
                  </Text>
                )}
                {this.state.TextType == null && (
                  <Text
                    style={[TitleStyles.dropdownButtonText, {marginLeft: 10}]}>
                    السورة
                  </Text>
                )}
                <TheArrow style={{marginLeft: 7}} />
              </View>
            </TouchableOpacity>

            <View style={{width: 90}}>
              <SearchableDropdown
                onTextChange={text => console.log(text)}
                // Change listner on the searchable input
                onItemSelect={item => {
                  this.setState({from: item.id});
                }}
                // Called after the selection from the dropdown
                containerStyle={{
                  width: 90,
                  zIndex: 10,
                  position: 'absolute',
                }}
                // Suggestion container style
                textInputStyle={{
                  // Inserted text style
                  borderWidth: 1,
                  borderColor: 'white',
                  backgroundColor: '#FAF7F6',
                  color: '#43515F',
                  backgroundColor: 'white',
                  borderRadius: 12,
                  fontFamily: 'AJannatLT-Bold',
                  fontSize: 18,
                  textAlign: 'right',
                  paddingLeft: 10,
                  marginBottom: 5,
                }}
                itemStyle={{
                  // Single dropdown item style
                  marginTop: 4,
                  padding: 6,
                  backgroundColor: 'white',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  fontFamily: 'AJannatLT-Bold',
                  color: '#8E8D8D',
                  borderRadius: 12,
                }}
                itemTextStyle={{
                  // Text style of a single dropdown item
                  color: '#8E8D8D',
                  fontSize: 14,
                  fontFamily: 'AJannatLT-Bold',
                  textAlign: 'center',
                }}
                itemsContainerStyle={{
                  // Items container style you can pass maxHeight
                  // To restrict the items dropdown hieght
                  maxHeight: 240,
                  width: 90,
                  zIndex: 10,
                }}
                items={FromAyah}
                // Mapping of item array
                //defaultIndex={2}
                // Default selected item index
                placeholder={
                  this.state.from == '' ? 'من آية' : this.state.from.toString()
                }
                placeholderTextColor="#8E8D8D"
                // Place holder for the search input

                // Reset textInput Value with true and false state
                underlineColorAndroid="transparent"
                // To remove the underline from the android input
              />
              <TheArrow
                style={{zIndex: 15, alignSelf: 'flex-end', top: 20, right: 7}}
              />
            </View>
            <View style={{width: 90}}>
              {/* to ayah drop down list */}
              <SearchableDropdown
                onTextChange={text => console.log(text)}
                // Change listner on the searchable input
                onItemSelect={item => {
                  this.setState({to: item.id});
                }}
                // Called after the selection from the dropdown
                containerStyle={{
                  width: 90,
                  zIndex: 10,
                  position: 'absolute',
                }}
                // Suggestion container style
                textInputStyle={{
                  // Inserted text style
                  borderWidth: 1,
                  borderColor: 'white',
                  backgroundColor: 'white',
                  borderRadius: 12,
                  fontFamily: 'AJannatLT-Bold',
                  fontSize: 18,
                  textAlign: 'right',
                  color: '#43515F',
                  paddingLeft: 10,
                  marginBottom: 5,
                }}
                itemStyle={{
                  // Single dropdown item style
                  padding: 6,
                  marginTop: 4,
                  backgroundColor: 'white',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  fontFamily: 'AJannatLT-Bold',
                  color: '#8E8D8D',
                  borderRadius: 12,
                }}
                itemTextStyle={{
                  // Text style of a single dropdown item
                  color: '#8E8D8D',
                  fontSize: 14,
                  fontFamily: 'AJannatLT-Bold',
                  textAlign: 'center',
                }}
                itemsContainerStyle={{
                  // Items container style you can pass maxHeight
                  // To restrict the items dropdown hieght
                  maxHeight: 240,
                  width: 90,
                  zIndex: 10,
                }}
                items={ToAyah}
                // Mapping of item array
                //defaultIndex={2}
                // Default selected item index
                placeholder={
                  this.state.to == '' ? 'إلى آية' : this.state.to.toString()
                }
                placeholderTextColor="#8E8D8D"
                // Place holder for the search input

                underlineColorAndroid="transparent"
                // To remove the underline from the android input
              />
              <TheArrow
                style={{zIndex: 15, alignSelf: 'flex-end', top: 20, right: 7}}
              />
            </View>
            {/* <SelectDropdown
              data={this.Ayaharray(totalVerses)}
              buttonStyle={TitleStyles.buttonStyle2}
              buttonTextStyle={TitleStyles.dropdownButtonText}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                this.setState({to: selectedItem});
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
              defaultButtonText="الى آية"
            /> */}
            {/* <TheArrow style={{top: 25, right: 9, position: 'absolute'}} /> */}
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              borderColor: '#DAE2E9',
              borderWidth: 2,
              width: '80%',
              height: '30%',
              marginTop: 15,
              paddingLeft: 12,
            }}>
            <ScrollView>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 20,
                  textAlign: 'left',
                }}>
                {this.state.HomeWork}
              </Text>
            </ScrollView>
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
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.QuranModal}>
            <View
              style={{
                backgroundColor: 'rgba(52, 52, 52, 0.5)',
                height: '100%',
              }}>
              <View style={[TitleStyles.modalContent, {height: 550}]}>
                <View style={TitleStyles.SearchBar}>
                  <TextInput
                    style={TitleStyles.SearchText}
                    placeholder="بحث عن السورة"
                    placeholderTextColor="#43515F"
                    onChangeText={text => this.searchSurah(text)}></TextInput>
                </View>
                {this.state.isSearching == false && (
                  <FlatList
                    style={{marginTop: 20}}
                    contentContainerStyle={{
                      alignItems: 'center',
                    }}
                    data={this.state.Surah}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        style={TitleStyles.QuranBox}
                        onPress={() => {
                          console.log(item, index);
                          this.setState({TextType: item});
                          this.setState({SurahNum: index++});
                          console.log(
                            ' Index for surah ' + this.state.SurahNum,
                          );
                          this.setState({QuranModal: false});
                        }}>
                        <Text style={TitleStyles.QuranList}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                )}

                {this.state.isSearching == true && (
                  <FlatList
                    data={this.state.SurahFiltered}
                    style={{marginTop: 20}}
                    contentContainerStyle={{
                      alignItems: 'center',
                    }}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        style={TitleStyles.QuranBox}
                        onPress={() => {
                          console.log(item, index);
                          this.setState({TextType: item});
                          this.setState({SurahNum: index++});
                          console.log(
                            ' Index for surah ' + this.state.SurahNum,
                          );
                          this.setState({QuranModal: false});
                        }}>
                        <Text style={TitleStyles.QuranList}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                )}

                <TouchableOpacity
                  style={[
                    TitleStyles.AlertButton,
                    {backgroundColor: '#DAE2E9'},
                  ]}
                  onPress={() => this.setState({QuranModal: false})}>
                  <Text style={TitleStyles.ButtonText}>{'اغلاق'} </Text>
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
    );
  }
}

export default RecordVoice;
