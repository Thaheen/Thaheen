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
import quran from '../Components/quran.json';
import functions, {firebase} from '@react-native-firebase/functions';
import StartMicrophone from '../assets/images/StartMicrophone.svg';
import StopMicrophone from '../assets/images/StopMicrophone.svg';

const FillInTheBlank = ({navigation, route}) => {
  const [textBody, setTextBody] = useState('');

  useEffect(() => {
    const MemorizationText = firestore()
      .collection('Student Text')
      .doc(route.params.TextID)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setTextBody(snapshot.data().TextBody.replace(/,|،/g, ' '));
        } else {
          firestore()
            .collection('Instructor Text')
            .doc(route.params.TextID)
            .onSnapshot(Qsnapshot => {
              setTextBody(Qsnapshot.data().TextBody.replace(/,|،/g, ' '));
            });
        }
      });
    return MemorizationText;
  }, []);

  var array = textBody.split(' ');
  array = array.filter(x => x !== '');
  const clonedArr = [...array];

  const [show, setShow] = React.useState(false);

  const toggleText = () => {
    setShow(show => !show);
  };

  for (var i = 1; i < clonedArr.length; i++) {
    clonedArr[i++] = '____';
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
        <Text
          style={[TitleStyles.sectionTitle, {marginTop: 20, fontSize: 20}]}
          onPress={toggleText}>
          اظهار النص
          {/*   
   {Quran.data.map((item, index) => (
        <Text key={index}> {item.name}  </Text>     )) }  */}
        </Text>

        {show == false && (
          <FlatList
            style={{
              marginTop: 20,

              textAlign: 'center',
            }}
            contentContainerStyle={{
              //flexDirection: 'row',
              width: 333,
              height: 452,
              alignItems: 'center',
            }}
            data={clonedArr}
            numColumns={6}
            // extraData={selectedId}
            renderItem={({item, index}) => (
              <Text style={[TitleStyles.smallText]}> {item} </Text>
            )}
          />
        )}

        {show == true && (
          <FlatList
            style={{marginTop: 20, textAlign: 'center'}}
            contentContainerStyle={{
              //flexDirection: 'row',
              width: 333,
              height: 452,
              alignItems: 'center',
            }}
            data={array}
            numColumns={6}
            // extraData={selectedId}
            renderItem={({item, index}) => (
              <Text
                style={
                  index % 2 != 0
                    ? [TitleStyles.smallText, {color: '#62A5A2'}]
                    : [TitleStyles.smallText]
                }>
                {'   '}
                {item}
                {'   '}
              </Text>
            )}
          />
        )}
      </View>

      <View style={{marginTop: 310}}>
        <WhiteCurve />
      </View>

      <ThaheenStanding
        style={[{position: 'absolute', bottom: 30, right: -15}]}
        width={150}
        height={150}
      />

      <TouchableOpacity
        style={[
          TitleStyles.Button,
          {
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#F5C5AD',
            position: 'absolute',
            alignSelf: 'center',
            width: 200,
            borderRadius: 30,
            marginTop: 650,
            zIndex: 1,
          },
        ]}
        onPress={() =>
          navigation.navigate('MemorizeFeedback', {
            textID: route.params.TextID,
          })
        }>
        <Text style={TitleStyles.ButtonText}>انتهيت</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FillInTheBlank;
