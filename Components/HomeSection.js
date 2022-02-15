import React from 'react'
import {Text, TouchableOpacity, View, Platform, I18nManager} from 'react-native'
import TitleStyles from '../Styles/Titles'

import Plus from '../assets/images/Plus'
import Trophy from '../assets/images/Trophy'

const HomeSection = ({title, iconName}) => {
  return (
    <View style={TitleStyles.HomeSectioner}>
      <View style={{flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse', alignItems: 'center'}}>
        {iconName === 'Plus' ? <TouchableOpacity><Plus /></TouchableOpacity> : <Trophy />}
        <Text style={[TitleStyles.smallText, {fontSize: 24, marginRight: 15}]}>
          {title}
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={TitleStyles.smallText}>عرض الكل</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeSection
