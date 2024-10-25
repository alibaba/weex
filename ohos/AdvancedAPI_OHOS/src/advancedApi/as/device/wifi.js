import Result from '../../../base/util/Result'

export function startWifi (...args) {
  const callback = args.pop()
  const wifi = requireAPI('ASWifi')
  wifi.startWifi().then(data => {
    callback.invoke(Result.success(data))
  }, (err) => {
    callback.invoke(Result.fail(err))
  })
}

export function stopWifi (...args) {
  const callback = args.pop()
  const wifi = requireAPI('ASWifi')
  wifi.stopWifi().then(data => {
    callback.invoke(Result.success(data))
  }, (err) => {
    callback.invoke(Result.fail(err))
  })
}

export function getConnectedWifi (...args) {
  const callback = args.pop()
  const params = args.pop()
  const wifi = requireAPI('ASWifi')
  wifi.getConnectedWifi(params).then(data => {
    callback.invoke(Result.success(data)) // data的类型是json对象或者是undefined
  }, (err) => {
    callback.invoke(Result.fail(err))
  })
}

export function getWifiList (...args) {
  const callback = args.pop()
  const params = args.pop()
  const wifi = requireAPI('ASWifi')
  wifi.getWifiList(params).then(data => {
    callback.invoke(Result.success(data))
  }, err => {
    callback.invoke(Result.fail(err))
  })
}

export function onGetWifiList (...args) {
  const callback = args.pop()
  const wifi = requireAPI('ASWifi')
  wifi.onGetWifiList(callback)
}

export function offGetWifiList (...args) {
  const callback = args.pop()
  const wifi = requireAPI('ASWifi')
  wifi.offGetWifiList(callback)
}

export function connectWifi (...args) {
  const callback = args.pop()
  const params = args.pop()
  const wifi = requireAPI('ASWifi')
  wifi.connectWifi(params).then(data => {
    callback.invoke(Result.success(data))
  }, err => {
    callback.invoke(Result.fail(err))
  })
}

export function onWifiConnected (...args) {
  const callback = args.pop()
  const wifi = requireAPI('ASWifi')
  wifi.onWifiConnected(callback)
}

export function offWifiConnected (...args) {
  const callback = args.pop()
  const wifi = requireAPI('ASWifi')
  wifi.offWifiConnected(callback)
}

export function onWifiConnectedWithPartialInfo (...args) {
  const callback = args.pop()
  const wifi = requireAPI('ASWifi')
  wifi.onWifiConnectedWithPartialInfo(callback)
}

export function offWifiConnectedWithPartialInfo (...args) {
  const callback = args.pop()
  const wifi = requireAPI('ASWifi')
  wifi.offWifiConnectedWithPartialInfo(callback)
}
