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
    this.platform.log.debug('create ExamplePlatformAccessory', this.accessory.context.device);

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
      .onSet(this.setBrightness.bind(this))        // SET - bind to the 'setBrightness` method below
      .onGet(this.getBrightness.bind(this));       // GET - bind to the 'getBrightness` method below
  }

  async setOn(value: CharacteristicValue) {
    const device: YandexSmartHomeDevice = this.accessory.context.device;

    this.platform.log.debug('Set On:', value);
    await device.setSwitchState(value);
  }

  async getOn(): Promise<CharacteristicValue> {
    const device: YandexSmartHomeDevice = this.accessory.context.device;
    await device.loadDeviceData().catch((error) => this.platform.log.debug('loadDeviceData error', error));
    const isOn = await device.getSwitchState();

    this.platform.log.debug('Get On:', isOn);
    return isOn;
  }

  async getBrightness(): Promise<CharacteristicValue> {
    const device: YandexSmartHomeDevice = this.accessory.context.device;
    await device.loadDeviceData().catch((error) => this.platform.log.debug('loadDeviceData error', error));
    const capability = await device.getCapabilityByType('devices.capabilities.range');
    const value = capability ? capability.state.value : 50;

    this.platform.log.debug('Get Brightness:', value);
    return value;
  }

  async setBrightness(value: CharacteristicValue) {
    const device: YandexSmartHomeDevice = this.accessory.context.device;
    const minTemp = 1500;
    const maxTemp = 6500;
    const curTemp = Math.max(0, value as number - 50);
    const newTemp = minTemp + Math.ceil(curTemp / 50 * maxTemp);

    this.platform.log.debug('Set Brightness: ', newTemp, value);
    await device.setTemperature(newTemp, value);
  }
}
