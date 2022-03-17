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


const StudentViewAllAssignment = ({navigation, route}) => {
    const [TextList, setTextList] = useState([]);
    const [ClassList, setClassList] = useState('');
    const [loading, setLoading] = useState(true);
    const {student} = React.useContext(UserInfoContext);
    const SName = student['_data']['Fullname'];
    const [fullName, setFullName] = useState('');
  
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


      {TextList != 0 && (
        <FlatList
          style={{flexGrow: 0 , height:550 , marginTop:60}}
          data={TextList}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled
          renderItem={({item}) => (
              <View style={{justifyContent:'center' }}>
            <TouchableOpacity>
              <TextCard title={item.TextHead} textID={item.key} />
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
