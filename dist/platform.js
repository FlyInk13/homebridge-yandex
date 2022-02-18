"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomebridgeYandexPlatform = void 0;
const settings_1 = require("./settings");
const platformAccessory_1 = require("./platformAccessory");
const YandexSmartHome_1 = require("./api/YandexSmartHome");
class HomebridgeYandexPlatform {
    constructor(log, config, api) {
        this.log = log;
        this.config = config;
        this.api = api;
        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;
        this.accessories = [];
        this.yandexSmartHome = new YandexSmartHome_1.YandexSmartHome(this.config.access_token);
        this.api.on('didFinishLaunching', () => {
            this.discoverDevices().catch((error) => {
                this.log.error('Yandex discoverDevices error:', error);
            });
        });
    }
    configureAccessory(accessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        // add the restored accessory to the accessories cache so we can track if it has already been registered
        this.accessories.push(accessory);
    }
    async discoverDevices() {
        const exampleDevices = [
            {
                exampleUniqueId: 'ABCD',
                exampleDisplayName: 'Bedroom',
            },
            {
                exampleUniqueId: 'EFGH',
                exampleDisplayName: 'Kitchen',
            },
        ];
        const devices = await this.yandexSmartHome.getDevices();
        for (const device of devices) {
            const uuid = this.api.hap.uuid.generate(device.getId());
            const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
            if (existingAccessory) {
                this.log.info('Adding old accessory:', device.getName());
                // new ExamplePlatformAccessory(this, existingAccessory);
            }
            else {
                this.log.info('Adding new accessory:', device.getName());
                const accessory = new this.api.platformAccessory(device.getName(), uuid);
                accessory.context.device = device;
                new platformAccessory_1.ExamplePlatformAccessory(this, accessory);
                this.api.registerPlatformAccessories(settings_1.PLUGIN_NAME, settings_1.PLATFORM_NAME, [accessory]);
            }
        }
    }
}
exports.HomebridgeYandexPlatform = HomebridgeYandexPlatform;
//# sourceMappingURL=platform.js.map