import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ml from '@react-native-firebase/ml';
export default function RecordVoice() {
  const [image, setImage] = useState();
  const [result, setResult] = useState({});

  const onTakePhoto = () => launchCamera({mediaType: 'image'}, onMediaSelect);

  const onSelectImagePress = () =>
    launchImageLibrary({mediaType: 'image'}, onMediaSelect);

  //onMediaSelect is a callback
  console.log('the image ');

  const onMediaSelect = async media => {
    try {
      if (!media.didCancel) {
        console.log('the image ' + media.uri);
        setImage(media.uri);
        const result = await ml().cloudDocumentTextRecognizerProcessImage(
          media.uri,
          {
            languageHints: ['en'], // string[]
            apiKeyOverride: 'AIzaSyAHRHxTUVdJSjWg6rflJXNWNR1jhhZoGn0', // undefined | string,
            enforceCertFingerprintMatch: true, // undefined | false | true,
          },
        );
        console.log('the image ' + media.uri);
        setResult(result);
      }
    } catch (error) {}
  };
  console.log('the image ');

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Text Recognition</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          source={{uri: image}}
          style={styles.image}
        />
      </View>
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 30}}>{result.text}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  image: {
    height: 300,
    width: 300,
    marginTop: 30,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#494e5a',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});

