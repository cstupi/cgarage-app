import * as React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import SettingsRepo from '../lib/Repository/SettingsRepo';
import SiteSetting from '../lib/Repository/SiteSetting'
import DoorSetting from '../lib/Repository/DoorSetting'
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Auth } from 'aws-amplify';

export default ({ navigation, route }: any) => {
  
  const [sites, setSites] = React.useState({} as Record<string, SiteSetting>)
  const [options, setOptions] = React.useState([] as string[])
  const [selected, setSelected] = React.useState('')
  const [callPin, setCallPin] = React.useState(-1)
  const callGarage = (pin: number) => {
    console.log(`pin ${pin} was selected`)
    const call = async () => {
      const userData = await Auth.currentSession()
      try {
        console.log(userData.accessToken.jwtToken)
        const result = await fetch(`${sites[selected].URL ?? ''}/garage/api/garagedoor/${pin}`, { headers: new Headers({ 'authorization': userData.accessToken.jwtToken})})

       console.log(result.status)

       console.log(await result.json())
      } catch(err){
        console.log(err)
      }
      
    }
    if(callPin != -1)
      call().then(() => setCallPin(-1)).catch(() => setCallPin(-1))

  }

  useEffect(() => {
    const setView = async () => {
      const settings = await SettingsRepo.Get()
      if(!settings)
        return
      setSites(settings)
      setOptions(Object.keys(settings))
      setSelected(options[0] ?? '')
    }
    setView()
  },[selected, options])

  useEffect(() => {
    callGarage(callPin)
  }, [callPin])

  return (
    <View style={styles.container}>
      <View style={styles.settingBtn}>
        <Button
          title="S"
          onPress={() =>
            navigation.navigate('Settings')
          }
        />
      </View>
      <View style={styles.optionRow}>
        {options.map((o: string, i: number) => {
            return <View style={styles.optionBtn} key={i}><Button
              title={o}
              onPress={() => setSelected(o)}
            /></View>
          })
        }
      </View>
      <View>
        {
          sites[selected] == null ?  <View></View> : <View style={styles.doorRow}>
            {sites[selected].Doors.map((d: DoorSetting, i: number) => {
              return <TouchableOpacity style={styles.doorBtn} key={i} onPress={() => setCallPin(d.Pin)} ><Text style={styles.doorBtn}>{d.Label}</Text></TouchableOpacity>
            })}
            </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  settingBtn: {
    height: 50,
    width: 50,
    alignSelf: "flex-end",
    right: 5
  },
  optionRow: {
    flexDirection:"row"
  },
  optionBtn: {
    width: 100
  },
  doorRow: {
    marginTop: 10
  },
  doorBtn: {
    marginTop: 30,
    height: 100,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    borderColor:"black",
    backgroundColor: "lightblue"
  }

})