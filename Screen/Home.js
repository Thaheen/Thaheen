import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  I18nManager,
} from 'react-native'
import TitleStyles from '../Styles/Titles';
import Ombre from '../assets/images/OmbreBackground.svg';
import Podium from '../assets/images/podium.svg';
import Homework from '../assets/images/homework.svg';
import InfoCard from '../assets/images/infoCard.svg';
import Cell from '../assets/images/cell.svg';



import auth from '@react-native-firebase/auth';
import {UserInfoContext} from '../auth/UserInfoContext'



const Home = () => {
  
  const {user} = React.useContext(UserInfoContext);
  const IName = user['_data']['fullName'];

  // ======= Change Later To Dynamic info =======
  const hwNo = 8;
  const stuNo = 25;
  const classNo= 3;

  return (
    <SafeAreaView>
    <Ombre
        style={[    
            {position: 'absolute', top: 0},
          ]}
      
      />
      <StatusBar />
      <ScrollView>
        {/* Start of Instructor info Section */}
        <View>
        <Podium style={[ TitleStyles.SoftShadow , {position:'absolute', top:10, left:15}]}/>
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
        <Text style={[
              TitleStyles.HeaderTitle,
              {position:'absolute', top:280, left:40},
            ]}>
            فصولي
        </Text>

        <Text
            style={[TitleStyles.sectionTitle, {fontSize: 24, fontWeight: null, position:'absolute', top:420, left:40}]}
          >
            لم تضيف اي فصل بعد{' '}
          </Text>

        </View>
        {/* End of classes Section */}


        <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', paddingVertical: 400}}>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Home
