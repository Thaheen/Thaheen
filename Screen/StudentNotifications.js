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


  useEffect(() => {


    for (index in ClassList) {
        
        const assignments = firestore()
          .collection('Instructor Text')
          .where('ClassId', '==', ClassList[index].key.toString())
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              if(!StudentAssignment.includes({
                ...documentSnapshot.data(),
                class: ClassList[index].Name,
                key: documentSnapshot.id,
              })){
              StudentAssignment.push({
                ...documentSnapshot.data(),
                class: ClassList[index].Name,
                key: documentSnapshot.id,
              });}
            });
            if ( StudentAssignment.length != 0){
            setClassesAssignments(StudentAssignment);
            }
          }); 

          
    }
    //console.log(ClassesAssignments)

    //  for(assignment in StudentAssignment ){
    //             //console.log(StudentAssignment[assignment].class)
    //             firestore()
    //               .collection('ClassCommunity')
    //               .doc(StudentAssignment[assignment].ClassId.toString())
    //               .onSnapshot(snapshot => {
                    
    //                 StudentAssignment[assignment] = {...StudentAssignment[assignment], class: snapshot.data().Name.toString()}

    //                 // console.log(snapshot.data().Name.toString())
    //                 //console.log(StudentAssignment[assignment].class)
    //               });                
    //         }
  


    }, []);
    

  const setClassCommunityID=CId=>{
    setClassID(CId)    
    console.log(ClassID)
    navigation.navigate('ViewClassCommunity' , {ClassCID:ClassID})
  }

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
                        {item.class}
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
