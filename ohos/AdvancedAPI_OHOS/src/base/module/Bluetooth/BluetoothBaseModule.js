// 蓝牙开启状态
import { jsMethod } from '../../decorators'
import { BluetoothBase } from '../../bridge/bluetoothBase'
import { BLHErrorCode, ErrorCode } from '../../util/ErrorCode'
import { isArray, isString, isArrayBuffer, isBoolean, isLower, isMac, isNumber, isUuid } from '../../util/checkDataType'
import { PromptBase } from '../../bridge/promptBase'

export const BLESTATE = {
  STATE_ON: 2, // 蓝牙已开启
  STATE_OFF: 0, // 蓝牙已关闭
  INDEX: 1, // 对话框允许按钮
  STATE_CONNECTED: 2, // 表示profile已连接
  STATE_DISCONNECTED: 0 // 表示profile已断连
}

// 默认值
export const DEFAULT = {
  OPEN: false, // 默认拒绝弹窗开启蓝牙
  OPEN_MSG: '快应用加载器想要开启蓝牙',
  CLOSE_MSG: '快应用加载器请求关闭蓝牙',
  ALLOW_BUTTON: '允许',
  REFUSE_BUTTON: '拒绝'
}

export class BluetoothBaseModule {
  constructor() {
    // 监听蓝牙适配器状态变化
    this.onadapterstatechange

    // 监听寻找到新设备的事件
    this.ondevicefound

    // 默认值为false。是否允许重复上报同一设备。如果允许重复上报，则bluetooth.ondevicefound 方法会多次上报同一设备，但是RSSI值会有不同。
    this.allowDuplicatesKey = false

    // 设备上报间隔
    this.interval = 0
    // 适配器状态
    this.state = {
      available: BluetoothBase.bluetoothState() === BLESTATE.STATE_ON, // 蓝牙开启状态
      discovering: false // 是否处于扫描模式 cp执行开始扫描or停止函数时修改此变量
    }
    // 存储成功连接ble设备的deviceId
    this.deviceIdBle

    // 蓝牙开启期间扫描到的全部设备
    this.scanResult = []

    // clent实例
    this.gattClient = null
    // 扫描监听模式(true:低功耗,false:蓝牙)
    this.isOnBle = { mode: false }
    // 低功耗蓝牙连接状态
    this.stateBLE = {}
    this.services = []
    this.bleCharacteristic = {}
    this.characteristicValue = null
    // uniapp需要初始化蓝牙，与快应用不一致
    this.isInit = false

    this.devicesFoundListeners = []
    this.adapterStateChangeListeners = []

    this.BLEConnectionStateListeners = []
    this.BLECharacteristicListeners = []
  }
    // 1.打开蓝牙
    @jsMethod({ alias: 'openAdapter', common: false, callback: true })
  openAdapter(object) {
    const { operateAdapter = DEFAULT.OPEN } = object || {} // object默认值防止没传参
    const bluetoothState = BluetoothBase.bluetoothState() === BLESTATE.STATE_ON // 获取当前设备蓝牙状态
    return new Promise((resolve, reject) => {
      if (bluetoothState) {
        resolve([['bluetooth is turned']]) // 当前蓝牙为打开状态时走success
      } else { // 蓝牙未开启状态
        if (operateAdapter) { // 是否弹框显示允许/拒绝
          this.promptTemp(DEFAULT.OPEN_MSG)
            .then(data => {
              if (data.index === BLESTATE.INDEX) { // 选中允许按钮
                BluetoothBase.enableBluetooth() && resolve([[BLHErrorCode.OK]]) // 打开蓝牙返回0
                this.state.available = true // 修改全局监听对象
              } else {
                reject([['user reject', BLHErrorCode.SYSTEM_ERROR]]) // 选中拒绝按钮返回fail
              }
            })
        } else {
          reject([['not available', BLHErrorCode.NOT_AVAILABLE]]) // 拒绝弹框or未传参提示走fail
        }
      }
    })
  }

    // 2.关闭蓝牙
    @jsMethod({ alias: 'closeAdapter', common: false, callback: true })
    closeAdapter(object) {
      const { operateAdapter = DEFAULT.OPEN } = object || {} // object默认值防止没传参
      const bluetoothState = BluetoothBase.bluetoothState() === BLESTATE.STATE_OFF // 获取当前设备蓝牙关闭状态
      return new Promise((resolve, reject) => {
        if (bluetoothState) {
          reject([['bluetooth is not turned', BLHErrorCode.NOT_INIT]]) // 当前蓝牙为关闭状态时走fail
        } else {
          if (operateAdapter) {
            // 快应用拒绝时不会有任何调用
            this.promptTemp(DEFAULT.CLOSE_MSG)
              .then(data => {
                if (data.index === BLESTATE.INDEX) { // 选中允许按钮
                  BluetoothBase.disableBluetooth() && resolve([[BLHErrorCode.OK]]) // 关闭蓝牙返回0
                  this.state.available = false // 修改全局监听对象
                  try {
                    BluetoothBase.offBLE()
                  } catch (err) {
                    console.error(`[QAFAPI] OpenHarmony Error ondevicefound,error Message:${err}`)
                  }
                }
              })
          } else {
            resolve([['closeBluetoothAdapter success']]) // 并不能真正关闭蓝牙仅走成功回调（快应用逻辑问题）
          }
        }
      })
    }

    // 3.获取本机蓝牙适配器状态
    @jsMethod({ alias: 'getAdapterState', common: false, callback: true })
    getAdapterState() {
      const bluetoothState = BluetoothBase.bluetoothState() === BLESTATE.STATE_ON // 获取当前设备蓝牙开启状态
      return new Promise((resolve) => {
        resolve({
          discovering: this.state.discovering,
          available: bluetoothState
        })
      })
    }

    // 5.开始搜寻附近的蓝牙外围设备(参数只校验不处理)
    @jsMethod({ alias: 'startDevicesDiscovery', common: false, callback: true })
    startDevicesDiscovery(object) {
      const bluetoothState = BluetoothBase.bluetoothState() === BLESTATE.STATE_ON // 获取当前设备蓝牙状态
      return new Promise((resolve, reject) => {
        // 校验当前蓝牙状态
        if (!bluetoothState) {
          reject([['bluetooth is not turned', BLHErrorCode.NOT_AVAILABLE]])
          return
        }

        // 传参校验
        if (object) {
          const { services, allowDuplicatesKey, interval } = object
          if (
            (services && !isArray(services))
                    || (allowDuplicatesKey && !isBoolean(allowDuplicatesKey))
                    || (interval && !isNumber(interval))) {
            reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
            return
          }

          // services内部uuid校验
          let filters = []
          if (services) {
            const isAllPass = services.every(serviceUuid => {
              filters.push({ serviceUuid })
              return isUuid(serviceUuid.toLowerCase())
            })
            if (!isAllPass) {
              reject([['uuid invalid', BLHErrorCode.NO_DEVICE]])
              return
            }

            // 监听模式开关，当传入正确services时执行低功耗监听
            this.isOnBle.mode = true
          } else {
            filters = null
          }

          // 调整全局重复上报参数
          if (allowDuplicatesKey) {
            this.allowDuplicatesKey = allowDuplicatesKey
          }

          // 调整全局上报设备间隔
          if (interval) {
            this.interval = interval
          }
        }

        // 启动蓝牙扫描(蓝牙扫描兼容低功耗扫描)
        BluetoothBase.startBLEScan(this.interval)
        const isScanOpen = BluetoothBase.startBluetoothDiscovery()

        if (isScanOpen) {
          this.state.discovering = true // 适配器扫描状态开启
          resolve('ok')
        } else {
          reject([[`[QAFAPI] openHarmony startBluetoothDiscovery fail`, BLHErrorCode.CONNECTION_FAIL]])
        }
      })
    }

    // 6.停止搜寻附近的蓝牙外围设备
    @jsMethod({ alias: 'stopDevicesDiscovery', common: false, callback: true })
    stopDevicesDiscovery() {
      return new Promise((resolve, reject) => {
        // 仅有状态为0时认定为蓝牙处于关闭
        if (BluetoothBase.bluetoothState()) {
          BluetoothBase.stopBLEScan()
          const isScanClose = BluetoothBase.stopBluetoothDiscovery()
          // 适配器扫描状态关闭
          this.state.discovering = false
          if (isScanClose) {
            resolve('ok')
            this.devicesFoundListeners = []
            // 重置监听模式开关
            this.isOnBle.mode = false

            // 重置上报间隔
            this.interval = 0

            // 重置重复上报
            this.allowDuplicatesKey = false
          } else {
            resolve('ok')
          }
        } else {
          reject(['bluetooth is not turned', BLHErrorCode.NOT_AVAILABLE])
        }
      })
    }

    // 7.获取在蓝牙模块生效期间所有已发现的蓝牙设备(依赖startDevicesDiscovery&&ondevicefound执行)
    @jsMethod({ alias: 'getDevices', common: false, callback: true })
    getDevices() {
      const bluetoothState = BluetoothBase.bluetoothState() === BLESTATE.STATE_ON // 获取当前设备蓝牙状态
      return new Promise((resolve, reject) => {
        if (bluetoothState) {
          resolve([[{ devices: this.scanResult }]])
        } else {
          reject([['bluetooth is not turned', BLHErrorCode.NOT_AVAILABLE]]) // 快应用无法测试到扫描关闭的情况
        }
      })
    }

    saveDevice(resultObj) {
      // 是否允许重复值(默认不重复)
      if (this.allowDuplicatesKey) {
        this.scanResult.push(resultObj)
      } else {
        if (!this.isRepeat(this.scanResult, resultObj.deviceId)) {
          this.scanResult.push(resultObj)
        }
      }
    }

    onFoundEvent(device) {
      const resultObj = this.getTemp()
      if (device[0] && device[0].deviceId) {
        // 返回值 [{"deviceId":""XX:XX:XX:XX:XX:XX"","rssi":-71,"data":{}}]
        const { deviceId, rssi, data } = device[0]
        resultObj.deviceId = deviceId
        resultObj.RSSI = rssi
        resultObj.serviceData = data
        try {
          const GattClient = BluetoothBase.createGattClientDevice(deviceId)
          GattClient.connect()
          GattClient.getDeviceName((_, data) => {
            resultObj.name = data
            resultObj.localName = data
            try {
              GattClient.disconnect()
              // 关闭临时客户端
              GattClient.close()
            } catch (err) {
              console.warn(`[QAFAPI] close client fail: ${JSON.stringify(err)}`)
            }
            this.saveDevice(resultObj)
          })
        } catch (err) {
          console.warn(`[QAFAPI] close client fail: ${JSON.stringify(err)}`)
        }
      } else {
        // 返回值 ["XX:XX:XX:XX:XX:XX"]
        resultObj.deviceId = device[0]
        resultObj.name = BluetoothBase.getRemoteDeviceName(resultObj.deviceId)
        resultObj.localName = resultObj.name
        console.debug('[QAFAPI] onFoundEvent:' + JSON.stringify(resultObj))
        this.saveDevice(resultObj)
      }
    }

    // 9.根据 uuid 获取处于已连接状态的设备
    @jsMethod({ alias: 'getConnectedDevices', common: false, callback: true })
    getConnectedDevices(object) {
      return new Promise((resolve, reject) => {
        // 获取当前设备蓝牙状态
        const bluetoothState = BluetoothBase.bluetoothState() === BLESTATE.STATE_ON
        if (!bluetoothState) {
          reject([['bluetooth is not turned', BLHErrorCode.NOT_AVAILABLE]])
          return
        }
        if (!object || !object.services || !isArray(object.services) || object.services.length === 0) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        console.debug('[QAFAPI] services :  ' + JSON.stringify(object.services))
        // 参数校验(uuid)
        const isRightServices = object.services.every(item => {
          return isUuid(item.toLowerCase())
        }) || false
        if (!object || !isRightServices) {
          console.debug('[QAFAPI] invalidParam  services ')
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        // 获取连接的低功耗设备(接口有问题不能正确返回)
        let deviceIds = []
        try {
          deviceIds = BluetoothBase.getConnectedBLEDevices()
        } catch (err) {
          console.error('[QAFAPI] errCode:' + err.code + ',errMessage:' + err.message)
        }
        console.debug('[QAFAPI] BleDeviceIds = ' + JSON.stringify(deviceIds))

        // 0x0001 表示A2DP；0x0004 表示HFP, 0x0006 表示HID, 0x0007 表示PAN
        const profileId = [0x0001, 0x0004, 0x0006, 0x0007]

        // 获取getProfile实例
        try {
          // getProfile接口api9会导致闪退
          profileId.forEach(item => {
            const profiles = BluetoothBase.getProfile(item)
            console.error('[QAFAPI] profiles' + JSON.stringify(profiles))
            if (profiles) {
              deviceIds = [...deviceIds, ...profiles]
            }
          })
        } catch (err) {
          console.error('[QAFAPI] getProfile fail' + err)
        }

        // 获取信息去重
        deviceIds = deviceIds.reduce((pr, cu) => pr.includes(cu) ? pr : [...pr, cu], [])

        // 未连接任何低功耗设备
        if (!deviceIds || deviceIds.length === 0) {
          reject([['no device', BLHErrorCode.NO_DEVICE]])
          return
        }

        // 获取设备名
        const devices = []
        deviceIds.forEach(item => {
          devices.push({
            // 成功获取名字依赖扫描获取到该设备
            name: BluetoothBase.getRemoteDeviceName(item),
            deviceId: item
          })
        })
        resolve([[{ devices }]])
      })
    }

    BLECharacteristicCallback = (valueChange) => {
      console.debug('[AdvancedAPI] characteristicChange triger valueChange:' + JSON.stringify(valueChange))
      const { serviceUuid, characteristicUuid } = valueChange
      const characteristicValue = new Uint8Array(
        valueChange.characteristicValue
      )
      const notification = {
        deviceId: this.deviceIdBle,
        serviceId: serviceUuid,
        characteristicId: characteristicUuid,
        value: characteristicValue,
      }
      // 遍历所有的监听者
      for (const listener of this.BLECharacteristicListeners) {
        listener(notification)
      }
    }

    // 10.连接低功耗蓝牙设备
    @jsMethod({ alias: 'createBLEConnection', common: false, callback: true })
    createBLEConnection(object) {
      const { deviceId, timeout } = object || {}

      return new Promise((resolve, reject) => {
        const bluetoothState = BluetoothBase.bluetoothState() === BLESTATE.STATE_ON // 获取当前设备蓝牙状态
        if (!bluetoothState) {
          reject([['bluetooth is not turned', BLHErrorCode.NOT_AVAILABLE]])
          return
        }
        if (timeout && !isNumber(timeout)) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        if (!deviceId || !isString(deviceId)) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
        } else {
          this.gattClient = BluetoothBase.createGattClientDevice(deviceId)
          // 开启监听该设备的连接状态
          this.gattClient.on('BLEConnectionStateChange', state => {
            const temp = (state.state === 2)
            if (this.stateBLE[state.deviceId] !== temp) {
              this.stateBLE[state.deviceId] = temp
            }
          })
          try {
            this.gattClient.on('BLECharacteristicChange', this.BLECharacteristicCallback)
            console.debug('[AdvancedAPI] BLECharacteristicChange Registration succeeded.')
          } catch (err) {
            console.error(`AdvancedAPI BLECharacteristicChange Registration fail ${err.message}`)
          }

          // 创建实例
          const successConnect = this.gattClient.connect()

          // 延时上报
          if (timeout) {
            setTimeout(() => {
              if (successConnect) {
                resolve('ok')
                this.deviceIdBle = deviceId
              } else {
                reject([['connection timed out', BLHErrorCode.CONNECTION_FAIL]])
              }
            }, timeout)
          } else {
            if (!successConnect) {
              reject([['fail connection', BLHErrorCode.CONNECTION_FAIL]])
              return
            }
            resolve('ok')
            this.deviceIdBle = deviceId
          }
        }
      })
    }

    // 11.断开与低功耗蓝牙设备的连接(接口问题无法完成关闭会走fail回调)
    @jsMethod({ alias: 'closeBLEConnection', common: false, callback: true })
    closeBLEConnection(object) {
      const { deviceId } = object || {}
      return new Promise((resolve, reject) => {
        if (!deviceId || !isString(deviceId)) {
          reject([['Deviceid must be written', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        try {
          this.gattClient.disconnect()
          this.gattClient.close()
          this.gattClient = null
          this.stateBLE[deviceId] = false
          resolve('ok')
        } catch (err) {
          reject([['Failed to disconnect the Bluetooth connection', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
      })
    }

    // 12.获取蓝牙设备所有服务(service)
    @jsMethod({ alias: 'getBLEDeviceServices', common: false, callback: true })
    getBLEDeviceServices(object) {
      const { deviceId } = object || {}
      return new Promise((resolve, reject) => {
        // 未传入deviceId参数
        if (!deviceId || !isString(deviceId)) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }

        // 传入deviceID格式错误
        if (!isMac(deviceId)) {
          reject([['deviceId is not MAC', BLHErrorCode.SYSTEM_ERROR]])
          return
        }

        // 获取当前设备蓝牙状态
        const bluetoothState = BluetoothBase.bluetoothState() === BLESTATE.STATE_ON
        if (!bluetoothState) {
          reject([['bluetooth is not turned', BLHErrorCode.NOT_AVAILABLE]])
          return
        }
        console.debug('[QAFAPI] getServices deviceId:' + deviceId + ' this.deviceIdBLE = ' + this.deviceIdBle)
        // 获取实例
        let gattClient
        if (this.gattClient && deviceId === this.deviceIdBle) {
          console.debug('[QAFAPI] getServices deviceId:' + deviceId)
          gattClient = this.gattClient
        } else {
          gattClient = BluetoothBase.createGattClientDevice(deviceId)
          gattClient.connect()
          this.gattClient = gattClient
          this.deviceIdBle = deviceId
        }
        // 获取所有服务
        gattClient.getServices().then(res => {
          const arr = []
          res.forEach(item => {
            console.debug('[QAFAPI] getServices services = ' + JSON.stringify(item))
            const { serviceUuid, isPrimary } = item
            const temp = {
              uuid: serviceUuid,
              isPrimary
            }
            arr.push(temp)
          })
          this.services = res
          resolve([[{ 'services': arr }]])
        }).catch((err) => {
          console.error('[QAFAPI] getServices fail:' + JSON.stringify(err))
          resolve([[{ 'services': [] }]])
        })
      })
    }

    // 13.获取蓝牙设备某个服务中所有特征值(暂不支持)
    @jsMethod({ alias: 'getBLEDeviceCharacteristics', common: false, callback: true })
    getBLEDeviceCharacteristics(object) {
      return new Promise((resolve, reject) => {
        // 参数校验
        if (!object) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        const { deviceId, serviceId } = object
        console.info('[QAFAPI] getBLEDeviceCharacteristics deviceId:' + deviceId + ' serviceId = ' + serviceId)
        if (!deviceId || !isString(deviceId) || !serviceId || !isString(serviceId)) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }

        // 获取实例
        console.info('[QAFAPI] getBLEDeviceCharacteristics deviceId:' + deviceId + ' this.deviceIdBLE = ' + this.deviceIdBle)
        let gattClient
        if (this.gattClient && deviceId === this.deviceIdBle) {
          console.info('[QAFAPI] getBLEDeviceCharacteristics deviceId:' + deviceId)
          gattClient = this.gattClient
        } else {
          gattClient = BluetoothBase.createGattClientDevice(deviceId)
          gattClient.connect()
          this.gattClient = gattClient
          this.deviceIdBle = deviceId
        }

        // 获取所有服务
        gattClient.getServices().then(res => {
          // 已获取的服务列表对象
          let Servicesfound

          // 遍历从所有服务中找到对应serviceId服务的特征值
          this.services.forEach((item) => {
            console.info('[QAFAPI] serviceId = ' + JSON.stringify(item))
            if (item.serviceUuid === serviceId) {
              Servicesfound = item
            }
          })

          // 未获取到特征值
          if (!Servicesfound) {
            reject([['Service not found', BLHErrorCode.NO_SERVICE]])
            return
          }

          // 获取特征需要返回的字段对象
          const characteristics = []
          this.bleDescriptor = Servicesfound
          Servicesfound.characteristics.forEach(item => {
            console.info('[QAFAPI] Servicesfound item = ' + JSON.stringify(item))
            characteristics.push({
              uuid: item.characteristicUuid,
              properties: item.properties
            })
          })

          // 找不到返回空数组
          resolve([[{ characteristics }]])
        }).catch(err => {
          console.error(`[QAFAPI] OpenHarmony Error getServices value,error Message:${err}`)
          reject([['property not support', BLHErrorCode.PROPERTY_NOT_SUPPORT]])
        })
      })
    }

    // 14.读取低功耗蓝牙设备的特征值的二进制数据值(暂不支持)
    @jsMethod({ alias: 'readBLECharacteristicValue', common: false, callback: true })
    readBLECharacteristicValue(object) {
      return new Promise((resolve, reject) => {
        // 参数校验
        if (!object) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        const { deviceId, serviceId, characteristicId } = object
        if (!isString(deviceId) || !isString(serviceId) || !isString(characteristicId)) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        if (
          !deviceId
                || !serviceId
                || !isUuid(serviceId.toLowerCase())
                || !characteristicId
                || !isUuid(characteristicId.toLowerCase())
        ) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        if (!isMac(deviceId.toLowerCase())) {
          reject([['deviceId is not MAC', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        this.queryBLECharacteristic(deviceId, serviceId).then(desc => {
          const descriptors = []
          const descriptor = {
            serviceUuid: serviceId.toLowerCase(),
            characteristicUuid: characteristicId.toLowerCase(),
            descriptorUuid: desc.descriptorUuid,
            descriptorValue: desc.descriptorValue,
          }
          descriptors.push(descriptor)

          const characteristicIn = {
            serviceUuid: serviceId.toLowerCase(),
            characteristicUuid: characteristicId.toLowerCase(),
            characteristicValue: this.characteristicValue,
            descriptors: descriptors,
          }
          console.debug('[QAFAPI] characteristicIn = ' + JSON.stringify(characteristicIn))
          // 向服务端发送设置通知此特征值请求notify
          let GattClient = null
          let result
          if (this.gattClient && this.deviceIdBle === deviceId) {
            try {
              result = this.gattClient.readCharacteristicValue(characteristicIn)
            } catch (err) {
              reject([[err.message, ErrorCode.PARAMETER_ERROR]])
              console.error('[QAFAPI]readBLECharacteristicValue errCode:' + err.code + ',errMessage:' + err.message)
            }
          } else {
            try {
              GattClient = BluetoothBase.createGattClientDevice(deviceId)
              result = GattClient.readCharacteristicValue(characteristicIn)
            } catch (err) {
              reject([[err.message, ErrorCode.PARAMETER_ERROR]])
              console.error('[QAFAPI]readBLECharacteristicValue errCode:' + err.code + ',errMessage:' + err.message)
            }
          }
          // 缺少低功耗设备未连接状态的失败回调(暂不支持直接获取)
          if (result) {
            result.then((BLECharacteristic) => {
              resolve([BLECharacteristic])
            }).catch((err) => {
              console.error('[AdvancedAPI] Failed to read characteristic value' + err.message)
              reject([['property not support', BLHErrorCode.PROPERTY_NOT_SUPPORT]])
            })
          } else {
            reject([['property not support', BLHErrorCode.PROPERTY_NOT_SUPPORT]])
          }
        }).catch(_ => {
          reject([['Bluetooth not available', BLHErrorCode.SYSTEM_ERROR]])
        })
      })
    }

    // 15.向低功耗蓝牙设备特征值中写入二进制数据(暂不支持)
    @jsMethod({ alias: 'writeBLECharacteristicValue', common: false, callback: true })
    writeBLECharacteristicValue(object) {
      return new Promise((resolve, reject) => {
        // 参数校验
        if (!object) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }

        const { deviceId, serviceId, characteristicId, value } = object
        if (!isString(deviceId) || !isString(serviceId) || !isString(characteristicId) || !isArrayBuffer(value) || !isMac(deviceId)) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        if (
          !deviceId
                || !serviceId
                || !isUuid(serviceId.toLowerCase())
                || !characteristicId
                || !isUuid(characteristicId.toLowerCase())
                || !isLower(characteristicId.toLowerCase())
                || !value
        ) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }

        this.queryBLECharacteristic(deviceId, serviceId).then(desc => {
          const descriptors = []
          const descriptor = {
            serviceUuid: serviceId.toLowerCase(),
            characteristicUuid: characteristicId.toLowerCase(),
            descriptorUuid: desc.descriptorUuid,
            descriptorValue: desc.descriptorValue,
          }
          descriptors.push(descriptor)

          const characteristicIn = {
            serviceUuid: serviceId.toLowerCase(),
            characteristicUuid: characteristicId.toLowerCase(),
            characteristicValue: value,
            descriptors: descriptors,
          }
          console.debug('[QAFAPI] characteristicIn = ' + JSON.stringify(characteristicIn))
          let GattClient = null
          let isWrite
          if (this.gattClient && this.deviceIdBle === deviceId) {
            try {
              isWrite = this.gattClient.writeCharacteristicValue(characteristicIn)
            } catch (err) {
              reject([[err.message, ErrorCode.PARAMETER_ERROR]])
              console.error('[QAFAPI]writeCharacteristicValue errCode:' + err.code + ',errMessage:' + err.message)
            }
          } else {
            try {
              GattClient = BluetoothBase.createGattClientDevice(deviceId)
              isWrite = GattClient.writeCharacteristicValue(characteristicIn)
            } catch (err) {
              reject([[err.message, ErrorCode.PARAMETER_ERROR]])
              console.error('[QAFAPI]readBLECharacteristicValue errCode:' + err.code + ',errMessage:' + err.message)
            }
          }
          // 缺少低功耗设备未连接状态的失败回调(暂不支持直接获取)
          if (isWrite) {
            resolve('ok') // 写入成功
          } else {
            reject([['property not support', BLHErrorCode.PROPERTY_NOT_SUPPORT]]) // 写入失败
          }
        }).catch(_ => {
          reject([['Bluetooth not available', BLHErrorCode.SYSTEM_ERROR]])
        })
      })
    }

    queryBLECharacteristic(deviceId, serviceId) {
      return new Promise((resolve, reject) => {
        if (this.descriptors && deviceId.toLowerCase() === this.deviceIdBle.toLowerCase()) {
          resolve(this.descriptors)
          return
        }
        let gattClient
        if (this.gattClient && deviceId.toLowerCase() === this.deviceIdBle.toLowerCase()) {
          console.info('[QAFAPI] queryBLECharacteristic deviceId:' + deviceId)
          gattClient = this.gattClient
        } else {
          gattClient = BluetoothBase.createGattClientDevice(deviceId)
          gattClient.connect()
          this.gattClient = gattClient
          this.deviceIdBle = deviceId
        }

        // 获取所有服务
        gattClient.getServices().then((res) => {
          // 已获取的服务列表对象
          let Servicesfound

          // 遍历从所有服务中找到对应serviceId服务的特征值
          res.forEach((item) => {
            if (item.serviceUuid.toLowerCase() === serviceId.toLowerCase()) {
              Servicesfound = item
            }
          })

          // 未获取到特征值
          if (!Servicesfound) {
            reject([['Service not found', BLHErrorCode.NO_SERVICE]])
            return
          }

          // 获取特征需要返回的字段对象
          const characteristics = Servicesfound.characteristics
          characteristics.forEach((item) => {
            if (item.serviceUuid.toLowerCase() === serviceId.toLowerCase()) {
              this.characteristicValue = item.characteristicValue
              item.descriptors.forEach((descriptor) => {
                if (descriptor.serviceUuid.toLowerCase() === serviceId.toLowerCase()) {
                  this.descriptors = descriptor
                  console.info('[QAFAPI] Servicesfound descriptor = ' + JSON.stringify(descriptor))
                  resolve(this.descriptors)
                } else {
                  reject([['characteristics not found', BLHErrorCode.NO_SERVICE]])
                }
              })
            } else {
              console.error(`[AdvancedAPI] characteristics not found`)
              reject([['characteristics not found', BLHErrorCode.NO_SERVICE]])
            }
          })
        }).catch(err => {
          console.error(`[AdvancedAPI] getServices fail:${err.message}`)
          reject([['Service not found', BLHErrorCode.NO_SERVICE]])
        })
      })
    }

    // 16.启用低功耗蓝牙设备特征值变化时的notify功能(暂不支持)
    @jsMethod({ alias: 'notifyBLECharacteristicValueChange', common: false, callback: true })
    notifyBLECharacteristicValueChange(object) {
      return new Promise((resolve, reject) => {
        // 参数校验
        if (!object) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        const { deviceId, serviceId, characteristicId, state } = object
        if (
          !deviceId || !isString(deviceId)
                || !serviceId || !isString(serviceId)
                || !isUuid(serviceId.toLowerCase())
                || !characteristicId || !isString(characteristicId)
                || !isUuid(characteristicId.toLowerCase())
                || !state || !isBoolean(state)
        ) {
          reject([['invalidParam', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        if (!isMac(deviceId.toLowerCase())) {
          reject([['deviceId is not MAC', BLHErrorCode.SYSTEM_ERROR]])
          return
        }
        this.queryBLECharacteristic(deviceId, serviceId).then(desc => {
          console.debug(
            '[QAFAPI] desc = ' +
                    JSON.stringify(desc)
          )
          const descriptors = []
          const descriptor = {
            serviceUuid: serviceId.toLowerCase(),
            characteristicUuid: characteristicId.toLowerCase(),
            descriptorUuid: desc.descriptorUuid,
            descriptorValue: desc.descriptorValue,
          }
          descriptors.push(descriptor)

          const characteristicIn = {
            serviceUuid: serviceId.toLowerCase(),
            characteristicUuid: characteristicId.toLowerCase(),
            characteristicValue: this.characteristicValue,
            descriptors: descriptors,
          }
          console.debug(
            '[QAFAPI] BLECharacteristic = ' +
                    JSON.stringify(characteristicIn)
          )
          // 向服务端发送设置通知此特征值请求notify
          let GattClient = null
          let isNotify
          if (this.gattClient && this.deviceIdBle === deviceId) {
            try {
              isNotify = this.gattClient.setNotifyCharacteristicChanged(
                characteristicIn,
                state
              )
            } catch (err) {
              reject([[err.message, ErrorCode.PARAMETER_ERROR]])
              console.error(
                '[QAFAPI]setNotifyCharacteristicChanged errCode:' +
                            err.code +
                            ',errMessage:' +
                            err.message
              )
              return
            }
          } else {
            try {
              GattClient = BluetoothBase.createGattClientDevice(deviceId)
              isNotify = GattClient.setNotifyCharacteristicChanged(
                characteristicIn,
                state
              )
            } catch (err) {
              reject([[err.message, ErrorCode.PARAMETER_ERROR]])
              console.error(
                '[QAFAPI]setNotifyCharacteristicChanged errCode:' +
                            err.code +
                            ',errMessage:' +
                            err.message
              )
              return
            }
          }
          // 缺少低功耗设备未连接状态的失败回调(暂不支持直接获取)
          if (isNotify) {
            console.debug('[QAFAPI] notify success')
            resolve('ok')
          } else {
            reject([['property not support', BLHErrorCode.PROPERTY_NOT_SUPPORT]])
          }
        })
      })
    }

    getBLEDeviceRSSI(deviceId) {
      return new Promise((resolve, reject) => {
        if (this.gattClient && this.deviceIdBle === deviceId) {
          this.gattClient.getRssiValue().then((res) => {
            resolve(res)
          }).catch(err => {
            reject(err.message)
          })
        } else {
          try {
            const gattClient = BluetoothBase.createGattClientDevice(deviceId)
            gattClient.connect()
            this.gattClient = gattClient
            this.deviceIdBle = deviceId
            gattClient.getRssiValue().then(res => {
              resolve(res)
            }).catch(err => {
              reject(err.message)
            })
          } catch (err) {
            reject(err.message)
          }
        }
      })
    }

    // device输出模板
    getTemp() {
      return {
        'RSSI': '', // 当前蓝牙设备的信号强度
        'localName': '', // 当前蓝牙设备的广播数据段中的 LocalName 数据段
        'advertisData': '', // 当前蓝牙设备的广播数据段中的 ManufacturerData 数据段
        'advertisServiceUUIDs': '', // 当前蓝牙设备的广播数据段中的 ServiceUUIDs 数据段
        'name': '', // 蓝牙设备名称，某些设备可能没有。
        'serviceData': '', // 当前蓝牙设备的广播数据段中的 ServiceData数据段，返回结构为{"service uuid string": ArrayBuffer}
        'deviceId': '' // 用于区分设备的id
      }
    }

    // 判断对象是否重复
    // [{"deviceId":'',xxx}]
    isRepeat(arr, deviceId) {
      return arr.some(obj => {
        return obj.deviceId === deviceId
      })
    }

    // 弹框模板
    promptTemp(message) {
      return PromptBase.ohosShowDialog({ // promise
        message,
        buttons: [
          {
            text: DEFAULT.REFUSE_BUTTON,
            color: '#1358e7'
          },
          {
            text: DEFAULT.ALLOW_BUTTON,
            color: '#1358e7'
          }
        ]
      })
    }
}
