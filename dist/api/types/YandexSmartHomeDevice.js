"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YandexSmartHomeDevice = void 0;
// https://yandex.ru/dev/dialogs/smart-home/doc/concepts/capability-types.html#capability-types__types
class YandexSmartHomeDevice {
    constructor(yaSmartHome, device) {
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
    getDeviceInfo() {
        return this.device.device_info;
    }
    getType() {
        return this.device.type;
    }
    getCapabilityByType(type) {
        return this.capabilities.find(c => c.type === type);
    }
    route(commandName) {
        return { status: 'Ой, я не умею в такой тип устройства' };
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
        });
    }
    // color_setting
    async setColorSettings(value) {
        return this.sendCapabilityAction({
            type: 'devices.capabilities.color_setting',
            retrievable: true,
            state: {
                instance: "temperature_k",
                value: value,
            }
        });
    }
    // range
    async setRange(value) {
        return this.sendCapabilityAction({
            type: 'devices.capabilities.range',
            retrievable: true,
            state: {
                instance: "brightness",
                value: value,
            }
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
        });
    }
}
exports.YandexSmartHomeDevice = YandexSmartHomeDevice;
//# sourceMappingURL=YandexSmartHomeDevice.js.map