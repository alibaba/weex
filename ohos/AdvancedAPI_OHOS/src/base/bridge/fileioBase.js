import fs from '@ohos.file.fs'
import fileuri from '@ohos.file.fileuri'
export class FileioBase {
  static ohosOpendirSync(path) {
    return new OhosOpendir(path)
  }

  // 同步读取文件
  static ohosReadSync(fd, buf) {
    return fs.readSync(fd, buf)
  }
  static ohosUnlinkSync(path) {
    return fs.unlinkSync(path)
  }
  static ohosCopy (src, dest, mode = 0) {
    return fs.copyFile(src, dest, mode)
  }
  static ohosMkdirSync(path, mode = 0o775) {
    return fs.mkdirSync(path)
  }
  static ohosReadTextSync(filePath, options) {
    return fs.readTextSync(filePath, options)
  }

  // 同步获取文件资源信息
  static ohosStatSync(path) {
    return fs.statSync(path)
  }

  // 同步打开文件获取描述符
  static ohosOpenSync(path, flags, mode = 0o666) {
    if (path && typeof (path) === 'string' && path.startsWith('/data/storage/')) {
      path = fileuri.getUriFromPath(path)
    }
    return fs.openSync(path, flags)
  }

  // 同步写入文件
  static ohosWriteSync(fd, buffer, options = {}) {
    return fs.writeSync(fd, buffer, options)
  }

  static ohosAccessSync(path, mode = 0) {
    return fs.accessSync(path)
  }
}
class OhosOpendir {
  constructor(path) {
    this.dir = fs.listFileSync(path)
  }

  ohosReadsync() {
    return this.dir
  }
}

