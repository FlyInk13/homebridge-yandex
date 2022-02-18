"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YandexSmartHome = void 0;
const axios_1 = __importDefault(require("axios"));
const YandexSmartHomeDevice_1 = require("./types/YandexSmartHomeDevice");
class YandexSmartHome {
    constructor(AuthorizationHeader) {
        this.AuthorizationHeader = AuthorizationHeader;
    }
    async request(url, data) {
        return (0, axios_1.default)({ url, ...data }).then(res => res.data);
    }
    async getApiData(method, data) {
        return this.request('https://api.iot.yandex.net/v1.0/' + method, {
            headers: {
                Authorization: this.AuthorizationHeader,
            },
            ...data,
        });
    }
    async postApiData(method, payload) {
        return this.getApiData(method, {
            method: 'POST',
            data: JSON.stringify(payload),
        });
    }
    getDevices() {
        return this.getApiData('user/info', {}).then(({ devices }) => {
            return devices.map((device) => {
                switch (device.type) {
                    case 'devices.types.light':
                        return new YandexSmartHomeDevice_1.YandexSmartHomeDevice(this, device);
                }
                return new YandexSmartHomeDevice_1.YandexSmartHomeDevice(this, device);
            });
        });
    }
    getDeviceByName(name) {
        return this.getDevices().then((devices) => devices.find(device => device.getName().toLocaleLowerCase() === name.toLocaleLowerCase()));
    }
    getDeviceByType(type) {
        return this.getDevices().then((devices) => devices.find(device => device.getType() === type));
    }
}
exports.YandexSmartHome = YandexSmartHome;
//# sourceMappingURL=YandexSmartHome.js.map