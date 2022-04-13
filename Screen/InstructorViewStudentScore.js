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
import AssignmentIcon from '../assets/images/AssignmentIcon'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import TitleStyles from '../Styles/Titles'
import firestore from '@react-native-firebase/firestore'

const InstructorViewStudentScore = ({navigation, route}) => {

  const [studentAssignments, setStudentAssignments] = useState([])
  const rowColors = ['#CCD9E5', '#EAEAEA']
  const classId = route.params.classId
  const studentId = route.params.studentId

  const EngToArabicNum = num => {
    var str = '' + num
    return str.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
  }

  useEffect(() => {
    const studentScores = firestore()
      .collection('Instructor Text')
      .where('ClassId', '==', classId)
      .get()
      .then(querySnapshot => {
        const collectAssignments = []
        querySnapshot.forEach(documentSnapshot => {
          if (studentId in documentSnapshot.data().Feedback) {
            collectAssignments.push({
              title: documentSnapshot.data().TextHead,
              score: documentSnapshot.data().Feedback[studentId].score,
            })
          } else {
            collectAssignments.push({
              title: documentSnapshot.data().TextHead,
              score: 'لم يسمع',
            })
          }
        })
        setStudentAssignments(collectAssignments)
      })
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DBE2EA',
      }}>
      <StatusBar barStyle='dark-content'/>
      <BackButton />
      <Text
        style={[
          TitleStyles.HeaderTitle,
          {paddingVertical: 35, alignSelf: 'center'},
        ]}>
        كشف درجات الطالب
      </Text>

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
        <Text style={[TitleStyles.HeaderTitle, {marginTop: 0, fontSize: 24}]}>
          الواجب
        </Text>
        <Text style={[TitleStyles.HeaderTitle, {marginTop: 0, fontSize: 24}]}>
          الدرجة من ١٠٠
        </Text>
      </View>
      <View
        style={{
          height: '100%',
          bottom: 45,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 52,
          borderTopRightRadius: 52,
          paddingTop: 25,
        }}>
        {studentAssignments.length != 0 ? (
          <FlatList
            data={studentAssignments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 35,
                  marginTop: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 15,
                    width: '65%',
                    borderRadius: 11,
                    backgroundColor: rowColors[index % 2],
                    paddingVertical: 5,
                  }}>
                  <AssignmentIcon />
                  <Text
                    style={[
                      TitleStyles.HeaderTitle,
                      {marginTop: 0, marginLeft: 10, fontSize: 18},
                    ]}>
                    {item.title}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '30%',
                    borderRadius: 11,
                    backgroundColor: rowColors[index % 2],
                    paddingVertical: 5,
                  }}>
                  <Text style={[TitleStyles.smallText, {fontSize: 18}]}>
                    {EngToArabicNum(item.score)}
                  </Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text
            style={[
              TitleStyles.ProfileTitle,
              {marginTop: 0, fontSize: 24, paddingHorizontal: 30},
            ]}>
            لم يقم الطالب بتسميع أي واجب بعد
          </Text>
        )}
      </View>
    </SafeAreaView>
  )
}
export default InstructorViewStudentScore
