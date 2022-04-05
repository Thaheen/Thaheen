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
import SwipeArrow from '../assets/images/SwipeArrow.svg';
const Chunking = ({navigation, route}) => {
  const [textBody, setTextBody] = useState('');

  useEffect(() => {
    const MemorizationText = firestore()
      .collection('Student Text')
      .doc(route.params.TextID)
      .onSnapshot(snapshot => {
        if(snapshot.exists){
        setTextBody(snapshot.data().TextBody);
      }else{
        firestore()
          .collection('Instructor Text')
          .doc(route.params.TextID)
          .onSnapshot(Qsnapshot=>{
            console.log('in instructor text')
            setTextBody(Qsnapshot.data().TextBody);
          })
      }
      });
    return MemorizationText;
  }, []);

  //console.log(textBody);

  var array = textBody.split('،');
  console.log(array);
  //   const clonedArr = [...array];

  //   const [show, setShow] = React.useState(false);

  //   const toggleText = () => {
  //     setShow(show => !show);
  //   };

  //   for (var i = 1; i < clonedArr.length; i++) {
  //     clonedArr[i++] = '_____';
  //     //console.log(clonedArr);
  //   }

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
        <TouchableOpacity
          style={[
            TitleStyles.SwipeBtn,
            {
              //   marginRight: -8,
              //   backgroundColor: '#FFFFFF',
              //   width: 156,
              //   borderColor: '#E5E5E5',
            },
          ]}
          // onPress={() => {
          //   navigation.navigate('Chunking', {
          //     TextID: route.params.TextID,
          //   });
          // }}
        >
          <Text style={[TitleStyles.SwipeTxt]}> اسحب</Text>
          {/* <SwipeArrow style={{marginLeft: 70, marginBottom: -10}} /> */}
        </TouchableOpacity>
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
