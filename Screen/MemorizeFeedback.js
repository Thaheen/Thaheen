import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import Refresh from '../assets/images/Refresh.svg';
import Confetti from '../assets/images/Confetti.svg';
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar';
import Close from '../assets/images/Close.svg';
import {StackActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {UserInfoContext} from '../auth/UserInfoContext';
import ThaheenMini from '../assets/images/ThaheenMini.svg';

const MemorizeFeedback = ({navigation, route}) => {
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: '#DAE2E9'}}>
      <FocusAwareStatusBar backgroundColor="#DAE2E9" barStyle="dark-content" />
      <View
        style={{
          position: 'absolute',
        }}>
        <Confetti />
      </View>
      <Close
        height="40"
        width="40"
        style={[{position: 'absolute', top: 40, left: 20, zIndex: 2}]}
        onPress={() => navigation.dispatch(StackActions.pop(4))}
      />

      <ThaheenMini
        width={202}
        height={233}
        style={[
          {
            marginTop: 118,
            position: 'absolute',
            alignSelf: 'center',
            zIndex: -1,
          },
        ]}
      />
      <View style={{marginTop: 200, alignItems: 'center'}}>
        <View
          style={[
            TitleStyles.shadowOffset,
            {
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              width: 351,
              height: 300,
              borderRadius: 25,
            },
          ]}>
          <Text
            style={[TitleStyles.sectionTitle, {fontSize: 30, marginTop: 10}]}>
            تمت المراجعة بنجاح
          </Text>

          <TouchableOpacity
            style={[
              TitleStyles.Button,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#F5C5AD',
                alignSelf: 'center',
                width: 300,
                marginTop: 60,
              },
            ]}
            onPress={() =>
              navigation.navigate('MemorizationSession', {
                TextID: route.params.textID,
              })
            }>
            <Text style={TitleStyles.ButtonText}>إعادة المراجعة</Text>
            <Refresh />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default MemorizeFeedback;
