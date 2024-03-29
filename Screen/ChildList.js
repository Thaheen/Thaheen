import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  View,
  Platform,
  I18nManager,
  Modal,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout';
import Top2Lines from '../assets/images/top2Lines.svg';
import BackButton from '../Components/BackButton.js';
import TopBox from '../assets/images/TopBox.svg';
import AnimalPicker from '../Screen/AnimalPicker.js';
import auth from '@react-native-firebase/auth';
import SuccessModel from '../Components/SuccessModel';
import firestore from '@react-native-firebase/firestore';
import AccessModel from '../Components/AccessModel';
import ConfirmModel from '../Components/ConfirmModel';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Icon from '../assets/images/more.svg';

const ChildList = ({navigation}) => {
  const user = auth().currentUser;
  const [children, setChildren] = useState([]);
  const [Cusername, setCusername] = useState();
  const [loading, setLoading] = useState(true);
  const [ChildID, setChildID] = useState('');
  //Success modal **should be moved to the child list file**
  const [modalVisible, setModalVisible] = useState(false);

  //Confirm modal **should be moved to the child list file**
  const [ConfirmmodalVisible, setConfirmmodalVisible] = useState(false);
  // Access passcode model
  const [AccessModalVisible, setAccessModalVisible] = useState(false);

  useEffect(() => {
    const students = firestore()
      .collection('Student')
      .where('ParentID', '==', user.uid)
      .onSnapshot(querySnapshot => {
        const child = [];

        querySnapshot.forEach(documentSnapshot => {
          child.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setChildren(child);
        setLoading(false);
      });
    return () => students();
  }, []);

  const onSignout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const setChild = (ChildID, ChildUser) => {
    setCusername(ChildUser);
    setChildID(ChildID);
    setConfirmmodalVisible(!ConfirmmodalVisible);
  };
  const deleteChildAccount = ChildID => {
    setConfirmmodalVisible(!ConfirmmodalVisible);
    console.log(ChildID);
    firestore()
      .collection('Student')
      .doc(ChildID)
      .delete()
      .then(() => {
        firestore()
          .collection('ClassCommunity')
          .where('StudentList', 'array-contains', Cusername)
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              documentSnapshot.ref
                .update({
                  StudentList: firestore.FieldValue.arrayRemove(Cusername),
                })
                .then(() => {
                  firestore()
                    .collection('Instructor Text')
                    .where('ClassId', '==', documentSnapshot.id)
                    .get()
                    .then(querySnapshot => {
                      querySnapshot.forEach(documentSnapshot => {
                        var AllFeedbacks = documentSnapshot.data().Feedback
                        delete AllFeedbacks[ChildID]
                        documentSnapshot.ref.update({
                          Feedback: AllFeedbacks,
                        })
                      })
                    })
                })
            })

          });
        setModalVisible(!modalVisible);
      });

    console.log(Cusername);
  };

  const showAcessModal = id => {
    setChildID(id);
    setAccessModalVisible(!AccessModalVisible);
  };

  return (
    <MenuProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          ...(Platform.OS === 'android' ? {paddingTop: 20} : null),
        }}>
        <StatusBar translucent backgroundColor="#DAE2E9" />

        <TopBox style={[{position: 'absolute', top: 0}]} />
        <Top2Lines
          style={[
            Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
            I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
          ]}
        />
        <Text
          style={[
            TitleStyles.HeaderTitle,
            {textAlign: I18nManager.isRTL ? 'left' : 'right', marginLeft: 40},
          ]}>
          أطفالي
        </Text>

        <SuccessModel
          message={'تم حذف الطفل بنجاح'}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        {AccessModalVisible ? (
          <AccessModel
            modalVisible={AccessModalVisible}
            setModalVisible={setAccessModalVisible}
            studentID={ChildID}
            type={'student'}
          />
        ) : null}
        {ConfirmmodalVisible ? (
          <ConfirmModel
            message={'هل انت متأكد من حذف الطفل؟'}
            modalVisible={ConfirmmodalVisible}
            setModalVisible={setConfirmmodalVisible}
            sentFunction={deleteChildAccount}
            ID={ChildID}
          />
        ) : null}

        {/*children.length*/}

        {children.length == 0 ? (
          <Text style={[TitleStyles.NotAvailableAlert]}>
            لم تضف اي حساب طفل بعد
          </Text>
        ) : null}

        <FlatList
          style={[{marginTop: 100, height: '55%'}]}
          data={children}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                console.log(item.key);
                showAcessModal(item.key);
                console.log('after show access modal call');
              }}>
              <View
                style={[
                  TitleStyles.childItem,
                  {
                    flex: 1,
                    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
                    justifyContent: 'space-between',
                  },
                ]}>
                <Menu
                  style={{
                    flexDirection: 'column',
                    padding: 15,
                    width: '30%',
                  }}
                  renderer={renderers.Popover}
                  rendererProps={{placement: 'bottom'}}>
                  <MenuTrigger>
                    <Icon width="100%" height="100%" />
                  </MenuTrigger>

                  <MenuOptions>
                    <MenuOption
                      onSelect={() =>
                        navigation.navigate('StudentProfile', {
                          studentID: item.key,
                          studentPic: item.pic,
                        })
                      }>
                      <Text> الملف الشخصي</Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={() =>
                        navigation.navigate('ResetPasscode', {
                          studentID: item.key,
                        })
                      }>
                      <Text>تحديث رمز الدخول</Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={() => setChild(item.key, item.Username)}>
                      <Text>حذف الطفل</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>

                <View style={[TitleStyles.innerChildItem]}>
                  <Text style={[TitleStyles.childItemText]}>
                    {item.Fullname}
                  </Text>
                </View>
                <AnimalPicker pic={item.pic} />
              </View>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          style={[
            TitleStyles.Button,
            {
              backgroundColor: '#DAE2E9',
              alignSelf: 'center',
              width: 300,
            },
          ]}
          onPress={() => {
            navigation.navigate('AddChildAccount');
          }}>
          <Text style={TitleStyles.ButtonText}>إضافة حساب طفل جديد</Text>
        </TouchableOpacity>

        {/* 
      <TouchableOpacity
          style={[
            TitleStyles.Button,
            {
              backgroundColor: '#DAE2E9',
              alignSelf: 'center',
              width: 300,
            },
          ]}
          onPress={() => {
            navigation.navigate('RecordVoice');
          }}>
          <Text style={TitleStyles.ButtonText}>تسجيل صوت جديد</Text>
        </TouchableOpacity>
      
      */}
        <TouchableOpacity
          style={[
            TitleStyles.Button,
            {
              backgroundColor: '#DAE2E9',
              alignSelf: 'center',
              width: 300,
            },
          ]}
          onPress={onSignout}>
          <Text style={TitleStyles.ButtonText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </MenuProvider>
  );
};

export default ChildList;
