import * as React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default ({ navigation }: any) => {
  return (
    <Button
      title="Settings"
      onPress={() =>
        navigation.navigate('Settings')
        //navigation.navigate('Settings', { name: 'Jane' })
      }
    />
  )
}