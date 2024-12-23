import { isString, isNumber } from '../../base/util/checkDataType'
import { colors } from '../../base/util/colors'
import { context } from '../../base/bridge/abilityBase'
import fs from '@ohos.file.fs'
import photoAccessHelper from '@ohos.file.photoAccessHelper'
import dataSharePredicates from '@ohos.data.dataSharePredicates'
import { MediaLibraryBase } from '../../base/bridge/mediaLibraryBase'

// 转换背景色为Hex argb
export function convertColorToHexARGB(color, opacity) {
  if (!isString(color)) {
    color = '#FFFFFF'
  }
  if (color.trim().match(/^[A-z]+$/) && colors[color]) {
    color = `rgb(${colors[color].join(',')})`
  }
  if (color === 'transparent') {
    return '#00000000'
  }

  if (!isNumber(opacity) || opacity < 0 || opacity > 1) {
    opacity = 1
  }

  if (color.startsWith('rgb')) {
    const arr = color.split(',')
    if (arr.length < 3) {
      return color
    }
    if (arr.length === 4) {
      const temp = arr.pop()
      arr.unshift(temp)
    } else {
      arr.unshift(String(opacity))
    }

    return arr.reduce((prev, current, index) => {
      let hex = current.replace(/[^\d\\.]/gi, '')
      hex = index === 0 ? parseInt(hex * 255) : parseInt(hex)
      hex = hex.toString(16).toUpperCase()
      if (hex.length === 1) {
        hex = `0${hex}`
      }
      return prev + hex
    }, '#')
  }

  if (color.startsWith('#')) {
    // #fff ----> #ffffff
    if (color.length === 4) {
      color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
    }
    if (color.length === 7) {
      const hex = color.slice(1)
      let opacityHex = parseInt(opacity * 255).toString(16).toUpperCase()
      if (opacityHex.length === 1) {
        opacityHex = `0${opacityHex}`
      }
      return `#${opacityHex}${hex}`
    }
  }

  return color
}

export function switchInternalToHapSandBox(path) {
  if (path.startsWith('internal://bundle/')) {
    return path.replace('internal://bundle', context.bundleCodeDir)
  }
  if (path.startsWith('internal://cache/')) {
    return path.replace('internal://cache', context.cacheDir)
  }
  if (path.startsWith('internal://files/')) {
    return path.replace('internal://files', context.filesDir)
  }
  if (path.startsWith('internal://preferences/')) {
    return path.replace('internal://preferences', context.preferencesDir)
  }
  if (path.startsWith('internal://temp/')) {
    return path.replace('internal://temp', context.tempDir)
  }
  if (path.startsWith('internal://database/')) {
    return path.replace('internal://database', context.databaseDir)
  }
  if (path.startsWith('internal://distributedFiles/')) {
    return path.replace('internal://distributedFiles', context.distributedFilesDir)
  }
  return path
}
export function switchHapSandBoxToInternal(path) {
  if (path.startsWith(context.bundleCodeDir)) {
    return path.replace(context.bundleCodeDir, 'internal://bundle')
  }
  if (path.startsWith(context.cacheDir)) {
    return path.replace(context.cacheDir, 'internal://cache')
  }
  if (path.startsWith(context.filesDir)) {
    return path.replace(context.filesDir, 'internal://files')
  }
  if (path.startsWith(context.preferencesDir)) {
    return path.replace(context.preferencesDir, 'internal://preferences')
  }
  if (path.startsWith(context.tempDir)) {
    return path.replace(context.tempDir, 'internal://temp')
  }
  if (path.startsWith(context.databaseDir)) {
    return path.replace(context.databaseDir, 'internal://database')
  }
  if (path.startsWith(context.distributedFilesDir)) {
    return path.replace(context.distributedFilesDir, 'internal://distributedFiles')
  }
  return path
}
export function isFileUri(path) {
  return path && typeof (path) === 'string' && (path.startsWith('file://') || path.startsWith('datashare://'))
}

export function isSandboxPath(path) {
  return path && typeof (path) === 'string' && (path.startsWith('/data/storage/') || path.startsWith('internal://'))
}
export function getFdFromUriOrSandBoxPath(uri) {
  try {
    const file = fs.openSync(uri, fs.OpenMode.READ_ONLY)
    return file.fd
  } catch (error) {
    console.info(`[AdvancedAPI] Can not get file from uri: ${uri} `)
  }
  throw new Error('file is not exist')
}

export async function getFileAssetFromUri(uri) {
  try {
    const permission = await MediaLibraryBase.getPermissions()
    if (permission.perNum === -1) {
      console.debug(`[AdvancedAPI] permission fail`)
    }
    const phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context)
    const predicates = new dataSharePredicates.DataSharePredicates()
    console.debug(`[AdvancedAPI] getFileAssetFromUri uri: ${uri} `)
    predicates.equalTo(photoAccessHelper.PhotoKeys.URI, uri.toString())
    const fetchOption = {
      fetchColumns: [
        photoAccessHelper.PhotoKeys.URI,
        photoAccessHelper.PhotoKeys.PHOTO_TYPE,
        photoAccessHelper.PhotoKeys.SIZE,
        photoAccessHelper.PhotoKeys.DURATION,
        photoAccessHelper.PhotoKeys.WIDTH,
        photoAccessHelper.PhotoKeys.HEIGHT,
        photoAccessHelper.PhotoKeys.TITLE,
        photoAccessHelper.PhotoKeys.ORIENTATION,
      ],
      predicates: predicates
    }
    const fetchResult = await phAccessHelper.getAssets(fetchOption)
    console.debug(`[AdvancedAPI] getFileAssetFromUri fetchResult: ${JSON.stringify(fetchResult)} `)
    const asset = await fetchResult.getFirstObject()
    console.debug(`[AdvancedAPI] getFileAssetFromUri asset: ${JSON.stringify(asset)} `)
    fetchResult.close()
    return asset
  } catch (err) {
    console.debug(`[AdvancedAPI] getAsset is fail!,${err}`)
  }
}

export function pathToCache(path) {
  try {
    const srcDirUriLocal = switchInternalToHapSandBox(path)
    const fileName = srcDirUriLocal.slice(srcDirUriLocal.lastIndexOf('/'))
    const dstDirUriLocal = context.cacheDir + fileName
    fs.copyFile(srcDirUriLocal, dstDirUriLocal, (err) => {
      if (err) {
        console.info(`[AdvancedAPI] Failed to copy: ${JSON.stringify(err)}`)
        return
      }
    })
    return switchHapSandBoxToInternal(dstDirUriLocal)
  } catch (err) {
    console.error(`[AdvancedAPI] to copy: ${JSON.stringify(err)}`)
  }
}

export async function saveMedia(photoType, displayName, uri, buffer) {
  try {
    const phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context)
    const mediaType = displayName.split('.').pop().toString()
    const mediaName = displayName.split('.').shift().toString()
    const photoCreationConfig = [
      {
        title: mediaName.toString(),
        fileNameExtension: mediaType.toString(),
        photoType: photoType,
      }
    ]
    const srcFileUris = [uri.toString()]
    const phUris = await phAccessHelper.showAssetsCreationDialog(srcFileUris, photoCreationConfig)
    const phUri = phUris[0]
    const file = fs.openSync(phUri, fs.OpenMode.READ_WRITE)
    await fs.write(file.fd, buffer)
    fs.closeSync(file)
    return phUri
  } catch (err) {
    console.error(`[AdvancedAPI] saveMedia is fail!: ${JSON.stringify(err)}`)
  }
}
