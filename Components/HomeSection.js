import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  I18nManager,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import {useNavigation} from '@react-navigation/native';
import Plus from '../assets/images/Plus';
import Trophy from '../assets/images/Trophy';
import {UserInfoContext} from '../auth/UserInfoContext';
import TextType from '../Components/TextType';

const HomeSection = ({title, iconName, type}) => {
  const navigation = useNavigation();
  const [textTypeVisibal, setTextTypeVisibal] = useState(false);
  const {student} = React.useContext(UserInfoContext);

  return (
    <View style={TitleStyles.HomeSectioner}>
      <View
        style={{
          flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
          alignItems: 'center',
        }}>
        {iconName === 'Plus' ? (
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('RecordVoice', {
              //   StudentID: student.id,
              //   keyword: 'student',
              // });
              setTextTypeVisibal(!textTypeVisibal);
            }}>
            <TextType
              modalVisible={textTypeVisibal}
              setModalVisible={setTextTypeVisibal}
              // classKey={route.params.classKey}
              studentID= {student.id}
              keyWord={'student'}
            />

            <Plus />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Feedback');
            }}>
            <Trophy />
          </TouchableOpacity>
        )}
        <Text style={[TitleStyles.smallText, {fontSize: 24, marginRight: 15}]}>
          {title}
        </Text>
      </View>
      {type == 'text' ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('StudentViewAllAssignment');
          }}>
          <Text style={TitleStyles.smallText}>عرض الكل</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            console.log('PROGRESS PAGE WILL BE IMPLEMENTED LATER');
          }}>
          <Text style={TitleStyles.smallText}>عرض الكل</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HomeSection;
