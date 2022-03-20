import React from 'react';
import {
  Text,
  View,
  Platform,
  I18nManager,
} from 'react-native';
import TitleStyles from '../Styles/Titles';

const ColoredText = ({word , color}) => {
    if(color=='Red'){
        color = '#FF0000'
    }
    else { color = '#000000'}
    // adding spaces between words
    word+='  ‎'
return (
    <Text style={[TitleStyles.smallText,{color:color}]}>
    {word} 
    </Text>
  );
};

export default ColoredText;

