import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import TitleStyles from '../Styles/Titles'
import BackBtn from '../assets/images/BackBtn.svg'
import {useNavigation} from '@react-navigation/native'

const BackButton = () => {
  const navigation = useNavigation()

  return (
    <View style={{position: 'absolute', top: 65, left: 35}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}>
        <BackBtn style={TitleStyles.shadowOffset} />
      </TouchableOpacity>
    </View>
  )
}

export default BackButton
