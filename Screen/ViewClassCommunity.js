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
import Deadline from '../assets/images/DeadlineIconOnly.svg';

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

  const EngToArabicNum = num => {
    var str = '' + num;
    return str.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  };

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
            arabicDate: 'undefined',
            color: colors[i++ % 2],
          });
        });
        setTextList(homework);
        setLoading(false);
      });
    return () => textAssignment();
  }, []);

  TextList.forEach(element => {
    var timestamp = element.Deadline.seconds * 1000;
    var date = new Date(timestamp);
    element.arabicDate =
      EngToArabicNum(date.getFullYear()) +
      '/' +
      EngToArabicNum(date.getMonth() + 1) +
      '/' +
      EngToArabicNum(date.getDate());
  });

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
          top: 80,
        }}
        onPress={() => {
          navigation.navigate('InstructorScoreboard', {
            classId: route.params.ClassCID,
          });
        }}>
        <Scoreboard />
      </TouchableOpacity>

      {TextList != 0 && (
        <FlatList
          style={{
            height: '85%',
            top: 100,
          }}
          data={TextList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              style={{
                backgroundColor: item.color,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 30,
                marginTop: 10,
                width: 330,
                height: 150,
                borderRadius: 25,
              }}>
              <Text style={TitleStyles.sectionTitle}>{item.TextHead}</Text>
              <View
                style={{
                  flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Deadline />
                <Text style={TitleStyles.smallText}>
                  {' '}
                  موعد التسليم {item.arabicDate}{' '}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
                  justifyContent: 'space-between',
                }}>
                {(item.Feedback[student.id] == null ||
                  item.Feedback[student.id].trial < 3) && (
                  <TouchableOpacity
                    style={[
                      I18nManager.isRTL ? {marginRight: 10} : {marginLeft: 10},
                      {
                        backgroundColor: '#FFFFFF',
                        borderRadius: 10,
                        paddingHorizontal: 32,
                      },
                    ]}
                    onPress={() => {
                      navigation.navigate('MemorizationSession', {
                        TextID: item.key,
                      });
                    }}>
                    <Text style={TitleStyles.smallText}>ابدأ المراجعة</Text>
                  </TouchableOpacity>
                )}

                {item.Feedback[student.id] != null &&
                  item.Feedback[student.id].trial >= 3 && (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 10,
                        paddingHorizontal: 32,
                      }}
                      onPress={() =>
                        navigation.navigate('Feedback', {
                          textID: item.key,
                          totalWords: item.TextBody.replace(
                            /إ|أ|آ/g,
                            'ا',
                          ).split(' ').length,
                          mistakesNum: item.Feedback[student.id].mistakes,
                        })
                      }>
                      {console.log('body:' + item.TextBody)}
                      <Text style={TitleStyles.smallText}>استعراض النتائج</Text>
                    </TouchableOpacity>
                  )}

                {(item.Feedback[student.id] == null ||
                  item.Feedback[student.id].trial < 3) && (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 10,
                      paddingHorizontal: 32,
                    }}
                    onPress={() => {
                      navigation.navigate('ReciteSession', {TextID: item.key});
                    }}>
                    <Text style={TitleStyles.smallText}>ابدأ التسميع</Text>
                  </TouchableOpacity>
                )}
              </View>
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
