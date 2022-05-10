import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  I18nManager,
} from 'react-native';
import TitleStyles from '../Styles/Titles';
import BookReader from '../assets/images/BookReader';
import Trash from '../assets/images/Trash';
import ConfirmModel from '../Components/ConfirmModel';
import SuccessModel from '../Components/SuccessModel';

import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const AssignmentCard = ({title, textID, index, deleteOption}) => {
  const navigation = useNavigation();
  const colors = ['#43515F', '#AFC3D6'];
  const detailsColor = ['#FFFFFF', '#43515F'];
  const [ConfirmmodalVisible, setConfirmmodalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const deleteAssignment = textID => {
    setConfirmmodalVisible(!ConfirmmodalVisible);
    firestore()
      .collection('Instructor Text')
      .doc(textID)
      .delete()
      .then(() => {
        setModalVisible(!modalVisible);
      });
  };
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
      {ConfirmmodalVisible ? (
        <ConfirmModel
          message={'هل انت متأكد من حذف الواجب؟'}
          modalVisible={ConfirmmodalVisible}
          setModalVisible={setConfirmmodalVisible}
          sentFunction={deleteAssignment}
          ID={textID}
        />
      ) : null}

      {modalVisible ? (
        <SuccessModel
          message={'تم حذف الواجب بنجاح'}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* <BookReader width={25} height={20} /> */}
        {deleteOption ? (
          <TouchableOpacity
            onPress={() => setConfirmmodalVisible(!ConfirmmodalVisible)}>
            <Trash fill={'#C54822'} />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text
        style={[
          TitleStyles.smallText,
          {fontSize: 18, color: '#FFFFFF', textAlign: 'center'},
        ]}>
        {title}
      </Text>
      {/* <TouchableOpacity>
        <Text
          style={[
            TitleStyles.smallText,
            {
              fontSize: 10,
              color: detailsColor[index % 2],
              textDecorationLine: 'underline',
            },
          ]}>
          عرض التفاصيل
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default AssignmentCard;
