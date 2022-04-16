import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import Ombre from '../assets/images/OmbreBackground.svg';
import Homework from '../assets/images/homework.svg';
import InfoCard from '../assets/images/infoCard.svg';
import Unlock from '../assets/images/UnlockEclipse.svg';
import Plus from '../assets/images/Plus.svg';
import BackButton from '../Components/BackButton';
import InsCardBackground from '../assets/images/InsCardBackground.svg';
import BlueGardiantModal from '../assets/images/BlueGardiantModal.svg';
import InsClassCard from '../Components/InsClassCard.js';
import AssignmentCard from '../Components/AssignmentCard.js';

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Icon from '../assets/images/more.svg';
import ConfirmModel from '../Components/ConfirmModel';
import SuccessModel from '../Components/SuccessModel';
import ClassInputFields from '../Components/ClassInputFields';
import AddChildModel from '../Components/AddChildModel';
import TextType from '../Components/TextType';
import Close from '../assets/images/Close.svg';

import firestore from '@react-native-firebase/firestore';

const InsClassInfo = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [numOfStudents, setNumOfStudents] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  const [ConfirmmodalVisible, setConfirmmodalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editClassVisible, setEditClassVisible] = useState(false);
  const [AddmodalVisible, setAddmodalVisible] = useState(false);
  const [viewAllHwVisible, setViewAllHwVisible] = useState(false);

  const [assignmentsList, setAssignmentsList] = useState([]);

  const [textTypeVisibal, setTextTypeVisibal] = useState(false);
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
            setName(snapshot.data().Name);
            setStudentsList(snapshot.data().StudentList);
            setPasscode(snapshot.data().Passcode);
            setNumOfStudents(snapshot.data().StudentList.length);
          }
        });
      return classInfo;
    }, []);
  }

  useEffect(() => {
    const classAssignments = firestore()
      .collection('Instructor Text')
      .where('ClassId', '==', route.params.classKey)
      .onSnapshot(querySnapshot => {
        const assignments = []
        querySnapshot.forEach(documentSnapshot => {
          assignments.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          })
        })
        setAssignmentsList(assignments)
      })
    return classAssignments
  }, [])


  const setStudentArray = userArray => {
    firestore()
      .collection('ClassCommunity')
      .doc(route.params.classKey)
      .update({
        StudentList: studentsList.concat(userArray),
      });
  };

  //   console.log(studentsList)
  const deleteClass = classID => {
    setConfirmmodalVisible(!ConfirmmodalVisible);
    firestore()
      .collection('ClassCommunity')
      .doc(classID)
      .delete()
      .then(() => setModalVisible(!modalVisible));

    firestore()
      .collection('Instructor Text')
      .where('ClassId', '==', classID)
      .get()
      .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => documentSnapshot.ref.delete())
      })
  };

  const EngToArabicNum = num => {
    var str = '' + num
    return str.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
  }

  return (
    <MenuProvider>
      <View style={{backgroundColor: '#FFF', height: '100%'}}>
        <SafeAreaView style={{backgroundColor: '#FFF'}}>
          <Ombre style={[{position: 'absolute', top: 0}]} />

          <StatusBar backgroundColor="#DAE2E9" translucent />
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
              animationType="slide"
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

          {AddmodalVisible ? (
            <AddChildModel
              modalVisible={AddmodalVisible}
              setModalVisible={setAddmodalVisible}
              sentFunction={setStudentArray}
            />
          ) : null}

          <TextType
            modalVisible={textTypeVisibal}
            setModalVisible={setTextTypeVisibal}
            classKey={route.params.classKey}
            keyWord={'class'}
            callBackFunction={() => setTextTypeVisibal(!textTypeVisibal)}
          />
          {viewAllHwVisible ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={viewAllHwVisible}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(52, 52, 52, 0.5)',
                  alignItems: 'center',
                }}>
                <View style={{marginTop: 40, width: '90%'}}>
                  <Homework
                    width={85}
                    height={85}
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      alignSelf: 'center',
                    }}
                  />
                  <View
                    style={[
                      TitleStyles.SoftShadow,
                      {
                        borderRadius: 25,
                        marginTop: 40,
                        height: '90%',

                        backgroundColor: 'white',
                        paddingBottom: 20,
                      },
                    ]}>
                    <BlueGardiantModal
                      height={605}
                      style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        transform: [{scaleX: 1.22}],
                      }}
                    />

                    {assignmentsList.length == 0 ? (
                      <View>
                      <Text
                        style={[
                          TitleStyles.NotAvailableAlert,
                          {
                            marginTop: 50,
                            top: 0,
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                          },
                        ]}>
                        لم تضف أي واجب بعد
                      </Text>
                      <Close
                          height="40"
                          width="40"
                          style={[{position: 'absolute', top: 20, left: 20}]}
                          onPress={() => setViewAllHwVisible(!viewAllHwVisible)}
                        />
                        </View>
                    ) : (
                      <View>
                        <Text
                          style={[
                            TitleStyles.HeaderTitle,
                            {marginTop: 50, textAlign: 'center'},
                          ]}>
                          الواجبات
                        </Text>
                        <Close
                          height="40"
                          width="40"
                          style={[{position: 'absolute', top: 20, left: 20}]}
                          onPress={() => setViewAllHwVisible(!viewAllHwVisible)}
                        />
                        <FlatList
                          style={[{padding: 10, height: '80%'}]}
                          data={assignmentsList}
                          numColumns={2}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({item, index}) => (
                            <AssignmentCard
                              title={item.TextHead}
                              textID={item.key}
                              index={index}
                              deleteOption={true}
                            />
                          )}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
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
                {EngToArabicNum(assignmentsList.length)}
              </Text>
            </View>

            <View style={TitleStyles.InstructorSubCard}>
              <Unlock />
              <Text style={TitleStyles.smallText}> رمز الدخول </Text>
              <Text style={TitleStyles.smallText}> {EngToArabicNum(passcode)} </Text>
            </View>

            <View style={TitleStyles.InstructorSubCard}>
              <InfoCard />
              <Text style={TitleStyles.smallText}> الطلاب </Text>
              <Text style={TitleStyles.smallText}> {EngToArabicNum(numOfStudents)} </Text>
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
            <View style={{position: 'absolute', right: 20, top: 10, zIndex: 2}}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  setTextTypeVisibal(!textTypeVisibal);
                }}>
                <Plus />
                <Text style={[TitleStyles.smallText]}>إضافة واجب</Text>
              </TouchableOpacity>
            </View>

            <View style={{position: 'absolute', left: 20, top: 10, zIndex: 2}}>
              <TouchableOpacity
                onPress={() => setViewAllHwVisible(!viewAllHwVisible)}>
                <Text style={[TitleStyles.smallText]}>عرض الكل</Text>
              </TouchableOpacity>
            </View>

            <View style={{position: 'absolute', right: -10}}>
              {/* <InsClassCard color='#EECC55' title='حفظ سورة الفلق' students={[]}  />  */}

              {assignmentsList.length == 0 ? (
                <Text style={[TitleStyles.NotAvailableAlert, {top: 70}]}>
                  لم تضف أي واجب بعد
                </Text>
              ) : (
                <FlatList
                  style={{marginTop: 50, width: 330, marginLeft: 25}}
                  data={assignmentsList.slice(0, 4)}
                  horizontal={true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <AssignmentCard
                      title={item.TextHead}
                      textID={item.key}
                      index={index}
                    />
                  )}
                />
              )}
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
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => {
                  setAddmodalVisible(!AddmodalVisible);
                }}>
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
                      studentsList: studentsList,
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
  );
};
export default InsClassInfo;
