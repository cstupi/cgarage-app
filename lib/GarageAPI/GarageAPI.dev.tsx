import axios from 'axios'
import IGarageAPI from './IGarageAPI'
import GarageDoorResponse from './GarageDoorResponse'

export default class GarageAPI implements IGarageAPI {
  client: any

  constructor(base: string) {
    this.client = axios.create({ baseURL: base})
  }
  async Trigger(pin: Number): Promise<GarageDoorResponse> {
    return new Promise<GarageDoorResponse>(() => { 'success' })
  }
}