import { context } from './abilityBase'
import abilityAccessCtrl from '@ohos.abilityAccessCtrl'
import photoAccessHelper from '@ohos.file.photoAccessHelper'

export class MediaLibraryBase {
  static getPermissions() {
    try {
      // 权限列表
      const arrMdl = [
        'ohos.permission.SHORT_TERM_WRITE_IMAGEVIDEO'
      ]
      const atManager = abilityAccessCtrl.createAtManager()
      return new Promise(resolve => {
        atManager.requestPermissionsFromUser(context, arrMdl).then(per => {
          const perNum = per.authResults[0]
          const dialogShownResults = per.dialogShownResults[0]
          resolve({ perNum, dialogShownResults })
        })
      })
    } catch (error) {
      console.error('[AdvancedAPI] getPermissions is fail!', JSON.stringify(error))
    }
  }
  // 获取媒体类型枚举值
  static getMediaType(type) {
    return photoAccessHelper.PhotoType[type]
  }

  // 获取检索列名枚举值
  static getFileKey() {
    return photoAccessHelper.PhotoKeys
  }

  // 获取媒体库实例用来访问文件的一系列操作
  static getMedia() {
    return photoAccessHelper.getPhotoAccessHelper(context)
  }

  // 创建媒体资源
  static async createAsset(media, mediaType, displayName) {
    // eslint-disable-next-line camelcase
    const media_type = displayName.split('.').pop().toString()
    // eslint-disable-next-line camelcase
    const media_name = displayName.split('.').shift().toString()
    const options = {
      title: media_name
    }
    const uri = await media.createAsset(mediaType, media_type, options)
    return uri// Promise
  }

  // 关闭媒体库资源文件
  static closeAsset(asset, fd) {
    return new Promise(resolve => {
      asset.close(fd, (closeErr) => {
        if (closeErr !== undefined) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  // 获取创建文件的描述符
  static getFd(asset) {
    return new Promise(resolve => {
      asset.open('rw')
        .then((fd) => {
          resolve(fd)
        })
        .catch(() => {
          resolve(false)
        })
    })
  }
}
