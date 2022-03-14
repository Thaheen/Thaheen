import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import TitleStyles from '../Styles/Titles'
import Refresh from '../assets/images/Refresh.svg'
import Confetti from '../assets/images/Confetti.svg'
import FocusAwareStatusBar from '../Components/FocusAwareStatusBar'

const Feedback = () => {
  const {width, height} = Dimensions.get('window')
  const [score, setScore] = useState()
  const mistakes = 4
  const totalWords = 24

  useEffect(() => {
    const mistakesRate = Math.round((mistakes / totalWords) * 100)
    setScore(100 - mistakesRate)
  }, [])

  const EngToArabicNum = num => {
    var str = '' + num
    return str.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])
  }

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: '#DAE2E9'}}>
      <FocusAwareStatusBar backgroundColor='#DAE2E9' barStyle='dark-content' />
      <View
        style={{
          position: 'absolute',
        }}>
        <Confetti />
      </View>

      <View style={{marginTop: 160, alignItems: 'center'}}>
        <View
          style={[
            TitleStyles.shadowOffset,
            {
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              width: 230,
              height: 230,

              borderRadius: 25,
            },
          ]}>
          <Text style={TitleStyles.sectionTitle}>النتيجة</Text>
          <Text
            style={[TitleStyles.subTitle, {textAlign: 'center', fontSize: 24}]}>
            الدرجة الكلية: {EngToArabicNum(score)}
          </Text>
          <Text
            style={[TitleStyles.subTitle, {textAlign: 'center', fontSize: 24}]}>
            عدد الأخطاء: {EngToArabicNum(mistakes)}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            TitleStyles.Button,
            {
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#F5C5AD',
              alignSelf: 'center',
              width: 300,
              marginTop: 60,
            },
          ]}>
          <Text style={TitleStyles.ButtonText}>إعادة التسميع</Text>
          <Refresh />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default Feedback
