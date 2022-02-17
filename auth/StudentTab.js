import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'

import ProfileOutline from '../assets/images/ProfileOutline.svg'
import NotfyOutline from '../assets/images/NotfyOutline.svg'
import ClassOutline from '../assets/images/ClassOutline.svg'
import HomeOutline from '../assets/images/HomeOutline.svg'
import TitleStyles from '../Styles/Titles'

import {default as StudentProfile} from '../Screen/StudentProfile.js'
import {default as WelcomeScreen} from '../Screen/WelcomeScreen.js'
import {default as StudentHome} from '../Screen/StudentHome.js'
import {default as StudentClass} from '../Screen/StudentClass.js'
import {default as StudentNotifications} from '../Screen/StudentNotifications.js'

const HomeStack = createNativeStackNavigator()
const ClassStack = createNativeStackNavigator()
const NotifyStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='WelcomeScreen'
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name='StudentHome'
        component={StudentHome}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  )
}
const ClassStackScreens = () => {
  return (
    <ClassStack.Navigator>
      <ClassStack.Screen
        name='StudentClass'
        component={StudentClass}
        options={{headerShown: false}}
      />
    </ClassStack.Navigator>
  )
}
const NotifyStackScreens = () => {
  return (
    <NotifyStack.Navigator>
      <NotifyStack.Screen
        name='StudentNotifications'
        component={StudentNotifications}
        options={{headerShown: false}}
      />
    </NotifyStack.Navigator>
  )
}
const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator initialRouteName='StudentProfile'>
      <ProfileStack.Screen
        name='StudentProfile'
        component={StudentProfile}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  )
}

const StudentTab = () => {
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
          height: 100,
        },
      }}>
      <Tab.Screen
        name='Home'
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
        component={ClassStackScreens}
        options={{
          tabBarLabel: 'فصلي',
          tabBarIcon: ({focused}) => (
            <ClassOutline fill={focused ? '#43515F' : 'none'} />
          ),
          tabBarLabelStyle: TitleStyles.profileTextIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Notify'
        component={NotifyStackScreens}
        options={{
          tabBarLabel: 'التنبيهات',
          tabBarIcon: ({focused}) => (
            <NotfyOutline fill={focused ? '#43515F' : 'none'} />
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
          tabBarIcon: () => <ProfileOutline />,
          tabBarLabelStyle: TitleStyles.profileTextIcon,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default StudentTab
