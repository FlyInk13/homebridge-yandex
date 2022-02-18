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
    route(commandName: any): {
        status: string;
    };
    getSwitchState(): any;
    toggleSwitchState(): Promise<any>;
    sendCapabilityAction(...actions: any[]): Promise<any>;
    setSwitchState(value: any): Promise<any>;
    setColorSettings(value: any): Promise<any>;
    setRange(value: any): Promise<any>;
    setTemperature(temperature_k: any, brightness: any): Promise<any>;
}
//# sourceMappingURL=YandexSmartHomeDevice.d.ts.map