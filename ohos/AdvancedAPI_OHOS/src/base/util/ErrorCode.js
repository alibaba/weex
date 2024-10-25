// 通用错误码
export const ErrorCode = {
  SHARE_INSTALLED_ERROR: -1001, // 第三方分享，分享的应用未安装
  SUCCESS: 0, // 成功
  COMMON_ERROR: 200, // 失败，其他通用错误
  USER_REJECT: 201, // 用户拒绝授权
  PARAMETER_ERROR: 202, // 参数为空或者参数错误
  SERVICE_UNAVIALABLE: 203, // 服务不可用
  SERVICE_TIMEOUT: 204, // 请求超时
  NOT_SUPPORT_SERVICE_COUNTRY: 205, // 不支持该服务地/设备
  NOT_IN_WHITE_LIST: 206, // 不在白名单
  SYSTEM_PERMISSION_DENIAL: 207, // 系统权限拒绝
  IO_ERROR: 300, // IO错误
  FILE_NOT_FOUND: 301, // 文件路径不存在
  FILE_EXIST: 302, // 文件已存在
  FILE_EXTENSION_NOT_EXIST: 303, // 文件后缀名不存在
  FILE_PATH_NOT_LEGAL: 304, // 文件路径不合法
  WEB_PAGE_NOT_FOUND: 404, // web组件404错误
  QUICKAPP_IN_BACKGROUND: 500, // 应用在后台无法进行操作
  LOCATION_SWITCH_CLOSED: 1000, // 系统位置开关关闭
  PAY_CHECKKEY_FAIL: 1001, // 支付公钥验签失败
  SIM_NOT_FOUND: 1001, // 未插入SIM卡
  SIGNIN_AUTH_FAIL: 1002, // 应用鉴权失败
  OPERATORS_GET_FAIL: 1002, // 获取运营商信息失败
  ALARM_SYSTEM_ERROR: 1003, // 系统不支持闹钟设置
  AGD_COMMON_ERROR: 2001, // AGD SDK接口返回错误
  WIDGET_NOT_SUPPORT: 2001, // 设备不支持在桌面添加快应用中心widget小组件
  CARD_CALL_QUICK_APP_CENTER_FAIL: 2003, // 快卡与快应用中心通信失败
  BI_REPORT_ERROR: 4001, // BI Report接口返回错误
  PAY_CANCEL_CODE: 30000, // 用户取消支付
  PAY_CERTIFICATION_CODE: 30102, // 实名认证失败
}

// 蓝牙错误码
export const BLHErrorCode = {
  OK: 0, // 正常
  OTHER_ERRORS: 200, // 其他错误
  NOT_INIT: 10000, // 未启动连接
  NOT_AVAILABLE: 10001, // 当前蓝牙适配器不可用
  NO_DEVICE: 10002, // 没有找到指定设备
  CONNECTION_FAIL: 10003, // 连接失败
  NO_SERVICE: 10004, // 没有找到指定服务
  NO_CHARACTERISTIC: 10005, // 没有找到指定特征值
  NO_CONNECTION: 10006, // 当前连接已断开
  PROPERTY_NOT_SUPPORT: 10007, // 当前特征值不支持此操作
  SYSTEM_ERROR: 10008, // 其余所有系统上报的异常
  SYSTEM_NOT_SUPPORT: 10009, // 系统版本低于 5.0 不支持 BLE
  LOCATION_NOT_TURN_ON: 10010, // 系统位置开关关闭
  NO_SUCH_INTERFACE: 10100, // 获取连接状态失败
  DEVICE_DOES_NOT_EXIST: 10101, // 设备不存在
  NOT_AVAILABLE_TIRAMISU: 10102, // 在安卓13及以上版本不可用
}

// WIFI错误码
export const WifiErrorCode = {
  PASSWORD_ERROR: 1000, // Wi-Fi密码错误
  CONNECTION_TIMEOUT: 1001, // 连接超时
  DUPLICATE_REQUEST: 1002, // 重复连接 Wi-Fi
  WIFI_NOT_TURNED_ON: 1003, // 未打开Wi-Fi开关
  GPS_NOT_TURNED_ON: 1004, // 未打开GPS定位开关
  INVALID_SSID: 1005, // 无效SSID
}

// 广告错误码
export const ADErrorCode = {
  STANDARD_SERVER: 1000, // 后端错误
  STANDARD_PARAM: 1001, // 参数错误
  STANDARD_INVALID_UNIT: 1002, // 广告单元无效
  STANDARD_INNER_ERROR: 1003, // 内部错误
  STANDARD_NO_RESOURCE: 1004, // 无合适的广告
  STANDARD_TOO_OFTEN: 1100, // 过于频繁调用相关API
  STANDARD_INVALID_METHOD: 1102, // 调用了不支持的方法
  STANDARD_NET: 1104, // 网络错误
  STANDARD_UNKNOWN: 2000, // 未知错误
}

// 视频错误码
export const VideoErrorCode = {
  CANCEL_TASK: 100, // 取消任务
  COMMON_ERROR: 200, // 接口功能异常
  PARAMETER_ERROR: 202, // 参数错误
  EMPTY_ENTRY: 203, // 找不到实例
  REPEATED_CAL: 205, // 压缩任务已创建，无需再调用第二次
  IO_ERROR: 300, // IO错误
  INVALID_VIDEO: 1001, // 原视频无效
}

// 文本转音频错误码
export const TtaErrorCode = {
  FAILED: 1000, // 合成失败
  SYSTEM_SDK_VERSION_DOES_NOT_SUPPORT: 1001, // 系统SDK版本不支持
  INITIALIZATION_FAILED: 1002, // 初始化失败
  TEXT_LENGTH_EXCEEDS_LIMIT: 1003, // 输入文本的长度超过限值
  LANGUAGE_NOT_SUPPORTED: 1004, // 语言不支持
  IO_EXCEPTION: 1005, // IO异常
}

// 活体检测错误码
export const BiometriverifyErrorCode = {
  NO_DYNAMIC_CAMERA_PERMISSION: 201, // 用户拒绝，获取相机权限失败
  FREQUENT_OPERATIONS: 205, // 操作频繁，上次操作还未完成
  NO_SYSTEM_CAMERA_PERMISSION: 207, // 系统权限拒绝，获取相机权限失败
  NOT_SUPPORT_SERVICE_COUNTRY: 220, // 当前服务国家/地区不支持此功能
  NO_PERMISSION: 1001, // 没有权限使用该接口
  VERIFY_LIVING_PERSON_CANCEL: 1002, // 活体检测取消
  OPEN_CAMERA_FAIL: 1003, // 活体检测打开相机失败
  VERIFY_INIT_FAIL: 1004, // 活体检测初始化失败
  VERIFY_LIVING_PERSON_FAIL: 1005, // 活体检测失败
  VERIFY_LIVING_PERSON_TIMEOUT: 1006, // 活体检测超时
}

// 应用上下文错误码
export const UserUpdateErrorCode = {
  APPLY_RESULT_SUCCESS: 200, // 执行更新成功。
  APPLY_RESULT_NOT_READY: 201, // 当前更新版本未就绪
  APPLY_RESULT_REPEAT_REQUEST: 202, // 重复调用
  UPDATE_ERROR_CODE_CONFLICT: 1001, // 更新的版本与当前版本证书冲突。
  UPDATE_ERROR_SIZE_EXCEEDED: 1002, // rpk大小超出限制
  UPDATE_ERROR_SIZE_NETWORK: 1003, // 网络问题，下载更新失败
  UPDATE_ERROR_IO: 1004, // 网络问题，下载更新失败
}

// websocket错误码
export const WebscoketErrorCode = {
  NORMAL_CLOSURE: 1000, // Normal Closure
  GOING_AWAY: 1001, // Going Away
  PROTOCOL_ERROR: 1002, // Protocol Error
  UNSUPPORTED_DATA: 1003, // Unsupported Data
  NO_STATUS_RECVD: 1005, // No Status Recvd
  ABNORMAL_CLOSURE: 1006, // Abnormal Closure
  INVALID_FRAME_PAYLOAD_DATA: 1007, // Invalid frame payload data
  POLICY_VIOLATION: 1008, // Policy Violation
  MESSAGE_TOO_BIG: 1009, // Message too big
  MISSING_EXTENSION: 1010, // Missing Extension
  INTERNAL_ERROR: 1011, // Internal Error
  SERVICE_RESTART: 1012, // Service Restart
  TRY_AGAIN_LATER: 1013, // Try Again Later
  BAD_GATEWAY: 1014, // Bad Gateway
  BAD_GATEWAY2: 1015, // Bad Gateway
}

// 应用管理错误码
export const AppManagerErrorCode = {
  CANNOT_FOUND_APP: 1000
}

// tts错误码
export const TtsErrorCode = {
  ERROR: 200, // 通用错误。
  INVALIDPARAM: 202, // 参数错误。
  ERROR_NETWORK: 1001, // 网络连接错误。
  ERROR_NETWORK_TIMEOUT: 1002, // 网络连接超时。
  ERROR_NOT_INSTALLED_YET: 1003, // 下载语音数据未完成。
  ERROR_OUTPUT: 1004, // 输出到音频设备失败。
  ERROR_SERVICE: 1005, // TTS服务失败。
  ERROR_SYNTHESIS: 1006, // TTS引擎合成语音失败。
}

export const AccountErrorCode = {
  SESSION_INVALID: 102 // session无效。
}

