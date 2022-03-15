import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  I18nManager,
  Modal,
} from 'react-native'
import TitleStyles from '../Styles/Titles'
import Ombre from '../assets/images/OmbreBackground.svg'
import Homework from '../assets/images/homework.svg'
import InfoCard from '../assets/images/infoCard.svg'
import Unlock from '../assets/images/UnlockEclipse.svg'
import Plus from '../assets/images/Plus.svg'
import BackButton from '../Components/BackButton'
import InsCardBackground from '../assets/images/InsCardBackground.svg'
import InsClassCard from '../Components/InsClassCard.js'
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import Icon from '../assets/images/more.svg'
import ConfirmModel from '../Components/ConfirmModel'
import SuccessModel from '../Components/SuccessModel'
import ClassInputFields from '../Components/ClassInputFields'

import firestore from '@react-native-firebase/firestore'

const InsClassInfo = ({navigation, route}) => {
  const [name, setName] = useState('')
  const [passcode, setPasscode] = useState('')
  const [numOfStudents, setNumOfStudents] = useState('')
  const [studentsList, setStudentsList] = useState([])
  const [ConfirmmodalVisible, setConfirmmodalVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editClassVisible, setEditClassVisible] = useState(false)

  //======================= When homeworks are ready ====================
  //const [numOfHomeworks, setNumOfHomeworks] = useState('');
  //const [homeworks, setHomeworks] = useState([]);

  if (route.params.classKey) {
    useEffect(() => {
      const classInfo = firestore()
        .collection('ClassCommunity')
        .doc(route.params.classKey)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            setName(snapshot.data().Name)
            setStudentsList(snapshot.data().StudentList)
            setPasscode(snapshot.data().Passcode)
            setNumOfStudents(snapshot.data().StudentList.length)
          }
        })
      return classInfo
    }, [])
  }

  //   console.log(studentsList)
  const deleteClass = classID => {
    setConfirmmodalVisible(!ConfirmmodalVisible)
    firestore()
      .collection('ClassCommunity')
      .doc(classID)
      .delete()
      .then(() => setModalVisible(!modalVisible))
  }

  return (
    <MenuProvider>
      <View style={{backgroundColor: '#FFF', height: '100%'}}>
        <SafeAreaView style={{backgroundColor: '#FFF'}}>
          <Ombre style={[{position: 'absolute', top: 0}]} />

          <StatusBar backgroundColor='#DAE2E9' translucent />
          <BackButton />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: Platform.OS == 'ios' ? 0 : 20,
              marginLeft: 90,
            }}>
            <Text style={[TitleStyles.HeaderTitle]}>{name}</Text>
            <Menu
              style={{
                flexDirection: 'column',
                padding: 15,
                marginTop: 20,
              }}
              renderer={renderers.Popover}
              rendererProps={{placement: 'bottom'}}>
              <MenuTrigger>
                <Icon width={40} height={40} />
              </MenuTrigger>

              <MenuOptions
                customStyles={{optionsContainer: {borderRadius: 10}}}>
                <MenuOption
                  onSelect={() => setEditClassVisible(!editClassVisible)}>
                  <Text style={TitleStyles.smallText}>تعديل معلومات الفصل</Text>
                </MenuOption>

                <MenuOption
                  onSelect={() => setConfirmmodalVisible(!ConfirmmodalVisible)}>
                  <Text style={[TitleStyles.smallText, {color: '#C54822'}]}>
                    حذف الفصل
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          {ConfirmmodalVisible ? (
            <ConfirmModel
              message={'هل انت متأكد من حذف الفصل؟'}
              modalVisible={ConfirmmodalVisible}
              setModalVisible={setConfirmmodalVisible}
              sentFunction={deleteClass}
              ID={route.params.classKey}
            />
          ) : null}

          {modalVisible ? (
            <SuccessModel
              message={'تم حذف الفصل بنجاح'}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              goBackCalled={true}
            />
          ) : null}

          {editClassVisible ? (
            <Modal
              animationType='slide'
              transparent={true}
              visible={editClassVisible}>
              <ScrollView style={{backgroundColor: 'rgba(52, 52, 52, 0.5)'}}>
                <ClassInputFields
                  type={'update'}
                  callBackFunction={() =>
                    setEditClassVisible(!editClassVisible)
                  }
                  title={'تعديل الفصل'}
                  buttonText={'حفظ التعديلات'}
                  ID={route.params.classKey}
                />
              </ScrollView>
            </Modal>
          ) : null}

          {/* Start of class info card Section */}
          <View
            style={[
              TitleStyles.SoftShadow,
              TitleStyles.InstructorCard,
              {marginTop: 10},
            ]}>
            <View
              style={[TitleStyles.InstructorSubCard, {borderRightWidth: 0}]}>
              <Homework style={{width: 30, height: 10}} />
              <Text style={TitleStyles.smallText}> الواجبات </Text>
              <Text style={TitleStyles.smallText}>
                {' '}
                {/* Use numOfHomeworks Here */} 0{' '}
              </Text>
            </View>

            <View style={TitleStyles.InstructorSubCard}>
              <Unlock />
              <Text style={TitleStyles.smallText}> رمز الدخول </Text>
              <Text style={TitleStyles.smallText}> {passcode} </Text>
            </View>

            <View style={TitleStyles.InstructorSubCard}>
              <InfoCard />
              <Text style={TitleStyles.smallText}> الطلاب </Text>
              <Text style={TitleStyles.smallText}> {numOfStudents} </Text>
            </View>
          </View>
          {/* End of class info card Section */}

          {/* Start of Homework card Section */}
          <View
            style={[
              TitleStyles.SoftShadow,
              TitleStyles.InstructorCard,
              {padding: 0, marginTop: 20, height: 200},
            ]}>
            <InsCardBackground style={{zIndex: -1}} />
            <View style={{position: 'absolute', right: 20, top: 10}}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  navigation.navigate('RecordVoice', {
                    ClassID: route.params.classKey,
                    keyword: 'class',
                  })
                }}>
                <Plus />
                <Text style={[TitleStyles.smallText]}>إضافة واجب</Text>
              </TouchableOpacity>
            </View>

            <View style={{position: 'absolute', left: 20, top: 10, zIndex: 2}}>
              <TouchableOpacity>
                <Text style={[TitleStyles.smallText]}>عرض الكل</Text>
              </TouchableOpacity>
            </View>

            <View style={{position: 'absolute', right: -10}}>
              {/* <InsClassCard color='#EECC55' title='حفظ سورة الفلق' students={[]}  />  */}

              <Text style={[TitleStyles.NotAvailableAlert, {top: 70}]}>
                لم تضف أي واجب بعد
              </Text>
            </View>
          </View>

          {/* End of Homework card Section */}

          {/* Start of Students card Section */}
          <View
            style={[
              TitleStyles.SoftShadow,
              TitleStyles.InstructorCard,
              {
                padding: 0,
                marginTop: 20,
                height: 200,
                marginBottom: Platform.OS === 'ios' ? 100 : 90,
              },
            ]}>
            <InsCardBackground style={{zIndex: 0}} />
            <View style={{position: 'absolute', right: 20, top: 10, zIndex: 2}}>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Plus />
                <Text style={[TitleStyles.smallText]}>طلابي</Text>
              </TouchableOpacity>
            </View>

            <View style={{position: 'absolute', left: 20, top: 10, zIndex: 2}}>
              <TouchableOpacity>
                <Text
                  style={[TitleStyles.smallText]}
                  onPress={() =>
                    navigation.navigate('ClassAllStudents', {
                      classKey: route.params.classKey,
                    })
                  }>
                  عرض الكل
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{position: 'absolute', right: 20, top: 10}}>
              {studentsList.length == 0 ? (
                <View style={{position: 'absolute', right: 35}}>
                  <Text style={[TitleStyles.NotAvailableAlert, {top: 70}]}>
                    لا يوجد أي طالب في هذا الفصل{' '}
                  </Text>
                </View>
              ) : null}

              <FlatList
                style={[{marginTop: 30, height: '55%'}]}
                data={studentsList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity>
                    <View
                      style={[
                        TitleStyles.SoftShadow,
                        TitleStyles.InsStudentItem,
                      ]}>
                      <Text
                        style={[
                          TitleStyles.smallText,
                          {paddingRight: 10, paddingLeft: 10},
                        ]}>
                        {item} {'  '}●
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>

          {/* End of Students card Section */}
        </SafeAreaView>
      </View>
    </MenuProvider>
  )
}
export default InsClassInfo
