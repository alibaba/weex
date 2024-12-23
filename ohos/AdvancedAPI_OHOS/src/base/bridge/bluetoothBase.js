import bluetoothManager from '@ohos.bluetoothManager'
import access from '@ohos.bluetooth.access';
import ble from '@ohos.bluetooth.ble';
import connection from '@ohos.bluetooth.connection';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl'
import {context} from './abilityBase';
// 扫描模式配置项
export const SCAN_MODE = {
  LIMITED: 5,
  DURATION: 0
}
export class BluetoothBase {

  static getPermissions() {
    // 权限列表
    const arrMdl = ['ohos.permission.ACCESS_BLUETOOTH']; // 允许应用接入蓝牙并使用蓝牙能力
    const atManager = abilityAccessCtrl.createAtManager();
    return new Promise(async resolve => {
      const { authResults } = await atManager.requestPermissionsFromUser(context, arrMdl)
      if (authResults[0] === 0) {
        resolve(true); // 通过用户许可
      }else {
        resolve(false); // 未通过用户许可
      }
    })
  }

  // 订阅蓝牙连接状态改变事件
  static onStateChange(callback) {
    try {
      return access.on('stateChange', callback)
    } catch (err) {
      console.warn('[AdvancedAPI] on bondStateChange fail')
    }
  }

  // 订阅蓝牙设备发现上报事件
  static on(onReceiveEvent) {
    try {
      return connection.on('bluetoothDeviceFind', onReceiveEvent)
    } catch (err) {
      console.warn('[AdvancedAPI] on fail')
    }
  }

  // 订阅低功耗设备发现上报事件
  static onBLE(onReceiveEvent) {
    try {
      ble.on('BLEDeviceFind', onReceiveEvent)
    } catch (err) {
      console.warn('[AdvancedAPI] BLE.on.BLEDeviceFind fail')
    }
  }

  // 创建client端实例
  static createGattClientDevice(deviceId) {
    try {
      return ble.createGattClientDevice(deviceId)
    } catch (err) {
      console.warn('[AdvancedAPI] createGattClientDevice fail')
    }
  }
  // 打开蓝牙
  static enableBluetooth() {
    try {
      return access.enableBluetooth()
    } catch (err) {
      console.warn('[AdvancedAPI] enableBluetooth fail')
    }
  }

  // 关闭蓝牙
  static disableBluetooth() {
    try {
      return access.disableBluetooth()
    } catch (err) {
      console.warn('[AdvancedAPI] disableBluetooth fail')
    }
  }

  // 蓝牙开关状态
  static bluetoothState() {
    try {
      return access.getState()
    } catch (err) {
      // console.warn('[AdvancedAPI] getState fail')
      console.error('[AdvancedAPI] getState fail,  errCode: ' + err.code + ', errMessage: ' + err.message);
    }
  }

  // 开启蓝牙扫描
  static startBluetoothDiscovery() {
    // 设置蓝牙扫描模式为可连接limited发现模式，设置为0为持续可发现，设置成功返回true
    connection.setBluetoothScanMode(
        connection.ScanMode.SCAN_MODE_LIMITED_DISCOVERABLE,
        SCAN_MODE.DURATION
    )

    // 开启蓝牙扫描，成功返回true，否则返回false
    try {
      return connection.startBluetoothDiscovery()
    } catch (err) {
      console.warn('[AdvancedAPI] startBluetoothDiscovery fail')
    }
  }

  // 取消订阅蓝牙设备发现上报事件
  static off() {
    try {
      return connection.off('bluetoothDeviceFind')
    } catch (err) {
      console.warn('[AdvancedAPI] off fail')
    }
  }

  // 获取对端蓝牙设备的名称
  static getRemoteDeviceName(deviceId) {
    try {
      return connection.getRemoteDeviceName(deviceId)
    } catch (err) {
      console.warn('[AdvancedAPI] getRemoteDeviceName fail')
    }
  }

  // 关闭蓝牙扫描
  static stopBluetoothDiscovery() {
    // 关闭蓝牙扫描，成功返回true，否则返回false
    try {
      return connection.stopBluetoothDiscovery()
    } catch (err) {
      console.warn('[AdvancedAPI] no need to stop')
    }
  }

  // 开启低功耗蓝牙扫描
  static startBLEScan(interval) {
    try {
      ble.startBLEScan(null, {
        interval,
        dutyMode: ble.ScanDuty.SCAN_MODE_LOW_POWER,
        matchMode: ble.MatchMode.MATCH_MODE_AGGRESSIVE,
      })
    } catch (err) {
      console.error(
          '[QAFAPI] startBLEScan errCode:' + err.code + ',errMessage:' + err.message
      )
    }
  }

  // 关闭低功耗蓝牙扫描
  static stopBLEScan() {
    try {
      ble.stopBLEScan()
    } catch (err) {
      console.error('[QAFAPI] stopBLEScan errCode:' + err.code + ',errMessage:' + err.message)
    }
  }

  // 取消订阅低功耗设备发现上报事件
  static offBLE() {
    try {
      ble.off('BLEDeviceFind')
    } catch (err) {
      console.warn('[AdvancedAPI] BLE.off.BLEDeviceFind fail')
    }
  }

  // 获取已经连接的设备地址列表
  static getProfile(ProfileId) {
    try {
      const a2dpSrc = bluetoothManager.getProfileInstance(ProfileId)
      return a2dpSrc.getConnectionDevices()
    } catch (err) {
      console.warn('[AdvancedAPI] getProfileInstance fail')
    }
  }

  static getConnectedBLEDevices() {
    try {
      return ble.getConnectedBLEDevices()
    } catch (err) {
      console.error('[AdvancedAPI]getConnectedBLEDevices errCode:' + err.code + ',errMessage:' + err.message)
    }
  }
}
