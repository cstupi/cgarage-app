import { AsyncStorage } from "react-native";

import SiteSetting from './SiteSetting'

const key = 'cgarage'

export default class SettingsRepo {
  constructor() {}
  static async Get(): Promise<Record<string,SiteSetting>> {
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
  static async Set(setting: Record<string, SiteSetting>): Promise<void> {
    try {
      if(setting == null)
        await AsyncStorage.removeItem(key)
      else
        await AsyncStorage.setItem(key, JSON.stringify(setting))
    } catch(err) {
      throw err //just throw for now
    }
  }
  static async GetSite(name: string): Promise<SiteSetting> {
    try {
      const allSettings = await this.Get()
      return allSettings[name]
    } catch(err) {
      throw err // just throw for now
    }
  }
  static async SetSite(setting: SiteSetting): Promise<void> {
    try {
      const allSettings = await this.Get()
      allSettings[setting.Name] = setting
      await this.Set(allSettings)
    } catch(err) {
      throw err // just throw for now
    }
  }
  static async RemoveSite(name: string){
    const allSettings = await this.Get()
    delete allSettings[name]
    this.Set(allSettings)
  }
}