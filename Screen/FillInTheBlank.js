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
import Quran from '../Components/Quran.json'
import functions , {firebase} from '@react-native-firebase/functions'


const FillInTheBlank = ({navigation, route}) => {
  const [textBody, setTextBody] = useState('');
  const { data } =  firebase.functions().httpsCallable('micrecognizeStream')();

  useEffect(() => {
    const MemorizationText = firestore()
      .collection('Student Text')
      .doc(route.params.TextID)
      .onSnapshot(snapshot => {
        setTextBody(snapshot.data().TextBody);
      });
    return MemorizationText;
  }, []);

  // console.log(textBody);

  var array = textBody.split(' ');
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
        <Text style={{marginTop: 50, textAlign: 'center'}} onPress={toggleText}>
          اظهار النص
    
{/*   
   {Quran.data.map((item, index) => (
        <Text key={index}> {item.name}  </Text>     )) }  */}

        </Text>
     


        {show == false && (
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
              <Text style={[TitleStyles.smallText]}> {item} </Text>
            )}
          />
        )}

        {show == true && (
          <FlatList
            // style={{flexDirection: 'row', display: 'flex'}}
            contentContainerStyle={{
              flexDirection: 'row',
              width: 333,
              height: 452,
            }}
            data={array}
            // extraData={selectedId}
            renderItem={({item, index}) => (
              <Text
                style={
                  index % 2 != 0
                    ? [TitleStyles.smallText, {color: '#62A5A2'}]
                    : [TitleStyles.smallText]
                }>
                {' '}
                {item}
              </Text>
            )}
          />
        )}
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
