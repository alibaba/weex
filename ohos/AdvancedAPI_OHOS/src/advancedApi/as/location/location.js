import Result from '../../../base/util/Result'

export function getLocation (...args) {
  console.debug('[AdvancedAPI] start getLocation')
  const callback = args.pop()
  const params = args.pop()
  const geolocation = requireAPI('ASLocation')
  console.debug('[AdvancedAPI] geolocation.getLocation')
  geolocation.getLocation(params).then(data => {
    console.debug('[AdvancedAPI] geolocation.getLocation success')
    callback.invoke(Result.success(data))
  }, (err, code) => {
    console.debug('[AdvancedAPI] geolocation.getLocation fail')
    callback.invoke(Result.fail(err))
  })
}
export function onLocationChange(...args) {
  console.debug('[AdvancedAPI] start onLocationChange')
  const callback = args.pop()
  const geolocation = requireAPI('ASLocation')
  geolocation.onLocationChange(callback)
}

export function offLocationChange(...args) {
  console.debug('[AdvancedAPI] start offLocationChange')
  const callback = args.pop()
  const geolocation = requireAPI('ASLocation')
  geolocation.offLocationChange(callback)
  geolocation.getLocation({ timeout: 5000, coordType: 'wgs86' }).then(data => {
    console.debug('[AdvancedAPI] geolocation.offLocationChange callback')
    callback.invokeAndKeepAlive(Result.success(data))
  }, err => {
    callback.invokeAndKeepAlive(Result.fail([err[0][0], err[0][1]]))
  })
}
export function onLocationChangeError(...args) {
  console.debug('[AdvancedAPI] start onLocationChangeError')
  const callback = args.pop()
  const geolocation = requireAPI('ASLocation')
  geolocation.onLocationChangeError(data => {
    console.debug('[AdvancedAPI] geolocation.onLocationChange success')
    callback.invokeAndKeepAlive(Result.callback(data))
  })
}
export function offLocationChangeError(...args) {
  console.debug('[AdvancedAPI] start offLocationChangeError')
  const callback = args.pop()
  const geolocation = requireAPI('ASLocation')
  geolocation.offLocationChangeError()
  callback.invoke(Result.success())
}
export function startLocationUpdate(...args) {
  console.debug('[AdvancedAPI] start startLocationUpdate')
  const callback = args.pop()
  const geolocation = requireAPI('ASLocation')
  geolocation.startLocationUpdate().then(data => {
    console.debug('[AdvancedAPI] geolocation.startLocationUpdate success')
    callback.invoke(Result.success(data))
  }, (err, code) => {
    console.debug('[AdvancedAPI] geolocation.startLocationUpdate fail')
    callback.invoke(Result.fail([err[0][0], err[0][1]]))
  })
}
export function startLocationUpdateBackground(...args) {
  console.debug('[AdvancedAPI] start startLocationUpdateBackground')
  const callback = args.pop()
  const geolocation = requireAPI('ASLocation')
  geolocation.startLocationUpdateBackground().then(data => {
    console.debug('[AdvancedAPI] geolocation.startLocationUpdateBackground success')
    callback.invoke(Result.success(data))
  }, (err, code) => {
    console.debug('[AdvancedAPI] geolocation.startLocationUpdateBackground fail')
    callback.invoke(Result.fail([err[0][0], err[0][1]]))
  })
}
export function stopLocationUpdate(...args) {
  console.debug('[AdvancedAPI] start stopLocationUpdate')
  const callback = args.pop()
  const geolocation = requireAPI('ASLocation')
  geolocation.stopLocationUpdate(callback).then(data => {
    console.debug('[AdvancedAPI] geolocation.stopLocationUpdate success')
    callback.invoke(Result.success(data))
  }, (err, code) => {
    console.debug('[AdvancedAPI] geolocation.stopLocationUpdate fail')
    callback.invoke(Result.fail([err[0][0], err[0][1]]))
  })
}
