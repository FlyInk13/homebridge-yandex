"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamplePlatformAccessory = void 0;
class ExamplePlatformAccessory {
    constructor(platform, accessory, device) {
        this.platform = platform;
        this.accessory = accessory;
        this.device = device;
        // set accessory information
        this.accessory.getService(this.platform.Service.AccessoryInformation)
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'manufacturer') // device.getDeviceInfo().manufacturer
            .setCharacteristic(this.platform.Characteristic.Model, 'model') // device.getDeviceInfo().model
            .setCharacteristic(this.platform.Characteristic.SerialNumber, device.getId());
        this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);
        this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.getName());
        this.service.getCharacteristic(this.platform.Characteristic.On)
            .onSet(this.setOn.bind(this)) // SET - bind to the `setOn` method below
            .onGet(this.getOn.bind(this)); // GET - bind to the `getOn` method below
        this.service.getCharacteristic(this.platform.Characteristic.Brightness)
            .onSet(this.setBrightness.bind(this)); // SET - bind to the 'setBrightness` method below
    }
    async setOn(value) {
        const device = this.accessory.context.device;
        this.platform.log.info('Set Characteristic On ->', value);
        await device.setSwitchState(value);
    }
    async getOn() {
        const device = this.accessory.context.device;
        const isOn = await device.getSwitchState();
        console.log('getOn', isOn);
        this.platform.log.info('Get Characteristic On ->', isOn);
        return isOn;
    }
    async setBrightness(value) {
        const device = this.accessory.context.device;
        this.platform.log.info('Set Characteristic Brightness -> ', value);
        await device.setRange(value);
    }
}
exports.ExamplePlatformAccessory = ExamplePlatformAccessory;
//# sourceMappingURL=platformAccessory.js.map