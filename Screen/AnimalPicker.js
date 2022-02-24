import React , {useState , useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableOpacity,
  Image
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';



const AnimalPicker = (pic) =>  {
  const [imageUrl, setImageUrl] = useState(undefined);

 
useEffect(() => {
    storage()
      .ref('Animals/'+Object.values(pic)) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
        
      })
      .catch((e) => console.log('Errors while downloading => ', e));
  }, []);

  return (
    <View >
      <Image source={{uri: imageUrl}} style={{height: 83, width: 83 , marginLeft:-5, marginTop:-3}} />
    </View>
  );
}


export default AnimalPicker;