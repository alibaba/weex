import Result from '../../../base/util/Result'

export function openBluetoothAdapter(...args) {
  const callback = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.openBluetoothAdapter().then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function closeBluetoothAdapter(...args) {
  const callback = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.closeBluetoothAdapter().then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function startBluetoothDevicesDiscovery(...args) {
  const callback = args.pop()
  const params = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.startBluetoothDevicesDiscovery(params).then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function stopBluetoothDevicesDiscovery(...args) {
  const callback = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.stopBluetoothDevicesDiscovery().then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function onBluetoothDeviceFound(...args) {
  const cb = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.onBluetoothDeviceFound(cb)
}

export function offBluetoothDeviceFound(...args) {
  const cb = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.offBluetoothDeviceFound(cb)
}

export function onBluetoothAdapterStateChange(...args) {
  const cb = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.onBluetoothAdapterStateChange(cb)
}

export function offBluetoothAdapterStateChange(...args) {
  const cb = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.offBluetoothAdapterStateChange(cb)
}

export function getBluetoothDevices(...args) {
  const callback = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.getBluetoothDevices().then(data => {
    const devices = (data && data[0] && data[0][0]) || {}
    callback.invoke(Result.success(devices))
  }, (data) => {
    console.info('[AdvancedAPI] getBluetoothDevices fail' + JSON.stringify(data))
    callback.invoke(Result.fail(...data))
  })
}

export function getConnectedBluetoothDevices(...args) {
  const callback = args.pop()
  const params = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.getConnectedBluetoothDevices(params).then(data => {
    console.info('[AdvancedAPI] getConnectedBluetoothDevices success' + JSON.stringify(data))
    callback.invoke(Result.success(data))
  }, (data) => {
    console.info('[AdvancedAPI] getConnectedBluetoothDevices fail' + JSON.stringify(data))
    callback.invoke(Result.fail(...data))
  })
}

export function getBluetoothAdapterState(...args) {
  const callback = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.getBluetoothAdapterState().then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function setBLEMTU(...args) {
  const callback = args.pop()
  const params = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asSetBLEMTU(params).then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function writeBLECharacteristicValue(...args) {
  const callback = args.pop()
  const params = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asWriteBLECharacteristicValue(params).then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function readBLECharacteristicValue(...args) {
  const callback = args.pop()
  const params = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asReadBLECharacteristicValue(params).then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function onBLEConnectionStateChange(...args) {
  const callback = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asOnBLEConnectionStateChange(callback)
}

export function offBLEConnectionStateChange(...args) {
  const cb = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asOffBLEConnectionStateChange(cb)
}

export function onBLECharacteristicValueChange(...args) {
  const callback = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asOnBLECharacteristicValueChange(callback)
}

export function offBLECharacteristicValueChange(...args) {
  const cb = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asOffBLECharacteristicValueChange(cb)
}

export function notifyBLECharacteristicValueChange(...args) {
  const callback = args.pop()
  const params = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asNotifyBLECharacteristicValueChange(params).then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function getBLEDeviceServices(...args) {
  const callback = args.pop()
  const params = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asGetBLEDeviceServices(params).then(data => {
    callback.invoke(Result.success(data[0][0]))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

// TODO:异常参数处理
export function getBLEDeviceRSSI(...args) {
  const callback = args.pop()
  const params = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asGetBLEDeviceRSSI(params).then((data) => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function getBLEDeviceCharacteristics(...args) {
  console.debug('[AdvancedAPI] enter getBLEDeviceCharacteristics')
  const callback = args.pop()
  const params = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asGetBLEDeviceCharacteristics(params).then(data => {
    callback.invoke(Result.success(data[0]))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function createBLEConnection(...args) {
  const callback = args.pop()
  const params = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  const { deviceId, timeout } = params || {}
  bluetooth.asCreateBLEConnection({ deviceId, timeout }).then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}

export function closeBLEConnection(...args) {
  const callback = args.pop()
  const params = args.pop()
  const bluetooth = requireAPI('ASBluetooth')
  bluetooth.asCloseBLEConnection({ deviceId: params ? params.deviceId : undefined }).then(data => {
    callback.invoke(Result.success(data))
  }, (data) => {
    callback.invoke(Result.fail(...data))
  })
}
