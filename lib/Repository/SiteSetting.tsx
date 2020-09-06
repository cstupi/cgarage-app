import DoorSetting from './DoorSetting'
export default interface ISiteSetting {
  Name: string
  URL: string
  Doors: DoorSetting[]
}