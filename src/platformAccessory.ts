import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { HomebridgeYandexPlatform } from './platform';
import { YandexSmartHomeDevice } from "./api/types/YandexSmartHomeDevice";
import { loadavg } from "os";

export class ExamplePlatformAccessory {
  private service: Service;

  constructor(
    private readonly platform: HomebridgeYandexPlatform,
    private readonly accessory: PlatformAccessory
  ) {
    const device: YandexSmartHomeDevice = this.accessory.context.device;
    const { type, external_id, id } = device.getDeviceData();
    const name = device.getName();

    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, type)
      .setCharacteristic(this.platform.Characteristic.Model, external_id)
      .setCharacteristic(this.platform.Characteristic.SerialNumber, id);

    this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);
    this.service.setCharacteristic(this.platform.Characteristic.Name, name);

    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below

    this.service.getCharacteristic(this.platform.Characteristic.Brightness)
      .onSet(this.setBrightness.bind(this));       // SET - bind to the 'setBrightness` method below
  }

  async setOn(value: CharacteristicValue) {
    const device: YandexSmartHomeDevice = this.accessory.context.device;
    this.platform.log.warn('Set Characteristic On ->', value);
    await device.setSwitchState(value);
  }

  async getOn(): Promise<CharacteristicValue> {
    const device: YandexSmartHomeDevice = this.accessory.context.device;
    const isOn = await device.getSwitchState();
    this.platform.log.warn('Get Characteristic On ->', isOn);
    return isOn;
  }

  async setBrightness(value: CharacteristicValue) {
    const device: YandexSmartHomeDevice = this.accessory.context.device;
    this.platform.log.warn('Set Characteristic Brightness -> ', value);
    await device.setRange(value);
  }
}
