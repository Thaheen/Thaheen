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
import Top2Lines from '../assets/images/top2Lines.svg';
import TopBox from '../assets/images/TopBox.svg';
import ThaheenMini from '../assets/images/ThaheenMini.svg';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AccessModel from '../Components/AccessModel';
import RTLlayout from '../Styles/RTLlayout';
import {UserInfoContext} from '../auth/UserInfoContext';
import ClassCard from '../Components/ClassCard';
import BackButton from '../Components/BackButton.js';
import TextCard from '../Components/TextCard';
import ConfirmModel from '../Components/ConfirmModel';
import SuccessModel from '../Components/SuccessModel';

const StudentViewAllAssignment = ({navigation, route}) => {
    const [TextList, setTextList] = useState([]);
    const [ClassList, setClassList] = useState('');
    const [loading, setLoading] = useState(true);
    const {student} = React.useContext(UserInfoContext);
    const SName = student['_data']['Fullname'];
    const [fullName, setFullName] = useState('');
    const [ConfirmmodalVisible, setConfirmmodalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [textID, setTextID] = useState();

    useEffect(() => {
      const textAssignment = firestore()
        .collection('Student Text')
        .where('Studentid', '==', student.id)
        .onSnapshot(querySnapshot => {
          const homework = [];
  
          querySnapshot.forEach(documentSnapshot => {
            homework.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setTextList(homework);
          setLoading(false);
        });
      return () => textAssignment();
    }, []);

  const deleteText = textID => {
    setConfirmmodalVisible(!ConfirmmodalVisible);
    firestore()
      .collection('Student Text')
      .doc(textID)
      .delete()
      .then(() => {
        setModalVisible(!modalVisible);
      });
  };

  const showConfirmModal = (textID) => {
    setTextID(textID)
    setConfirmmodalVisible(!ConfirmmodalVisible);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        ...(Platform.OS === 'android' ? {paddingTop: 20} : null),
      }}>
      <StatusBar backgroundColor="#DAE2E9" translucent />

      <TopBox style={[{position: 'absolute', top: 0}]} />
      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
        ]}
      />
     <BackButton />
      <Text
        style={[
          TitleStyles.HeaderTitle,
          {
            textAlign: I18nManager.isRTL ? 'left' : 'right',
            marginLeft: 60,
            fontSize: 35,
          },
        ]}>
           نصوصي    
      </Text>

      {ConfirmmodalVisible ? (
        <ConfirmModel
          message={'هل انت متأكد من حذف الواجب؟'}
          modalVisible={ConfirmmodalVisible}
          setModalVisible={setConfirmmodalVisible}
          sentFunction={deleteText}
          ID={textID}
        />
      ) : null}

      {modalVisible ? (
        <SuccessModel
          message={'تم حذف الواجب بنجاح'}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          
        />
      ) : null}

      {TextList != 0 && (
        <FlatList
          style={{flexGrow: 0 , height:550 , marginTop:60}}
          data={TextList}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled
          renderItem={({item}) => (
              <View style={{justifyContent:'center' }}>
            <TouchableOpacity>
              <TextCard title={item.TextHead} textID={item.key} doneRecite={item.Feedback.trial} deleteOption={true} sentFunction={showConfirmModal} />
            </TouchableOpacity>
            </View>
          )}
        />
      )}

      {TextList == 0 && (
        <View
          style={[
            {
              borderRadius: 25,
              marginLeft: 25,
              marginRight: 25,
              marginTop:150,
              padding: 15,
              paddingVertical: 50,
              backgroundColor: 'white',
            },
            TitleStyles.SoftShadow,
          ]}>
          <Text
            style={[
              TitleStyles.sectionTitle,
              {fontSize: 24, fontWeight: null},
            ]}>
            لم تضيف اي نص بعد{' '}
          </Text>
        </View>
      )}

     

    </SafeAreaView>
  );
};
export default StudentViewAllAssignment;
