import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {default as ChildList} from '../Screen/ChildList.js';
import {default as AddChildAccount} from '../Screen/AddChildAccount.js';
import {default as RecordVoice} from '../Screen/RecordVoice.js';
import {default as StudentProfile} from '../Screen/StudentProfile.js';
import {default as WelcomeScreen} from '../Screen/WelcomeScreen.js';
import {default as StudentHome} from '../Screen/StudentHome.js';
import {default as StudentTab} from './StudentTab.js';

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
        name="RecordVoice"
        component={RecordVoice}
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
