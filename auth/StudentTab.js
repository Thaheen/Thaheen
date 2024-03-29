import * as React from 'react';
import {Platform, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProfileOutline from '../assets/images/ProfileOutline.svg';
import NotfyOutline from '../assets/images/NotfyOutline.svg';
import ClassOutline from '../assets/images/ClassOutline.svg';
import HomeOutline from '../assets/images/HomeOutline.svg';
import TitleStyles from '../Styles/Titles';
import PlusCircle from '../assets/images/PlusCircle.svg';
import {UserInfoContext} from '../auth/UserInfoContext'
//import TextType from '../Components/TextType'

import {default as StudentEditProfile} from '../Screen/StudentEditProfile.js';
import {default as WelcomeScreen} from '../Screen/WelcomeScreen.js';
import {default as StudentHome} from '../Screen/StudentHome.js';
import {default as StudentClass} from '../Screen/StudentClass.js';
import {default as StudentNotifications} from '../Screen/StudentNotifications.js';
import {default as ReciteSession} from '../Screen/ReciteSession.js';
import {default as ViewClassCommunity} from '../Screen/ViewClassCommunity.js';
import {default as Feedback} from '../Screen/Feedback.js';
import {default as MemorizationSession} from '../Screen/MemorizationSession.js';
import {default as FillInTheBlank} from '../Screen/FillInTheBlank.js';
import {default as Chunking} from '../Screen/Chunking.js';
import {default as StudentViewAllAssignment} from '../Screen/StudentViewAllAssignment.js';
import {default as ClassScoreboard} from '../Screen/ClassScoreboard.js';
import {default as ProgressChart} from '../Screen/ProgressChart.js';



const HomeStack = createNativeStackNavigator();
const ClassStack = createNativeStackNavigator();
const AddTextStack = createNativeStackNavigator();
const NotifyStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="StudentHome"
        component={StudentHome}
        options={{headerShown: false}}
      />
      {/* <HomeStack.Screen
        name="ReciteSession"
        component={ReciteSession}
        options={{headerShown: false}}
      /> */}
      {/* <HomeStack.Screen
        name="Feedback"
        component={Feedback}
        options={{headerShown: false, animation: 'slide_from_bottom'}}
      /> */}

      {/* <HomeStack.Screen
        name="MemorizationSession"
        component={MemorizationSession}
        options={{headerShown: false}}
      /> */}
      {/* <HomeStack.Screen
        name="FillInTheBlank"
        component={FillInTheBlank}
        options={{headerShown: false}}
      /> */}

      {/* <HomeStack.Screen
        name="Chunking"
        component={Chunking}
        options={{headerShown: false}}
      /> */}

      <HomeStack.Screen
        name="StudentViewAllAssignment"
        component={StudentViewAllAssignment}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="ProgressChart"
        component={ProgressChart}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
const ClassStackScreens = () => {
  return (
    <ClassStack.Navigator>
      <ClassStack.Screen
        name="StudentClass"
        component={StudentClass}
        options={{headerShown: false}}
      />
      <ClassStack.Screen
        name="ViewClassCommunity"
        component={ViewClassCommunity}
        options={{headerShown: false}}
      />

      <ClassStack.Screen
        name="ClassScoreboard"
        component={ClassScoreboard}
        options={{headerShown: false}}
      />
    </ClassStack.Navigator>
  );
};
const AddTextScreens = () => {
  return (
    <AddTextStack.Navigator>
    </AddTextStack.Navigator>
  );
};
const NotifyStackScreens = () => {
  return (
    <NotifyStack.Navigator>
      <NotifyStack.Screen
        name="StudentNotifications"
        component={StudentNotifications}
        options={{headerShown: false}}
      />
      <NotifyStack.Screen
        name="ViewClassCommunity"
        component={ViewClassCommunity}
        options={{headerShown: false}}
      />
      <ClassStack.Screen
        name="ClassScoreboard"
        component={ClassScoreboard}
        options={{headerShown: false}}
      />
    </NotifyStack.Navigator>
  );
};
const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator initialRouteName="StudentEditProfile">
      <ProfileStack.Screen
        name="StudentEditProfile"
        component={StudentEditProfile}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

const StudentTab = () => {
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
        name="Home"
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
        name="Class"
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
        name="AddTextScreens"
        component={AddTextScreens}
        options={{
          tabBarLabel: 'إضافة نص',
          tabBarLabelStyle: [TitleStyles.profileTextIcon, {fontSize: 15}],
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={[TitleStyles.shadowOffset,{bottom:20, width:71 , height:68 ,borderRadius:42, backgroundColor: 'white'}]}>
            <PlusCircle style={{right: 4}} />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate("TextType", {keyWord: 'student'})
          },
        })}
      />
      <Tab.Screen
        name="Notify"
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

export default StudentTab;
