import { BluetoothBase } from '../../../base/bridge/bluetoothBase'
import { BluetoothBaseModule, BLESTATE } from '../../../base/module/Bluetooth/BluetoothBaseModule'
import { BLHErrorCode } from '../../../base/util/ErrorCode'
import { isString, isNumber } from '../../../base/util/checkDataType'

export default class ASBluetooth extends BluetoothBaseModule {
  constructor() {
    super()
    this.deviceFoundCallback = undefined
    this.adapterStateCallback = undefined
    this.BLEConnectionStateCallback = undefined
    this.initBluetoothDeviceFound()
    this.initBluetoothAdapterStateChange()
    this.initBLEConnectionStateChange()
  }
  /**
  * Turn on Bluetooth.
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  openBluetoothAdapter() {
      return new Promise(async (resolve, reject) => {
          const permission = await BluetoothBase.getPermissions()
          if (!permission) {
              return reject(['permission fail', ErrorCode.USER_REJECT])
          }
          const bluetoothState = BluetoothBase.bluetoothState() === BLESTATE.STATE_ON // 获取当前设备蓝牙状态
          if (bluetoothState) {
              this.isInit = true
              resolve('ok') // 当前蓝牙为打开状态时走success
          } else {
              reject([['not available', BLHErrorCode.NOT_AVAILABLE]])
          }
      })
  }

  /**
  * Turn off Bluetooth
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  closeBluetoothAdapter () {
    const bluetoothState = BluetoothBase.bluetoothState() === BLESTATE.STATE_OFF // 获取当前设备蓝牙状态
    return new Promise((resolve, reject) => {
      if (bluetoothState) {
        reject([['bluetooth is not turned', BLHErrorCode.NOT_AVAILABLE]]) // 当前蓝牙为关闭状态时走fail
      } else {
        this.isInit = false
        BluetoothBase.stopBluetoothDiscovery()
        // 适配器扫描状态关闭
        this.state.discovering = false
        // 存储成功连接ble设备的deviceId
        this.deviceIdBle = ''

        // 蓝牙开启期间扫描到的全部设备
        this.scanResult = []

        // clent实例
        if (this.gattClient) {
          try {
            this.gattClient.disconnect()
            this.gattClient.close()
            this.gattClient = null
          } catch (err) {}
        }
        // 扫描监听模式(true:低功耗,false:蓝牙)
        this.isOnBle = { mode: false }
        // 低功耗蓝牙连接状态
        this.stateBLE = {}
        this.services = []
        this.bleCharacteristic = {}
        this.characteristicValue = null
        this.devicesFoundListeners = []
        this.adapterStateChangeListeners = []
        this.BLEConnectionStateListeners = []
        this.BLECharacteristicListeners = []
        resolve('ok')
      }
    })
  }

  /**
  * Start searching for nearby Bluetooth peripherals.
  * @param {services} Array
  * @param {allowDuplicatesKey} boolean
  * @param {interval} number
  * @param {powerLevel} string
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  startBluetoothDevicesDiscovery(params) {
    if (this.isInit) {
      return this.startDevicesDiscovery(params)
    } else {
      return new Promise((resolve, reject) => {
        console.warn('[AdvancedAPI] bluetooth is no init')
        reject([['not init', BLHErrorCode.NOT_INIT]])
      })
    }
  }

  /**
  * Stop searching for nearby Bluetooth peripherals.
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  stopBluetoothDevicesDiscovery(params) {
    if (this.isInit) {
      return this.stopDevicesDiscovery(params)
    } else {
      return new Promise((resolve, reject) => {
        console.warn('[AdvancedAPI] bluetooth is no init')
        reject([['not init', BLHErrorCode.NOT_INIT]])
      })
    }
  }

  initBluetoothDeviceFound() {
    this.deviceFoundCallback = device => {
      this.onFoundEvent(device)
      // 遍历所有监听者，发送消息
      for (const listener of this.devicesFoundListeners) {
        // 执行设置的上报间隔(默认无间隔)
        setTimeout(() => {
          listener([this.scanResult])
        }, this.interval)
      }
    }
    try {
      // 开启蓝牙监听
      BluetoothBase.on(this.deviceFoundCallback)

      // 开启低功耗监听
      BluetoothBase.onBLE(this.deviceFoundCallback)
    } catch (errMessage) {
      console.error(`[AdvancedAPI] openHarmony ondevicefound fail ${errMessage}`)
    }
  }

  /**
  * Listen to the event that a new device is found.
  * @param {cb} function
  * @param {scanResult} object
  */
  onBluetoothDeviceFound(cb) {
    this.devicesFoundListeners.push(cb)
  }

  offBluetoothDeviceFound(cb) {
    if (cb === undefined) {
      this.devicesFoundListeners.splice(0)
      return
    }
    if (typeof cb !== 'function') {
      console.error('[AdvancedAPI] offBluetoothAdapterStateChange, param is invalid:' + typeof cb)
      return
    }
    const index = this.devicesFoundListeners.indexOf(cb)
    if (index > -1) {
      this.devicesFoundListeners.splice(index, 1)
    }
  }

  initBluetoothAdapterStateChange() {
    this.adapterStateCallback = (data) => {
      const stateValue = this.state.available
      if (data === 2) {
        this.state.available = true
      } else if (data === 0) {
        this.state.available = false
      }
      if (stateValue !== this.state.available) {
        // 遍历所有监听者，发送消息
        for (const listener of this.adapterStateChangeListeners) {
          listener(stateValue)
        }
      }
    }

    try {
      BluetoothBase.onStateChange(data => {
        this.adapterStateCallback(data)
      })
    } catch (err) {
      console.error('[AdvancedAPI] onBluetoothAdapterStateChange errCode:' + err.code + ',errMessage:' + err.message)
    }
  }

  /**
  * Listening for Bluetooth adapter status change events.
  * @param {cbFunc} function
  * @param {available} boolean
  * @param {discovering} boolean
  */
  onBluetoothAdapterStateChange(cbFunc) {
    this.adapterStateChangeListeners.push(cbFunc)
  }

  offBluetoothAdapterStateChange(cb) {
    if (cb === undefined) {
      this.devicesFoundListeners.splice(0)
      return
    }
    if (typeof cb !== 'function') {
      console.error('[AdvancedAPI] offBluetoothAdapterStateChange, param is invalid:')
      return
    }
    const index = this.adapterStateChangeListeners.indexOf(cb)
    if (index > -1) {
      this.adapterStateChangeListeners.splice(index, 1)
    }
  }

  /**
  * Obtains the connected device based on the UUID.
  * @param {services} Array
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  getConnectedBluetoothDevices(params) {
    if (this.isInit) {
      return this.getConnectedDevices(params)
    } else {
      return new Promise((resolve, reject) => {
        console.warn('[AdvancedAPI] bluetooth is no init')
        reject([['not init', BLHErrorCode.NOT_INIT]])
      })
    }
  }

  /**
  * Obtains all discovered Bluetooth devices during the validity period of the Bluetooth module.
  * Including devices that are already connected to the local machine.
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  * @return {devices} Array<Object>
  */
  getBluetoothDevices() {
    if (this.isInit) {
      return this.getDevices()
    } else {
      return new Promise((resolve, reject) => {
        console.warn('[AdvancedAPI] bluetooth is no init')
        reject([['not init', BLHErrorCode.NOT_INIT]])
      })
    }
  }

  /**
  * Gets the status of the local Bluetooth adapter.
  * @param {discovering} boolean
  * @param {available} boolean
  */
  getBluetoothAdapterState() {
    if (this.isInit) {
      return this.getAdapterState()
    } else {
      return new Promise((resolve, reject) => {
        console.warn('[AdvancedAPI] bluetooth is no init')
        reject([['not init', BLHErrorCode.NOT_INIT]])
      })
    }
  }

  /**
  * Sets the Bluetooth MTU.The value range of MTU is 22–512.
  * @param {deviceId} string
  * @param {mtu} number
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  asSetBLEMTU(params) {
    return new Promise((resolve, reject) => {
      if (!params || !params.deviceId || !params.mtu) {
        console.error('[AdvancedAPI] setBLEMTU fail, params error')
        reject([['param error', BLHErrorCode.SYSTEM_ERROR]])
        return
      }
      if (!isString(params.deviceId) || !isNumber(params.mtu)) {
        console.error('[AdvancedAPI] setBLEMTU fail, params error')
        reject([['param error', BLHErrorCode.SYSTEM_ERROR]])
        return
      }
      try {
        console.debug('[AdvancedAPI] asSetBLEMTU deviceId:' + params.deviceId + ' this.deviceIdBLE = ' + this.deviceIdBle)
        // 获取实例
        let gattClient
        if (this.gattClient && params.deviceId.toLowerCase() === this.deviceIdBle.toLowerCase()) {
          console.debug('[AdvancedAPI] asSetBLEMTU deviceId:' + params.deviceId)
          gattClient = this.gattClient
        } else {
          gattClient = BluetoothBase.createGattClientDevice(params.deviceId)
          gattClient.connect()
          this.gattClient = gattClient
          this.deviceIdBle = params.deviceId
        }
        this.gattClient.setBLEMtuSize(params.mtu)
        resolve('ok')
      } catch (err) {
        console.error('[AdvancedAPI] setBLEMtuSize fail, errCode:' + err.code + ',errMessage:' + err.message)
        reject([[err.message, BLHErrorCode.SYSTEM_ERROR]])
      }
    })
  }

  /**
  * Writes binary data to the Bluetooth Low Energy device characteristic value.
  * Note: The function can be successfully called only when the feature value of the device supports write.
  * @param {deviceId} string
  * @param {serviceId} string
  * @param {characteristicId} string
  * @param {value} ArrayBuffer
  * @param {writeType} string
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  asWriteBLECharacteristicValue(params) {
    return this.writeBLECharacteristicValue(params)
  }

  /**
  * Reads the binary data value of the Bluetooth Low Energy device's characteristic value
  * Note: The function can be successfully invoked only when the feature value of the device supports read.
  * @param {deviceId} string
  * @param {serviceId} string
  * @param {characteristicId} string
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  asReadBLECharacteristicValue(params) {
    return this.readBLECharacteristicValue(params)
  }

  initBLEConnectionStateChange() {
    this.BLEConnectionStateCallback = (stateChange) => {
      // 遍历所有的监听者
      this.BLEConnectionStateListeners.forEach(callback => {
        callback(stateChange)
      })
    }
    this.stateBLE = new Proxy({}, {
      get: (target, key) => {
        return target[key]
      },
      set: (target, key, value) => {
        target[key] = value
        const state = {
          deviceId: key,
          connected: value
        }
        console.debug('AdvancedAPI bleConnectionStateChange')
        this.BLEConnectionStateCallback(state)
        return true
      }
    })
  }

  /**
  * Listen for Bluetooth low energy connection status change events.
  * including the developer's active connection or disconnection, device loss, and abnormal disconnection.
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  asOnBLEConnectionStateChange(cb) {
    this.BLEConnectionStateListeners.push(cb)
  }

  asOffBLEConnectionStateChange(cb) {
    if (cb === undefined) {
      this.BLEConnectionStateListeners.splice(0)
      return
    }
    if (typeof cb !== 'function') {
      console.error('[AdvancedAPI] offBLEConnectionStateChange, param is invalid:')
      return
    }
    const index = this.BLEConnectionStateListeners.indexOf(cb)
    if (index > -1) {
      this.BLEConnectionStateListeners.splice(index, 1)
    }
  }

  /**
  * Turn on Bluetooth.
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  asOnBLECharacteristicValueChange(cb) {
    this.BLECharacteristicListeners.push(cb)
  }

  asOffBLECharacteristicValueChange(cb) {
    if (cb === undefined) {
      this.BLECharacteristicListeners.splice(0)
      return
    }
    if (typeof cb !== 'function') {
      console.error('[AdvancedAPI] offBLECharacteristicValueChange, param is invalid:')
      return
    }
    const index = this.BLECharacteristicListeners.indexOf(cb)
    if (index > -1) {
      this.BLECharacteristicListeners.splice(index, 1)
    }
  }

  /**
  * Turn on Bluetooth.
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  asNotifyBLECharacteristicValueChange(params) {
    console.debug('[AdvancedAPI] params = ' + JSON.stringify(params))
    return this.notifyBLECharacteristicValueChange(params)
  }

  /**
  * Turn on Bluetooth.
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  asGetBLEDeviceServices(params) {
    return this.getBLEDeviceServices(params)
  }

  /**
  * Obtains the signal strength of a Bluetooth device.
  * @param {deviceId} string
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  asGetBLEDeviceRSSI(params) {
    return new Promise((resolve, reject) => {
      if (!params || !params.deviceId || typeof params.deviceId !== 'string') {
        reject([['invalidParams', BLHErrorCode.SYSTEM_ERROR]])
        return
      }
      this.getBLEDeviceRSSI(params.deviceId).then((result) => {
        resolve({ rssi: result })
      }).catch(err => {
        reject([[err, BLHErrorCode.SYSTEM_ERROR]])
      })
    })
  }

  /**
  * Obtains all feature values in a service of a Bluetooth device.
  * @param {deviceId} string
  * @param {serviceId} string
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  asGetBLEDeviceCharacteristics(params) {
    return this.getBLEDeviceCharacteristics(params)
  }

  /**
  * Connect the Bluetooth Low Energy device.
  * @param {deviceId} string
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  asCreateBLEConnection(params) {
    if (params) {
      console.info('[AdvancedAPI] asCreateBLEConnection params = ' + JSON.stringify(params))
    }
    return this.createBLEConnection(params)
  }

  /**
  * Disconnect the Bluetooth Low Energy device.
  * @param {deviceId} string
  * @param {success} function
  * @param {fail} function
  * @param {complete} function
  */
  asCloseBLEConnection(params) {
    return this.closeBLEConnection(params)
  }
}
