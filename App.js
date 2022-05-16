import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MusicPlayer from './src/components/MusicPlayer'

const App = () => {
  return (
    <View style={styles.container}>
      <MusicPlayer />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})