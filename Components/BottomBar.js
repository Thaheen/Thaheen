import React, {useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';

import TitleStyles from '../Styles/Titles';
import firestore from '@react-native-firebase/firestore';
import {SvgUri} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import ProfileOutline from '../assets/images/ProfileOutline.svg';
import NotfyOutline from '../assets/images/NotfyOutline.svg';
import ClassOutline from '../assets/images/ClassOutline.svg';
import HomeOutline from '../assets/images/HomeOutline.svg';
const BottomBar = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={[TitleStyles.Bottom1]}>
        <View style={[TitleStyles.Bottom2]}>
          <TouchableOpacity
          /* onPress={() => {
              navigation.navigate('StudentProfile');
            }}*/
          >
            <ProfileOutline style={[TitleStyles.ProfileIcon]} />
            <Text style={[TitleStyles.profileText]}>البيانات الشخصية</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <NotfyOutline style={[TitleStyles.ProfileIcon]} />
            <Text style={[TitleStyles.profileText]}>التنبيهات </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <ClassOutline style={[TitleStyles.ProfileIcon]} />
            <Text style={[TitleStyles.profileText]}>فصلي </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <HomeOutline style={[TitleStyles.ProfileIcon]} />
            <Text style={[TitleStyles.profileText]}>الرئيسية </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BottomBar;
