import {
  getFileAssetFromUri,
  isFileUri,
  isSandboxPath,
  getFdFromUriOrSandBoxPath,
  switchInternalToHapSandBox,
  saveMedia
} from '../../util/index'
import fs from '@ohos.file.fs'
import { ErrorCode } from '../../../base/util/ErrorCode'
// import { MediaLibraryBase } from '../../../base/bridge/mediaLibraryBase'
import { FileioBase } from '../../../base/bridge/fileioBase'
import photoAccessHelper from '@ohos.file.photoAccessHelper'
// import { context } from '../../../base/bridge/abilityBase'
import fileUri from '@ohos.file.fileuri'

// const ORI = {
//   0: 'left',
//   90: 'up',
//   180: 'right',
//   270: 'down',
// }

export default class ASViedo {
  getVideoInfo(params) {
    return new Promise(async (resolve, reject) => {
      return reject(['getVideoInfo is not support!'])
      // const permission = await MediaLibraryBase.getPermissions()
      // if (permission.perNum === -1) {
      //   return reject(['permission fail', ErrorCode.USER_REJECT, permission.perNum, permission.dialogShownResults])
      // }
      // try {
      //   let uri = params.src
      //   if (isFileUri(uri)) {
      //     const asset = await getFileAssetFromUri(uri)
      //     const orientation = ORI[asset.orientation]
      //     return resolve({
      //       width: asset.width,
      //       height: asset.height,
      //       path: uri,
      //       orientation,
      //       type: asset.displayName.split('.').pop(),
      //       duration: asset.duration / 1000,
      //       size: Math.round(asset.size / 1024),
      //       bitrate: Math.round((asset.size * 8 * 1000) / (asset.duration * 1024)),
      //     })
      //   } else if (isSandboxPath(uri)) {
      //     uri = switchInternalToHapSandBox(uri)
      //     const fileType = uri.split('.').pop()
      //     const fileName = uri.split('/').pop()
      //     if (!fs.accessSync(uri)) {
      //       reject(['getVideoInfo fail, src not exist.', ErrorCode.PARAMETER_ERROR])
      //       return
      //     }
      //     const file = fs.openSync(uri, fs.OpenMode.READ_WRITE)
      //     if (!file) {
      //       reject(['saveVideoToPhotosAlbum fail, src not exist.', ErrorCode.PARAMETER_ERROR])
      //       return
      //     }
      //     // await new Promise(res => setTimeout(res, 500))
      //     // const fileResult = await media.getFileAssets(videosfetchOp)
      //     // const asset = await fileResult.getFirstObject()
      //     const fd = file.fd
      //     const stat = fs.statSync(fd)
      //     const sizes = stat.size
      //     const buf = new ArrayBuffer(sizes)
      //     FileioBase.ohosReadSync(fd, buf)
      //     const videoUri = await saveMedia(fileName, buf)
      //     // const media = MediaLibraryBase.getMedia()
      //     const asset = await getFileAssetFromUri(videoUri)
      //     const width = Number(asset.get(photoAccessHelper.PhotoKeys.WIDTH))
      //     const height = Number(asset.get(photoAccessHelper.PhotoKeys.HEIGHT))
      //     const orientation = ORI[asset.get(photoAccessHelper.PhotoKeys.ORIENTATION)]
      //     const duration = Number(asset.get(photoAccessHelper.PhotoKeys.DURATION)) / 1000
      //     const size = Math.round(Number(asset.get(photoAccessHelper.PhotoKeys.SIZE)) / 1024)
      //     const bitrate = Math.round((Number(asset.get(photoAccessHelper.PhotoKeys.SIZE)) * 8 * 1000) / (Number(asset.get(photoAccessHelper.PhotoKeys.DURATION)) * 1024))
      //     const result = {
      //       width,
      //       height,
      //       path: params.src,
      //       orientation,
      //       type: fileType,
      //       duration,
      //       size,
      //       bitrate,
      //     }
      //     try {
      //       await asset.trash(true)
      //       await photoAccessHelper.MediaAssetChangeRequest.deleteAssets(context, [asset.uri])
      //     } catch (error) {
      //       console.debug('[AdvancedAPI] delete tempFile fail: %s', error.message)
      //     }
      //     // fileResult.close()
      //     return resolve(result)
      //   } else {
      //     return reject(['get uri fail', ErrorCode.SERVICE_UNAVIALABLE])
      //   }
      // } catch (err) {
      //   console.debug(`[AdvancedAPI] getVideoInfo err %s`, JSON.stringify(err))
      //   reject([err.message, err.code])
      // }
    })
  }

  saveVideoToPhotosAlbum(params) {
    return new Promise(async (resolve, reject) => {
      const filePath = params.filePath
      // const permission = await MediaLibraryBase.getPermissions()
      // if (permission.perNum === -1) {
      //   return reject(['permission fail', ErrorCode.USER_REJECT, permission.perNum, permission.dialogShownResults])
      // }
      if (typeof filePath !== 'string') {
        return reject(['filePath format is not supported.', ErrorCode.PARAMETER_ERROR])
      }
      console.debug('[AdvancedAPI] filePath:', filePath)
      if (isFileUri(filePath)) {
        const uri = filePath
        const fd = getFdFromUriOrSandBoxPath(uri)
        const stat = fs.statSync(fd)
        const size = stat.size
        const buf = new ArrayBuffer(size)
        FileioBase.ohosReadSync(fd, buf)
        const fileAsset = await getFileAssetFromUri(uri)
        const displayName = 'VIDEO_' + new Date().getTime() + '_' + fileAsset.displayName
        // uri = fileUri.getUriFromPath(uri)
        const imageUri = await saveMedia(photoAccessHelper.PhotoType.VIDEO, displayName, uri, buf)
        resolve({ path: imageUri })
        return
      } else if (isSandboxPath(filePath)) {
        let uri = filePath
        if (uri.startsWith('internal://')) {
          uri = switchInternalToHapSandBox(uri)
        }
        if (!fs.accessSync(uri)) {
          reject(['saveVideoToPhotosAlbum fail, src not exist.', ErrorCode.PARAMETER_ERROR])
          return
        }
        const file = fs.openSync(uri, fs.OpenMode.READ_ONLY)
        if (!file) {
          reject(['saveVideoToPhotosAlbum fail, src not exist.', ErrorCode.PARAMETER_ERROR])
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
        const displayName = 'VIDEO_' + new Date().getTime() + '_' + filePath.split('/').splice(-1, 1).toString()
        uri = fileUri.getUriFromPath(uri)
        const imageUri = await saveMedia(photoAccessHelper.PhotoType.VIDEO, displayName, uri, buf)
        resolve({ path: imageUri })
        return
      }
      reject(['filePath format is not supported.', ErrorCode.PARAMETER_ERROR])
    })
  }
}
