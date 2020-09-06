import SiteSetting from './SiteSetting'

export default interface ISettingsRepo {
  Get(): Promise<Record<string,SiteSetting>>
  Set(settings: Record<string, SiteSetting>): Promise<void>
  GetSite(name: string): Promise<SiteSetting>
  SetSite(setting: SiteSetting): Promise<void>
}