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
import DropDownPicker from 'react-native-dropdown-picker';

const RecordVoice = () => {
  var word = 'سَارِعِي لِلْمَجْدِ وَالْعَلْيَاء مَجِّدِي لِخَالِقِ السَّمَاء';
  var array = word.split(' ');
  var array2 = [];
  console.log(array);
  console.log(array[0]);
  console.log(array[1]);
  console.log(array[2]);

  const data = ['First', 'Second', 'Third', 'Forth','fifth'];
  const clonedArr = [...data];


  const [show, setShow] = React.useState(false);

  const toggleText = () => {
    setShow(show => !show);
  };


  for (var i = 1; i < clonedArr.length; i++) {
    clonedArr[i++] = '_____';
    console.log(clonedArr);
  }

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
        data={clonedArr}
        renderItem={({item, index}) => (
          <Text> {show ? item : '_______________'} </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default RecordVoice;
