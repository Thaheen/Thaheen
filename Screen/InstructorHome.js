import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
  FlatList,
  LogBox,
} from 'react-native'
import TitleStyles from '../Styles/Titles';
import Ombre from '../assets/images/OmbreBackground.svg';
import Podium from '../assets/images/podium.svg';
import Homework from '../assets/images/homework.svg';
import InfoCard from '../assets/images/infoCard.svg';
import Cell from '../assets/images/cell.svg';
import InsClassCard from '../Components/InsClassCard.js'



import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {UserInfoContext} from '../auth/UserInfoContext'



const Home = () => {
  
  const {user} = React.useContext(UserInfoContext);
  const IName = user['_data']['fullName'];
  const cUser = auth().currentUser;


  // ======= Change Later To Dynamic info =======
  const [hwNo, setHwNo] = useState(0); // Total number of Homeworks
  let homeworks = 0; 
  const [stuNo, setStuNo] = useState(0); // Total number of students in all classes
  let studentL = 0;
  const [classNo, setClassNo] = useState(0); // Total number of classes 


  const [allClasses , setAllClasses]= useState([]);
  const [loading, setLoading] = useState(true);
  let colors = ['#DAE2E9', '#F8D3C1' ,'#F7F1E6'];
  let i = 0;

    useEffect(()=> {
        const classes = firestore()
        .collection('ClassCommunity')
        .where('InstructorID', '==', cUser.uid)
        .onSnapshot(querySnapshot => {
            const Class = [];

            querySnapshot.forEach(documentSnapshot => {
              studentL += documentSnapshot.data().StudentList.length

                Class.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                    color: colors[i++%3]
                });
    });
        setStuNo(studentL);
        setClassNo(i); // i from every iteration of the ForEach Loop
        //setHwNo();
        setAllClasses(Class);
        setLoading(false);
    });
        return classes ;
    }, []);

    useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

  return (
    <SafeAreaView style={{...Platform.OS === 'android' ? {marginTop: 20, } : null , backgroundColor:'#FFF'}}>
    <Ombre
        style={[    
            {position: 'absolute', top: 0},
          ]}
      
      />
      <StatusBar backgroundColor='#DAE2E9' translucent/>
      <ScrollView height='100%'>
        {/* Start of Instructor info Section */}
        <View>
        <Podium style={[Platform.OS === 'ios' ? TitleStyles.SoftShadow : null , {position:'absolute', top:10, left:15}]}/>
        <Text style={[
              TitleStyles.HeaderTitle,
              {position:'absolute', top:0, left:90},
            ]}>
       أ. {IName}
        </Text>
        </View>
        {/* End of Instructor info Section */}

        {/* Start of main card Section */}
        <View style={[ TitleStyles.SoftShadow , TitleStyles.InstructorCard]}>
        <View style={[TitleStyles.InstructorSubCard,{borderRightWidth:0}]}>
        <Homework style={{width:30,height:10}}/>
         <Text style={TitleStyles.smallText}> الواجبات </Text> 
         <Text> {hwNo} </Text>
         </View>

        <View style={TitleStyles.InstructorSubCard}> 
        <InfoCard/>
        <Text style={TitleStyles.smallText}> الطلاب </Text> 
        <Text> {stuNo} </Text>

        </View>

        <View style={TitleStyles.InstructorSubCard}>
        <Cell/>
         <Text style={TitleStyles.smallText} > الفصول </Text>
        <Text> {classNo} </Text>

          </View>
        </View>
        {/* End of main card Section */}

        {/* Start of classes Section */}
        <View>

        { allClasses.length ==0 ? <Text
            style={[TitleStyles.NotAvailableAlert]}
          >
            لم تضف اي فصل بعد
          </Text> : null }

          <FlatList
          key={'#'}
          style={{ position:'relative' , top: 240, width:370 , height:'40%'}}
          data={allClasses}
          ListHeaderComponent={<Text style={[
              TitleStyles.HeaderTitle,
              {position:'absolute', top:250, left:30},
            ]}>
            فصولي
        </Text>}
          ListHeaderComponentStyle={{top:-240}}
          numColumns= {3}
          scrollEnabled={false} 
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity>
              <InsClassCard color={item.color} title={item.Name} students={item.StudentList}  />
            </TouchableOpacity>
          )}
        />

        </View>
        {/* End of classes Section */}


        <View style={{ alignItems: 'center', flexDirection: 'column', paddingVertical: 400}}>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Home
