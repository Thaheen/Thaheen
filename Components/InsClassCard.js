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
          marginTop: 90,
          marginBottom: -70,
          marginLeft: 10,
          borderRadius: 25,
          width: 113,
          height: 190,
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
        onPress={() => {  }}>
        <Text style={[TitleStyles.smallText], {fontFamily: 'AJannatLT-Bold' , textAlign: 'center', color: '#808182'}}>دخول الفصل</Text>
        </TouchableOpacity>
      
    </View>
  );
};

export default InsClassCard;
