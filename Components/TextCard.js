import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  I18nManager,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import BookReader from '../assets/images/BookReader';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const TextCard = ({title, textID, doneRecite}) => {
  const navigation = useNavigation();
  const [totalWords, setTotalWords] = useState();
  const [numOfmistakes, setNumOfMistakes] = useState();

  useEffect(() => {
    const text = firestore()
      .collection('Student Text')
      .doc(textID)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          setTotalWords(snapshot.data().TextBody.length);
          setNumOfMistakes(snapshot.data().Feedback.score);
        }
      });
    return text;
  }, []);

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
          alignSelf: I18nManager.isRTL ? 'flex-start' : 'flex-end',
        },
        TitleStyles.SoftShadow,
      ]}>
      <View
        style={{
          flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
          marginBottom: 20,
          alignItems: 'center',
        }}>
        <BookReader />
        <Text
          style={[
            TitleStyles.smallText,
            I18nManager.isRTL ? {marginLeft: 15} : {marginRight: 15},
            {fontSize: 18},
          ]}>
          {title}
        </Text>
      </View>

      <View
        style={{
          flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
          justifyContent: 'space-between',
        }}>
        {doneRecite < 3 && (
          <TouchableOpacity
            style={[
              I18nManager.isRTL ? {marginRight: 10} : {marginLeft: 10},
              {
                backgroundColor: '#FFFFFF',
                borderRadius: 25,
                paddingHorizontal: 12,
              },
            ]}
            onPress={() => {
              navigation.navigate('MemorizationSession', {TextID: textID});
            }}>
            <Text style={TitleStyles.smallText}>ابدأ المراجعة</Text>
          </TouchableOpacity>
        )}

        {doneRecite >= 3 && (
          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 25,
              paddingHorizontal: 12,
            }}
            //This needs to get sorted out
            onPress={() =>
              navigation.navigate('Feedback', {
                textID: textID,
                totalWords: totalWords,
                mistakesNum: numOfmistakes,
              })
            }>
            <Text style={TitleStyles.smallText}>استعراض النتائج</Text>
          </TouchableOpacity>
        )}

        {doneRecite < 3 && (
          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 25,
              paddingHorizontal: 12,
            }}
            onPress={() => {
              navigation.navigate('ReciteSession', {TextID: textID});
            }}>
            <Text style={TitleStyles.smallText}>ابدأ التسميع</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextCard;
