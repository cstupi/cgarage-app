import GarageDoorResponse from "./GarageDoorResponse";

export default interface IGarageAPI {
  client: Object
  Trigger(pin: Number): Promise<GarageDoorResponse>
}