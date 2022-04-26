import React, {useState, useEffect} from 'react'
import {Text, TouchableOpacity, View, Platform, I18nManager} from 'react-native'
import TitleStyles from '../Styles/Titles'
import {useNavigation} from '@react-navigation/native'
import AssignmentIcon from '../assets/images/AssignmentIcon'
import InsClasses from '../assets/images/InsClasses.svg'
import Trophy from '../assets/images/Trophy'
import {UserInfoContext} from '../auth/UserInfoContext'
import TextType from '../Components/TextType'

const HomeSection = ({title, icon, type}) => {
  const navigation = useNavigation()
  const [textTypeVisibal, setTextTypeVisibal] = useState(false)
  const {student} = React.useContext(UserInfoContext)

  const sectionAction = type => {
    if (type == 'text') {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('StudentViewAllAssignment')
          }}>
          <Text style={TitleStyles.smallText}>عرض الكل</Text>
        </TouchableOpacity>
      )
    } else if (type == 'InsClasses') {
      return null
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProgressChart')
          }}>
          <Text style={TitleStyles.smallText}>عرض الكل</Text>
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={TitleStyles.HomeSectioner}>
      <View
        style={{
          flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
          alignItems: 'center',
        }}>
        {/* <TouchableOpacity
            onPress={() => {
              setTextTypeVisibal(!textTypeVisibal);
            }}>
            <TextType
              modalVisible={textTypeVisibal}
              setModalVisible={setTextTypeVisibal}
              // classKey={route.params.classKey}
              studentID={student.id}
              keyWord={'student'}
              callBackFunction={() => setTextTypeVisibal(!textTypeVisibal)}
            /> */}
        {/* </TouchableOpacity> */}
        {icon}
        <Text style={[TitleStyles.smallText, {fontSize: 24, marginRight: 15}]}>
          {title}
        </Text>
      </View>
      {sectionAction(type)}
    </View>
  )
}

export default HomeSection
