import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Top2Lines from '../assets/images/top2Lines.svg';
import BackButton from '../Components/BackButton.js';
import TopBox from '../assets/images/TopBox.svg';
import TitleStyles from '../Styles/Titles';
import RTLlayout from '../Styles/RTLlayout';
import RectangleOrng from '../assets/images/RectangleOrng.svg';
import RectangleYell from '../assets/images/RectangleYell.svg';
import MemorizeVec from '../assets/images/MemorizeVec.svg';

const MemorizationSession = ({navigation, route}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        ...(Platform.OS === 'android' ? {paddingTop: 20} : null),
      }}>
      <StatusBar translucent backgroundColor="#DAE2E9" />

      <TopBox style={[{position: 'absolute', top: 0}]} />
      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
        ]}
      />
      <Text
        style={[
          TitleStyles.sectionTitle,
          {textAlign: I18nManager.isRTL ? 'left' : 'right', marginLeft: 40},
        ]}>
        سورة الفاتحة
      </Text>

      <Text
        style={[
          TitleStyles.HeaderTitle,
          {
            textAlign: I18nManager.isRTL ? 'left' : 'right',
            marginLeft: 40,
            marginTop: 70,
          },
        ]}>
        طرق المراجعة
      </Text>

      <View style={[{flexDirection: 'row', marginTop: 70}]}>
        <View style={[TitleStyles.RectanglBox]}>
          <View style={[TitleStyles.WhiteBox]}>
            <MemorizeVec />
          </View>
          <RectangleOrng />

          <Text
            style={[
              TitleStyles.HeaderTitle,
              {fontSize: 24, marginTop: -110, alignSelf: 'center'},
            ]}>
            إكمال الفراغ
          </Text>

          <TouchableOpacity
            style={[
              TitleStyles.EditBtn,
              {
                marginRight: -8,
                backgroundColor: '#FFFFFF',
                width: 156,
                borderColor: '#E5E5E5',
              },
            ]}
            onPress={() => {
              navigation.navigate('FillInTheBlank');
            }}>
            <Text style={[TitleStyles.StartMemorize]}> إبدا </Text>
          </TouchableOpacity>
        </View>

        <View style={[TitleStyles.RectanglBox]}>
          <View style={[TitleStyles.WhiteBox]}>
            <MemorizeVec />
          </View>
          <RectangleYell />
          <Text
            style={[
              TitleStyles.HeaderTitle,
              {fontSize: 24, marginTop: -110, alignSelf: 'center'},
            ]}>
            التجزيء
          </Text>

          <TouchableOpacity
            style={[
              TitleStyles.EditBtn,
              {
                marginRight: -8,
                backgroundColor: '#FFFFFF',
                width: 156,
                borderColor: '#E5E5E5',
              },
            ]}
            onPress={() => {
              // navigation.navigate('FillInTheBlank');
            }}>
            <Text style={[TitleStyles.StartMemorize]}> إبدا </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MemorizationSession;
