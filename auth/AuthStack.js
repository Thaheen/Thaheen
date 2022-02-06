import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {default as Login} from '../Screen/Login.js'
import {default as SignUp} from '../Screen/SignUp.js'
import {default as ForgotPassword} from '../Screen/ForgotPassword.js'



const Stack = createNativeStackNavigator();

const AuthStack = () => {

//Please put all the screens related to login, signup..etc
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
  );
}



export default AuthStack;