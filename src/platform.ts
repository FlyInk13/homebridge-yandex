import { API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';

import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import { ExamplePlatformAccessory } from './platformAccessory';
import { YandexSmartHome } from "./api/YandexSmartHome";
import { YandexSmartHomeDevice } from "./api/types/YandexSmartHomeDevice";

export class HomebridgeYandexPlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;
  public readonly accessories: PlatformAccessory[] = [];
  public readonly yandexSmartHome: YandexSmartHome;

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.yandexSmartHome = new YandexSmartHome(this.config.access_token);
    this.api.on('didFinishLaunching', () => {
      this.discoverDevices().catch((error) => {
        this.log.error('Yandex discoverDevices error:', error);
      });
    });
  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);

    // add the restored accessory to the accessories cache so we can track if it has already been registered
    this.accessories.push(accessory);
  }

  async discoverDevices() {
    const devices: YandexSmartHomeDevice[] = await this.yandexSmartHome.getDevices();

    for (const device of devices) {
      if (device.getType() !== 'devices.types.light') {
        continue;
      }

      const uuid = this.api.hap.uuid.generate(device.getId());
      const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

      if (existingAccessory) {
        this.log.debug('Adding old accessory:', device.getName());
        existingAccessory.context.device = device;
        this.api.updatePlatformAccessories([existingAccessory]);
        new ExamplePlatformAccessory(this, existingAccessory);
      } else {
        this.log.debug('Adding new accessory:', device.getName());
        const accessory = new this.api.platformAccessory(device.getName(), uuid);
        accessory.context.device = device;
        new ExamplePlatformAccessory(this, accessory);
        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
      }
    }
  }
}
