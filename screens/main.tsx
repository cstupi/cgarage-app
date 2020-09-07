import * as React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import SettingsRepo from '../lib/Repository/SettingsRepo';
import SiteSetting from '../lib/Repository/SiteSetting'
import DoorSetting from '../lib/Repository/DoorSetting'
import { useEffect } from 'react';

const callGarage = (pin: number) => {
  console.log(`pin ${pin} was selected`)
}

export default ({ navigation }: any) => {
  
  const [sites, setSites] = React.useState({} as Record<string, SiteSetting>)
  const [options, setOptions] = React.useState([] as string[])
  const [selected, setSelected] = React.useState('')
  const [done, setDone] = React.useState(false)
  useEffect(() => {
    const setView = async () => {
      const settings = await SettingsRepo.Get()
      if(!settings)
        return
      setSites(settings)
      setOptions(Object.keys(settings))
      setSelected(options[0] ?? '')
      setDone(true)
    }
    if(!done)
      setView()
  },[done, selected, options])
  console.log(options)
  return (
    <View>
      <Button
        title="Settings"
        onPress={() =>
          navigation.navigate('Settings')
        }
      />
      {options.map((o: string, i: number) => {
          return <Button
            key={i}
            title={o}
            onPress={() => setSelected(o)}
          />
        })
      }
      {
        sites[selected] == null ?  <View></View> : <View>
           {sites[selected].Doors.map((d: DoorSetting, i: number) => {
             <Button key={i} title={d.Label} onPress={() => callGarage(d.Pin)} />
           })}
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})