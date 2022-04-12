import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  I18nManager,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import Book from '../assets/images/Book.svg';
import {useNavigation} from '@react-navigation/native';


const InsClassCard = ({title , color ,students , ClassID}) => {
  const navigation = useNavigation();
    let studentsLen = 0 
        if (students){    
            studentsLen = students.length
        }  


        const EngToArabicNum = num => {
          var str = '' + num
          return str.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
        }

return (
    <View
      style={[
        {
          backgroundColor: color,
          borderRadius: 25,
          width: 113,
          height: 190,
          marginLeft:10,
          marginBottom:10,
          paddingTop:5,
          paddingLeft:7,
        }      ]}>
      <Book/>
      <Text
        style={[TitleStyles.smallText, {fontSize: 18, textAlign: 'left' , paddingTop:20}]}>
        {title}
      </Text>
      <Text style={[TitleStyles.smallText, {fontFamily: 'AJannatLT' , textAlign: 'left'}]} >
        {EngToArabicNum(studentsLen)} طالب
      </Text>

      <View style={{flex:1, justifyContent: 'flex-end'}}>
        <TouchableOpacity style={[
          TitleStyles.EnterClassBtn,
          {backgroundColor: '#FFFFFF'},]}

          onPress={() => {
            navigation.navigate('InsClassInfo', {
              classKey: ClassID,
            });
          }}
        >
        <Text style={[TitleStyles.smallText], {fontFamily: 'AJannatLT-Bold' , textAlign: 'center', color: '#808182'}}>دخول الفصل</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default InsClassCard;
