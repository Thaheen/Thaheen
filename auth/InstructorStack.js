import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {default as Home} from '../Screen/Home.js';
import {default as InstructorProfile} from '../Screen/InstructorProfile.js';
const Stack = createNativeStackNavigator();

const InstructorStack = () => {
  //Please put  here all the screens related to instructor homepage, classroom..etc
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="InstructorProfile"
        component={InstructorProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default InstructorStack;
