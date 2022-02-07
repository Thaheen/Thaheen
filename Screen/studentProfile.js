import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import Top2Lines from '../assets/images/top2Lines.svg';
import TopBox from '../assets/images/TopBox.svg';
import {FloatingLabelInput} from 'react-native-floating-label-input';
const studentProfile = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFFFFF',
        height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <TopBox style={[{position: 'absolute', top: 0, Right: 250}]}></TopBox>
      <Top2Lines
        style={[
          TitleStyles.shadowOffset,
          {position: 'absolute', top: 0, left: 0},
        ]}
      />
      <Text style={TitleStyles.HeaderTitle}>الملف الشخصي</Text>
      <View>
        <FloatingLabelInput
          label="الاسم الأول"
          staticLabel
          //value={NewFirstName}
          hintTextColor={'black'}
          editable={true}
          selectTextOnFocus={true}
          //hint={userFirstName}
          //onChangeText={text => setNewFirstName(text)}
          caretHidden={false}
          containerStyles={{
            borderWidth: 0.76,
            paddingHorizontal: 8,
            bottom: -3,
            textAlign: 'right',
            borderColor: 'gray',
            borderRadius: 8,
            height: 50,
          }}
          customLabelStyles={{
            colorFocused: 'black',
            fontSizeFocused: 12,
          }}
          labelStyles={{
            backgroundColor: '#f2f2f2',
            paddingHorizontal: 8,
            marginLeft: 200,
            fontFamily: 'AJannatLT',
          }}
          inputStyles={{
            color: 'black',
            paddingHorizontal: 10,
            fontFamily: 'AJannatLT',
            fontSize: 14,
            color: '#002B3E',
            textAlign: 'right',
            fontWeight: 'bold',
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default studentProfile;
