import axios from 'axios'
import IGarageAPI from './IGarageAPI'
import GarageDoorResponse from './GarageDoorResponse'

export default class GarageAPI implements IGarageAPI {
  client: any

  constructor(base: string) {
    this.client = axios.create({ baseURL: base})
  }
  async Trigger(pin: Number): Promise<GarageDoorResponse> {
    const result = await this.client.get(`/garagedoor/${pin}`)
    // Handle status codes and validate response
    return result.data
  }


}