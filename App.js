import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, Image, Platform } from 'react-native'

import ImagePicker from 'react-native-image-crop-picker'
import ActionSheet from 'react-native-actionsheet'

const App = () => {

  const [ photo, setPhoto ] = useState('')
  const [ photoSize, setPhotoSize ] = useState(0)
  const [ photoMime, setPhotoMime ] = useState('')

  var refContainer = null

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
    refContainer.show()
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

  const actionSelectPhoto = (idx) => {
    switch (idx) {
      case 0:
          openCameraTake()
          break;
      case 1:
          selectFromGalery()
          break;
      case 2:
          break;
    }
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

      <ActionSheet 
        ref={ ev => refContainer = ev}
        title={'Selecione uma opção'}
        options={['Tirar foto', 'Escolher na galeria', 'Cancelar']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) => { actionSelectPhoto(index) }}/> 

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