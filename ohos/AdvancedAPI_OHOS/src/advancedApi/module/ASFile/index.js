import { context } from '../../../base/bridge/abilityBase'
import { FileioBase } from '../../../base/bridge/fileioBase'
import { SecurityBase } from '../../../base/bridge/securityBase'
import { getFdFromUriOrSandBoxPath, isSandboxPath, switchInternalToHapSandBox } from '../../util'
import FileSystemManager from './FileSystemManager'
import util from '@ohos.util'
import fileuri from '@ohos.file.fileuri'
import { ErrorCode } from '../../../base/util/ErrorCode'

export default class ASFile {
  constructor() {
    this.DIGESTALGORITHM_VALUES = ['MD5', 'SHA1']
    // 文件保存路径：/data/storage/el2/base/haps/advancedDEMO/files/saveFiles
    this.saveFileDir = context.filesDir + '/saveFiles'
    this.fileSystemManager = new FileSystemManager()
    this.init()
  }

  init () {
    try {
      FileioBase.ohosMkdirSync(this.saveFileDir)
    } catch (error) {
      console.debug('[AdvancedAPI] %s 已存在', this.saveFileDir)
    }
  }

  /**
   * 保存文件到本地
   * @param {string} tempFilePath - 需要保存的文件的临时路径
   * @param {function} success - 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  saveFile (params) {
    return new Promise(async (resolve, reject) => {
      const { tempFilePath } = params
      if (!tempFilePath) {
        console.error('[AdvancedAPI] invalid tempFilePath.')
        reject(['tempFilePath is required.', ErrorCode.PARAMETER_ERROR])
        return
      }
      try {
        const fileName = tempFilePath.substr(tempFilePath.lastIndexOf('/'))
        const fileType = fileName && fileName.split('.').pop()
        let newFileName = new Date().getTime()
        if (fileType) {
          newFileName += `.${fileType}`
        }
        const fileUri = isSandboxPath(tempFilePath) ?
          fileuri.getUriFromPath(switchInternalToHapSandBox(tempFilePath)) : tempFilePath
        const fd = getFdFromUriOrSandBoxPath(fileUri)
        const destPath = this.saveFileDir + '/' + newFileName // 保存路径
        FileioBase.ohosCopy(fd, destPath).then(() => {
          console.debug('[AdvancedAPI] saveFile succeed')
          resolve({ savedFilePath: destPath })
        }).catch((err) => {
          console.error('[AdvancedAPI] saveFile failed with error message: ' + err.message + ', error code: ' + err.code)
          reject([err.message, ErrorCode.IO_ERROR])
        })
      } catch (err) {
        console.error('[AdvancedAPI] tempFilePath does not exist')
        reject(['tempFilePath does not exist', ErrorCode.PARAMETER_ERROR])
      }
    })
  }

  /**
   * 获取本地已保存的文件列表
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  getSavedFileList () {
    return new Promise((resolve, reject) => {
      const dir = FileioBase.ohosOpendirSync(this.saveFileDir)
      const fileList = []
      const dirent = dir.ohosReadsync()
      for (let i = 0; i < dirent.length; i++) {
        const filePath = `${this.saveFileDir}/${dirent[0]}`
        const stat = FileioBase.ohosStatSync(filePath)
        if (stat.isFile()) {
          const fileItem = {
            filePath: filePath,
            createTime: stat.mtime,
            size: stat.size
          }
          fileList.push(fileItem)
        }
      }
      resolve({ fileList })
    })
  }

  /**
   * 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件。
   * @param {string} filePath - 文件路径
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  getSavedFileInfo (params) {
    return new Promise((resolve, reject) => {
      const { filePath } = params
      if (!filePath) {
        console.error('[AdvancedAPI] filePath is required.')
        reject(['filePath is required', ErrorCode.PARAMETER_ERROR])
        return
      }
      const fileUri = isSandboxPath(filePath) ?
        fileuri.getUriFromPath(switchInternalToHapSandBox(filePath)) : filePath
      const fd = getFdFromUriOrSandBoxPath(fileUri)
      const stat = FileioBase.ohosStatSync(fd)
      const fileInfo = {
        createTime: stat.mtime,
        size: stat.size,
        errMsg: 'getSavedFileInfo:ok'
      }
      resolve(fileInfo)
    })
  }

  /**
   * 删除本地存储的文件。
   * @param {string} filePath - 文件路径
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  removeSavedFile (params) {
    return new Promise((resolve, reject) => {
      const { filePath } = params
      if (!filePath) {
        console.error('[AdvancedAPI] filePath is required.')
        reject(['filePath is required', ErrorCode.PARAMETER_ERROR])
        return
      }
      try {
        const destPath = isSandboxPath(filePath) ? switchInternalToHapSandBox(filePath) : filePath
        FileioBase.ohosUnlinkSync(destPath)
        resolve('success')
      } catch (err) {
        reject(['removeSavedFile is fail', ErrorCode.IO_ERROR])
      }
    })
  }

  /**
   * 获取文件信息
   * @param {string} filePath - 本地文件路径
   * @param {string} digestAlgorithm - 计算文件摘要的算法，可取值 md5、sha1。
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  getFileInfo (params) {
    return new Promise((resolve, reject) => {
      const { filePath } = params
      let { digestAlgorithm = 'MD5' } = params
      if (!filePath) {
        console.error('[AdvancedAPI] filePath is required.')
        reject(['filePath is required', ErrorCode.PARAMETER_ERROR])
        return
      }
      if (typeof digestAlgorithm === 'string') {
        digestAlgorithm = digestAlgorithm.toUpperCase()
      }

      if (!this.DIGESTALGORITHM_VALUES.includes(digestAlgorithm)) {
        console.error('[AdvancedAPI] digestAlgorithm is invalid.')
        digestAlgorithm = 'MD5'
      }
      try {
        const fileUri = isSandboxPath(filePath) ?
          fileuri.getUriFromPath(switchInternalToHapSandBox(filePath)) : filePath
        const fd = FileioBase.ohosOpenSync(fileUri, 0o2).fd
        const stat = FileioBase.ohosStatSync(fd)
        const buf = new ArrayBuffer(stat.size)
        FileioBase.ohosReadSync(fd, buf)
        SecurityBase.rsa(digestAlgorithm, { data: new Uint8Array(buf) }).then(resultBuf => {
          const textDecoder = new util.TextDecoder('utf-8', { ignoreBOM: true })
          resolve({ size: stat.size, digest: textDecoder.decodeWithStream(resultBuf, { stream: false }) })
        })
      } catch (err) {
        console.error(`[AdvancedAPI] getFileInfo fail err = ${JSON.stringify(err)}`)
        reject(['getFileInfo is fail', ErrorCode.IO_ERROR])
      }
    })
  }

  /**
   * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx。
   * @param {string} filePath - 文件路径，可通过 downFile 获得
   * @param {string} fileType - 文件类型，指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx，支付宝小程序仅支持pdf
   * @param {boolean} showMenu - 右上角是否有可以转发分享的功能，不支持
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  openDocument (params) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      const { filePath, fileType, showMenu = false } = params
      if (showMenu) {
        console.error('[AdvancedAPI] showMenu do not support.')
      }
    })
  }

  getFileSystemManager () {
    return this.fileSystemManager
  }
}
