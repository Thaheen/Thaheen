import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../Components/BackButton.js';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout';
import WhiteCurve from '../assets/images/WhiteCurve.svg';
import ThaheenStanding from '../assets/images/ThaheenStanding';

const FillInTheBlank = ({navigation}) => {
  var word = 'سَارِعِي لِلْمَجْدِ وَالْعَلْيَاء مَجِّدِي لِخَالِقِ السَّمَاء';
  var array = word.split(' ');
  var array2 = [];
  console.log(array);
  console.log(array[0]);
  console.log(array[1]);
  console.log(array[2]);

  const data = ['First', 'Second', 'Third', 'Forth', 'fifth'];
  const clonedArr = [...array];

  const [show, setShow] = React.useState(false);

  const toggleText = () => {
    setShow(show => !show);
  };

  for (var i = 1; i < clonedArr.length; i++) {
    clonedArr[i++] = '_____';
    console.log(clonedArr);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DAE2E9',
        //flexDirection: 'row',
        // alignItems: 'center',
      }}>
      <BackButton />
      {/* <Text style={{alignSelf: 'center'}}>{word}</Text> */}

      {/*       
      {array.map((array, index) => (
        <Text key={index}>{show ? array : '_ _ _ _ _ _ _ _'}</Text>
      ))}
     */}
      <Text style={[TitleStyles.sectionTitle, {marginTop: 30}]}>
        هيا لنبدأ المراجعة
      </Text>
      <View style={[TitleStyles.MemorizationContainer]}>
        <Text style={{marginTop: 50}} onPress={toggleText}>
          Toggle
        </Text>
        <FlatList
          data={clonedArr}
          renderItem={({item, index}) => (
            <Text> {show ? item : '_______________'} </Text>
          )}
        />
      </View>

      <View style={{marginTop: 240}}>
        <WhiteCurve />
      </View>

      <ThaheenStanding
        style={[{position: 'absolute', bottom: 50, right: -20}]}
        width={170}
        height={170}
      />
    </SafeAreaView>
  );
};

export default FillInTheBlank;
