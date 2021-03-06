"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YandexSmartHomeDevice = void 0;
// https://yandex.ru/dev/dialogs/smart-home/doc/concepts/capability-types.html#capability-types__types
class YandexSmartHomeDevice {
    constructor(yaSmartHome, device) {
        console.log('yandex device', device);
        this.yaSmartHome = yaSmartHome;
        this.device = device;
        this.capabilities = device.capabilities;
    }
    getId() {
        return this.device.id;
    }
    getName() {
        return this.device.name;
    }
    getDeviceData() {
        return this.device;
    }
    getType() {
        return this.device.type;
    }
    getCapabilityByType(type) {
        return this.capabilities.find(c => c.type === type);
    }
    getCapabilityValueByType(type) {
        var _a, _b;
        return (_b = (_a = this.getCapabilityByType(type)) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.value;
    }
    setCapabilityValueByType(type, value) {
        const capability = this.getCapabilityByType(type);
        if (typeof (capability === null || capability === void 0 ? void 0 : capability.state) !== 'object') {
            return false;
        }
        capability.state.value = value;
        return true;
    }
    route(commandName) {
        return { status: 'Ой, я не умею в такой тип устройства' };
    }
    // update self data
    async loadDeviceData() {
        // todo: https://yandex.ru/dev/dialogs/smart-home/doc/reference/post-devices-query.html
        const devices = await this.yaSmartHome.getDevices();
        const device = devices.find((device) => device.getId() === this.getId());
        if (device) {
            this.device = device.getDeviceData();
        }
        else {
            throw { error: 'not found' };
        }
    }
    // on_off
    getSwitchState() {
        const capability = this.getCapabilityByType('devices.capabilities.on_off');
        return capability ? capability.state.value : null;
    }
    async toggleSwitchState() {
        const currentState = this.getSwitchState();
        return this.setSwitchState(!currentState);
    }
    async sendCapabilityAction(...actions) {
        return this.yaSmartHome.postApiData('devices/actions', {
            devices: [
                {
                    id: this.getId(),
                    actions: actions
                }
            ]
        });
    }
    async setSwitchState(value) {
        return this.sendCapabilityAction({
            type: 'devices.capabilities.on_off',
            retrievable: true,
            state: { instance: 'on', value }
        }).then((res) => {
            this.setCapabilityValueByType('devices.capabilities.on_off', value);
            return res;
        });
    }
    // color_setting
    async setColorSettings(temperature_k) {
        return this.sendCapabilityAction({
            type: 'devices.capabilities.color_setting',
            retrievable: true,
            state: {
                instance: "temperature_k",
                value: temperature_k,
            }
        }).then((res) => {
            this.setCapabilityValueByType('devices.capabilities.color_setting', temperature_k);
            return res;
        });
    }
    // range
    async setRange(brightness) {
        return this.sendCapabilityAction({
            type: 'devices.capabilities.range',
            retrievable: true,
            state: {
                instance: "brightness",
                value: brightness,
            }
        }).then((res) => {
            this.setCapabilityValueByType('devices.capabilities.range', brightness);
            return res;
        });
    }
    //
    async setTemperature(temperature_k, brightness) {
        return this.sendCapabilityAction({
            type: 'devices.capabilities.color_setting',
            retrievable: true,
            state: {
                instance: "temperature_k",
                value: temperature_k,
            }
        }, {
            type: 'devices.capabilities.range',
            retrievable: true,
            state: {
                instance: "brightness",
                value: brightness,
            }
        }).then((res) => {
            this.setCapabilityValueByType('devices.capabilities.color_setting', temperature_k);
            this.setCapabilityValueByType('devices.capabilities.range', brightness);
            return res;
        });
    }
}
exports.YandexSmartHomeDevice = YandexSmartHomeDevice;
//# sourceMappingURL=YandexSmartHomeDevice.js.map