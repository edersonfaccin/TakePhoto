import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'

import ImagePicker from 'react-native-image-picker'

const App = () => {

  const [ photo, setPhoto ] = useState('')

  const options = {
    title: 'Selecionar imagem',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    },
    maxWidth: 500,
    maxHeight: 320,
    quality: 0.5
  }

  const openMenu = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri }
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data }
        setPhoto(source)

        console.log('fileSize', response.fileSize)
      }
    })
  }

  const selectFromGalery = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      const source = { uri: response.uri }
      setPhoto(source)

      console.log('fileSize', response.fileSize)
    });
  }

  const openCameraTake = () => {
    ImagePicker.launchCamera(options, (response) => {
      const source = { uri: response.uri }
      setPhoto(source)

      console.log('fileSize', response.fileSize)
    });
  }

  const renderImage = () => {
    if(photo === null) return null

    return (
      <Image source={photo} style={styles.image}/>
    )
  }

  return (
    <View style={styles.body}>
      <View style={{flex: 1}}>
        <Text>Take picture and crop image</Text>

        <View style={{paddingTop: 4}}>
          <Button title={'Choose'} onPress={openMenu}/>
        </View>

        <View style={{paddingTop: 4}}>
          <Button title={'Select from galery'} onPress={selectFromGalery}/>
        </View>        
        <View style={{paddingTop: 4}}>
          <Button title={'Open camera'} onPress={openCameraTake}/>
        </View>        
      </View>

      <View style={{flex: 5, marginTop: 60}}>

        { renderImage() }

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'gray',
    flex: 1
  },
  image: {
    borderWidth: 1,
    borderColor: 'red',
    width: 250,
    height: 250
  }
})

export default App