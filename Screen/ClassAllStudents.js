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

import ThaheenMini from '../assets/images/ThaheenMini.svg'
import OmbreCircle from '../assets/images/ombreCircle'
import BlueGardiantModal from '../assets/images/OmbreBackgorundReverse.svg'
import ClassOutline from '../assets/images/ClassOutline.svg'
import BackButton from '../Components//BackButton.js'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'
import TitleStyles from '../Styles/Titles'
import firestore from '@react-native-firebase/firestore'
import ConfirmModel from '../Components/ConfirmModel'

const ClassAllStudents = ({navigation, route}) => {

  const [numOfStudents, setNumOfStudents] = useState('')
  const [username, setUsername] = useState()
  const [studentId, setStudentId] = useState()
  const [ConfirmmodalVisible, setConfirmmodalVisible] = useState(false)
  const [studentsList, setStudentsList] = useState(route.params.studentsList)

  const removeStudentFromList = () => {
    setConfirmmodalVisible(!ConfirmmodalVisible)

    firestore()
      .collection('ClassCommunity')
      .doc(route.params.classKey)
      .update({
        StudentList: firestore.FieldValue.arrayRemove(username),
      });

    firestore()
      .collection('Instructor Text')
      .where('ClassId', '==', route.params.classKey)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          var AllFeedbacks = documentSnapshot.data().Feedback
          delete AllFeedbacks[studentId]
          documentSnapshot.ref.update({
            Feedback: AllFeedbacks,
          })
        })
      });

    setStudentsList(
      studentsList.filter(student => {
        return student.Username != username
      }),
    )
  }

  const showCofnirmModal = (username, studentId) => {
    setUsername(username)
    setStudentId(studentId)
    setConfirmmodalVisible(!ConfirmmodalVisible)
  }

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <FocusAwareStatusBar
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <BlueGardiantModal style={{position: 'absolute'}} />
      <BackButton />
      <View style={{marginTop: 90, width: '90%'}}>
        <OmbreCircle
          style={{position: 'absolute', zIndex: 1, alignSelf: 'center'}}
        />
        <ClassOutline
          fill={'#000000'}
          style={{
            position: 'absolute',
            zIndex: 1,
            alignSelf: 'center',
            marginTop: 25,
          }}
        />

        <View
          style={[
            TitleStyles.SoftShadow,
            {
              borderRadius: 15,
              marginTop: 40,
              height: '85%',
              backgroundColor: 'white',
              alignItems: 'center',
            },
          ]}>
          <BlueGardiantModal style={{position: 'absolute'}} />

          {studentsList.length == 0 ? (
            <Text
              style={[
                TitleStyles.NotAvailableAlert,
                {top: 70, left: 0, right: 0, textAlign: 'center'},
              ]}>
              لا يوجد أي طالب في هذا الفصل
            </Text>
          ) : (
            <Text
              style={[TitleStyles.HeaderTitle, {top: 20, textAlign: 'center'}]}>
              طلابي
            </Text>
          )}

          {ConfirmmodalVisible ? (
            <ConfirmModel
              message={'هل انت متأكد من إزالة الطالب؟'}
              modalVisible={ConfirmmodalVisible}
              setModalVisible={setConfirmmodalVisible}
              sentFunction={removeStudentFromList}
              ID={username}
            />
          ) : null}

          <FlatList
            style={[{marginTop: 30}]}
            data={studentsList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View
                style={[
                  TitleStyles.SoftShadow,
                  TitleStyles.InsStudentItem,
                  {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: 20,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('InstructorViewStudentScore', {
                      classId: route.params.classKey,
                      studentId: item.key,
                      Fullname: item.Fullname
                    })
                  }}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ThaheenMini height={40} width={70} />
                  <Text style={[TitleStyles.smallText, {fontSize: 20}]}>{item.Fullname}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => showCofnirmModal(item.Username, item.key)}>
                  <Text
                    style={[
                      TitleStyles.WarningText,
                      {textDecorationLine: 'underline', color: '#C54822'},
                    ]}>
                    إزالـة
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ClassAllStudents
