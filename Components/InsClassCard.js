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

const InsClassCard = ({title , color ,students }) => {
    let studentsLen = 0 
        if (students){    
            studentsLen = students.length
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
        {studentsLen} طالب
      </Text>

        <TouchableOpacity style={[
          TitleStyles.EnterClassBtn,
          {backgroundColor: '#FFFFFF'},]}
        >
        <Text style={[TitleStyles.smallText], {fontFamily: 'AJannatLT-Bold' , textAlign: 'center', color: '#808182'}}>دخول الفصل</Text>
        </TouchableOpacity>
      
    </View>
  );
};

export default InsClassCard;
