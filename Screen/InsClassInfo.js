import React, {useState , useEffect} from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  I18nManager,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import Ombre from '../assets/images/OmbreBackground.svg';
import Homework from '../assets/images/homework.svg';
import InfoCard from '../assets/images/infoCard.svg';
import Ladder from '../assets/images/Ladder.svg';
import Plus from '../assets/images/Plus.svg';
import BackButton from '../Components/BackButton';
import InsCardBackground from '../assets/images/InsCardBackground.svg';
import InsClassCard from '../Components/InsClassCard.js'


import firestore from '@react-native-firebase/firestore';



const InsClassInfo = ({navigation, route}) => {

  const [name, setName] = useState('');
  const [numOfStudents, setNumOfStudents] = useState('');
  const [studentsList, setStudentsList] = useState([]);

//======================= When homeworks are ready ====================
   //const [numOfHomeworks, setNumOfHomeworks] = useState('');
   //const [homeworks, setHomeworks] = useState([]);

    if(route.params.classKey){

    useEffect(() => {
        const classInfo = firestore()
            .collection('ClassCommunity')
            .doc(route.params.classKey)
            .onSnapshot(snapshot => {
                setName(snapshot.data().Name);
                setStudentsList(snapshot.data().StudentList);
                setNumOfStudents(studentsList.length);
            });
        return classInfo;
  }, []);
    }

    console.log(studentsList)

  return (
    <View style={{backgroundColor:'#FFF' , height:'100%'}}>
    <SafeAreaView style={{...Platform.OS === 'android' ? {marginTop: 20, } : null , backgroundColor:'#FFF'}}>
    <Ombre
        style={[    
            {position: 'absolute', top: 0},
          ]}
      />

      <StatusBar backgroundColor='#DAE2E9' translucent/>
      <BackButton/>
        <View>
            <Text style={[
                TitleStyles.HeaderTitle,
                {position:'absolute', top:0, left:90},
                ]}>
                {name}
            </Text>
        </View>

        {/* Start of class info card Section */}
        <View style={[ TitleStyles.SoftShadow , TitleStyles.InstructorCard, {marginTop:80}]}>

            <View style={[TitleStyles.InstructorSubCard,{borderRightWidth:0}]}>
                <Homework style={{width:30,height:10}}/>
                <Text style={TitleStyles.smallText}> الواجبات </Text> 
                <Text> {/* Use numOfHomeworks Here */} 0 </Text>
            </View>

            <View style={TitleStyles.InstructorSubCard}> 
                <Ladder/>
                <Text style={TitleStyles.smallText}> لوحة التفوق </Text> 
                <Text> </Text>
            </View>

            <View style={TitleStyles.InstructorSubCard}>
                <InfoCard/>
                <Text style={TitleStyles.smallText} > الطلاب </Text>
                <Text> {numOfStudents} </Text>

            </View>

        </View>
        {/* End of class info card Section */}

        {/* Start of Homework card Section */}
        <View style={[ TitleStyles.SoftShadow , TitleStyles.InstructorCard , {padding:0 , marginTop:20 , height:200}]}>
            <InsCardBackground style={{zIndex:-1}}/>
            <View style={{position:'absolute', right:20, top:10 }}>
                <TouchableOpacity style={{flexDirection:'row'}}  onPress={() => {   
             navigation.navigate('RecordVoice', {
              classKey : item.key
            });    }   }


                  >
                    <Plus/>
                    <Text style={[TitleStyles.smallText]}>إضافة واجب</Text>
                </TouchableOpacity>
            </View>

            <View style={{position:'absolute', left:20, top:10, zIndex:2}}> 
                <TouchableOpacity>
                    <Text style={[TitleStyles.smallText]}>عرض الكل</Text>
                </TouchableOpacity>
            </View>

            <View style={{position:'absolute', right:-10}}>
                          {/* <InsClassCard color='#EECC55' title='حفظ سورة الفلق' students={[]}  />  */}

                          <Text style={[TitleStyles.NotAvailableAlert,{top:70}]}>
                          لم تضف أي واجب بعد 
                          </Text>

            </View>
        </View>

        
        {/* End of Homework card Section */}

        {/* Start of Students card Section */}
        <View style={[ TitleStyles.SoftShadow , TitleStyles.InstructorCard , {padding:0 , marginTop:20 , height:200}]}>
            <InsCardBackground style={{zIndex:0}}/>
            <View style={{position:'absolute', right:20, top:10, zIndex:2}}>
                <TouchableOpacity style={{flexDirection:'row'}}>
                    <Plus/>
                    <Text style={[TitleStyles.smallText]}>طلابي</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{position:'absolute', left:20, top:10, zIndex:2}}> 
                <TouchableOpacity>
                    <Text style={[TitleStyles.smallText]}>عرض الكل</Text>
                </TouchableOpacity>
            </View>

            <View style={{position:'absolute', right:20, top:10 }}>

            {studentsList.length == 0 ? 
                <View style={{position:'absolute', right:35}}>
                    <Text style={[TitleStyles.NotAvailableAlert,{top:70}]}>
لا يوجد أي طالب في هذا الفصل                    </Text>

                </View> 
            : null}

                <FlatList 
                    style={[{marginTop: 30, height: '55%'}]}
                    data={studentsList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                    <TouchableOpacity>
                        <View
                        style={[ TitleStyles.SoftShadow ,TitleStyles.InsStudentItem]}>

                            <Text style={[TitleStyles.smallText , {paddingRight:10, paddingLeft:10,}]}>
                            {item} {'  '}
                            ●
                            </Text>
                        </View>

                    </TouchableOpacity> )}
                />
                
            </View>

        </View>

        
        {/* End of Students card Section */}

        

          </SafeAreaView>
    </View>
  )
}
export default InsClassInfo
