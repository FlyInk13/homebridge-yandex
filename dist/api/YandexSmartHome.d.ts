import { YandexSmartHomeDevice } from './types/YandexSmartHomeDevice';
export declare class YandexSmartHome {
    private readonly AuthorizationHeader;
    constructor(AuthorizationHeader: any);
    request(url: string, data: any): Promise<any>;
    getApiData(method: any, data: any): Promise<any>;
    postApiData(method: any, payload: any): Promise<any>;
    getDevices(): Promise<YandexSmartHomeDevice[]>;
    getDeviceByName(name: any): Promise<YandexSmartHomeDevice | undefined>;
    getDeviceByType(type: any): Promise<YandexSmartHomeDevice | undefined>;
}
//# sourceMappingURL=YandexSmartHome.d.ts.map