import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {default as Home} from '../Screen/Home.js'

const Stack = createNativeStackNavigator();

const InstructorStack = () => {

//Please put  here all the screens related to instructor homepage, classroom..etc
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
  );
}



export default InstructorStack;