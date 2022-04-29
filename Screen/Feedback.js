import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import Refresh from '../assets/images/Refresh.svg';
import Confetti from '../assets/images/Confetti.svg';
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar';
import Close from '../assets/images/Close.svg';
import {StackActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {UserInfoContext} from '../auth/UserInfoContext';

const Feedback = ({navigation, route}) => {
  const {width, height} = Dimensions.get('window');
  const {student} = React.useContext(UserInfoContext);
  const [score, setScore] = useState(100);
  const [trial, setTrial] = useState(100);
  const [textBody, setTextBody] = useState();
  const [textHead, setTextHead] = useState();
  const mistakes = route.params.mistakesNum;
  const totalWords = route.params.totalWords;

  console.log(mistakes + '+' + totalWords);

  useEffect(() => {
    const mistakesRate = Math.round((mistakes / totalWords) * 100);
    setScore(100 - mistakesRate);

    //if its student text
    firestore()
      .collection('Student Text')
      .doc(route.params.textID)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          if (snapshot.get('Feedback') == null) {
            //student havent recited before
            setTrial(1);
            snapshot.ref.update({
              Feedback: {
                score: 100 - mistakesRate,
                trial: 1,
                mistakes: mistakes,
              },
            });
          } else {
            if (snapshot.data().Feedback.trial < 3) {
              //student have recited before
              setTrial(snapshot.data().Feedback.trial + 1);
              snapshot.ref.update({
                Feedback: {
                  score: 100 - mistakesRate,
                  trial: snapshot.data().Feedback.trial + 1,
                  mistakes: mistakes,
                },
              });
            }
          }
        }
      });

    //if its instructor text
    firestore()
      .collection('Instructor Text')
      .doc(route.params.textID)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          const FeedbackField = snapshot.data().Feedback;
          if (snapshot.data().Feedback[student.id] == null) {
            //student havent recited before
            setTrial(1);
            FeedbackField[student.id] = {
              score: 100 - mistakesRate,
              trial: 1,
              mistakes: mistakes,
            };
            snapshot.ref.update({
              Feedback: FeedbackField,
            });
          } else {
            //student have recited before
            var studentIndex = snapshot.data().Feedback[student.id];
            if (studentIndex.trial < 3) {
              setTrial(studentIndex.trial + 1);
              FeedbackField[student.id] = {
                score: 100 - mistakesRate,
                trial: studentIndex.trial + 1,
                mistakes: mistakes,
              };
              snapshot.ref.update({
                Feedback: FeedbackField,
              });
            }
          }
        }
      });
  }, []);

  const EngToArabicNum = num => {
    var str = '' + num;
    return str.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: '#DAE2E9'}}>
      <FocusAwareStatusBar backgroundColor="#DAE2E9" barStyle="dark-content" />
      <View
        style={{
          position: 'absolute',
        }}>
        <Confetti />
      </View>
      <Close
        height="40"
        width="40"
        style={[{position: 'absolute', top: 40, left: 20, zIndex: 2}]}
        onPress={() => navigation.dispatch(StackActions.pop(3))}
      />
      <View style={{marginTop: 160, alignItems: 'center'}}>
        <View
          style={[
            TitleStyles.shadowOffset,
            {
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              width: 230,
              height: 230,

              borderRadius: 25,
            },
          ]}>
          <Text style={TitleStyles.sectionTitle}>النتيجة</Text>
          <Text
            style={[TitleStyles.subTitle, {textAlign: 'center', fontSize: 24}]}>
            الدرجة الكلية: {EngToArabicNum(score)}
          </Text>
          <Text
            style={[TitleStyles.subTitle, {textAlign: 'center', fontSize: 24}]}>
            عدد الأخطاء: {EngToArabicNum(mistakes)}
          </Text>
        </View>

        {trial < 3 ? (
          <TouchableOpacity
            style={[
              TitleStyles.Button,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#F5C5AD',
                alignSelf: 'center',
                width: 300,
                marginTop: 60,
              },
            ]}
            onPress={() =>
              navigation.navigate('ReciteSession', {
                TextID: route.params.textID,
              })
            }>
            <Text style={TitleStyles.ButtonText}>إعادة التسميع</Text>
            <Refresh />
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};
export default Feedback;
