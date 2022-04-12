import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  I18nManager,
  VirtualizedList,
  useRef,
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
import SwipeArrow from '../assets/images/SwipeArrow.svg';
const Chunking = ({navigation, route}) => {
  const [textBody, setTextBody] = useState('');
    const [myArray, updateMyArray] = useState([]);
    


  const [show, setShow] = useState(false);
  //original array
  const [counter, setCounter] = useState(0);
  const [chunkCounter, setChunkCounter] = useState(1);

  // retrive the text
  useEffect(() => {
    const MemorizationText = firestore()
      .collection('Student Text')
      .doc(route.params.TextID)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setTextBody(snapshot.data().TextBody);
        } else {
          firestore()
            .collection('Instructor Text')
            .doc(route.params.TextID)
            .onSnapshot(Qsnapshot => {
              console.log('in instructor text');
              setTextBody(Qsnapshot.data().TextBody);
            });
        }
      });

    return MemorizationText;
  }, []);

  if (textBody.indexOf('،') || textBody.indexOf(',') > -1) {
    var FullText = textBody.split('،');

  }
 
var cont=0
  ShowMoreChuncks = () => {
    if (counter <= FullText.length - 1) {
      console.log(' before the counts :' + counter);

        updateMyArray( arr => [...arr,FullText[counter] ]);
 setCounter(counter => counter+1)
              console.log('-----------------------------');
              console.log(' After the counts :' + cont);

      

    } else {


    }
  };
   
  const newTextTag = myArray.map(type => (
    <Text style={[TitleStyles.smallText, {textAlign: 'center', marginTop: 20}]}>
      {type}
    </Text>

 
  ));
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DAE2E9',
    
      }}>
      <BackButton />

      <Text style={[TitleStyles.sectionTitle, {marginTop: 30}]}>
        هيا لنبدأ المراجعة
      </Text>
      <View style={[TitleStyles.MemorizationContainer]}>
        <Text
          style={[TitleStyles.sectionTitle, {marginTop: 20, fontSize: 20}]}
          onPress={ShowMoreChuncks}>
          اظهار المزيد من النص
        </Text>

        <>{newTextTag}</>

       
      </View>

      <View style={{marginTop: 310}}>
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

export default Chunking;
