import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {default as Login} from '../Screen/Login.js'
import {default as SignUp} from '../Screen/SignUp.js'
import {default as ForgotPassword} from '../Screen/ForgotPassword.js'



const Stack = createNativeStackNavigator();

const AuthStack = () => {

//Please put all the screens related to login, signup..etc
  return (
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}



export default AuthStack;