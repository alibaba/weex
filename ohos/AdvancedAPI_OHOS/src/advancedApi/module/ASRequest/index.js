/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 * Description: advanced request api
 * Create: 04/01/2023
 * Notes: Permissions: ohos.permission.INTERNET
 */
import http from '@ohos.net.http'
import request from '@ohos.request'
import { pathToCache, switchInternalToHapSandBox } from '../../util'
import { arrayBufferToBase64 } from '../../as/base/arrayBuffer2Base64'

// Http errCode
const errMsgMap = new Map([
  [401, 'Parameter error'],
  [201, 'Permission denied'],
  [2300003, 'URL using bad/illegal format or missing URL'],
  [2300006, 'Could not resolve host name'],
  [2300007, 'Couldn not connect to server'],
  [2300009, 'Access denied to remote resource'],
  [2300023, 'Failed writing received data to disk/application'],
  [2300025, 'Upload failed'],
  [2300026, 'Failed to open/read local data from file/application'],
  [2300028, 'Timeout was reached'],
  [2300073, 'Remote file already exists'],
  [2300078, 'Remote file not found'],
  [2300999, 'Unknown Other Error']
])

// AS API class
export default class ASRequest {
  /**
   * make a network request
   * Required
   * @object params url {String}: server address
   * Optional
   * @object params data {Object|String|ArrayBuffer}: request params
   * @object params header {Object}: HTTP request Header
   * @object params method {String}: support OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT, default is GET
   * @object params timeout {Number}: timeout time, default is 60000
   * @object params dataType {String}: data type, default is json (ohos not support)
   * @object params responseType {String}: response data type, text or arraybuffer, default is text
   * @object params sslVerify {Boolean}: verify ssl certificate, default is true (ohos not support)
   * @object params withCredentials {Boolean}: cross-domain requests with credentials, default is false (ohos not support)
   * @object params firstIpv4 {Boolean}: use ipv4 first when DNS resolution, default is false (ohos not support)
   * @object params enableHttp2 {Boolean}: enable http2, default is false (ohos not support)
   * @object params enableQuic {Boolean}: enable quic, default is false (ohos not support)
   * @object params enableCache {Boolean}: enable cache, default is false
   * @object params enableHttpDNS {Boolean}: enable HttpDNS service with httpDNSServiceId, default is false (ohos not support)
   * @object params httpDNSServiceId {String}: httpDNS service provider ID (ohos not support)
   * @object params enableChunked {Boolean}: enable transfer-encoding chunked, default is false (ohos not support)
   * @object params forceCellularNetwork {Boolean}: Use mobile network under wifi, default is false (ohos not support)
   * @object params enableCookie {Boolean}: can edit cookies in headers if enabled, default is false (ohos not support)
   * @object params defer {Boolean}: data type, default is false (ohos not support)
   * @object params cloudCache {Object|Boolean}: enable cloud acceleration, default is false (ohos not support)
   * @object params success {Function}: success callback
   * @object params fail {Function}: fail callback
   * @object params complete {Function}: complete callback
   * Callback
   * @success params data {Object|String|ArrayBuffer}: data returned by server
   * @success params statusCode {Number}: status code returned by server
   * @success params header {Object}: HTTP Response Header returned by server
   * @success params cookies {Array.<string>}: cookies returned by server
   *
   * @returns {requestTask|Promise<requestTask>} : return requestTask if has callback otherwise return promise (handled in interface class)
   */
  request(object) {
    console.debug('[AdvancedAPI] ASRequest request')
    return new RequestTask(object)
  }

  /**
   * request to upload files
   * Required
   * @object params url {String}: server address
   * Required Optional 1
   * @object params files {Array}: upload files list, file object include name{String}, file{File}, uri{String}
   * Required Optional 2
   * @object params filePath {String}: upload file path
   * @object params name {String}: upload file key
   * Optional
   * @object params fileType {String}: file type, image/video/audio (ohos not support)
   * @object params file {File}: upload file object (ohos not support)
   * @object params header {Object}: HTTP request Header
   * @object params timeout {Number}: timeout time (ohos not support)
   * @object params formData {Object}: extra form data
   * @object params success {Function}: success callback
   * @object params fail {Function}: fail callback
   * @object params complete {Function}: complete callback
   * Callback
   * @success params data {String}: data returned by server (ohos not support)
   * @success params statusCode {Number}: status code returned by server, 200 for HTTP OK (ohos not support)
   *
   * @returns {uploadTask|Promise<uploadTask>} : return uploadTask if has callback otherwise return promise (handled in interface class)
   *
   * Note
   * ohos only support internal:// uri
   */
  uploadFile(object) {
    console.debug('[AdvancedAPI] ASRequest uploadFile : %s', JSON.stringify(object))
    return new UploadTask(object)
  }

  /**
   * request to download files
   * Required
   * @object params url {String}: file server address
   * Optional
   * @object params header {Object}: HTTP request Header
   * @object params timeout {Number}: timeout time (ohos not support)
   * @object params success {Function}: success callback
   * @object params fail {Function}: fail callback
   * @object params complete {Function}: complete callback
   * @object params filePath {String}: specialized the local storage path (ohos required)
   * Callback
   * @success params tempFilePath {String}: temp file storage path
   * @success params statusCode {Number}: status code returned by server, 200 for HTTP OK
   *
   * @returns {downloadTask|Promise<downloadTask>} : return downloadTask if has callback otherwise return promise (handled in interface class)
   */
  downloadFile(object) {
    console.debug('[AdvancedAPI] ASRequest downloadFile %s', JSON.stringify(object))
    return new DownloadTask(object)
  }
}

// RequestTask class
class RequestTask {
  /**
   * constructor function, create http request
   * Required
   * @object params url {String}: server address
   * Optional
   * @object params data {Object|String|ArrayBuffer}: request params
   * @object params header {Object}: HTTP request Header
   * @object params method {String}: support OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT, default is GET
   * @object params timeout {Number}: timeout time, default is 60000
   * @object params responseType {String}: response data type, text or arraybuffer, default is text
   * @object params enableCache {Boolean}: enable cache, default is false
   * @object params success {Function}: success callback
   * @object params fail {Function}: fail callback
   * @object params complete {Function}: complete callback
   * Callback
   * @success params data {Object|String|ArrayBuffer}: data returned by server
   * @success params statusCode {Number}: status code returned by server, 200 for HTTP OK
   * @success params header {Object}: HTTP Response Header returned by server
   * @success params cookies {Array.<string>}: cookies returned by server
   */
  constructor(object) {
    const { url, header, method = 'GET', timeout, responseType, enableCache } = object || {}
    let { data } = object || {}
    const { success, fail, complete } = object || {}

    this.abortFlag = false
    this.fail = fail
    this.complete = complete
    this.httpRequest = http.createHttp()
    this.headersCallback = new Map()

    if (!object) {
      console.error('[AdvancedAPI] request error: params illegal')
      return
    }

    let isFormUrlEncoded = false
    for (const key in header) {
      if (key.toLowerCase() === 'content-type') {
        if (header[key].toLowerCase().includes('application/x-www-form-urlencoded')) {
          isFormUrlEncoded = true
        }
        break
      }
    }

    // data为Object类型时，属性的值类型如果是number, request请求时信息会丢失. 故将data转成string类型进行规避
    if (data && (isFormUrlEncoded || ['GET', 'OPTIONS', 'DELETE', 'TRACE', 'CONNECT'].includes(method))) {
      const dataArray = []
      for (const key in data) {
        dataArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      }
      data = dataArray.join('&')
    }
    // header的属性的值类型如果是number, request请求时信息会丢失. 故将各个属性转成string类型
    if (header) {
      for (const key in header) {
        header[key] = `${header[key]}`
      }
    }

    const httpRequestOptions = {
      method: method,
      extraData: data || {},
      header: header,
      expectDataType: (responseType && responseType === 'arraybuffer') ? http.HttpDataType.ARRAY_BUFFER : http.HttpDataType.STRING,
      usingCache: enableCache || false
    }
    let isTimeout = false
    const timer = setTimeout(() => {
      console.error('[AdvancedAPI] request error: Timeout was reached')
      isTimeout = true
      if (fail && !this.abortFlag) {
        const res = { errMsg: 'Timeout was reached' }
        this.result = res
        fail(res)
      }
      if (complete && !this.abortFlag) {
        complete(this.result)
      }
      if (this.httpRequest) {
        this.httpRequest.destroy()
        this.httpRequest = undefined
      }
    }, timeout || 60000)
    this.httpRequest.request((typeof url === 'string') ? url : '', httpRequestOptions)
      .then((data) => {
        clearTimeout(timer)
        console.debug('[AdvancedAPI] request url %s success', url)
        if (success && !this.abortFlag) {
          let result = data.result
          let isArrayBuffer = false
          const { responseType } = object || {}
          // 返回数据类型dataType不为json时需要考虑将ArrayBuffer数据先转换为base64字符串
          if (responseType && responseType !== 'json') {
            if (Object.prototype.toString.call(result) === '[object ArrayBuffer]') {
              // expectDataType响应数据类型只有ARRAY_BUFFER和STRING两种
              result = arrayBufferToBase64(result)
              isArrayBuffer = true
            }
          } else if (typeof data.result === 'string') {
            // 返回数据类型dataType为json时，尝试将字符串转换为JSON对象，若无法转换则仍返回字符串
            try {
              result = JSON.parse(result)
            } catch (err) { }
          }
          const res = {
            isArrayBuffer: false,
            data: result,
            statusCode: data.responseCode,
            header: data.header,
            cookies: typeof data.cookies === 'string' ? (data.cookies ? [data.cookies] : []) : data.cookies,
            errMsg: 'request:ok'
          }
          if (isArrayBuffer) {
            res.isArrayBuffer = true
          }
          this.result = res
          success(res)
        }
      })
      .catch((err) => {
        // 若超出request的默认超时时间，也会走超时。connectTimeout和readTimeout默认均为60000ms。
        clearTimeout(timer)
        if (!isTimeout) {
          console.error('[AdvancedAPI] request error: ' + JSON.stringify(err))
          if (fail && !this.abortFlag) {
            const res = { errMsg: errMsgMap.has(err.code) ? errMsgMap.get(err.code) : 'Unknown Error' }
            this.result = res
            fail(res)
          }
        }
      })
      .finally(() => {
        if (!isTimeout) {
          if (complete && !this.abortFlag) {
            complete(this.result)
          }
          if (this.httpRequest) {
            this.httpRequest.destroy()
            this.httpRequest = undefined
          }
        }
      })
  }

  /**
   * interrupt request task
   */
  abort() {
    console.debug('[AdvancedAPI] request abort')
    this.abortFlag = true
    if (this.httpRequest) {
      this.httpRequest.destroy()
      this.httpRequest = undefined
      this.res = { errMsg: 'request:fail abort' }
      this.fail && this.fail(this.res)
      this.complete && this.complete(this.res)
    }
  }

  /**
   * subscribe HTTP Response Header event
   * @callback params header {Object}: HTTP Response Header
   */
  onHeadersReceived(callback) {
    const taskCallback = (header) => {
      !this.abortFlag && callback({ header })
    }
    if (!callback) {
      console.error('[AdvancedAPI] Invalid, callback is null')
      return
    }
    if (!this.headersCallback.has(callback)) {
      this.headersCallback.set(callback, taskCallback)
      if (this.httpRequest) {
        this.httpRequest.on('headersReceive', taskCallback)
      }
    }
  }

  /**
   * unsubscribe HTTP Response Header event
   * remove all if callback is null, otherwise remove the specialized callback
   */
  offHeadersReceived(callback) {
    if (!callback) {
      this.headersCallback.clear()
      if (this.httpRequest) {
        this.httpRequest.off('headersReceive')
      }
    } else if (this.headersCallback.has(callback)) {
      if (this.httpRequest) {
        this.httpRequest.off('headersReceive', this.headersCallback.get(callback))
      }
      this.headersCallback.delete(callback)
    } else {
      console.debug('[AdvancedAPI] offHeadersReceived callback invalid')
    }
  }
}

// UploadTask class
class UploadTask {
  /**
   * constructor function, create download request
   * Required
   * @object params url {String}: server address
   * Required Optional 1
   * @object params files {Array}: upload files object list, file object include name{String}, file{File}, uri{String}
   * Required Optional 2
   * @object params filePath {String}: upload file path
   * @object params name {String}: upload file key
   * Optional
   * @object params header {Object}: HTTP request Header
   * @object params formData {Object}: extra form data
   * @object params success {Function}: success callback
   * @object params fail {Function}: fail callback
   * @object params complete {Function}: complete callback
   * Callback
   * @success params data {String}: data returned by server
   * @success params statusCode {Number}: status code returned by server, 200 for HTTP OK
   */
  constructor(object) {
    const { url, files, filePath, name, header, formData } = object || {}
    const { success, fail, complete } = object || {}
    const filePath1 = filePath.startsWith('internal://cache/') ? filePath : pathToCache(filePath)

    this.progressCallback = new Map()
    this.headersCallback = new Map()

    const uploadFiles = []
    if (files) {
      files.forEach(function (file) {
        if (typeof file.uri === 'string') {
          const filename = file.uri.substring(file.uri.lastIndexOf('/') + 1)
          const type = file.uri.substring(file.uri.lastIndexOf('.') + 1)
          uploadFiles.push({ filename: filename, name: file.name, uri: file.uri, type: type })
        }
      })
    } else if (typeof filePath1 === 'string') {
      const filename = filePath1.substring(filePath1.lastIndexOf('/') + 1)
      const type = filePath1.substring(filePath1.lastIndexOf('.') + 1)
      uploadFiles.push({ filename: filename, name: name, uri: filePath1, type: type })
    }
    const formDataArray = []
    for (const [key, value] of Object.entries(formData || {})) {
      formDataArray.push({
        name: key,
        value: typeof value === 'string' ? value : JSON.stringify(value),
      })
    }
    const uploadConfig = {
      url: url,
      header: header || {},
      method: 'POST',
      files: uploadFiles,
      data: formDataArray,
    }
    this.successHandle = (res) => {
      success && success(res)
      complete && complete(res)
    }
    this.failHandle = (res) => {
      fail && fail(res)
      complete && complete(res)
    }
    try {
      console.debug('[AdvancedAPI] request upload')
      request.uploadFile(globalThis.abilityContext, uploadConfig)
        .then((data) => {
          this.uploadTask = data
          if (this.abortFlag) {
            this.abortFlag = false
            this.uploadTask.delete(() => {
              this.res = { errMsg: 'uploadFile:fail abort' }
              this.failHandle(this.res)
            })
          }
          if (this.progressFlag) {
            this.progressFlag = false
            for (const taskCallback of this.progressCallback.values()) {
              this.uploadTask.on('progress', taskCallback)
            }
          }
          if (this.headersFlag) {
            this.headersFlag = false
            for (const callback of this.headersCallback.values()) {
              this.uploadTask.on('headerReceive', callback)
            }
          }
          this.uploadTask.on('headerReceive', this.headersReceivedHandle.bind(this))
          this.uploadTask.on('complete', () => {
            console.debug('[AdvancedAPI] upload success')
            this.res = {
              data: this.receivedData?.body || {},
              header: this.receivedData?.headers || {},
              cookies: [],
              statusCode: 200, errMsg:
                'uploadFile:ok'
            }
            this.successHandle(this.res)
          })
          this.uploadTask.on('fail', () => {
            console.debug('[AdvancedAPI] upload fail')
            this.res = { errMsg: 'uploadFile:fail' }
            this.failHandle(this.res)
          })
        })
        .catch((err) => {
          console.error('[AdvancedAPI] upload request error: ' + err.message)
          this.res = { errMsg: `uploadFile:fail ${err.message}` }
          this.failHandle(this.res)
        })
    } catch (err) {
      console.error('[AdvancedAPI] upload request err.code : ' + err.code + ', err.message : ' + err.message)
      this.res = { errMsg: `uploaddFile:fail ${err.message}` }
      this.failHandle(this.res)
    }
  }

  /**
   * interrupt upload task
   */
  abort() {
    this.res = { errMsg: 'uploadFile:fail abort' }
    if (this.uploadTask) {
      this.uploadTask.delete(() => {
        this.failHandle(this.res)
      })
    } else {
      this.abortFlag = true
    }
  }

  /**
   * subscribe upload process event
   * @callback params progress {Number}: upload process percent
   * @callback params totalBytesSent {Number}: upload Bytes
   * @callback params totalBytesExpectedToSend {Number}: total Bytes
   */
  onProgressUpdate(callback) {
    function taskCallback(uploadedSize, totalSize) {
      callback({ progress: Math.ceil(100 * uploadedSize / totalSize), totalBytesSent: uploadedSize, totalBytesExpectedToSend: totalSize })
    }
    if (!callback) {
      console.error('[AdvancedAPI] Invalid, callback is null')
      return
    }
    if (!this.progressCallback.has(callback)) {
      this.progressCallback.set(callback, taskCallback)
      if (this.uploadTask) {
        this.uploadTask.on('progress', taskCallback)
      } else {
        this.progressFlag = true
      }
    }
  }

  /**
   * unsubscribe upload process event
   * remove all if callback is null, otherwise remove the specialized callback
   */
  offProgressUpdate(callback) {
    if (!callback) {
      this.progressCallback.clear()
      // if task is not ready, on is not set too
      if (this.uploadTask) {
        this.uploadTask.off('progress')
      }
    } else if (this.progressCallback.has(callback)) {
      if (this.uploadTask) {
        this.uploadTask.off('progress', this.progressCallback.get(callback))
      }
      this.progressCallback.delete(callback)
    } else {
      console.debug('[AdvancedAPI] offProgressUpdate callback invalid')
    }
  }

  /**
   * subscribe HTTP Response Header event
   */
  headersReceivedHandle(info) {
    this.receivedData = info
  }

  /**
   * subscribe HTTP Response Header event
   * @callback params header {Object}: HTTP Response Header
   */
  onHeadersReceived(callback) {
    const taskCallback = (info) => {
      !this.abortFlag && callback({ header: info.headers || {}})
    }
    if (!callback) {
      console.error('[AdvancedAPI] Invalid, callback is null')
      return
    }
    if (!this.headersCallback.has(callback)) {
      this.headersCallback.set(callback, taskCallback)
      if (this.uploadTask) {
        this.uploadTask.on('headerReceive', taskCallback)
      } else {
        this.headersFlag = true
      }
    }
  }

  /**
   * unsubscribe HTTP Response Header event
   * remove all if callback is null, otherwise remove the specialized callback
   */
  offHeadersReceived(callback) {
    if (!callback) {
      this.headersCallback.clear()
      if (this.uploadTask) {
        this.uploadTask.off('headerReceive')
        this.uploadTask.on('headerReceive', this.headersReceivedHandle.bind(this))
      }
    } else if (this.headersCallback.has(callback)) {
      if (this.uploadTask) {
        this.uploadTask.off('headerReceive', this.headersCallback.get(callback))
      }
      this.headersCallback.delete(callback)
    } else {
      console.debug('[AdvancedAPI] offHeadersReceived callback invalid')
    }
  }
}

// DownloadTask class
class DownloadTask {
  /**
   * constructor function, create download request
   * Required
   * @object params url {String}: file server address
   * @object params filePath {String}: specialized the local storage path, if null, use default cache dir
   * Optional
   * @object params header {Object}: HTTP request Header
   * @object params success {Function}: success callback
   * @object params fail {Function}: fail callback
   * @object params complete {Function}: complete callback
   * Callback
   * @success params tempFilePath {String}: temp file storage path
   * @success params statusCode {Number}: status code returned by server, 200 for HTTP OK
   */
  constructor(object) {
    const { url, header, filePath } = object || {}
    const { success, fail, complete } = object || {}
    this.progressCallback = new Map()

    if (typeof url === 'string') {
      const timestamp = new Date().getTime()
      this.filename = 'Download_' + timestamp + '_' + url.substring(url.lastIndexOf('/') + 1).replace(/[^a-zA-Z0-9.]/, '').slice(-16)
    }

    const interalFilePath = filePath || `internal://cache/${this.filename}`
    const sanBoxFilePath = switchInternalToHapSandBox(interalFilePath)
    const downloadConfig = {
      url: this.isEncodeUri(url) ? url : encodeURI(url),
      header: header || {}, // undefined error
      filePath: sanBoxFilePath,
    }

    this.successHandle = (res) => {
      success && success(res)
      complete && complete(res)
    }
    this.failHandle = (res) => {
      fail && fail(res)
      complete && complete(res)
    }
    try {
      console.debug('[AdvancedAPI] request download')
      request.downloadFile(globalThis.abilityContext, downloadConfig)
        .then((data) => {
          this.downloadTask = data
          if (this.abortFlag) {
            this.abortFlag = false
            this.downloadTask.delete(() => {
              console.debug('[AdvancedAPI] download fail')
              this.res = { errMsg: 'downloadFile:fail abort' }
              this.failHandle(this.res)
            })
          }
          if (this.progressFlag) {
            this.progressFlag = false
            for (const taskCallback of this.progressCallback.values()) {
              this.downloadTask.on('progress', taskCallback)
            }
          }
          this.downloadTask.on('complete', () => {
            console.debug('[AdvancedAPI] download success')
            this.res = { tempFilePath: interalFilePath, statusCode: 200, errMsg: 'downloadFile:ok' }
            filePath && Object.assign(this.res, { filePath })
            this.downloadTask.getTaskInfo().then((info) => {
              console.debug('[AdvancedAPI] download info: %s', JSON.stringify(info))
              info.downloadTotalBytes && Object.assign(this.res, { dataLength: info.downloadTotalBytes })
            }).catch((err) => {
              console.error('[AdvancedAPI] download request get task info error: ' + err.message)
            }).finally(() => {
              this.successHandle(this.res)
            })
          })
          this.downloadTask.on('fail', () => {
            console.debug('[AdvancedAPI] download fail')
            this.res = { errMsg: 'downloadFile:fail' }
            this.failHandle(this.res)
          })
        })
        .catch((err) => {
          console.error('[AdvancedAPI] download request error: ' + err.message)
          this.res = { errMsg: `downloadFile:fail ${err.message}` }
          this.failHandle(this.res)
        })
    } catch (err) {
      console.error('[AdvancedAPI] download request err.code : ' + err.code + ', err.message : ' + err.message)
      this.res = { errMsg: `downloadFile:fail ${err.message}` }
      this.failHandle(this.res)
    }
  }

  /**
   * interrupt download task
   */
  abort() {
    if (this.downloadTask) {
      this.downloadTask.delete(() => {
        console.debug('[AdvancedAPI] download fail')
        this.res = { errMsg: 'downloadFile:fail abort' }
        this.failHandle(this.res)
      })
    } else {
      this.abortFlag = true
    }
  }

  /**
   * subscribe download process event
   * @callback params progress {Number}: download process percent
   * @callback params totalBytesWritten {Number}: download Bytes
   * @callback params totalBytesExpectedToWrite {Number}: total Bytes
   */
  onProgressUpdate(callback) {
    function taskCallback(receivedSize, totalSize) {
      callback({ progress: Math.ceil(100 * receivedSize / totalSize), totalBytesWritten: receivedSize, totalBytesExpectedToWrite: totalSize })
    }
    if (!callback) {
      console.error('[AdvancedAPI] Invalid, callback is null')
      return
    }
    if (!this.progressCallback.has(callback)) {
      this.progressCallback.set(callback, taskCallback)
      if (this.downloadTask) {
        this.downloadTask.on('progress', taskCallback)
      } else {
        this.progressFlag = true
      }
    }
  }

  /**
   * unsubscribe download process event
   * remove all if callback is null, otherwise remove the specialized callback
   */
  offProgressUpdate(callback) {
    if (!callback) {
      this.progressCallback.clear()
      // if task is not ready, on is not set too
      if (this.downloadTask) {
        this.downloadTask.off('progress')
      }
    } else if (this.progressCallback.has(callback)) {
      if (this.downloadTask) {
        this.downloadTask.off('progress', this.progressCallback.get(callback))
        this.progressCallback.delete(callback)
      }
    } else {
      console.debug('[AdvancedAPI] offProgressUpdate callback invalid')
    }
  }

  /**
   * subscribe HTTP Response Header event
   * @callback params header {Object}: HTTP Response Header
   * ohos not support
   */
  onHeadersReceived(callback) {
    console.debug('[AdvancedAPI] onHeadersReceived not support')
  }

  /**
   * unsubscribe HTTP Response Header event
   * remove all if callback is null, otherwise remove the specialized callback
   * ohos not support
   */
  offHeadersReceived(callback) {
    console.debug('[AdvancedAPI] offHeadersReceived not support')
  }

  /**
   * check whether a string contains only valid characters of encodeUri
   */
  isEncodeUri(uri) {
    const validRep = /^[a-zA-Z0-9-_.!~*'();/?:@&=+$,#]+$/
    if (!uri) {
      return true
    }
    return validRep.test(uri)
  }
}
