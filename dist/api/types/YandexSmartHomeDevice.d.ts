import { YandexSmartHome } from '../YandexSmartHome';
export declare class YandexSmartHomeDevice {
    private yaSmartHome;
    private device;
    private capabilities;
    constructor(yaSmartHome: YandexSmartHome, device: any);
    getId(): any;
    getName(): any;
    getDeviceData(): any;
    getType(): any;
    getCapabilityByType(type: any): any;
    getCapabilityValueByType(type: any): any;
    setCapabilityValueByType(type: any, value: any): boolean;
    route(commandName: any): {
        status: string;
    };
    loadDeviceData(): Promise<void>;
    getSwitchState(): any;
    toggleSwitchState(): Promise<any>;
    sendCapabilityAction(...actions: any[]): Promise<any>;
    setSwitchState(value: any): Promise<any>;
    setColorSettings(temperature_k: any): Promise<any>;
    setRange(brightness: any): Promise<any>;
    setTemperature(temperature_k: any, brightness: any): Promise<any>;
}
//# sourceMappingURL=YandexSmartHomeDevice.d.ts.map