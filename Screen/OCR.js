import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import ml from '@react-native-firebase/ml'

import {firebase} from '@react-native-firebase/functions'

export default function RecordVoice () {

  const [response, setResponse] = useState()
  const [result, setResult] = useState({})
  const [localpath, setLocalpath] = useState({})

  const onSelectImagePress = () =>
    launchImageLibrary('photo', onMediaSelectCallBack)

  const onMediaSelectCallBack = media => {
    setResponse(media)
    media.assets.map(({uri}) => {
      setLocalpath(uri)
    })
  }

  const onProcessPhoto = async () => {
    console.log(localpath)
    await firebase
      .functions()
      .httpsCallable('annotateImage')(localpath)
      .then(response => {
        const detections = response.textAnnotations
        console.log(response)
        console.log('Text:')
        detections.forEach(text => console.log(text))
      })
      .catch(err => console.log(err))

    // const result = await ml().cloudDocumentTextRecognizerProcessImage(
    //           uri,
    //           {
    //             languageHints: ['en'], // string[]
    //             apiKeyOverride: 'AIzaSyAHRHxTUVdJSjWg6rflJXNWNR1jhhZoGn0', // undefined | string,
    //             enforceCertFingerprintMatch: true, // undefined | false | true,
    //           },
    //         );
  }
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Text Recognition</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.button} onPress={onProcessPhoto}>
    
          <Text style={styles.buttonText}>Process Photo</Text>
        </TouchableOpacity>
        {response?.assets &&
          response?.assets.map(({uri}) => (
            <View key={uri} style={styles.image}>
              <Image
                resizeMode='cover'
                resizeMethod='scale'
                style={{width: 200, height: 200}}
                source={{uri: uri}}
              />
            </View>
          ))}
      </View>

      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 30}}>{result.text}</Text>
      </View>
    </ScrollView>
  )
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
})
