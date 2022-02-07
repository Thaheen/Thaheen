import React from 'react';
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
  Platform
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import Top2Lines from '../assets/images/top2Lines.svg';
import BackButton from '../Components/BackButton.js';
import TopBox from '../assets/images/TopBox.svg';
import AnimalPicker from '../Screen/AnimalPicker.js';
import auth from '@react-native-firebase/auth';

const ChildList = ({navigation}) => {
  children = [{name: 'يوسف'}, {name: 'محمد'}, {name: 'عبدالله'}];
  const onSignout = () => {
      auth()
  .signOut()
  .then(() => console.log('User signed out!'));
  }
  return (
    <SafeAreaView
      style={{
        flex:1,
        backgroundColor: 'white',
      }}>
      <TopBox style={[{position: 'absolute', top: 0}]} />
      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          {position: 'absolute', top: 0, right: 0},
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
          <TouchableOpacity>
            <View style={[TitleStyles.childItem]}>
            <AnimalPicker />
              <View>
                <Text style={[{fontSize: 42, fontFamily: 'AJannatLT'}]}>
                  {item.name}
                </Text>
              </View>
              
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
        onPress={onSignout}>
        <Text style={TitleStyles.ButtonText}>تسجيل الخروج</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChildList;
