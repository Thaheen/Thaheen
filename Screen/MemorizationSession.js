import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native';
import {Box, Circle, Col, Line, Padder, Row, ScaledText} from 'urip-rn-kit';
import DropDownPicker from 'react-native-dropdown-picker';

import QuranKemenag from 'quran-kemenag';
import {Surah} from 'quran-kemenag/dist/intefaces';

const MemorizationSession = () => {
  var word = 'سَارِعِي لِلْمَجْدِ وَالْعَلْيَاء مَجِّدِي لِخَالِقِ السَّمَاء';
  array = word.split(' ');
  // var array2;
  console.log(array);
  console.log(array[0]);
  console.log(array[1]);
  console.log(array[2]);

  const data = ['First', 'Second', 'Third', 'Forth'];

  const [show, setShow] = React.useState(false);
  const toggleText = () => setShow(show => !show);

  //   for (var i = 0; i < array.length; i++) {
  //     var j = 0;
  //     array2[j] = array[i];
  //   }

  return (
    <SafeAreaView>
      <Text style={{alignSelf: 'center'}}>{word}</Text>

      {/*

      
      {array.map((array, index) => (
        <Text key={index}>{show ? array : '_ _ _ _ _ _ _ _'}</Text>
      ))}
      
       */}

      <Text onPress={toggleText}>Toggle</Text>
      <FlatList
        data={array}
        renderItem={({item}) => (
          <Text> {show ? item : '_ _ _ _ _ _ _ _'} </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default MemorizationSession;
