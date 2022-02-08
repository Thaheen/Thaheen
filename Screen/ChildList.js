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
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout';
import Top2Lines from '../assets/images/top2Lines.svg';
import BackButton from '../Components/BackButton.js';
import TopBox from '../assets/images/TopBox.svg';
import AnimalPicker from '../Screen/AnimalPicker.js';
import auth from '@react-native-firebase/auth';
import SuccessModel from '../Components/SuccessModel';
import firestore from '@react-native-firebase/firestore';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Icon from '../assets/images/more.svg';

const ChildList = ({navigation}) => {
  const user = auth().currentUser;
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  //Success modal **should be moved to the child list file**
  const [modalVisible, setModalVisible] = useState(false);

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

  const deleteChildAccount = ChildID => {
    firestore()
      .collection('Student')
      .doc(ChildID)
      .delete()
      .then(() => {
        setModalVisible(!modalVisible);
      });
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
          I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
        ]}
      />
      <Text
        style={[
          TitleStyles.HeaderTitle,
          {textAlign: I18nManager.isRTL ? 'left' : 'right', paddingRight: 50},
        ]}>
        من أنت؟
      </Text>
      <SuccessModel
        message={'تم حذف الطفل بنجاح'}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

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
              <MenuProvider style={{flexDirection: 'column', padding: 30}}>
                <Menu>
                  <MenuTrigger>
                    <Icon
                      width="100%"
                      height="100%"
                      style={{marginLeft: -30}}
                    />
                  </MenuTrigger>

                  <MenuOptions>
                    <MenuOption onSelect={()=>navigation.navigate('StudentProfile')}>
                      <Text> الملف الشخصي</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => deleteChildAccount(item.key)}>
                      <Text>حذف الطفل</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </MenuProvider>
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
