import React, {useState, useEffect, useCallback} from 'react'
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
import {getTopStudents} from '../helpers/getTopStudents.js'
import BadgeGold from '../assets/images/BadgeGold';
import BadgeSilver from '../assets/images/BadgeSilver';
import BadgeBronze from '../assets/images/BadgeBronze';

import firestore from '@react-native-firebase/firestore'

import StarsBanner from '../assets/images/StarsBanner.svg'
const ClassScoreboard = ({navigation, route}) => {
  const [studentsScores, setStudentsScores] = useState([])
  const [totalAssignments, setTotalAssignments] = useState()

  const studentTitles = ['الطالب الذهبي', 'الطالب الفضي','الطالب البرونزي']
  const studentBadges = [<BadgeGold width={30} style={{position: "absolute"}} />, <BadgeSilver width={30} style={{position: "absolute"}} />, <BadgeBronze width={30} style={{position: "absolute"}} />]

  const classId = route.params.classId
  const EngToArabicNum = num => {
    var str = '' + num
    return str.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
  }

  const fetchStudents = useCallback(async () => {
    const data = await getTopStudents(classId)
    FillData(data)
  }, [])

  const FillData = data => {
    data.forEach(async (student, index) => {
      const studentDoc = await firestore()
        .collection('Student')
        .doc(student.id)
        .get()
        .then(documentSnapshot => {
          student['Fullname'] = documentSnapshot.data().Fullname
          student['pic'] = documentSnapshot.data().pic
        })
      if(index === data.length-1)
      setStudentsScores(data)
    })
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    const numOfAssignments = firestore()
    .collection('Instructor Text')
    .where('ClassId', '==', classId)
    .get()
    .then(querySnapshot => {
      setTotalAssignments(querySnapshot.size)
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
          data={studentsScores}
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
                <Text
                  style={[
                    TitleStyles.HeaderTitle,
                    {marginTop: 0, marginRight: 10},
                  ]}>
                  {EngToArabicNum(index + 1)}
                </Text>
                {item.pic ? <AnimalPicker pic={item.pic} /> : null}
                <Text
                  style={[
                    TitleStyles.ProfileTitle,
                    {
                      marginTop: 0,
                      fontFamily: 'AJannatLT-Bold',
                      marginLeft: 10,
                    },
                  ]}>
                  {item.Fullname}
                </Text>
              </View>
              {index < 3 ? (
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  {studentBadges[index]}
                  <Text style={[TitleStyles.smallText, {fontSize: 12, marginTop: 10}]}>
                    {studentTitles[index]}
                  </Text>
                </View>
              ) : null }
              <Text
                style={[
                  TitleStyles.HeaderTitle,
                  {marginTop: 0, justifyContent: 'flex-start'},
                ]}>
                {EngToArabicNum(Math.round(item.score/totalAssignments))}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}
export default ClassScoreboard
