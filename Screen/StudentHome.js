import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  I18nManager,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import ThaheenStanding from '../assets/images/ThaheenStanding';
import ProgressIcon from '../assets/images/ProgressIcon';
import Badage from '../assets/images/badage';
import BadageGreyedOut from '../assets/images/badageGreyedOut';
import TextCard from '../Components/TextCard';
import HomeSection from '../Components/HomeSection';
import auth from '@react-native-firebase/auth';
import BottomBar from '../Components/BottomBar';
import {NavigationContainer} from '@react-navigation/native';
import {UserInfoContext} from '../auth/UserInfoContext';
import firestore from '@react-native-firebase/firestore';
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar';
import {getTopStudents} from '../helpers/getTopStudents.js';

const StudentHome = () => {
  const [TextList, setTextList] = useState([]);
  const [loading, setLoading] = useState(true);
  const {student} = React.useContext(UserInfoContext);
  const SName = student['_data']['Fullname'];
  const [fullName, setFullName] = useState('');
  const [studentRank, setStudentRank] = useState(100);
  const [StudentProgress, setStudentProgress] = useState([]);
  var color = 0;
  var darkercolor = 0;
  const studentTitles = ['الطالب المميز', 'الطالب الذكي', 'الطالب المبدع'];

  const progressDarkercolors = ['#EE7C60', '#84CCEA', '#AFC3D6'];
  const progressColors = ['#FBE5DA', '#D5EEF8', '#D8E2EB'];

  const EngToArabicNum = num => {
    var str = '' + num;
    return str.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  };

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

  useEffect(() => {
    const studentsInfo = firestore()
      .collection('Student')
      .doc(student ? student.id : route.params.studentID)
      .onSnapshot(snapshot => {
        setFullName(snapshot.data().Fullname);
      });
    return studentsInfo;
  }, []);

  useEffect(() => {
    const studentClasses = firestore()
      .collection('ClassCommunity')
      .where('StudentList', 'array-contains', student.data().Username)
      .onSnapshot(querySnapshot => {
        const progress = [];

        querySnapshot.forEach(documentSnapshot => {
          fetchStudentRank(documentSnapshot.id);
          // Search for class assigments

          firestore()
            .collection('Instructor Text')
            .where('ClassId', '==', documentSnapshot.id)
            .get()
            .then(innerquerySnapshot => {
              var score = 0;
              // querySnapshot : all assigments in one class
              innerquerySnapshot.forEach(innerdocumentSnapshot => {
                if (innerdocumentSnapshot.data().Feedback[student.id] != null) {
                  score =
                    score +
                    innerdocumentSnapshot.data().Feedback[student.id].score;
                }
              });

              progress.push({
                classname: documentSnapshot.data().Name,
                score: score / innerquerySnapshot.size,
              });
            });
        });
        setStudentProgress(progress);
      });

    return () => studentClasses();
  }, []);

  const fetchStudentRank = useCallback(async classId => {
    const data = await getTopStudents(classId);
    var studentIndex = data.findIndex(
      studentScore => studentScore['id'] === student.id,
    );
    if (studentIndex != -1 && studentIndex < studentRank) {
      setStudentRank(studentIndex);
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        ...(Platform.OS === 'android' ? {paddingTop: 20} : null),
      }}>
      <FocusAwareStatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent
      />
      <ScrollView>
        {/* start top container */}
        <View style={{padding: 30}}>
          <View
            style={{
              backgroundColor: '#DAE2E9',
              borderRadius: 25,
              paddingHorizontal: 25,
            }}>
            <Text
              style={[
                TitleStyles.sectionTitle,
                {textAlign: 'left', fontWeight: null},
              ]}>
              مرحبًا {fullName}
            </Text>
            <Text
              style={[
                TitleStyles.subTitle,
                I18nManager.isRTL ? {marginLeft: 60} : {marginRight: 60},
                {fontFamily: 'AJannatLT-Bold'},
              ]}>
              المستوى: ممتاز
            </Text>
            {studentRank < 3 ? (
              <Text
                style={[
                  TitleStyles.subTitle,
                  I18nManager.isRTL ? {marginLeft: 60} : {marginRight: 60},
                  {fontFamily: 'AJannatLT-Bold', marginBottom: 20},
                ]}>
                اللقب:
                {studentTitles[studentRank]}
              </Text>
            ) : (
              <Text
                style={[
                  TitleStyles.subTitle,
                  I18nManager.isRTL ? {marginLeft: 60} : {marginRight: 60},
                  {fontFamily: 'AJannatLT-Bold', marginBottom: 20},
                ]}>
                اللقب: لم يحدد بعد
              </Text>
            )}
          </View>

          <ThaheenStanding
            style={[
              {position: 'absolute', bottom: 0},
              I18nManager.isRTL ? {left: -20} : {right: -20},
            ]}
            width={139}
            height={139}
          />
          {studentRank < 3 ? (
            <Badage
              style={[
                {position: 'absolute', bottom: 10},
                I18nManager.isRTL ? {right: 0} : {left: 0},
              ]}
            />
          ) : (
            <BadageGreyedOut
              style={[
                {position: 'absolute', bottom: 10},
                I18nManager.isRTL ? {right: 0} : {left: 0},
              ]}
            />
          )}
        </View>
        {/* end top container */}

        {/* start mid container */}
        <HomeSection title="نصوصي" iconName="Plus" type="text" />

        {TextList != 0 && (
          <FlatList
            style={{flexGrow: 0}}
            data={TextList.slice(0, 3)}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            scrollEnabled
            renderItem={({item}) => (
              <TouchableOpacity>
                <TextCard
                  title={item.TextHead}
                  textID={item.key}
                  doneRecite={item.Feedback.trial}
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
              لم تضيف اي نص بعد{' '}
            </Text>
          </View>
        )}
        {/* end mid container */}

        {/* start bottom container */}
        <HomeSection title="مستوى تقدمي" iconName="Trophy" />

        <View
          style={[
            {
              borderRadius: 25,
              marginLeft: 25,
              marginRight: 25,
              padding: 15,
              paddingVertical: StudentProgress != 0 ? 10 : 50,
              backgroundColor: 'white',
              marginBottom: Platform.OS === 'ios' ? 100 : 90,
            },
            TitleStyles.SoftShadow,
          ]}>
          {StudentProgress == 0 && (
            <Text
              style={[
                TitleStyles.sectionTitle,
                {fontSize: 24, fontWeight: null},
              ]}>
              لم تنضم إلى أي صفوف بعد{' '}
            </Text>
          )}

          {StudentProgress != 0 && (
            <FlatList
           
              data={StudentProgress.slice(0, 3)}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: progressColors[color++ % 3],
                    marginTop: 20,
                    borderRadius: 25,
                  }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          progressDarkercolors[darkercolor++ % 3],
                        width:  item.score<50? '50%':item.score+'%', borderRadius:25, flexDirection: 'row'
                      }}>
                      <ProgressIcon
                      style={{
                        left:5,
                        top:5
                      }}
                       />
                  <Text
                    style={[
                      TitleStyles.sectionTitle,
                      {
                        marginLeft:10,
                        fontSize: 18,
                        fontWeight: null,
                        textAlign: 'left',
                        color: 'white',
                      },
                    ]}>
                    {item.classname} {EngToArabicNum(item.score)}%
                  </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* end bottom container */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentHome;
