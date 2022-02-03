import React  from 'react';
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


const AnimalPicker = () =>  {
  const animalPick = [
  require('../assets/images/animals/Bear.png'),
  require('../assets/images/animals/Cat.png'),
  require('../assets/images/animals/Fox.png'),
  require('../assets/images/animals/Panda.png'),
  require('../assets/images/animals/Raccoon.png'),
  require('../assets/images/animals/Raindeer.png'),
  require('../assets/images/animals/Zebra.png'),
  require('../assets/images/animals/Elephant.png'),
];
  const randomImage =
    animalPick[Math.floor(Math.random() * animalPick.length)];
  console.log(randomImage);

  return (
    <View >
      <Image source={randomImage} style={{height: 90, width: 90}} />
    </View>
  );
}


export default AnimalPicker;