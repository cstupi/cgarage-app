import { AsyncStorage } from "react-native";

import ISettingsRepo from "./ISettingsRepo";
import SiteSetting from './SiteSetting'

const key = 'cgarage'

export default class SettingRepo implements ISettingsRepo {
  constructor() {}
  async Get(): Promise<Record<string,SiteSetting>> {
    try {
      const strVal = await AsyncStorage.getItem(key)
      if(!strVal){
        return {}
      }
      return JSON.parse(strVal)
    } catch(err) {
      throw err // just throw for now
    }
  }
  async Set(setting: Record<string, SiteSetting>): Promise<void> {
    try {
      if(setting == null)
        await AsyncStorage.removeItem(key)
      else
        await AsyncStorage.setItem(key, JSON.stringify(setting))
    } catch(err) {
      throw err //just throw for now
    }
  }
  async GetSite(name: string): Promise<SiteSetting> {
    try {
      const allSettings = await this.Get()
      return allSettings[name]
    } catch(err) {
      throw err // just throw for now
    }
  }
  async SetSite(setting: SiteSetting): Promise<void> {
    try {
      const allSettings = await this.Get()
      allSettings[setting.Name] = setting
      await this.Set(allSettings)
    } catch(err) {
      throw err // just throw for now
    }
  }
}