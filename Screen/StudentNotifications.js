import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  View,
  Platform,
  I18nManager,
  Modal,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import Top2Lines from '../assets/images/top2Lines.svg';
import TopBox from '../assets/images/TopBox.svg';
import RTLlayout from '../Styles/RTLlayout';

import firestore from '@react-native-firebase/firestore';
import {UserInfoContext} from '../auth/UserInfoContext';

const StudentNotifications = ({navigation, route}) => {
  
  const [ClassesAssignments, setClassesAssignments] = useState([]);
  const [ClassID , setClassID]=useState('')
  const {student, ClassList} = React.useContext(UserInfoContext);

  const [onePass, setOnePass] = useState(0)
  let StudentAssignment = [];
  let classIds = [];
  let classNames = [];


  for (c in ClassList){
    classIds.push(ClassList[c].key)
    classNames.push({
      ClassID: ClassList[c].key,
      ClassName: ClassList[c].Name,
    })

  }

  useEffect(() => {

        const assignments = firestore()
          .collection('Instructor Text')
          .where('ClassId', 'in', classIds).orderBy('Deadline')
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              for ( id in classNames){
              if(classNames[id].ClassID == documentSnapshot.data().ClassId){

              if(!StudentAssignment.includes({
                ...documentSnapshot.data(),
                ClassName: classNames[id].ClassName,
                key: documentSnapshot.id,
              })){
                
              StudentAssignment.push({
                ...documentSnapshot.data(),
                ClassName: classNames[id].ClassName,
                key: documentSnapshot.id,
              });}
            }}
            });
            if ( StudentAssignment.length != 0){
            setClassesAssignments(StudentAssignment);
            }
          }, error => {
            }); 

    }, []);


    

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        ...(Platform.OS === 'android' ? {paddingTop: 20} : null),
      }}>
      <StatusBar backgroundColor="#DAE2E9" translucent />
      

      <TopBox style={[{position: 'absolute', top: 0}]} />
      <Top2Lines
        style={[
          Platform.OS === 'ios' ? TitleStyles.shadowOffset : null,
          I18nManager.isRTL ? RTLlayout.Top2LinesAR : RTLlayout.Top2LinesEN,
        ]}
      />
      <Text
        style={[
          TitleStyles.HeaderTitle,
          {
            textAlign: I18nManager.isRTL ? 'left' : 'right',
            marginLeft: 50,
            fontSize: 35,
          },
        ]}>
       إشعاراتي
      </Text>

      {ClassesAssignments != 0 && (
        <FlatList
          style={{height: '100%' , top:70}}
          data={ClassesAssignments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity 
             onPress={() => {
              navigation.navigate('ViewClassCommunity' , {ClassCID:item.ClassId})
              }}
              >
                    <View
                      style={[
                        TitleStyles.SoftShadow,
                        TitleStyles.InsStudentItem,{width:370, height:70}
                      ]}>
                      <Text
                        style={[
                          TitleStyles.smallText,
                        ]}>
                        {' \n '} ●  {item.TextHead} 
                      </Text>
                      <Text
                        style={[
                          TitleStyles.smallText,
                          {paddingRight: 10, paddingLeft: 10},
                        ]}>
                        {item.ClassName}
                      </Text>
                    </View>
                  </TouchableOpacity>
          )}
        />
      )}

      {ClassesAssignments == 0 && (
        <View
          style={[
            {
              borderRadius: 25,
              marginLeft: 25,
              marginTop: 160,
              marginRight: 25,
              padding: 15,
              paddingVertical: 50,
              backgroundColor: 'white',
            },
            TitleStyles.SoftShadow,
          ]}>
          <Text
            style={[
              TitleStyles.sectionTitle,
              {fontSize: 24, fontWeight: null},
            ]}>
              لا توجد إشعارات بعد
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};
export default StudentNotifications;
