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
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import Top2Lines from '../assets/images/top2Lines.svg';
import BackButton from '../Components/BackButton.js';
import TopBox from '../assets/images/TopBox.svg';
import AnimalPicker from '../Screen/AnimalPicker.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ChildList = ({navigation}) => {
  const user = auth().currentUser;
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const students = firestore()
      .collection('Student')
      .where('ParentID', '==', user.uid)
      .onSnapshot(querySnapshot => {
        const child = [];

        querySnapshot.forEach(documentSnapshot => {
          child.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setChildren(child);
        setLoading(false);
      });
    return () => students();
  }, []);

  const onSignout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <TopBox style={[{position: 'absolute', top: 0}]} />
      <BackButton />
      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          {position: 'absolute', top: 0, left: 0},
        ]}
      />
      <Text
        style={[
          TitleStyles.HeaderTitle,
          {textAlign: 'right', paddingRight: 50},
        ]}>
        من أنت؟
      </Text>
      <FlatList
        style={[{marginTop: 100, height: '55%'}]}
        data={children}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              console.log(item.key);
            }}>
            <View style={[TitleStyles.childItem]}>
              <View style={[TitleStyles.innerChildItem]}>
                <Text style={[TitleStyles.childItemText]}>{item.Fullname}</Text>
              </View>
              <AnimalPicker />
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[
          TitleStyles.Button,
          {
            backgroundColor: '#DAE2E9',
            alignSelf: 'center',
            width: 300,
          },
        ]}
        onPress={() => {
          navigation.navigate('StudentProfile');
        }}>
        <Text style={TitleStyles.ButtonText}>الملف الشخصي</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          TitleStyles.Button,
          {
            backgroundColor: '#DAE2E9',
            alignSelf: 'center',
            width: 300,
          },
        ]}
        onPress={() => {
          navigation.navigate('AddChildAccount');
        }}>
        <Text style={TitleStyles.ButtonText}>إضافة حساب طفل جديد</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          TitleStyles.Button,
          {
            backgroundColor: '#DAE2E9',
            alignSelf: 'center',
            width: 300,
          },
        ]}
        onPress={() => {
          navigation.navigate('RecordVoice');
        }}>
        <Text style={TitleStyles.ButtonText}>تسجيل صوت جديد</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          TitleStyles.Button,
          {
            backgroundColor: '#DAE2E9',
            alignSelf: 'center',
            width: 300,
          },
        ]}
        onPress={onSignout}>
        <Text style={TitleStyles.ButtonText}>تسجيل الخروج</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChildList;
