import request from 'request-promise-native';
import { YandexSmartHomeDevice } from './types/YandexSmartHomeDevice';

export class YandexSmartHome {
  private readonly AuthorizationHeader: string;

  constructor(AuthorizationHeader) {
    this.AuthorizationHeader = AuthorizationHeader;
  }

  async request(url: string, data) {
    return request({ url, ...data }).then(body => JSON.parse(body));
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
      body: JSON.stringify(payload),
    });
  }

  getDevices() {
    return this.getApiData('user/info', {}).then(({ devices }) => {
      return devices.map((device) => {
        switch (device.type) {
          case 'devices.types.light':
            return new YandexSmartHomeDevice(this, device);
        }

        return new YandexSmartHomeDevice(this, device);
      })
    });
  }

  getDeviceByName(name) {
    return this.getDevices().then((devices) => devices.find(device => device.getName().toLocaleLowerCase() === name.toLocaleLowerCase()));
  }

  getDeviceByType(type) {
    return this.getDevices().then((devices) => devices.find(device => device.getType() === type));
  }
}
