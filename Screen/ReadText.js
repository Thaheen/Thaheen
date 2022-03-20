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

const ReadText = ({navigation, route}) => {
  const [textBody, setTextBody] = useState('');

  useEffect(() => {
    const MemorizationText = firestore()
      .collection('Student Text')
      .doc(route.params.TextID)
      .onSnapshot(snapshot => {
        setTextBody(snapshot.data().TextBody);
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
          // style={{flexDirection: 'row', display: 'flex'}}
          contentContainerStyle={{
            flexDirection: 'row',
            width: 333,
            height: 452,
          }}
          data={clonedArr}
          // extraData={selectedId}
          renderItem={({item, index}) => (
            <Text
              style={[
                TitleStyles.smallText,
                {textAlign: 'center', marginLeft: 5},
              ]}>
              {item}
            </Text>
          )}
        />

        <TouchableOpacity
          style={[TitleStyles.OpenTextAudioBtn]}
          // onPress={() => {
          //   navigation.navigate('ReadText', {
          //     TextID: route.params.TextID,
          //   });
          // }}
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
      </View>

      <View style={{marginTop: 440}}>
        <WhiteCurve />
      </View>

      <TouchableOpacity
        style={[
          TitleStyles.Button,
          {
            backgroundColor: '#DAE2E9',
            //alignSelf: 'center',
            width: 283,
            //marginBottom: Platform.OS === 'ios' ? 100 : 90,
            zIndex: 2,
            marginLeft: 45,
            // margingBottom: 50,
            position: 'absolute',
          },
        ]}
        // onPress={onSignout}
      >
        <Text style={TitleStyles.ButtonText}>إبدا المراجعة</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReadText;
