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
import TextCard from '../Components/TextCard';

const StudentClass = () => {
  const [ClassList, setClassList] = useState('');
  const [ClassComm, setClassComm] = useState('');
  const [loading, setLoading] = useState(true);
  const [Exist, setExist] = useState('false');
  const {student} = React.useContext(UserInfoContext);

  useEffect(() => {
    const classcomm = firestore()
      .collection('ClassCommunity')
      .onSnapshot(querySnapshot => {
        const StudentClass = [];
        querySnapshot.forEach(documentSnapshot => {
          firestore()
            .collection('ClassCommunity')
            .doc(documentSnapshot.id)
            .collection('StudentList')
            .onSnapshot(snapshot => {
              snapshot.forEach(queryDocumentSnapshot => {
                if (
                  queryDocumentSnapshot.data().StudentUsername ==
                  student.data().Username
                ) {
                  StudentClass.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                  });
                 
                } 
              });
            }); 
        });
        setClassList(StudentClass);
      });
    return classcomm;
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <StatusBar hidden />
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
          data={ClassList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity>
              <TextCard title={item.Name} />
              {console.log(item.Name)}
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
            bottom: 25,
            right: 10,
          },
        ]}
      />
      <TouchableOpacity
        style={[
          TitleStyles.Button,
          {
            position: 'absolute',
            bottom: 10,
            backgroundColor: '#DAE2E9',
            alignSelf: 'center',
            width: 300,
            marginBottom: 40,
          },
        ]}
        // onPress={onSignout}
      >
        <Text style={TitleStyles.ButtonText}>إضافة فصل جديد</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default StudentClass;
