import { Service, PlatformAccessory, CharacteristicValue } from 'homebridge';
import { HomebridgeYandexPlatform } from './platform';
import { YandexSmartHomeDevice } from "./api/types/YandexSmartHomeDevice";

export class ExamplePlatformAccessory {
  private service: Service;

  constructor(
    private readonly platform: HomebridgeYandexPlatform,
    private readonly accessory: PlatformAccessory,
    private readonly device: YandexSmartHomeDevice
  ) {

    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, device.getDeviceInfo().manufacturer)
      .setCharacteristic(this.platform.Characteristic.Model, device.getDeviceInfo().model)
      .setCharacteristic(this.platform.Characteristic.SerialNumber, device.getId());

    this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.getName());

    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below

    this.service.getCharacteristic(this.platform.Characteristic.Brightness)
      .onSet(this.setBrightness.bind(this));       // SET - bind to the 'setBrightness` method below
  }

  async setOn(value: CharacteristicValue) {
    const device: YandexSmartHomeDevice = this.accessory.context.device;
    this.platform.log.debug('Set Characteristic On ->', value);
    await device.setSwitchState(value);
  }

  async getOn(): Promise<CharacteristicValue> {
    const device: YandexSmartHomeDevice = this.accessory.context.device;
    const isOn = await device.getSwitchState();
    this.platform.log.debug('Get Characteristic On ->', isOn);
    return isOn;
  }

  async setBrightness(value: CharacteristicValue) {
    const device: YandexSmartHomeDevice = this.accessory.context.device;
    this.platform.log.debug('Set Characteristic Brightness -> ', value);
    await device.setRange(value);
  }
}
