import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { HomebridgeYandexPlatform } from './platform';
import { YandexSmartHomeDevice } from "./api/types/YandexSmartHomeDevice";
export declare class ExamplePlatformAccessory {
    private readonly platform;
    private readonly accessory;
    private readonly device;
    private service;
    constructor(platform: HomebridgeYandexPlatform, accessory: PlatformAccessory, device: YandexSmartHomeDevice);
    setOn(value: CharacteristicValue): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
    setBrightness(value: CharacteristicValue): Promise<void>;
}
//# sourceMappingURL=platformAccessory.d.ts.map