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

const TextCard = ({title}) => {
  return (
    <View
      style={[
        {
          backgroundColor: '#f7d3c1',
          borderRadius: 25,
          width: 150,
          height: 150,
          justifyContent: 'center',
        },
        TitleStyles.SoftShadow,
      ]}>
      <Text
        style={[TitleStyles.smallText, {fontSize: 35, textAlign: 'center'}]}>
        {title}
      </Text>
    </View>
  );
};

export default TextCard;
