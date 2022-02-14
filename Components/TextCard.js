import React from 'react'
import {Text, TouchableOpacity, View, Platform, I18nManager} from 'react-native'
import TitleStyles from '../Styles/Titles'
import BookReader from '../assets/images/BookReader'

const TextCard = () => {
  return (
    <View
      style={[
        {
          backgroundColor: '#f7d3c1',
          flexDirection: 'column',
          padding: 15,
          margin: 15,
          marginTop: 0,
          borderRadius: 25,
          width: 250,
          alignSelf: 'flex-end',
        },
        TitleStyles.SoftShadow,
      ]}>
      <View
        style={{
          flexDirection: 'row-reverse',
          marginBottom: 20,
          alignItems: 'center',
        }}>
        <BookReader />
        <Text style={[TitleStyles.smallText, {fontSize: 18, marginRight: 15}]}>
          حفظ النشيد الوطني
        </Text>
      </View>

      <View
        style={{flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 25,
            paddingHorizontal: 12,
            marginLeft: 10,
          }}>
          <Text style={TitleStyles.smallText}>ابدأ المراجعة</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 25,
            paddingHorizontal: 12,
          }}>
          <Text style={TitleStyles.smallText}>ابدأ التسميع</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TextCard
