import fs from '@ohos.file.fs'
import { checkDataType } from '../../../base/util/checkDataType'

const openMode = fs.OpenMode
const ERROR = {
  PARAMETER_ERROR: 1001
}

export const modeReflect = {
  'ax': 'a',
  'ax+': 'a+',
  'wx': 'w',
  'wx+': 'w+'
}

const ENCODING = [
  'utf8',
  'utf-8',
  'ascii',
  'base64',
  'binary',
  'hex',
  'ucs2',
  'ucs-2',
  'utf16le',
  'utf-16le',
  'latin1',
]

export function getOpenMode (flag) {
  let mode
  switch (flag) {
    case 'a':
      mode = openMode.CREATE | openMode.APPEND
      break
    case 'a+':
      mode = openMode.CREATE | openMode.READ_WRITE | openMode.APPEND
      break
    case 'as':
      mode = openMode.SYNC | openMode.CREATE | openMode.APPEND
      break
    case 'as+':
      mode = openMode.SYNC | openMode.CREATE | openMode.READ_WRITE | openMode.APPEND
      break
    case 'r':
      mode = openMode.READ_ONLY
      break
    case 'r+':
      mode = openMode.READ_WRITE
      break
    case 'w':
      mode = openMode.CREATE | openMode.WRITE_ONLY | openMode.TRUNC
      break
    case 'w+':
      mode = openMode.CREATE | openMode.READ_WRIT | openMode.TRUNC
      break
  }
  return mode
}

// 获取文件的类型码并返回
export function getFileTypeMode (stat) {
  if (stat.isBlockDevice()) {
    return 0o060000
  }
  if (stat.isCharacterDevice()) {
    return 0o020000
  }
  if (stat.isDirectory()) {
    return 0o040000
  }
  if (stat.isFIFO()) {
    return 0o010000
  }
  if (stat.isFile()) {
    return 0o100000
  }
  if (stat.isSocket()) {
    return 0o140000
  }
  if (stat.isSymbolicLink()) {
    return 0o120000
  }
}

// 递归创建目录
export function mkdirRecursive (path, dirNames) {
  const curDirName = dirNames.shift()
  if (!path && !curDirName) {
    path = ''
  } else {
    path = path + '/' + curDirName
  }
  if (!curDirName) {
    if (dirNames.length > 0) {
      mkdirRecursive(path, dirNames)
    }
    return
  }

  // 如果目录存在
  if (fs.accessSync(path)) {
    if (dirNames.length > 0) {
      mkdirRecursive(path, dirNames)
    }
  } else {
    // 目录不存在
    fs.mkdirSync(path)
    if (dirNames.length > 0) {
      mkdirRecursive(path, dirNames)
    }
  }
}

export function ohosMkdir (dirPath, cb) {
  fs.mkdir(dirPath)
    .then(() => {
      cb.success({ errMsg: 'mkdir: ok' })
    })
    .catch((err) => {
      cb.fail({
        errMsg: `mkdir: failed with error message: ${err.message}, error code: ${err.code}`
      })
    })
}

// 获取目录路径
export function obtainUpperPath (inputPath) {
  const index = inputPath.lastIndexOf('/')
  const upperPath = inputPath.substring(0, index)
  return { index, upperPath }
}

export function obtainFileName (inputPath) {
  const index = inputPath.lastIndexOf('/')
  let fileName = inputPath.substring(index)

  // 处理' ../test.txt/ '的情况
  if (inputPath.endsWith('/')) {
    fileName = inputPath.substring(inputPath.lastIndexOf('/', inputPath.length - 2) + 1, inputPath.length - 1)
  }

  return { index, fileName }
}

export function checkFd (methodName, fd) {
  let checkMsg = {}
  const isValid = false
  if (!checkDataType(fd, true, 'string')) {
    checkMsg = {
      errno: ERROR.PARAMETER_ERROR,
      errMsg: `${methodName}: fail, invalid fd`
    }
    return { checkMsg, isValid }
  }

  const transFdToNum = Number(fd)
  if (fd === '' || isNaN(transFdToNum)) {
    checkMsg = { errMsg: `${methodName}: fail, invalid fd` }
    return { checkMsg, isValid }
  }
  return { isValid: true, fd: transFdToNum }
}

export function checkFdSync (methodName, fd) {
  const isValid = false
  if (!checkDataType(fd, true, 'string')) {
    return {
      errMsg: `${methodName}: fail invalid fd`,
      isValid
    }
  }

  const transFdToNum = Number(fd)
  if (fd === '' || isNaN(transFdToNum)) {
    return {
      errMsg: `${methodName}: fail invalid fd`,
      isValid
    }
  }

  return { isValid: true, fd: transFdToNum }
}

export function checkEncoding (methodName, encoding) {
  if (!encoding) {
    return { isValid: true }
  }
  const isValid = false
  if (!checkDataType(encoding, false, 'string')) {
    const checkMsg = `${methodName}:fail invalid encoding: ${encoding}`
    return { checkMsg, isValid }
  }
  if (!ENCODING.includes(encoding)) {
    const checkMsg = `${methodName}:fail Unknown encoding: ${encoding}`
    return { checkMsg, isValid }
  }
  return { isValid: true }
}

// 检验路径的合法性：string 和 空串
export function checkPath (methodName, pathName, path) {
  let checkMsg = {}
  const isValid = false
  if (!checkDataType(path, true, 'string')) {
    checkMsg = {
      errno: ERROR.PARAMETER_ERROR,
      errMsg: `${methodName}: fail, ${pathName} should be String instead of: ${typeof path}`
    }
    return { checkMsg, isValid }
  }

  if (path === '') {
    // eslint-disable-next-line no-useless-escape
    checkMsg = { errMsg: `${methodName}: fail permission denied, open:\'\'` }
    return { checkMsg, isValid }
  }

  // 校验通过
  return { isValid: true }
}

// 检验路径的合法性：string 、空串 、必须存在
export function checkPathExistence (methodName, pathName, path) {
  let checkMsg = {}
  const isValid = false
  if (!checkDataType(path, true, 'string')) {
    checkMsg = {
      errno: ERROR.PARAMETER_ERROR,
      errMsg: `${methodName}: fail, ${pathName} should be String instead of: ${typeof path}`
    }
    return { checkMsg, isValid }
  }

  if (path === '') {
    // eslint-disable-next-line no-useless-escape
    checkMsg = { errMsg: `${methodName}: fail permission denied, open:\'\'` }
    return { checkMsg, isValid }
  }

  // 判断srcPath路径是否存在
  if (!fs.accessSync(path)) {
    checkMsg = { errMsg: `${methodName}: fail no such file or directory, open: ${path}` }
    return { checkMsg, isValid }
  }
  // 校验通过
  return { isValid: true }
}

export function checkPathSync (methodName, pathName, path) {
  const isValid = false
  if (path === '' || !checkDataType(path, true, 'string')) {
    return {
      errMsg: `${methodName}: failed, ${pathName} should be a non-empty string`,
      isValid
    }
  }

  return { isValid: true }
}

export function checkPathExistenceSync (methodName, pathName, path) {
  const isValid = false
  if (path === '' || !checkDataType(path, true, 'string')) {
    return {
      errMsg: `${methodName}: failed, ${pathName} should be a non-empty string`,
      isValid
    }
  }

  // 判断Path是否存在
  if (!fs.accessSync(path)) {
    return {
      errMsg: `${methodName}: fail no such file or directory: ${path}`,
      isValid
    }
  }

  return { isValid: true }
}
