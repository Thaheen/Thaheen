import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native'

import BackButton from '../Components//BackButton.js'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import TitleStyles from '../Styles/Titles'
import AnimalPicker from '../Screen/AnimalPicker.js'

import firestore from '@react-native-firebase/firestore'

import StarsBanner from '../assets/images/StarsBanner.svg'
const InstructorScoreboard = ({navigation, route}) => {
  const [studentsExample, setStudentsExample] = useState([
    {id: '2ljm3CYG8XihVsCgnVyE', score: 89, pic: 'Panda.png'},
    {id: 'VlRciTuAmlJ8ZNxcyBRv', score: 45, pic: 'Zebra.png'},
    {id: 'c8HzpXJ3rDKWogS6Entc', score: 99, pic: 'Cat.png'},
  ])

  const EngToArabicNum = num => {
    var str = '' + num
    return str.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
  }

  useEffect(() => {
    setStudentsExample(studentsExample.sort((a, b) => b.score - a.score))

    //const studentsNames = []
    studentsExample.forEach(async (student, index) => {
      console.log('before firebase')
      await firestore()
        .collection('Student')
        .doc(student.id)
        .get()
        .then(snapshot => {
          student['Fullname'] = snapshot.data().Fullname
        })
      setStudentsExample(
        studentsExample.map((item, index) => (studentsExample[index] = item)),
      )
    })
  }, [])

  return (
    <SafeAreaView
      style={{
        ...(Platform.OS === 'android' ? {marginTop: 20} : null),
        flex: 1,
        backgroundColor: '#DBE2EA',
      }}>
      <StatusBar />

      <StarsBanner />
      <BackButton />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#EAEAEA',
          borderTopLeftRadius: 52,
          borderTopRightRadius: 52,
          paddingHorizontal: 35,
          paddingTop: 15,
          paddingBottom: 50,
        }}>
        <Text style={[TitleStyles.HeaderTitle, {marginTop: 0}]}>الطالب</Text>
        <Text style={[TitleStyles.HeaderTitle, {marginTop: 0}]}>النقاط</Text>
      </View>
      <View
        style={{
          height: '100%',
          bottom: 45,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 52,
          borderTopRightRadius: 52,
        }}>
        <FlatList
          data={studentsExample}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{
                backgroundColor: '#C1B3B3',
                width: '90%',
                height: 1,
                alignSelf: 'center',
                
              }}
            />
          )}
          renderItem={({item, index}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 35,
                marginTop: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[TitleStyles.HeaderTitle, {marginTop: 0, marginRight: 10}]}>
                  {EngToArabicNum(index + 1)}
                </Text>
                <AnimalPicker pic={item.pic} />
                <Text style={[TitleStyles.ProfileTitle, {marginTop: 0, fontFamily: 'AJannatLT-Bold', marginLeft: 10}]}>
                  {item.Fullname}
                </Text>
              </View>
              <Text
                style={[
                  TitleStyles.HeaderTitle,
                  {marginTop: 0, justifyContent: 'flex-start', },
                ]}>
                {EngToArabicNum(item.score)}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}
export default InstructorScoreboard
