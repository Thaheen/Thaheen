import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Platform,
  I18nManager,
} from 'react-native'
import TitleStyles from '../Styles/Titles'
import ThaheenStanding from '../assets/images/ThaheenStanding'
import Badage from '../assets/images/badage'
import TextCard from '../Components/TextCard'
import HomeSection from '../Components/HomeSection'

const StudentHome = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <StatusBar backgroundColor='#FFFFFF' />

      {/* start top container */}
      <View style={{padding: 30}}>
        <View
          style={{
            backgroundColor: '#DAE2E9',
            borderRadius: 25,
            paddingHorizontal: 25,
          }}>
          <Text
            style={[
              TitleStyles.sectionTitle,
              {fontWeight: null, textAlign: null},
            ]}>
            مرحبًا يوسف
          </Text>
          <Text
            style={[
              TitleStyles.subTitle,
              {fontFamily: 'AJannatLT-Bold', marginRight: 60},
            ]}>
            المستوى: ممتاز
          </Text>
          <Text
            style={[
              TitleStyles.subTitle,
              {fontFamily: 'AJannatLT-Bold', marginRight: 60, marginBottom: 20},
            ]}>
            اللقب: الطالب الذكي
          </Text>
        </View>

        <ThaheenStanding
          style={[
            {position: 'absolute', bottom: 0},
            I18nManager.isRTL ? {left: -20} : {right: -20},
          ]}
          width={139}
          height={139}
        />
        <Badage
          style={[
            {position: 'absolute', bottom: 10},
            I18nManager.isRTL ? {right: 0} : {left: 0},
          ]}
        />
      </View>
      {/* end top container */}


      {/* start mid container */}
      <HomeSection title='نصوصي' iconName='Plus' />
      <TextCard />
      {/* end mid container */}


      {/* start bottom container */}
      <HomeSection title='مستوى تقدمي' iconName='Trophy' />

      <View
        style={[
          {
            borderRadius: 25,
            marginLeft: 25,
            marginRight: 25,
            padding: 15,
            paddingVertical: 50,
            backgroundColor: 'white',
          },
          TitleStyles.SoftShadow,
        ]}>
        <Text
          style={[TitleStyles.sectionTitle, {fontSize: 24, fontWeight: null}]}>
          لم تنضم إلى أي صفوف بعد
        </Text>
      </View>

      {/* end bottom container */}
    </SafeAreaView>
  )
}

export default StudentHome
