import React, {useState, useEffect} from 'react';
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
import Badage from '../assets/images/badage';
import TextCard from '../Components/TextCard';
import HomeSection from '../Components/HomeSection';
import auth from '@react-native-firebase/auth';
import BottomBar from '../Components/BottomBar';
import {NavigationContainer} from '@react-navigation/native';
import {UserInfoContext} from '../auth/UserInfoContext';
import firestore from '@react-native-firebase/firestore';
const StudentHome = () => {
  const [TextList, setTextList] = useState([]);
  const [ClassList, setClassList] = useState('');
  const [loading, setLoading] = useState(true);
  const {student} = React.useContext(UserInfoContext);

  useEffect(() => {
    const textAssignment = firestore()
      .collection('Text')
      .where('StudentID', '==', student.id)
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
    const classcomm = firestore()
      .collection('ClassCommunity')
      .where('StudentList', 'array-contains', student.data().Username)
      .onSnapshot(querySnapshot => {
        const StudentClassroom = [];
        querySnapshot.forEach(documentSnapshot => {
          StudentClassroom.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setClassList(StudentClassroom);
      });
    return classcomm;
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <StatusBar backgroundColor="#FFFFFF" />

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
              I18nManager.isRTL ? {textAlign: 'left'} : {textAlign: 'right'},
              {fontWeight: null, textAlign: null},
            ]}>
            مرحبًا {student.data().Fullname}
          </Text>
          <Text
            style={[
              TitleStyles.subTitle,
              I18nManager.isRTL ? {marginLeft: 60} : {marginRight: 60},
              {fontFamily: 'AJannatLT-Bold'},
            ]}>
            المستوى: ممتاز
          </Text>
          <Text
            style={[
              TitleStyles.subTitle,
              I18nManager.isRTL ? {marginLeft: 60} : {marginRight: 60},
              {fontFamily: 'AJannatLT-Bold', marginBottom: 20},
            ]}>
            اللقب: الطالب الذكي
          </Text>
        </View>

        <ThaheenStanding
          style={[
            {position: 'absolute', bottom: 0},
            I18nManager.isRTL ? {left: -20} : {right: -20},
          ]}
          width={139}
          height={139}
        />
        <Badage
          style={[
            {position: 'absolute', bottom: 10},
            I18nManager.isRTL ? {right: 0} : {left: 0},
          ]}
        />
      </View>
      {/* end top container */}

      {/* start mid container */}
      <HomeSection title="نصوصي" iconName="Plus" />

      {TextList != 0 && (
        <FlatList
          data={TextList}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          scrollEnabled
          renderItem={({item}) => (
            <TouchableOpacity>
              <TextCard title={item.TextHead} />
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
            paddingVertical: 50,
            backgroundColor: 'white',
          },
          TitleStyles.SoftShadow,
        ]}>
        <Text
          style={[TitleStyles.sectionTitle, {fontSize: 24, fontWeight: null}]}>
          لم تنضم إلى أي صفوف بعد{' '}
        </Text>
      </View>

      {/* end bottom container */}

      {/* <BottomBar /> */}
    </SafeAreaView>
  );
};

export default StudentHome;
