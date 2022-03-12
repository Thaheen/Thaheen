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
  const [studentsList, setStudentsList] = useState([])
  const [numOfStudents, setNumOfStudents] = useState('')
  const [username, setUsername] = useState()
  const [ConfirmmodalVisible, setConfirmmodalVisible] = useState(false)

  useEffect(() => {
    const subscriber = firestore()
      .collection('ClassCommunity')
      .doc(route.params.classKey)
      .onSnapshot(snapshot => {
        const students = []
        if(snapshot.data().StudentList != 0){
        snapshot.data().StudentList.forEach(studentUsername => {
          firestore()
            .collection('Student')
            .where('Username', '==', studentUsername)
            .onSnapshot(querySnapshot => {
              students.push({
                ...querySnapshot.docs[0].data(),
                key: querySnapshot.docs[0].id,
              })
              setStudentsList(students)
            })

        })} else{
         setStudentsList([])
        }
        setNumOfStudents(studentsList.length)
      })

    return () => subscriber()
  }, [])

  const ViewStudentProfile = name => {
    navigation.navigate('StudentProfile', {
      studentID: name.key,
      studentPic: name.pic,
    })
  }
  const removeStudentFromList = () => {
    setConfirmmodalVisible(!ConfirmmodalVisible)
    firestore()
      .collection('ClassCommunity')
      .doc(route.params.classKey)
      .update({
        StudentList: firestore.FieldValue.arrayRemove(username),
      })
  }
  const showCofnirmModal = username => {
    setUsername(username)
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
            style={[{marginTop: 30, paddingHorizontal: 20}]}
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
                    width: 'auto',
                    paddingRight: 20,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => ViewStudentProfile(item)}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ThaheenMini height={40} width={70} />
                  <Text style={[TitleStyles.smallText, {fontSize: 20}]}>
                    {item.Fullname}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => showCofnirmModal(item.Username)}>
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
