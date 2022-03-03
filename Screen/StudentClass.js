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

const StudentClass = () => {
  const [AccessModalVisible, setAccessModalVisible] = useState(false);
  const [ClassList, setClassList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Exist, setExist] = useState('false');
  const {student} = React.useContext(UserInfoContext);

  let colors = ['#F8D3C1', '#F3DAAB'];
  let i = 0;

  useEffect(() => {
    const classcomm = firestore()
      .collection('ClassCommunity')
      .where('StudentList', 'array-contains', student.data().Username)
      .onSnapshot(querySnapshot => {
        const StudentClassroom = [];
        querySnapshot.forEach(documentSnapshot => {
          StudentClassroom.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
            color: colors[i++ % 2],
          });
        });
        setClassList(StudentClassroom);
      });
    return classcomm;
  }, []);

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
      <Text
        style={[
          TitleStyles.HeaderTitle,
          {
            textAlign: I18nManager.isRTL ? 'left' : 'right',
            marginLeft: 50,
            fontSize: 35,
          },
        ]}>
        فصلي
      </Text>

      {ClassList != 0 && (
        <FlatList
          numColumns={2}
          style={{height: '85%'}}
          data={ClassList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                top: 50,
                marginTop: 20,
                marginLeft: 30,
              }}>
              <ClassCard title={item.Name} color={item.color} />
            </TouchableOpacity>
          )}
        />
      )}

      {ClassList == 0 && (
        <View
          style={[
            {
              borderRadius: 25,
              marginLeft: 25,
              marginTop: 160,
              marginRight: 25,
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
            لم تنضم إلى أي صفوف بعد
          </Text>
        </View>
      )}

      <ThaheenMini
        width={200}
        style={[
          {
            position: 'absolute',
            bottom: 85,
            right: 10,
          },
        ]}
      />
      <TouchableOpacity
        style={[
          TitleStyles.Button,
          {
            position: 'absolute',
            bottom: 100,
            backgroundColor: '#DAE2E9',
            alignSelf: 'center',
            width: 300,
            marginBottom: 10,
          },
        ]}
        onPress={() => {
          setAccessModalVisible(!AccessModalVisible);
          console.log('after show access modal call');
        }}>
        <Text style={TitleStyles.ButtonText}>إضافة فصل جديد</Text>
      </TouchableOpacity>

      {AccessModalVisible ? (
        <AccessModel
          modalVisible={AccessModalVisible}
          setModalVisible={setAccessModalVisible}
          studentID={student.id}
          type={'class'}
        />
      ) : null}
    </SafeAreaView>
  );
};
export default StudentClass;
