import { ErrorCode } from '../../../base/util/ErrorCode'
import { FileioBase } from '../../../base/bridge/fileioBase'
import { MediaLibraryBase } from '../../../base/bridge/mediaLibraryBase'
import { WantConstantBase } from '../../../base/bridge/wantConstantBase'
import { context } from '../../../base/bridge/abilityBase'
import {
  isFileUri,
  getFdFromUriOrSandBoxPath,
  getFileAssetFromUri,
  isSandboxPath,
  switchInternalToHapSandBox,
  saveMedia,
} from '../../util/index'
import bundleManager from '@ohos.bundle.bundleManager'
import image from '@ohos.multimedia.image'
import { Base64 } from 'js-base64'
import picker from '@ohos.file.picker'
import fs from '@ohos.file.fs'
import photoAccessHelper from '@ohos.file.photoAccessHelper'
import fileUri from '@ohos.file.fileuri'

// 启动图库模式
// eslint-disable-next-line no-unused-vars
const PHOTO = {
  SINGLE: 'singleselect',
  MULTIPLE: 'multipleselect',
  PREVIEW: 'photodetail',
}

// eslint-disable-next-line no-unused-vars
const ORI = {
  0: 'up',
  90: 'right',
  180: 'down',
  270: 'left',
}

// eslint-disable-next-line no-unused-vars
const MEDIATYPE = ['FILE', 'IMAGE', 'VIDEO', 'AUDIO']
export default class ASImage {
  chooseImage(params) {
    if (!params) {
      params = {}
    }
    return new Promise(async (resolve, reject) => {
      const permission = await MediaLibraryBase.getPermissions()
      if (permission.perNum === -1) {
        return reject(['permission fail', ErrorCode.USER_REJECT, permission.perNum, permission.dialogShownResults])
      }
      if (params.count && typeof (params.count) !== 'number') {
        return reject(['chooseImage:fail parameter `count`. Expected Number with value NaN, ' +
          'got String with value "' + params.count + '".', ErrorCode.PARAMETER_ERROR])
      }
      if (params.count < 1) {
        params.count = 9
      }
      let uris = []
      if (params.sourceType && params.sourceType.length === 1 && params.sourceType.includes('camera')) {
        // 单独指定使用相机
        const info = await bundleManager.getBundleInfoForSelf(bundleManager.BundleFlag.GET_BUNDLE_INFO_DEFAULT)
        const data = await context.startAbilityForResult({
          action: WantConstantBase.getAction('ACTION_IMAGE_CAPTURE'),
          parameters: {
            uri: 'capture',
            callBundleName: info.name,
          },
        })
        if (data.resultCode === 0) {
          uris = [data.want.parameters.resourceUri]
          if (!data.want.parameters.resourceUri) {
            return
          }
        } else {
          return reject(['Failed to pull up camera app', ErrorCode.SERVICE_UNAVIALABLE])
        }
      } else {
        // 拉去图库应用
        const PhotoSelectOptions = new picker.PhotoSelectOptions()
        PhotoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE
        PhotoSelectOptions.maxSelectNumber = params.count
        const photoPicker = new picker.PhotoViewPicker()
        const photoSelectResult = await photoPicker.select(PhotoSelectOptions)
        uris = photoSelectResult.photoUris
      }

      if (!uris) {
        return reject(['get uri fail', ErrorCode.SERVICE_UNAVIALABLE])
      } else if (uris === 'cancel') {
        // 取消时不触发success和fail
        return
      }

      const tempFilePaths = []
      const tempFiles = []
      for (let i = 0; i < uris.length; i++) {
        let compress
        if (params.sizeType && params.sizeType.length === 1 && params.sizeType.includes('compressed')) {
          compress = await this.compressImage({ src: uris[i] })
          if (compress.tempFilePath) {
            tempFilePaths.push(compress.tempFilePath)
            tempFiles.push({
              path: compress.tempFilePath,
              size: compress.tempSize,
              name: compress.tempName,
              type: compress.tempFilePath.split('.').pop(),
            })
          }
        } else {
          const asset = await getFileAssetFromUri(uris[i])
          tempFilePaths.push(uris[i])
          tempFiles.push({
            path: uris[i],
            size: asset.size,
            name: asset.displayName,
            type: asset.displayName.split('.').pop(),
          })
        }
      }
      return resolve({
        tempFilePaths, tempFiles,
      })
    })
  }

  getImageInfo(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const ORI = {
          0: 'up',
          90: 'right',
          180: 'down',
          270: 'left',
        }
        const uri = params.src
        if (isFileUri(uri)) {
          const asset = await getFileAssetFromUri(uri)
          const orientation = ORI[asset.orientation]
          return resolve({
            width: asset.width,
            height: asset.height,
            path: uri,
            orientation,
            type: asset.displayName.split('.').pop(),
          })
        } else if (isSandboxPath(uri)) {
          const imageSourceApi = image.createImageSource(switchInternalToHapSandBox(uri))
          const orientation = 'up'
          const type = uri.split('.').pop()
          const imageInfo = await imageSourceApi.getImageInfo()
          return resolve({
            width: imageInfo.size.width,
            height: imageInfo.size.height,
            path: params.src,
            orientation,
            type,
          })
        } else {
          return reject(['get uri fail', ErrorCode.SERVICE_UNAVIALABLE])
        }
      } catch (err) {
        return reject(['get uri fail', ErrorCode.SERVICE_UNAVIALABLE])
      }
    })
  }

  saveImageToPhotosAlbum(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const filePath = params.filePath
        if (typeof filePath !== 'string') {
          return reject(['filePath format is not supported.', ErrorCode.PARAMETER_ERROR])
        }
        if (isFileUri(filePath)) {
          const uri = filePath
          const fd = getFdFromUriOrSandBoxPath(uri)
          const stat = fs.statSync(fd)
          const size = stat.size
          const buf = new ArrayBuffer(size)
          FileioBase.ohosReadSync(fd, buf)
          const fileAsset = await getFileAssetFromUri(uri)
          const displayName = 'IMAGE_' + new Date().getTime() + '_' + fileAsset.displayName
          // uri = fileUri.getUriFromPath(uri)
          const imageUri = await saveMedia(photoAccessHelper.PhotoType.IMAGE, displayName, uri, buf)
          resolve({ path: imageUri })
          return
        } else if (isSandboxPath(filePath)) {
          let uri = filePath
          // 对于internal开头的路径，需要转换
          if (uri.startsWith('internal://')) {
            uri = switchInternalToHapSandBox(filePath)
          }
          if (!fs.accessSync(uri)) {
            reject(['saveImageToPhotosAlbum fail, src not exist.', ErrorCode.PARAMETER_ERROR])
            return
          }
          const file = fs.openSync(uri, fs.OpenMode.READ_ONLY)
          if (!file) {
            reject(['saveImageToPhotosAlbum fail, src not exist.', ErrorCode.PARAMETER_ERROR])
            return
          }
          const fd = file.fd
          // 根据文件大小定义空arrayBuffer用来写入文件
          const stat = fs.statSync(uri)
          const size = stat.size
          const buf = new ArrayBuffer(size)
          // 读取传入文件信息到缓冲区
          FileioBase.ohosReadSync(fd, buf)
          // 获取文件显示名
          let displayName = 'IMAGE_' + new Date().getTime() + '_' + uri.split('/').splice(-1, 1).toString()
          // 对于internal这种有可能结尾不带.jpg的情况，需要加上.jpg
          if (!displayName.includes('.')) {
            displayName += '.jpg'
          }
          // 获取file://应用沙箱路径
          uri = fileUri.getUriFromPath(uri)
          const imageUri = await saveMedia(photoAccessHelper.PhotoType.IMAGE, displayName, uri, buf)
          resolve({ path: imageUri })
          return
        } else if (filePath.startsWith('data:image/')) {
          const base64Array = filePath.split(';')
          if (base64Array.length === 2 && base64Array[1].startsWith('base64')) {
            const imageType = base64Array[0].replace('data:image/', '')
            const imageData = Base64.atob(filePath.split(',')[1])
            const displayName = 'IMAGE_' + new Date().getTime() + '.' + imageType
            const arrayBuffer = new ArrayBuffer(imageData.length)
            const ia = new Uint8Array(arrayBuffer)
            for (let i = 0; i < imageData.length; i++) {
              ia[i] = imageData.charCodeAt(i)
            }
            // 获取file://应用沙箱路径
            const uri = fileUri.getUriFromPath(filePath)
            const imageUri = await saveMedia(photoAccessHelper.PhotoType.IMAGE, displayName, uri, ia.buffer)
            resolve({ path: imageUri })
            return
          }
        }
        reject(['filePath format is not supported.', ErrorCode.PARAMETER_ERROR])
      } catch (error) {
        console.error(`[AdvancedAPI] saveImageToPhotosAlbum is fail!errMsg:${JSON.stringify(error)}`)
      }
    })
  }

  /**
   * 图片压缩 现在支持两种路径，沙箱路径或者公共文件URI，输出的是沙箱路径的临时文件目录
   * @param params
   * @returns {Promise<unknown>}
   */
  compressImage(params) {
    return new Promise(async (resolve, reject) => {
      const src = switchInternalToHapSandBox(params.src)
      const fileName = src.split('/').pop() || ''
      const suffix = fileName.indexOf('.') >= 0 ? (params.src.toLowerCase().split('.').pop() || 'jpg') : 'jpg'
      let quality = params.quality || 80
      const permission = await MediaLibraryBase.getPermissions()
      if (permission.perNum === -1) {
        return reject(['permission fail', ErrorCode.USER_REJECT, permission.perNum, permission.dialogShownResults])
      }
      if (quality && typeof (quality) !== 'number') {
        return reject(['compressImage fail, input parameter quality is illegal.', ErrorCode.PARAMETER_ERROR])
      }
      if (quality > 100 || quality < 0) {
        quality = 80
      }
      try {
        let fd
        const supportTypes = ['jpg', 'png', 'webp', 'jpeg']
        if (isSandboxPath(src)) {
          if (!fs.accessSync(src)) {
            reject(['compressImage fail, src not exist.', ErrorCode.PARAMETER_ERROR])
            return
          }
          const file = fs.openSync(src, fs.OpenMode.READ_ONLY)
          if (!file) {
            reject(['compressImage fail, src not exist.', ErrorCode.PARAMETER_ERROR])
            return
          }
          fd = file.fd
        } else if (isFileUri(src)) {
          fd = getFdFromUriOrSandBoxPath(src)
        }
        if (supportTypes.includes(suffix)) {
          const arrayBuf = await this.getArrayBuffer(quality, fd, suffix, params.compressHeight, params.compressedWidth)
          const dirName = new Date().getTime()
          const jpgName = 'IMAGE_' + dirName
          const tmpPath = context.tempDir + '/' + dirName + '/' + jpgName + '.' + `${params.src.toLowerCase().split('.').pop()}`
          let size
          try {
            await fs.mkdir(context.tempDir + '/' + dirName)
            fs.openSync(tmpPath, fs.OpenMode.CREATE)
            const fileOpen = fs.openSync(tmpPath, fs.OpenMode.READ_WRITE)
            FileioBase.ohosWriteSync(fileOpen.fd, arrayBuf)
            // 获取临时文件的大小
            const tempFile = fs.openSync(tmpPath, fs.OpenMode.READ_ONLY)
            const stat = fs.statSync(tempFile.fd)
            size = stat.size
            fs.closeSync(fileOpen)
          } catch (error) {
            console.info(`${JSON.stringify(error)}`)
          }
          resolve({
            tempFilePath: tmpPath,
            tempSize: size,
            tempName: jpgName,
          })
        }
      } catch (error) {
        reject(['compressImage fail, src not exist.', ErrorCode.PARAMETER_ERROR])
      }
    })
  }

  getArrayBuffer = async (quality, fd, suffix, height, width) => {
    if (height !== undefined || width !== undefined) {
      const widthSize = width || height || 0
      const imageSourceApi = image.createImageSource(fd)
      const imagePackerApi = image.createImagePacker()
      const imageInfo = await imageSourceApi.getImageInfo()
      const rate = imageInfo.size.width / width
      const pixelMap = await imageSourceApi.createPixelMap({
        desiredSize: {
          width: widthSize,
          // height: heightSize
          height: imageInfo.size.height / rate // width和height必须同时存在，只有width时，compressedWidth和compressHeight不奏效
        }
      })
      const packOpts = { format: `image/jpeg`, quality }
      const arrayBuf = await imagePackerApi.packing(pixelMap, packOpts)
      return arrayBuf
    } else {
      const imageSourceApi = image.createImageSource(fd) // 创建图片源实例
      const imagePackerApi = image.createImagePacker() // 创建ImagePacker实例
      const packOpts = { format: `image/jpeg`, quality } // format目标格式
      const imageInfo = await imageSourceApi.getImageInfo()
      const pixelMap = await imageSourceApi.createPixelMap({
        desiredSize: {
          width: imageInfo.size.width,
          height: imageInfo.size.height
        }
      })
      const arrayBuf = await imagePackerApi.packing(pixelMap, packOpts)
      return arrayBuf
    }
  }
}
