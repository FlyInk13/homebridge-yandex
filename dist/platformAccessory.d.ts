import { PlatformAccessory, CharacteristicValue } from 'homebridge';
import { HomebridgeYandexPlatform } from './platform';
export declare class ExamplePlatformAccessory {
    private readonly platform;
    private readonly accessory;
    private service;
    constructor(platform: HomebridgeYandexPlatform, accessory: PlatformAccessory);
    setOn(value: CharacteristicValue): Promise<void>;
    getOn(): Promise<CharacteristicValue>;
    setBrightness(value: CharacteristicValue): Promise<void>;
}
//# sourceMappingURL=platformAccessory.d.ts.map