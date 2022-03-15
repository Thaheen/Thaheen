import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  I18nManager,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import BookReader from '../assets/images/BookReader';

const TextCard = ({title, color}) => {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          borderRadius: 25,
          width: 150,
          height: 150,
          justifyContent: 'center',
        },
        TitleStyles.SoftShadow,
      ]}>
      <Text
        style={[TitleStyles.smallText, {fontSize: 30, textAlign: 'center'}]}>
        {title}
      </Text>
    </View>
  );
};

export default TextCard;
