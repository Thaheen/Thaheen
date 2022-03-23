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
  Alert,
  Platform,
  I18nManager,
  FlatList,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout';

import BackButton from '../Components//BackButton.js';
import auth from '@react-native-firebase/auth';

import WhiteCurve from '../assets/images/WhiteCurve.svg';
import firestore from '@react-native-firebase/firestore';
import ThaheenMini from '../assets/images/ThaheenMini.svg';
import ob from './OpenMicrophone.js';


const ReadText = ({navigation, route}) => {
  const [textBody, setTextBody] = useState('');
    const [textTitle, setTextTitle] = useState('');
    const [Record, setRecord] = useState(false);


  useEffect(() => {
    const MemorizationText = firestore()
      .collection('Student Text')
      .doc(route.params.TextID)
      .onSnapshot(snapshot => {
        setTextBody(snapshot.data().TextBody);
         setTextTitle(snapshot.data().TextHead);
                  setRecord(snapshot.data().Record);
            console.log(textTitle)
      });
    return MemorizationText;
  }, []);

  var array = textBody.split(' ');
  const clonedArr = [...array];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DAE2E9',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <BackButton />

      <View style={[TitleStyles.MemorizationContainer, {marginLeft: 26}]}>
        <Text style={[TitleStyles.TextOrange]}>أولاً اقرأ النص كاملاً</Text>

        <FlatList
          style={{marginTop: 20, marginLeft: 20}}
          contentContainerStyle={{
            flexDirection: 'row',
            width: 333,
            height: 452,
          }}
          data={clonedArr}
          // extraData={selectedId}
          renderItem={({item, index}) => (
            <Text style={[TitleStyles.smallText, {textAlign: 'center'}]}>
              {' '}
              {item}{' '}
            </Text>
          )}
        />
        {/* Retrive the audio for the text if exist */}
         {Record == true && (
        <TouchableOpacity
          style={[TitleStyles.OpenTextAudioBtn]}
          // onPress={() => {
          //   navigation.navigate('ReadText', {
          //     TextID: route.params.TextID,
          //   });
          // }}

          onPress={() => {

ob.retrieveRecord(textTitle)
          
          }}
        >
          <Text
            style={[
              TitleStyles.categoryText,
              {color: '#43515F', textAlign: 'center', marginTop: 5},
            ]}>
            {' '}
            إستمع للنص{' '}
          </Text>
        </TouchableOpacity>
         )}
      </View>

      <View style={{marginTop: 440}}>
        <WhiteCurve style={{zIndex: 2}} />
        <ThaheenMini
          width={116}
          height={162}
          style={[
            {
              marginTop: 172,
              position: 'absolute',
              right: 60,
              zIndex: 3,
            },
          ]}
        />
        <TouchableOpacity
          style={[
            TitleStyles.Button,
            {
              backgroundColor: '#DAE2E9',
              //alignSelf: 'center',
              width: 283,
              //marginBottom: Platform.OS === 'ios' ? 100 : 90,
              zIndex: 3,
              marginLeft: 50,
              marginTop: 260,
              position: 'absolute',
            },
          ]}
          onPress={() => {
            navigation.navigate('FillInTheBlank', {
              TextID: route.params.TextID,
            });
          }}>
          <Text style={TitleStyles.ButtonText}>إبدا المراجعة</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReadText;
