import React from 'react'
import {Text, TouchableOpacity, View, Platform, I18nManager} from 'react-native'
import TitleStyles from '../Styles/Titles'
import BookReader from '../assets/images/BookReader'
import {useNavigation} from '@react-navigation/native'

const AssignmentCard = ({title, textID, index}) => {
  const navigation = useNavigation()
  const colors = ['#43515F', '#AFC3D6']

  return (
    <View
      style={[
        {
          backgroundColor: colors[index % 2],
          flexDirection: 'column',
          paddingHorizontal: 15,
          paddingTop: 10,
          paddingBottom: 5,
          margin: 10,
          marginTop: 0,
          borderRadius: 25,
          width: 145,
          height: 120,
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        TitleStyles.SoftShadow,
      ]}>
      <BookReader width={25} height={20} style={{alignSelf: 'flex-start'}} />
      <Text
        style={[
          TitleStyles.smallText,
          {fontSize: 18, color: '#FFFFFF', textAlign: 'center'},
        ]}>
        {title}
      </Text>
      <TouchableOpacity>
        <Text
          style={[
            TitleStyles.smallText,
            {fontSize: 10, color: '#FFFFFF', textDecorationLine: 'underline'},
          ]}>
          عرض التفاصيل
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AssignmentCard
