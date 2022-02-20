import * as React from 'react'
import {Platform} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import ProfileOutline from '../assets/images/ProfileOutline.svg';
import HomeOutline from '../assets/images/HomeOutline.svg';
import Plus from '../assets/images/Plus.svg';
import TitleStyles from '../Styles/Titles'

import {default as Home} from '../Screen/Home.js'
import {default as InstructorProfile} from '../Screen/InstructorProfile.js'

const Stack = createNativeStackNavigator()

const HomeStack = createNativeStackNavigator()
const CreateClassStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='Home'
        component={Home}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  )
}
const CreateClassStackScreens = () => {
  return (
    <CreateClassStack.Navigator>
      <CreateClassStack.Screen
        name='Home'
        component={Home}
        options={{headerShown: false}}
      />
    </CreateClassStack.Navigator>
  )
}

const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator initialRouteName='InstructorProfile'>
      <ProfileStack.Screen
        name='InstructorProfile'
        component={InstructorProfile}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  )
}

const InstructorTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
          borderTopWidth: 10,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderTopColor: '#f3f6f8',
          borderColor: '#ffffff',
          height: Platform.OS === 'ios' ? 100 : 65,
        },
      }}>
      <Tab.Screen
        name='HomeStackScreens'
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
        name='Class'
        component={CreateClassStackScreens}
        options={{
          tabBarLabel: 'اضافة فصل',
          tabBarIcon: ({focused}) => (
            <Plus fill={focused ? '#43515F' : 'none'} />
          ),
          tabBarLabelStyle: TitleStyles.profileTextIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Profile'
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
  )
}

export default InstructorTab
