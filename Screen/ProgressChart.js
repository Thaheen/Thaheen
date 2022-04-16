import React, {useState, useEffect , useCallback} from 'react';
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
import ProgressIcon from '../assets/images/ProgressIcon';


const ProgressChart = ({navigation, route}) => {
    const [StudentProgress, setStudentProgress] = useState([]);
    const {student} = React.useContext(UserInfoContext);


    var color = 0;
    var darkercolor = 0;
    const progressDarkercolors = ['#EE7C60', '#84CCEA', '#AFC3D6'];
  const progressColors = ['#FBE5DA', '#D5EEF8', '#D8E2EB'];

  const EngToArabicNum = num => {
    var str = '' + num;
    return str.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  };
  const progress = [];
  
  useEffect(() => {

    const studentClasses = firestore()
      .collection('ClassCommunity')
      .where('StudentList', 'array-contains', student.data().Username)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          // Search for class assigments
        
          calcScore(
            progress,
            documentSnapshot.id,
            documentSnapshot.data().Name,
          );
        
        });
      });


    return () => studentClasses();
  }, []);
  

  const calcScore = useCallback(async (progress, classkey, name) => {
    const fetch = await firestore()
      .collection('Instructor Text')
      .where('ClassId', '==', classkey)
      .get()
      .then(innerquerySnapshot => {
        var score = 0;
        // querySnapshot : all assigments in one class
        innerquerySnapshot.forEach(innerdocumentSnapshot => {
          if (innerdocumentSnapshot.data().Feedback[student.id] != null) {
            score =
              score + innerdocumentSnapshot.data().Feedback[student.id].score;
          }
        });
        progress.push({
          classname: name,
          score: (score / (innerquerySnapshot.size*100))*100,
        });
        setStudentProgress(progress);
        console.log(StudentProgress)
      });
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
           مستوى تقدمي    
      </Text>



      <View
          style={[
            {
              borderRadius: 25,
              marginTop:100,
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
              data={StudentProgress}
           
              scrollEnabled={true}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: progressColors[color++ % 3],
                    marginTop: 20,
                    borderRadius: 25,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: progressDarkercolors[darkercolor++ % 3],
                      width: item.score < 50 ? '50%' : item.score + '%',
                      borderRadius: 25,
                      flexDirection: 'row',
                    }}>
                    <ProgressIcon
                      style={{
                        left: 5,
                        top: 5,
                      }}
                    />
                    <Text
                      style={[
                        TitleStyles.sectionTitle,
                        {
                          marginLeft: 10,
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

    </SafeAreaView>
  );
};
export default ProgressChart;

