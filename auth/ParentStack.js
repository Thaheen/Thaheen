import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {default as ChildList} from '../Screen/ChildList.js';
import {default as AddChildAccount} from '../Screen/AddChildAccount.js';
import {default as QuranHW} from '../Screen/QuranHW.js';
import {default as RecordVoice} from '../Screen/RecordVoice.js';
import {default as StudentProfile} from '../Screen/StudentProfile.js';
import {default as WelcomeScreen} from '../Screen/WelcomeScreen.js';
import {default as StudentHome} from '../Screen/StudentHome.js';
import {default as StudentTab} from './StudentTab.js';
import {default as ResetPasscode} from '../Screen/ResetPasscode.js';

const Stack = createNativeStackNavigator();

const ParentStack = () => {
  //Please put  here all the screens related to parent homepage, childlist..etc
  return (
    <Stack.Navigator initialRouteName="ChildList">
      <Stack.Screen
        name="ChildList"
        component={ChildList}
        options={{headerShown: false, animation: 'none'}}
      />
      <Stack.Screen
        name="AddChildAccount"
        component={AddChildAccount}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="QuranHW"
        component={QuranHW}
        options={{headerShown: false}}
      />
  <Stack.Screen
        name="RecordVoice"
        component={RecordVoice}
        options={{headerShown: false}}
      />


      <Stack.Screen
        name="ResetPasscode"
        component={ResetPasscode}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="StudentProfile"
        component={StudentProfile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="StudentTab"
        component={StudentTab}
        options={{headerShown: false, animation: 'fade'}}
      />
    </Stack.Navigator>
  );
};

export default ParentStack;
