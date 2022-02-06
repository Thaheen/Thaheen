import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {default as Home} from '../Screen/Home.js'
import {default as ChildList} from '../Screen/ChildList.js'
import {default as AddChildAccount} from '../Screen/AddChildAccount.js'


const Stack = createNativeStackNavigator();

const ParentStack = () => {

//Please put  here all the screens related to parent homepage, childlist..etc
  return (
      <Stack.Navigator initialRouteName="ChildList">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChildList" component={ChildList} />
        <Stack.Screen name="AddChildAccount" component={AddChildAccount} />
      </Stack.Navigator>
  );
}



export default ParentStack;