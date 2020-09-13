import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, Image, Platform, 
         TouchableWithoutFeedback, Alert } from 'react-native'

import ImagePicker from 'react-native-image-crop-picker'
import Modal from 'react-native-modal'

const App = () => {

  const [ photo, setPhoto ] = useState('')
  const [ photoSize, setPhotoSize ] = useState(0)
  const [ photoMime, setPhotoMime ] = useState('')

  const selectFromGalery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      includeBase64: true,
      compressImageQuality: Platform.OS === 'ios' ? 0.8 : 0.5
    }).then(image => {
      setPhoto(image.data)
      setPhotoMime(image.mime)
      setPhotoSize(image.size)
    })
  }

  const openCameraTake = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      includeBase64: true,
      compressImageQuality: Platform.OS === 'ios' ? 0.8 : 0.5
    }).then(image => {
      setPhoto(image.data)
      setPhotoMime(image.mime)
      setPhotoSize(image.size)
    })
  }

  const openMenu = () => {
    Alert.alert(
      'Escolha uma opção?',
      '',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'destructive' },
        { text: 'Nova foto', onPress: () => openCameraTake(), style: 'cancel' },
        { text: 'Selecionar foto', onPress: () => selectFromGalery(), style: 'cancel' },
      ],
      { cancelable: true }
    )
  }

  const renderImage = () => {
    if(photo === null) return null

    return (
      <Image source={{uri: `data:${photoMime};base64,${photo}`}} style={styles.image}/>
    )
  }

  const renderSize = () => {
    var size = photoSize
    var txt = Math.round((size / 1024), 2)

    return `Tamanho: ${txt} kb`
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

        <Text>{ renderSize() }</Text>
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