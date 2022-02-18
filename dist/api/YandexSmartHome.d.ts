export declare class YandexSmartHome {
    private readonly AuthorizationHeader;
    constructor(AuthorizationHeader: any);
    request(url: string, data: any): Promise<any>;
    getApiData(method: any, data: any): Promise<any>;
    postApiData(method: any, payload: any): Promise<any>;
    getDevices(): Promise<any>;
    getDeviceByName(name: any): Promise<any>;
    getDeviceByType(type: any): Promise<any>;
}
//# sourceMappingURL=YandexSmartHome.d.ts.map