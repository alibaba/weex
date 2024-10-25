import Result from '../../../base/util/Result'

export function getSystemInfoSync(...args) {
  console.debug('[AdvancedAPI] start getSystemInfoSync')
  const device = requireAPI('ASDevice')
  return device.getSystemInfoSync()
}

export function getDeviceInfo (...args) {
  console.debug('[AdvancedAPI] start getDeviceInfo')
  args.pop()
  const device = requireAPI('ASDevice')
  console.debug('[AdvancedAPI] device.getInfo')
  const deviceInfo = device.getDeviceInfo()
  return deviceInfo
}

export function getWindowInfo(...args) {
  console.debug('[AdvancedAPI] start getWindowInfo')
  args.pop()
  const device = requireAPI('ASDevice')
  return device.getWindowInfo()
}

export function getAppBaseInfo(...args) {
  console.debug('[AdvancedAPI] start getAppBaseInfo')
  args.pop()
  const device = requireAPI('ASDevice')
  return device.getAppBaseInfo()
}
export function getAppAuthorizeSetting(...args) {
  console.debug('[AdvancedAPI] start getAppAuthorizeSetting')
  args.pop()
  const device = requireAPI('ASDevice')
  return device.getAppAuthorizeSetting()
}

export function getSystemSetting(...args) {
  console.debug('[AdvancedAPI] start getSystemSetting')
  args.pop()
  const device = requireAPI('ASDevice')
  console.debug('[AdvancedAPI] device.getSystemSetting')
  const systemSetting = device.getSystemSetting()
  return systemSetting
}

export function openAppAuthorizeSetting(...args) {
  console.debug('[AdvancedAPI] start getSystemSetting')
  const callback = args.pop()
  const device = requireAPI('ASDevice')
  try {
    device.openAppAuthorizeSetting()
    callback.invoke(Result.success('success'))
  } catch (err) {
    callback.invoke(Result.fail(['fail'], 201))
  }
}
