import fs from '@ohos.file.fs'
import buffer from '@ohos.buffer'
import { context } from '../../../base/bridge/abilityBase'
import { checkDataType } from '../../../base/util/checkDataType'
import FileCallback from './FileCallback'
import {
  getOpenMode,
  modeReflect,
  getFileTypeMode,
  mkdirRecursive,
  checkFd,
  checkFdSync,
  checkEncoding,
  checkPath,
  checkPathSync,
  checkPathExistence,
  checkPathExistenceSync,
  obtainFileName,
  obtainUpperPath,
} from './util'
import { isSandboxPath, switchInternalToHapSandBox } from '../../util'

const ERROR = {
  PARAMETER_ERROR: 1001
}

const DEFAULT_ENCODING = 'utf-8'
const DEFAULT_POSITION = 0
const DEFAULT_LENGTH = 0
const DEFAULT_FLAG = 'r'
const DEFAULT_OFFSET = 0
const FLAG = [
  'a', //	打开文件用于追加。 如果文件不存在，则创建该文件
  'ax', //	类似于 'a'，但如果路径存在，则失败
  'a+', //	打开文件用于读取和追加。 如果文件不存在，则创建该文件
  'ax+', //	类似于 'a+'，但如果路径存在，则失败
  'as', //	打开文件用于追加（在同步模式中）。 如果文件不存在，则创建该文件
  'as+', //	打开文件用于读取和追加（在同步模式中）。 如果文件不存在，则创建该文件
  'r', //	打开文件用于读取。 如果文件不存在，则会发生异常
  'r+', //	打开文件用于读取和写入。 如果文件不存在，则会发生异常
  'w', //	打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件
  'wx', //	类似于 'w'，但如果路径存在，则失败
  'w+', //	打开文件用于读取和写入。 如果文件不存在则创建文件，如果文件存在则截断文件
  'wx+', //	类似于 'w+'，但如果路径存在，则失败
]

export default class FileSystemManager {
  constructor() {
    this.pathDir = context.filesDir // 沙箱路径
  }

  access ({ path, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    const fileUri = isSandboxPath(path) ? switchInternalToHapSandBox(path) : path
    if (!checkDataType(fileUri, true, 'string')) {
      cb.fail({
        errMsg: 'access:fail parameter error: parameter.path should be String',
        errno: ERROR.PARAMETER_ERROR // 对齐微信错误码
      })
      return
    }
    fs.access(fileUri).then(res => {
      if (res) {
        console.debug('[AdvancedAPI] file access exist')
        cb.success({ errMsg: 'access:ok' })
      } else {
        cb.fail({ errMsg: 'access:fail no such file or directory' })
      }
    }, (err) => {
      console.debug('[AdvancedAPI] access failed with error message: %s, code = %d', err.message, err.code)
    })
  }

  accessSync (path) {
    if (!checkDataType(path, true, 'string')) {
      throw new Error('accessSync:fail path must be a string')
    }
    const res = fs.accessSync(path)
    if (!res) {
      throw new Error('accessSync:fail no such file or directory')
    }
  }

  // 当数据是string类型时有效，表示数据的编码方式，默认 ‘utf-8’。当前仅支持 ‘utf-8’
  appendFile ({ filePath, data, encoding = DEFAULT_ENCODING, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    if (!checkDataType(filePath, true, 'string')) {
      cb.fail({
        errMsg: 'access:fail parameter error: parameter.filePath should be String',
        errno: ERROR.PARAMETER_ERROR
      })
      return
    }
    if (!checkDataType(data, true, ['string', 'arraybuffer'])) {
      cb.fail({
        errMsg: 'access:fail parameter error: parameter.data should be String/ArrayBuffer',
        errno: ERROR.PARAMETER_ERROR
      })
      return
    }

    const res = fs.accessSync(filePath)
    if (!res) {
      cb.fail({ errMsg: `appendFile:fail no such file or directory, open "${filePath}"` })
      return
    }

    const file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.APPEND)
    fs.write(file.fd, data).then(writeLen => {
      cb.success({ errMsg: 'appendFile:ok' })
      fs.closeSync(file)
    }).catch((err) => {
      console.error('[AdvancedAPI] appendFile failed with error message: ' + err.message + ', error code: ' + err.code)
      cb.fail({ errMsg: `appendFile:fail ${err.message}` })
    })
  }

  // 当数据是string类型时有效，表示数据的编码方式，默认 ‘utf-8’。当前仅支持 ‘utf-8’
  appendFileSync (filePath, data, encoding = DEFAULT_ENCODING) {
    if (!checkDataType(filePath, true, 'string')) {
      throw new Error('access:fail parameter error: parameter.filePath should be String')
    }
    if (!checkDataType(data, true, ['string', 'arraybuffer'])) {
      throw new Error('access:fail parameter error: parameter.data should be String/ArrayBuffer')
    }

    const res = fs.accessSync(filePath)
    if (!res) {
      throw new Error(`appendFile:fail no such file or directory, open "${filePath}"`)
    }

    const file = fs.openSync(filePath, fs.OpenMode.READ_WRITE | fs.OpenMode.APPEND)
    fs.writeSync(file.fd, data)
  }

  // 打开文件，返回文件描述符
  open ({ filePath, flag = DEFAULT_FLAG, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    if (!checkDataType(filePath, true, 'string')) {
      cb.fail({
        errMsg: 'open:fail parameter error: parameter.filePath should be String',
        errno: ERROR.PARAMETER_ERROR
      })
      return
    }
    if (!FLAG.includes(flag)) {
      flag = DEFAULT_FLAG
    }

    if (Object.keys(modeReflect).includes(flag)) {
      const res = fs.accessSync(filePath)
      if (!res) {
        console.debug('[AdvancedAPI] access fail')
        flag = modeReflect[flag]
      } else {
        cb.fail({ errMsg: 'open:fail EXIST: file already exists' })
        return
      }
    }

    fs.open(filePath, getOpenMode(flag), (err, file) => {
      if (err) {
        console.error('[AdvancedAPI] open failed with error message: ' + err.message + ', error code: ' + err.code)
        cb.fail({
          errMsg: `open:fail ${err.message}`,
          errno: ERROR.NO_SUCH_FILE_OR_DIRECTORY
        })
      } else {
        cb.success({ fd: file.fd.toString(), errMsg: 'open:ok' })
      }
    })
  }

  openSync ({ filePath, flag }) {
    if (!checkDataType(filePath, true, 'string')) {
      throw new Error('openSync:fail parameter error: parameter.filePath should be String')
    }
    if (!FLAG.includes(flag)) {
      flag = DEFAULT_FLAG
    }

    if (Object.keys(modeReflect).includes(flag)) {
      const res = fs.accessSync(filePath)
      if (!res) {
        console.debug('[AdvancedAPI] access fail')
        flag = modeReflect[flag]
      } else {
        throw new Error('openSync:fail EXIST: file already exists')
      }
    }

    const file = fs.openSync(filePath, getOpenMode(flag))
    return file.fd.toString()
  }

  close ({ fd, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    if (fd === '' || !checkDataType(fd, true, 'string')) {
      cb.fail({
        errMsg: 'close:fail invalid fd',
        errno: ERROR.PARAMETER_ERROR
      })
      return
    }
    fd = Number(fd)
    if (isNaN(fd)) {
      cb.fail({ errMsg: `close:fail bad file descriptor` })
      return
    }
    fs.close(fd, err => {
      if (err) {
        cb.fail({ errMsg: `close:fail bad file descriptor` })
      } else {
        cb.success({ errMsg: 'close:ok' })
      }
    })
  }

  closeSync ({ fd }) {
    if (fd === '' || !checkDataType(fd, true, 'string')) {
      throw new Error('closeSync:fail invalid fd')
    }
    fd = Number(fd)
    if (isNaN(fd)) {
      throw new Error('closeSync:fail invalid fd')
    }
    fs.closeSync(fd)
  }

  // 差异： srcPath与destPath相同时，微信提示成功，但鸿蒙抛出异常，提示Error: File exists
  copyFile ({ srcPath, destPath, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    const checkResOfSrcPath = checkPathExistence('copyFile', 'srcPath', srcPath)
    if (!checkResOfSrcPath.isValid) {
      cb.fail(checkResOfSrcPath.checkMsg)
      return
    }

    const checkResOfDestPath = checkPath('copyFile', 'destPath', destPath)
    if (!checkResOfDestPath.isValid) {
      cb.fail(checkResOfDestPath.checkMsg)
      return
    }

    // 判断srcPath是否为一个目录
    if (fs.statSync(srcPath).isDirectory()) {
      cb.fail({ errMsg: `copyFile: fail illegal operation on a directory, open: ${srcPath}` })
      return
    }

    // 判断destPath路径是否存在
    if (!fs.accessSync(destPath)) {
      const getUpperPath = obtainUpperPath(destPath)

      // copyFile不支持创建目录 upperPath不存在直接报错
      if (!fs.accessSync(getUpperPath.upperPath)) {
        cb.fail({ errMsg: `copyFile: fail no such file or directory, open: ${destPath}` })
        return
      }
    } else {
      const destPathStat = fs.statSync(destPath)
      // 路径存在且为目录，则拼接srcPath的文件名作为destPath
      if (destPathStat.isDirectory()) {
        destPath = destPath + obtainFileName(srcPath).fileName
      } else {
        // 路径存在且为文件，源路径必须与目标路径相同
        if (destPathStat.isFile() && (srcPath !== destPath)) {
          cb.fail({ errMsg: 'copyFile: fail copyFile failed' })
          return
        }
      }
    }

    fs.copyFile(srcPath, destPath)
      .then(() => {
        cb.success({ errMsg: 'copyFile: ok' })
      })
      .catch((err) => {
        cb.fail({ errMsg: `copyFile: failed with error message: ${err.message}, error code: ${err.code}` })
      })
  }

  // 差异： srcPath与destPath相同时，微信提示成功，但鸿蒙抛出异常，提示Error: File exists
  copyFileSync (srcPath, destPath) {
    const checkResSrc = checkPathExistenceSync('copyFileSync', 'srcPath', srcPath)
    if (!checkResSrc.isValid) {
      throw new Error(checkResSrc.errMsg)
    }

    const checkResDest = checkPathSync('copyFileSync', 'destPath', destPath)
    if (!checkResDest.isValid) {
      throw new Error(checkResDest.errMsg)
    }

    if (fs.statSync(srcPath).isDirectory()) {
      throw new Error(`copyFileSync: fail illegal operation on a directory: ${srcPath}`)
    }

    if (!fs.accessSync(destPath)) {
      const getUpperPath = obtainUpperPath(destPath)
      if (!fs.accessSync(getUpperPath.upperPath)) {
        throw new Error(`copyFileSync: fail no such file or directory: ${destPath}`)
      }
    } else {
      // 判断存在的路径是目录还是文件
      const destPathStat = fs.statSync(destPath)
      // 判断存在的路径是目录还是文件
      if (destPathStat.isDirectory()) {
        const index = destPath.lastIndexOf('/')
        let namePath = destPath.substring(index)

        // 处理' ../test.txt/ '的情况
        if (destPath.endsWith('/')) {
          namePath = destPath.substring(destPath.lastIndexOf('/', destPath.length - 2) + 1, destPath.length - 1)
        }

        destPath = destPath + namePath
      } else {
        // 判断destPath是否等于srcPath, 若不等，则报错
        if (destPathStat.isFile() && (srcPath !== destPath)) {
          throw new Error('copyFileSync: fail copyFile failed')
        }
      }
    }

    try {
      fs.copyFileSync(srcPath, destPath)
    } catch (err) {
      throw new Error(`copyFileSync: ${err.message}`)
    }
  }

  fstat ({ fd, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    const res = checkFd('fstat', fd)
    if (!res.isValid) {
      cb.fail(res.checkMsg)
      return
    } else {
      fd = res.fd
    }

    fs.stat(fd, (err, stat) => {
      if (err) {
        cb.fail({ errMsg: `fstat: failed with error message: ${err.message}, error code: ${err.code}` })
      } else {
        const combinationMode = getFileTypeMode(stat) | stat.mode
        cb.success({
          stat: {
            mode: combinationMode,
            size: stat.size,
            lastAccessedTime: stat.atime,
            lastModifiedTime: stat.mtime,
            isDirectory: () => { return stat.isDirectory() },
            isFile: () => { return stat.isFile() },
          },
          errMsg: 'fstat: ok'
        })
      }
    })
  }

  fstatSync ({ fd }) {
    const res = checkFdSync('fstatSync', fd)
    if (!res.isValid) {
      throw new Error(res.errMsg)
    } else {
      fd = res.fd
    }

    try {
      const stat = fs.statSync(fd)
      const combinationMode = getFileTypeMode(stat) | stat.mode
      return {
        stat: {
          mode: combinationMode,
          size: stat.size,
          lastAccessedTime: stat.atime,
          lastModifiedTime: stat.mtime,
          isDirectory: () => { return stat.isDirectory() },
          isFile: () => { return stat.isFile() }
        }
      }
    } catch (err) {
      throw new Error(`fstatSync: ${err.message}`)
    }
  }

  ftruncate ({ fd, length, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    const res = checkFd('ftruncate', fd)
    if (!res.isValid) {
      cb.fail(res.checkMsg)
      return
    } else {
      fd = res.fd
    }

    if (!checkDataType(length, true, 'number') || length < 0) {
      length = DEFAULT_LENGTH // 非number类型 设为默认值DEFAULT_LENGTH ，DEFAULT_LENGTH=0
    }

    fs.truncate(fd, length).then(() => {
      cb.success({ errMsg: 'ftruncate: ok' })
    }).catch((err) => {
      cb.fail({ errMsg: `ftruncate: failed with error message: ${err.message}, error code: ${err.code}` })
    })
  }

  ftruncateSync ({ fd, length }) {
    const res = checkFdSync('ftruncateSync', fd)
    if (!res.isValid) {
      throw new Error(res.errMsg)
    } else {
      fd = res.fd
    }

    if (!checkDataType(length, true, 'number') || length < 0) {
      length = DEFAULT_LENGTH // 非number类型 设为默认值DEFAULT_LENGTH ，DEFAULT_LENGTH=0
    }

    try {
      fs.truncateSync(fd, length)
    } catch (err) {
      throw new Error(`ftruncateSync: ${err.message}`)
    }
  }

  mkdir ({ dirPath, recursive, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    // 将非boolean类型的入参转换为boolean类型
    if (!checkDataType(recursive, false, 'boolean')) {
      recursive = Boolean(recursive)
    }

    const checkRes = checkPath('mkdir', 'dirPath', dirPath)
    if (!checkRes.isValid) {
      cb.fail(checkRes.checkMsg)
      return
    }

    // 检查目录是否已经存在
    if (fs.accessSync(dirPath)) {
      cb.fail({ errMsg: `mkdir: dirPath already exists: ${dirPath}` })
      return
    }

    // 是否递归创建
    if (recursive) {
      mkdirRecursive('', dirPath.split('/'))
      cb.success({ errMsg: 'mkdir: ok' })
    } else {
      const getSubPath = obtainUpperPath(dirPath)
      if (fs.accessSync(getSubPath.upperPath)) {
        fs.mkdir(dirPath)
          .then(() => {
            cb.success({ errMsg: 'mkdir: ok' })
          })
          .catch((err) => {
            cb.fail({
              errMsg: `mkdir: failed with error message: ${err.message}, error code: ${err.code}`
            })
          })
      } else {
        cb.fail({ errMsg: 'mkdir: failed' })
      }
    }
  }

  mkdirSync (dirPath, recursive) {
    // 将非boolean类型的入参转换为boolean类型
    if (!checkDataType(recursive, false, 'boolean')) {
      recursive = Boolean(recursive)
    }

    const res = checkPathSync('mkdirSync', 'dirPath', dirPath)
    if (!res.isValid) {
      throw new Error(res.errMsg)
    }

    // 检查目录是否已经存在
    if (fs.accessSync(dirPath)) {
      throw new Error(`mkdirSync: dirPath already exists: ${dirPath}`)
    }

    // recursive为false且上级目录不存在
    if (!recursive && !fs.accessSync(obtainUpperPath(dirPath).upperPath)) {
      throw new Error(`mkdirSync: fail, recursive is false and upper path does not exist`)
    }

    if (recursive) {
      try {
        mkdirRecursive('', dirPath.split('/'))
      } catch (err) {
        throw new Error(`mkdirSync: ${err.message}`)
      }
    } else {
      try {
        fs.mkdirSync(dirPath)
      } catch (err) {
        throw new Error(`mkdirSync: ${err.message}`)
      }
    }
  }

  // 仅负责读取文件，需要开发者手动打开文件，调完read接口后，手动关闭文件
  read ({ fd, arrayBuffer, offset = DEFAULT_OFFSET, length, position, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })

    if (!checkDataType(fd, true, 'string') || fd === '' || isNaN(Number(fd))) {
      cb.fail({ errMsg: 'read: fail invalid fd' })
      return
    } else {
      fd = Number(fd)
    }

    if (!checkDataType(arrayBuffer, true, 'arraybuffer')) {
      cb.fail({ errMsg: `read: fail invalid arrayBuffer: ${arrayBuffer}` })
      return
    }

    // offset、length、position为负数时，微信不报错也读不出内容,但鸿蒙接口会crash
    if (!checkDataType(offset, false, 'number') || offset < 0) {
      offset = Number(offset) // 转换非number类型的数据，转换结果：true = 1, false = 0, '12' = 12, null = 0
      if (isNaN(offset) || offset < 0) {
        offset = DEFAULT_OFFSET // 其他类型如object、undefined, 设为默认值
      }
    }

    if (!checkDataType(length, false, 'number') || length < 0) {
      length = Number(length)
      if (isNaN(length) || length < 0) {
        length = DEFAULT_LENGTH
      }
    }

    const allowedSize = arrayBuffer.byteLength - offset // ArrayBuffer中允许读取的最大容量
    if (allowedSize < length) {
      cb.fail({ errMsg: `read: fail RangeError [ERR_OUT_OF_RANGE]: The value length is out of range. It must be <= ${allowedSize}. Received ${length}` })
      return
    }

    if (!checkDataType(position, false, 'number') || position < 0) {
      position = DEFAULT_POSITION // 非number类型，设为默认值
    }

    /*
     * 参数说明：
     * 【微信中】
     * offset: number类型,缓冲区中的写入偏移量，默认0
     * length: number类型,要从文件中读取的字节数，默认0
     * position: number类型,文件读取的起始位置，如不传或传 null，则会从当前文件指针的位置读取。
     *           如果 position 是正整数，则文件指针位置会保持不变并从 position 读取文件
     * 【鸿蒙中】
     * offset: number类型,期望读取文件的位置。默认从当前位置开始读。
     * length: number类型，期望读取数据的长度。默认缓冲区长度。
     */
    const offsetArrayBuffer = offset // 缓冲区要求写入的偏移量
    const newBuffer = arrayBuffer.slice(offsetArrayBuffer) // 临时申请一块新的空间
    fs.read(fd, newBuffer, { offset: position, length })
      .then((readLen) => {
        const viewNewBuffer = new Uint8Array(newBuffer)
        const viewArrayBuffer = new Uint8Array(arrayBuffer)
        viewArrayBuffer.set(viewNewBuffer, offsetArrayBuffer)
        console.debug('[AdvancedAPI] the content of arrayBuffer: %s', String.fromCharCode.apply(null, new Uint8Array(newBuffer.slice(0, readLen))))
        cb.success({
          bytesRead: readLen,
          arrayBuffer: arrayBuffer,
          errMsg: 'read: ok'
        })
      })
      .catch((err) => {
        cb.fail({ errMsg: `read: failed with error message: ${err.message},error code: ${err.code}` })
      })
  }

  // 仅负责读取文件，需要开发者手动打开文件，调完read接口后，手动关闭文件
  readSync ({ fd, arrayBuffer, offset, length, position }) {
    if (!checkDataType(fd, true, 'string') || fd === '' || isNaN(Number(fd))) {
      throw new Error('readSync:fail invalid fd')
    } else {
      fd = Number(fd)
    }

    if (!checkDataType(arrayBuffer, true, 'arraybuffer')) {
      throw new Error('readSync: fail invalid arrayBuffer')
    }

    if (!checkDataType(offset, false, 'number') || offset < 0) {
      offset = Number(offset) // 转换非number类型的数据，转换结果：true = 1, false = 0, '12' = 12, null = 0
      if (isNaN(offset) || offset < 0) {
        offset = DEFAULT_OFFSET // 其他类型如object、undefined, 设为默认值
      }
    }

    if (!checkDataType(length, false, 'number') || length < 0) {
      length = Number(length)
      if (isNaN(length) || length < 0) {
        length = DEFAULT_LENGTH
      }
    }

    const allowedSize = arrayBuffer.byteLength - offset // ArrayBuffer中允许读取的最大容量
    if (allowedSize < length) {
      throw new Error(`readSync: fail RangeError [ERR_OUT_OF_RANGE]: The value length is out of range. It must be <= ${allowedSize}. Received ${length}`)
    }

    if (!checkDataType(position, false, 'number') || position < 0) {
      position = DEFAULT_POSITION // 非number类型，设为默认值
    }

    /*
    * 参数说明：
    * @微信中
    * offset: number类型,缓冲区中的写入偏移量，默认0
    * length: number类型,要从文件中读取的字节数，默认0
    * position: number类型,文件读取的起始位置，如不传或传 null，则会从当前文件指针的位置读取。
    *           如果 position 是正整数，则文件指针位置会保持不变并从 position 读取文件
    * @鸿蒙中
    * offset: number类型,期望读取文件的位置。默认从当前位置开始读。
    * length: number类型，期望读取数据的长度。默认缓冲区长度。
    */
    try {
      const offsetArrayBuffer = offset // 缓冲区要求写入的偏移量
      const newBuffer = arrayBuffer.slice(offsetArrayBuffer) // 临时申请一块新的空间
      const len = fs.readSync(fd, newBuffer, { offset: position, length })
      const viewNewBuffer = new Uint8Array(newBuffer) // 创建视图用于操纵数据，在入参arrayBuffer的偏移量为offsetArrayBuffer的位置写入数据
      const viewArrayBuffer = new Uint8Array(arrayBuffer)
      viewArrayBuffer.set(viewNewBuffer, offsetArrayBuffer)
      console.debug('[AdvancedAPI] the content of arrayBuffer: %s', String.fromCharCode.apply(null, new Uint8Array(arrayBuffer.slice(0, len))))

      return { bytesRead: len, arrayBuffer: arrayBuffer }
    } catch (err) {
      throw new Error(`readSync: ${err.message}`)
    }
  }

  /**
   * 功能：readdir读取目录的文件列表 使用鸿蒙的listFile实现（列出文件夹下所有文件名）
   * 差异：微信支持访问空串，读取到的结果是根目录的文件列表；鸿蒙listFile判定空串是合法的，但读不到根目录的内容，返回的内容为空
   *       由于鸿蒙的一些接口如accessSync 、 statSync 认为空串是非法的，所以该接口也将空串按照非法值处理，不返回空内容
   */
  readdir ({ dirPath, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    const checkRes = checkPathExistence('readdir', 'dirPath', dirPath)
    if (!checkRes.isValid) {
      cb.fail(checkRes.checkMsg)
      return
    }

    const stat = fs.statSync(dirPath)
    if (stat.isFile()) {
      cb.fail({ errMsg: `readdir: fail, dirPath not a directory: ${dirPath}` })
      return
    }

    fs.listFile(dirPath)
      .then((files) => {
        cb.success({
          files,
          errMsg: 'readdir: ok'
        })
      })
      .catch((err) => {
        cb.fail({ errMsg: `readdir: failed with error message: ${err.message}, error code: ${err.code}` })
      })
  }

  readdirSync (dirPath) {
    const res = checkPathExistence('readdirSync', 'dirPath', dirPath)
    if (!res.isValid) {
      throw new Error(res.errMsg)
    }

    if (fs.statSync(dirPath).isFile()) {
      throw new Error('readdirSync: fail not a directory: ${dirPath}')
    }

    try {
      const files = fs.listFileSync(dirPath)
      return { files }
    } catch (err) {
      throw new Error(`readdirSync: ${err.message}`)
    }
  }

  readFile ({ filePath, encoding, position = DEFAULT_POSITION, length, success, fail, complete }) {
    filePath = isSandboxPath(filePath) ? switchInternalToHapSandBox(filePath) : filePath
    const cb = new FileCallback({ success, fail, complete })
    const checkRes = checkPathExistence('readFile', 'filePath', filePath)
    if (!checkRes.isValid) {
      cb.fail(checkRes.checkMsg)
      return
    }

    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      cb.fail({ errMsg: `readFile:fail not absolute path: ${filePath}` })
      return
    }

    const res = checkEncoding('readFile', encoding)
    if (!res.isValid) {
      cb.fail({ errMsg: res.checkMsg })
      return
    }

    const lengthOfFile = stat.size
    length = (length === undefined || length === null) ? lengthOfFile : length

    if (!checkDataType(position, false, 'number')) {
      cb.fail({ errMsg: `readFile:fail invalid position: ${position}` })
      return
    }

    if (!checkDataType(length, false, 'number')) {
      cb.fail({ errMsg: `readFile:fail invalid length: ${length}` })
      return
    }

    if (position < 0 || position > lengthOfFile) {
      cb.fail({ errMsg: 'readFile:fail the value of "position" is out of range' })
      return
    }

    if (length < 0 || length + position > lengthOfFile) {
      cb.fail({ errMsg: 'readFile:fail the value of "length" is out of range' })
      return
    }

    const file = fs.openSync(filePath, fs.OpenMode.READ_ONLY)
    const buf = new ArrayBuffer(length)
    fs.read(file.fd, buf, { position, length })
      .then(() => {
        const data = encoding ? buffer.from(buf).toString(encoding) : buf
        cb.success({
          data,
          errMsg: 'readFile:ok'
        })
      })
      .catch((err) => {
        cb.fail({ errMsg: `readFile:fail error message: ${err.message}, error code: ${err.code}` })
      })
      .finally(() => {
        fs.closeSync(file)
      })
  }

  readFileSync (filePath, encoding, position = DEFAULT_POSITION, length) {
    filePath = isSandboxPath(filePath) ? switchInternalToHapSandBox(filePath) : filePath
    const res1 = checkPathExistenceSync('readFileSync', 'filePath', filePath)
    if (!res1.isValid) {
      throw new Error(res1.errMsg)
    }
    // 判断filePath是文件还是目录
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      throw new Error(`readFileSync:fail illegal operation on a directory, open: ${filePath}`)
    }

    const res2 = checkEncoding('readFile', encoding)
    if (!res2.isValid) {
      throw new Error(res2.checkMsg)
    }

    const lengthOfFile = stat.size
    length = (length === undefined || length === null) ? lengthOfFile : length

    if (!checkDataType(position, false, 'number')) {
      throw new Error(`readFileSync:fail invalid position: ${position}`)
    }

    if (!checkDataType(length, false, 'number')) {
      throw new Error(`readFileSync:fail invalid length: ${length}`)
    }

    if (position < 0 || position > lengthOfFile) {
      throw new Error('readFileSync:fail the value of "position" is out of range')
    }

    if (length < 0 || length + position > lengthOfFile) {
      throw new Error('readFileSync:fail the value of "length" is out of range')
    }

    try {
      const file = fs.openSync(filePath, fs.OpenMode.READ_ONLY)
      const buf = new ArrayBuffer(length)
      fs.readSync(file.fd, buf, { position, length })
      fs.closeSync(file)
      const data = encoding ? buffer.from(buf).toString(encoding) : buf
      return data
    } catch (err) {
      throw new Error(`readFileSync:fail ${err.message}`)
    }
  }

  rename ({ oldPath, newPath, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    const checkRes1 = checkPathExistence('rename', 'oldPath', oldPath)
    if (!checkRes1.isValid) {
      cb.fail(checkRes1.checkMsg)
      return
    }

    const checkRes2 = checkPath('rename', 'newPath', newPath)
    if (!checkRes2.isValid) {
      cb.fail(checkRes2.checkMsg)
      return
    }

    const ifAccessNewPath = fs.accessSync(newPath)
    if (!ifAccessNewPath) {
      const getUpperPath = obtainUpperPath(newPath)
      if (!fs.accessSync(getUpperPath.upperPath)) {
        cb.fail({ errMsg: `rename: fail no such file or directory: ${newPath}` })
        return
      }
    }

    if (ifAccessNewPath && (oldPath !== newPath)) {
      cb.fail({ errMsg: 'rename: fail' })
      return
    }

    fs.rename(oldPath, newPath).then(() => {
      cb.success({ errMsg: 'rename: ok' })
    }).catch((err) => {
      cb.fail({ errMsg: `rename: failedwith error message: ${err.message}, error code: ${err.code}` })
    })
  }

  renameSync (oldPath, newPath) {
    // 差异：微信的'' 代指根目录，鸿蒙是不支持访问根目录的
    const res1 = checkPathExistenceSync('renameSync', 'oldPath', oldPath)
    if (!res1.isValid) {
      throw new Error(res1.errMsg)
    }

    const res2 = checkPathSync('renameSync', 'newPath', newPath)
    if (!res2.isValid) {
      throw new Error(res2.errMsg)
    }

    // 若新路径不存在且上级目录也不存在
    const ifAccessNewPath = fs.accessSync(newPath)
    if (!ifAccessNewPath && !fs.accessSync(obtainUpperPath(newPath).upperPath)) {
      throw new Error(`renameSync: fail no such file or directory, open: ${newPath}`)
    }

    // 判断newPath是否存在 若存在且oldPath不等于newPath 则报错
    if (ifAccessNewPath && (oldPath !== newPath)) {
      throw new Error('renameSync: fail')
    }

    try {
      fs.renameSync(oldPath, newPath)
    } catch (err) {
      throw new Error(`renameSync: ${err.message}`)
    }
  }

  rmdir ({ dirPath, recursive, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })

    // 将非boolean类型的入参转换为boolean类型
    if (!checkDataType(recursive, false, 'boolean')) {
      recursive = Boolean(recursive)
    }

    const res = checkPathExistence('rmdir', 'dirPath', dirPath)
    if (!res.isValid) {
      cb.fail(res.checkMsg)
      return
    }

    if (!fs.statSync(dirPath).isDirectory()) {
      cb.fail({ errMsg: `rmdir: fail no such directory, open: ${dirPath}` })
      return
    }

    // recursive为false时，判断该目录下是否有文件
    if (!recursive) {
      const filenames = fs.listFileSync(dirPath)
      if (filenames.length) {
        cb.fail({ errMsg: `rmdir: fail directory not empty` })
        return
      }
    }

    fs.rmdir(dirPath).then(() => {
      console.debug('[AdvanceAPI] rmdir succeed')
      cb.success({ errMsg: 'rmdir: ok' })
    }).catch((err) => {
      console.error(`[AdvanceAPI] rmdir failed with error message: ${err.message}, error code: ${err.code}`)
      cb.fail({ errMsg: 'rmdir: failed' })
    })
  }

  rmdirSync (dirPath, recursive) {
    // 将非boolean类型的入参转换为boolean类型
    if (!checkDataType(recursive, false, 'boolean')) {
      recursive = Boolean(recursive)
    }

    const res = checkPathExistenceSync('rmdirSync', 'dirPath', dirPath)
    if (!res.isValid) {
      throw new Error(res.errMsg)
    }

    // 判断路径是否存在，且不能是文件
    if (!fs.statSync(dirPath).isDirectory()) {
      throw new Error(`rmdirSync: fail no such directory, open: ${dirPath}`)
    }

    // recursive为false时 且该路径下仍有其他文件
    if (!recursive && (fs.listFileSync(dirPath).length > 0)) {
      throw new Error(`rmdirSync: fail directory not empty`)
    }

    try {
      fs.rmdirSync(dirPath)
    } catch (err) {
      throw new Error(`rmdirSync: ${err.message}`)
    }
  }

  truncate ({ filePath, length, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    const res = checkPathExistence('truncate', 'filePath', filePath)
    if (!res.isValid) {
      cb.fail(res.checkMsg)
      return
    }

    // 判断filePath是文件还是目录
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      cb.fail({ errMsg: `truncate: fail, illegal operation on a directory, open: ${filePath}` })
      return
    }

    if (!checkDataType(length, true, 'number') || length < 0) {
      length = DEFAULT_LENGTH // 非number类型 设为默认值DEFAULT_LENGTH ，DEFAULT_LENGTH=0
    }

    fs.truncate(filePath, length).then(() => {
      console.debug('[AdvancedAPI] truncate: success, the read length is: %d', length)
      cb.success({ errMsg: 'truncate: ok' })
    }).catch((err) => {
      console.error(`[AdvancedAPI] truncate: fail with error message: ${err.message}, error code: ${err.code}`)
      cb.fail({ errMsg: `truncate: failed with error message: ${err.message}, error code: ${err.code}` })
    })
  }

  truncateSync ({ filePath, length }) {
    const res = checkPathExistenceSync('truncateSync', 'filePath', filePath)
    if (!res.isValid) {
      throw new Error(res.errMsg)
    }

    if (fs.statSync(filePath).isDirectory()) {
      throw new Error(`truncateSync: fail, illegal operation on a directory, open: ${filePath}`)
    }

    if (!checkDataType(length, true, 'number') || length < 0) {
      length = DEFAULT_LENGTH // 非number类型 设为默认值DEFAULT_LENGTH ，DEFAULT_LENGTH=0
    }

    try {
      fs.truncateSync(filePath, length)
    } catch (err) {
      throw new Error(`truncateSync: ${err.message}`)
    }
  }

  /**
   * 获取文件信息
   * @param {string} filePath - 本地文件路径
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  getFileInfo ({ filePath, success, fail, complete }) {
    const cb = new FileCallback({ success, fail, complete })
    filePath = isSandboxPath(filePath) ? switchInternalToHapSandBox(filePath) : filePath
    if (!filePath || !checkDataType(filePath, true, 'string')) {
      cb.fail({ errMsg: 'getFileInfo:fail invalid filePath ' })
      return
    }
    if (!fs.accessSync(filePath)) {
      cb.fail({ errMsg: 'getFileInfo: fail no such file or directory : ' + filePath })
      return
    }
    const stat = fs.statSync(filePath)
    cb.success({ size: stat.size, errMsg: 'getFileInfo:ok ' })
    return
  }
}
