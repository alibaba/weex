/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 * Description: 蓝牙模块错误码
 * Author: wangtianpeng
 * Create: 04/26/2022
 */

export const BLHErrorCode = {
  // 正常
  OK: 0,

  // 未启动连接
  NOT_INIT: 10000,

  // 当前蓝牙适配器不可用
  NOT_AVAILABLE: 10001,

  // 没有找到指定设备
  NO_DEVICE: 10002,

  // 连接失败
  CONNECTION_FAIL: 10003,

  // 没有找到指定服务
  NO_SERVICE: 10004,

  // 没有找到指定服务
  NO_CHARACTERISTIC: 10005,

  // 当前连接已断开
  NO_CONNECTION: 10006,

  // 当前特征值不支持此操作
  PROPERTY_NO_SUPPORT: 10007,

  // 当前特征值不支持此操作
  SYSTEM_ERROR: 10008,

  // 系统版本低于 5.0 不支持 BLE
  SYSTRM_NOT_SUPPORT: 10009,

  // 入参不正确
  INVALID_PARAM: 202
}
