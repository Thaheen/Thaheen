import * as React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProfileOutline from '../assets/images/ProfileOutline.svg';
import HomeOutline from '../assets/images/HomeOutline.svg';
import Plus from '../assets/images/Plus.svg';
import PlusFilled from '../assets/images/PlusFilled.svg';
import TitleStyles from '../Styles/Titles';

import {default as InstructorHome} from '../Screen/InstructorHome.js';
import {default as InstructorProfile} from '../Screen/InstructorProfile.js';
import {default as CreateClass} from '../Screen/CreateClass.js';
import {default as InsClassInfo} from '../Screen/InsClassInfo.js';
import {default as ClassAllStudents} from '../Screen/ClassAllStudents.js';
import {default as StudentProfile} from '../Screen/StudentProfile.js';
import {default as RecordVoice} from '../Screen/RecordVoice.js';
import {default as InstructorScoreboard} from '../Screen/InstructorScoreboard.js';
import {default as QuranHW} from '../Screen/QuranHW.js';
import {default as Instruction} from '../Screen/Instruction.js';

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();
const CreateClassStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const ClassInfoStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="InstructorHome"
        component={InstructorHome}
        options={{headerShown: false}}
      />
      {/* Added a nested screen to home stack */}
      <HomeStack.Screen
        name="InsClassInfo"
        component={InsClassInfo}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="CreateClass"
        component={CreateClass}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="ClassAllStudents"
        component={ClassAllStudents}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="StudentProfile"
        component={StudentProfile}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="InstructorScoreboard"
        component={InstructorScoreboard}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="QuranHW"
        component={QuranHW}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="RecordVoice"
        component={RecordVoice}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="Instruction"
        component={Instruction}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator initialRouteName="InstructorProfile">
      <ProfileStack.Screen
        name="InstructorProfile"
        component={InstructorProfile}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

const InstructorTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          borderTopWidth: 10,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderTopColor: '#f3f6f8',
          borderColor: '#ffffff',
          height: Platform.OS === 'ios' ? 100 : 65,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeStackScreens"
        component={HomeStackScreens}
        options={{
          tabBarLabel: 'الرئيسية',
          tabBarIcon: ({focused}) => (
            <HomeOutline fill={focused ? '#43515F' : 'none'} />
          ),
          tabBarLabelStyle: TitleStyles.profileTextIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreens}
        options={{
          tabBarLabel: 'البيانات الشخصية',
          tabBarIcon: ({focused}) => (
            <ProfileOutline fill={focused ? '#43515F' : 'none'} />
          ),
          tabBarLabelStyle: TitleStyles.profileTextIcon,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default InstructorTab;
