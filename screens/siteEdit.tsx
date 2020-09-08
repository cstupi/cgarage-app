import { StyleSheet, Text, View, Button } from 'react-native'
import SiteSetting from '../lib/Repository/SiteSetting'
import React, { useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import DoorSetting from '../lib/Repository/DoorSetting'
import SettingsRepo from '../lib/Repository/SettingsRepo' // TODO: Better repo/state
export default ({ navigation, route }: any) => {
  const site = route.params?.site as SiteSetting ?? { Name: '', URL: '', Doors: [] }
  const [edited, setSite] = React.useState(JSON.parse(JSON.stringify(site))); 
  const [doorLabel, setDoorLabel] = React.useState('')
  const [doorPin, setDoorPin] = React.useState(-1)
  const [saving, setSaving] = React.useState(false)

  useEffect(() => {
    if(!saving)
      return
    const save = async () => {
      await SettingsRepo.SetSite(edited)
      setSaving(false)
    }
    save()
  }, [saving])
  useEffect(() => {
    
  })

  return (
    <View>
      <TextInput
        onChangeText={text => { setSite({...edited, ...{Name: text}})}}
        placeholder='Site Name'
        value={edited.Name}
      />
      <TextInput
        onChangeText={text => { setSite({...edited, ...{URL: text}})}}
        placeholder='Site Url'
        value={edited.URL}
      />
      {edited.Doors.map((d: DoorSetting,i: number) => {
        return (
          <View key={i}>
            <Text>{d.Label}</Text>
            <Text>{d.Pin}</Text>
          </View>
        )
      })}
      <TextInput
        value={doorLabel}
        onChangeText={text => { setDoorLabel(text)}}
        placeholder='Door Label'
      />
      <TextInput
        value={String(doorPin)}
        dataDetectorTypes='phoneNumber'
        onChangeText={text => { setDoorPin(text as unknown as number) }}
        placeholder='Door Pin'
        
      />
      <Button
        title="Add Door"
        onPress={() => {
          const existing = edited.Doors.findIndex((d: DoorSetting) => d.Label == doorLabel)
          if(existing >= 0){
            return
          }
          setSite({...edited, ...{ Doors: [...edited.Doors, { Label: doorLabel, Pin: doorPin }] }})
          setDoorPin(-1)
          setDoorLabel('')
        } } 
      />
      {saving ? <Text>Saving...</Text> : <Button
        title="Save Site"
        onPress={() => {
          setSaving(true)
        } } 
      /> }
    </View>
  )
}