import React from 'react';
import {View, TouchableOpacity, I18nManager} from 'react-native';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout';
import BackNew from '../assets/images/BackNew.svg';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        {position: 'absolute', top: 65},
        I18nManager.isRTL ? RTLlayout.BackButtonAR : RTLlayout.BackButtonEN,
      ]}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <BackNew style={TitleStyles.shadowOffset} />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
