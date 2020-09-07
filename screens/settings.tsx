import * as React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { useAsync } from 'react-async';

import SiteSetting from '../lib/Repository/SiteSetting'
import SettingsRepo from '../lib/Repository/SettingsRepo'


export default ({ navigation }: any) => {  
  const [siteSettings, setSettings] = React.useState(([] as SiteSetting[]))
  const [toRemove, setToRemove] = React.useState('')
  React.useEffect(() => {
    const retrieve = async () => {
      const settings = await SettingsRepo.Get()
      if(settings) {
        setSettings(Object.values(settings))
      }
    }
    retrieve()
  }, [siteSettings])

  React.useEffect(() => {
    if(!toRemove)
      return
    const removeSite = async () => { await SettingsRepo.RemoveSite(toRemove) }
    removeSite()
  }, [toRemove])
  const remove = (name: string) => {
    let idx = siteSettings.findIndex((s: SiteSetting) => s.Name === name)
    if(idx === -1)
      return
    setToRemove(name)
    setSettings([...siteSettings.slice(0,idx),...siteSettings.slice(idx+1)])
  }
  return (
    <View>
      { siteSettings.map((s: SiteSetting, i: number) => { return (
      <View key={i}>
        <Text>{s.Name}</Text>
        <Button
          title="Edit"
          onPress={() => navigation.navigate('siteEdit', { site:  s })}
        />
        <Button
          title="X"
          onPress={() => remove(s.Name)}
        />
      </View>
      )})}
      <Button
        title="Add Site"
        onPress={() => navigation.navigate('siteEdit', { site:  null })}
      />
    </View>
  )
}
