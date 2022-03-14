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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const FillInTheBlank = ({navigation, route}) => {
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

  console.log(textBody);

  // var word = 'سَارِعِي لِلْمَجْدِ وَالْعَلْيَاء مَجِّدِي لِخَالِقِ السَّمَاء';
  var array = textBody.split(' ');
  // var array2 = [];
  // console.log(array);
  // console.log(array[0]);
  // console.log(array[1]);
  // console.log(array[2]);

  console.log(route.params.TextID);
  const data = ['First', 'Second', 'Third', 'Forth', 'fifth'];
  const clonedArr = [...array];

  const [show, setShow] = React.useState(false);

  const toggleText = () => {
    setShow(show => !show);
  };

  for (var i = 1; i < clonedArr.length; i++) {
    clonedArr[i++] = '_____';
    //console.log(clonedArr);
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
      {clonedArr.map((clonedArr, index) => (
        <Text key={index}>{show ? clonedArr : '_ _ _ _ _ _ _ _'}</Text>
      ))} */}

      <Text style={[TitleStyles.sectionTitle, {marginTop: 30}]}>
        هيا لنبدأ المراجعة
      </Text>
      <View style={[TitleStyles.MemorizationContainer]}>
        <Text style={{marginTop: 50}} onPress={toggleText}>
          اظهار النص
        </Text>
        <FlatList
          // style={{flexDirection: 'row', display: 'flex'}}
          contentContainerStyle={{flexDirection: 'row'}}
          data={clonedArr}
          // extraData={selectedId}
          renderItem={({item, index}) => (
            <Text style={[TitleStyles.smallText]}> {item} </Text>
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
