/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 * Description: 封装鸿蒙sensor模块
 * Author: qianyuanyuan
 * Create: 3/31/2022
 * Notes: N/A
 */

import sensor from '@ohos.sensor'

export class OhosSensorBase {
  static ohosSubscribeAccelerometer(data) {
    const { interval, callback } = data
    sensor.on(sensor.SensorType.SENSOR_TYPE_ID_ACCELEROMETER, (data) => {
      callback(data)
    },
    { interval: interval }
    )
  }

  static ohosUnsubscribeAccelerometer() {
    sensor.off(sensor.SensorType.SENSOR_TYPE_ID_ACCELEROMETER)
  }

  static ohosSubscribeCompass(data) {
    const { callback } = data
    sensor.on(sensor.SensorType.SENSOR_TYPE_ID_ORIENTATION, (data) => {
      callback(data)
    })
  }

  static ohosUnsubscribeCompass() {
    sensor.off(sensor.SensorType.SENSOR_TYPE_ID_ORIENTATION)
  }

  static ohosSubscribeGyroscope(object) {
    const { intervalValue, callback } = object
    sensor.on(sensor.SensorId.GYROSCOPE, (data) => {
      callback(data)
    }, { interval: intervalValue })
  }

  static ohosUnsubscribeGyroscope() {
    sensor.off(sensor.SensorId.GYROSCOPE)
  }
}
