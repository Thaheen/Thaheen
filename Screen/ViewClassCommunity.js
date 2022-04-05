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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RTLlayout from '../Styles/RTLlayout';
import {UserInfoContext} from '../auth/UserInfoContext';
import BackButton from '../Components/BackButton.js';
import Scoreboard from '../assets/images/ClassScoreboard.svg';
import HomeworkIcon from '../assets/images/Book.svg';
import TextCard from '../Components/TextCard';


const StudentClass = ({navigation, route}) => {
  const [className, setclassName] = useState('');
  const [AssignmentList, setAssignmentList] = useState([]);
  const [StudentList, setStudentList] = useState([]);
  const [InstructorID, setInstructorID] = useState('');
  const [TextList, setTextList] = useState([]);
  const [loading, setLoading] = useState(true);
  const {student} = React.useContext(UserInfoContext);
  

  let colors = ['#DAE2E9', '#FAE2D7'];
  let i = 0;

  console.log(route.params.ClassCID)
  useEffect(() => {
    const classcomm = firestore()
      .collection('ClassCommunity')
      .doc(route.params.ClassCID)
      .onSnapshot(querySnapshot => {
        setclassName(querySnapshot.data().Name);
      });
    return classcomm;
  }, []);

  useEffect(() => {
    const textAssignment = firestore()
      .collection('Instructor Text')
      .where('ClassId', '==', route.params.ClassCID)
      .onSnapshot(querySnapshot => {
        const homework = [];

        querySnapshot.forEach(documentSnapshot => {
          homework.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
            color: colors[i++ % 2],
          });
        });
        setTextList(homework);
        setLoading(false);
      });
    return () => textAssignment();
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
        {className}
      </Text>
      <BackButton />
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          top:80
        }}>
        <Scoreboard />
      </TouchableOpacity>

      {TextList != 0 && (
        <FlatList
          style={{height: '85%', top: 80}}
          data={TextList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{           
                
                flexDirection: 'row', 
                justifyContent:'center',
                alignItems: 'center'
              }}
              >
              <TextCard title={item.TextHead} textID={item.key} doneRecite={0}
              />
            </TouchableOpacity>
          )}
        />
      )}

      {TextList == 0 && (
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
            لا يوجد واجب حاليا
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
export default StudentClass;
