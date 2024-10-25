/*
 * Copyright (C) 2024. Huawei Device Co., Ltd. All rights reserved.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the Apache-2.0 license.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache-2.0 license for more details.
 */

import fs from '@ohos.file.fs';
import util from '@ohos.util';
import { as } from 'advancedApi';
import { StatusCode } from 'webSceneAPI';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';
import dataSharePredicates from '@ohos.data.dataSharePredicates';
import photoAccessHelper from '@ohos.file.photoAccessHelper';
import common from '@ohos.app.ability.common';
import { GlobalThis } from '../../utils/GlobalThis';
import { FileUtils } from '../../utils/FileUtils';
import image from '@ohos.multimedia.image'
import cameraPicker from '@ohos.multimedia.cameraPicker';
import camera from '@ohos.multimedia.camera';
import { BusinessError } from '@ohos.base';

const IMAGE_API = 'imageApi'

export enum PHOTO_TYPE {
  IMAGE,
}

interface ChooseImageOptions {
  count: number;
  sourceType: Array<string>;
  sizeType: Array<string>;
  success: Function;
  fail: Function;
  complete: Function;
}

interface IMediaData {
  originPath: string;
  type: string;
  originSize: number;
  duration?: number;
  width?: number;
  height?: number;
}

interface ChooseMediaResults {
  tempFilePaths?: string[];
  tempFiles?: MediaFile[];
  type?: string;
  isFail: boolean;
  errMsg: string;
}

interface MediaFile {
  tempFilePath: string;
  size: number;
  fileType: string;
  thumbTempFilePath?: string;
}

export interface CompressResult {
  tempFilePath?: string;
  tempFileSize?: number;
  tempFileName?: string;
}

export interface CompressOptions {
  src: string;
  quality?: number;
  compressedWidth?: number;
  compressHeight?: number;
}

interface chooseCameraBack {
  options: ChooseImageOptions;
  isFail: boolean;
}

export class ImageAPI {
  getPhoto(options: ApiOptions) {
    const args = options.args;
    const completeCb = options.completeCb;
    const name = 'chooseImage'
    let imageInParams: ImageInParams = new ImageInParams();
    imageInParams = JSON.parse(args);

    let chooseImageCompleteCallback = (data: WeexDataResult) => {
      console.info('WANG chooseImageCompleteCallback data:' + JSON.stringify(data));
      if (data.errCode === 0) {
        let imagePaths: Array<string> | undefined = data.tempFilePaths;
        if (imagePaths === undefined) {
          return;
        }
        let base64Data: Array<string> = new Array();
        for (let index = 0; index < imagePaths.length; index++) {
          try {
            let filePath = imagePaths[index];
            const file: fs.File = fs.openSync(filePath, fs.OpenMode.READ_ONLY);
            const stat: fs.Stat = fs.statSync(file.fd);
            const size: number = stat.size;
            let buf: ArrayBuffer = new ArrayBuffer(size);
            let readLen: number = fs.readSync(file.fd, buf);
            let that: util.Base64Helper = new util.Base64Helper();
            let array: Uint8Array = new Uint8Array(buf.slice(0, readLen));
            let result: Uint8Array = that.encodeSync(array);
            let arrayData: number[] = Array.from(result);
            let str: string = '';
            for (let index: number = 0; index < arrayData.length; index++) {
              str += String.fromCharCode(arrayData[index]);
            }
            base64Data.push(str)
            fs.closeSync(file);
          } catch (err) {
            completeCb(new WeexResult(StatusCode.FAIL, JSON.stringify(data.errMsg), ''));
          }
        }
        completeCb(new WeexResult(StatusCode.SUCCESS, JSON.stringify(data.errMsg), base64Data));
      } else if (data.errCode === 201) {
        completeCb(new WeexResult(StatusCode.UNAUTHORIZED, JSON.stringify(data.errMsg), ''));
      } else {
        completeCb(new WeexResult(StatusCode.FAIL, JSON.stringify(data.errMsg), ''));
      }
    };

    let sourceTypes: Array<string> = new Array();
    sourceTypes[0] = imageInParams.sourceType === 0 ? 'camera' : 'album';

    let chooseoptions: Chooseoptions = new Chooseoptions();
    chooseoptions.count = imageInParams.count;
    chooseoptions.sourceType = sourceTypes;
    chooseoptions.complete = chooseImageCompleteCallback;

    let params: Array<Chooseoptions> = new Array();
    params[0] = chooseoptions;
    as[name].apply(null, params);
  }

  chooseImage(options: ApiOptions) {
    const args = options.args;
    const completeCb = options.completeCb;
    let imageInParams: ChooseImageOptions = JSON.parse(args);
    let chooseImageCompleteCallback = (data: WeexDataResult) => {
      console.info('WANG chooseImageCompleteCallback data:' + JSON.stringify(data));
      if (data.errCode === 0) {
        let imagePaths: Array<string> | undefined = data.tempFilePaths;
        if (imagePaths === undefined) {
          return;
        }
        let base64Data: Array<string> = new Array();
        for (let index = 0; index < imagePaths.length; index++) {
          try {
            let filePath = imagePaths[index];
            const file: fs.File = fs.openSync(filePath, fs.OpenMode.READ_ONLY);
            const stat: fs.Stat = fs.statSync(file.fd);
            const size: number = stat.size;
            let buf: ArrayBuffer = new ArrayBuffer(size);
            let readLen: number = fs.readSync(file.fd, buf);
            let that: util.Base64Helper = new util.Base64Helper();
            let array: Uint8Array = new Uint8Array(buf.slice(0, readLen));
            let result: Uint8Array = that.encodeSync(array);
            let arrayData: number[] = Array.from(result);
            let str: string = '';
            for (let index: number = 0; index < arrayData.length; index++) {
              str += String.fromCharCode(arrayData[index]);
            }
            base64Data.push(str)
            fs.closeSync(file);
          } catch (err) {
            completeCb(new WeexResult(StatusCode.FAIL, JSON.stringify(data.errMsg), ''));
          }
        }
        completeCb(new WeexResult(StatusCode.SUCCESS, JSON.stringify(data.errMsg), base64Data));
      } else if (data.errCode === 201) {
        completeCb(new WeexResult(StatusCode.UNAUTHORIZED, JSON.stringify(data.errMsg), ''));
      } else {
        completeCb(new WeexResult(StatusCode.FAIL, JSON.stringify(data.errMsg), ''));
      }
    };
    imageInParams.complete = chooseImageCompleteCallback;
    chooseImageAssets(imageInParams);
  }
}

async function chooseImageAssets(options: ChooseImageOptions): Promise<chooseCameraBack> {
  let apiName = 'chooseImage'
  let isFail = false;
  if (options.count && typeof (options.count) !== 'number') {
    options.complete({ errCode: 201, errMsg: `${apiName}:get uri fail` })
    isFail = true
    return { options, isFail }
  }
  if (options.count === undefined || options.count < 1) {
    options.count = 9
  }
  options.sourceType ||= ['album', 'camera'];
  options.sourceType = Array.from(new Set(options.sourceType));

  if (options.sourceType[0] === 'camera') {
    const chooseCameraBack = await chooseCamera(options, apiName, isFail)
    isFail = chooseCameraBack.isFail
    options = chooseCameraBack.options
    if (isFail) {
      return { options, isFail };
    }
  } else {
    // 打开图库选择图片
    let PhotoSelectOptions = new photoAccessHelper.PhotoSelectOptions();
    PhotoSelectOptions.maxSelectNumber = options.count > 9 ? 9 : options.count;
    PhotoSelectOptions.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE;
    let photoPicker = new photoAccessHelper.PhotoViewPicker();
    let PhotoSelectResult: photoAccessHelper.PhotoSelectResult = await photoPicker.select(PhotoSelectOptions)
    if (PhotoSelectResult.photoUris.length === 0) {
      options.complete({ errCode: 201, errMsg: `${apiName}:get uri fail` })
      isFail = true
      return { options, isFail }
    }
    //获取资源信息
    const context = GlobalThis.getInstance().getContext('GlobalContext') as common.UIAbilityContext;
    let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
    const mediaItemList: MediaItemData[] = []
    for (const uri of PhotoSelectResult.photoUris) {
      let predicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
      predicates.equalTo('uri', uri);
      let fetchOption: photoAccessHelper.FetchOptions = {
        fetchColumns: [
          photoAccessHelper.PhotoKeys.URI,
          photoAccessHelper.PhotoKeys.PHOTO_TYPE,
          photoAccessHelper.PhotoKeys.SIZE,
          photoAccessHelper.PhotoKeys.TITLE,
        ],
        predicates: predicates
      };
      let fetchResult: photoAccessHelper.FetchResult<photoAccessHelper.PhotoAsset> =
        await phAccessHelper.getAssets(fetchOption);
      let assertCount: number = await fetchResult.getCount();
      if (assertCount > 0) {
        let asset: photoAccessHelper.PhotoAsset = await fetchResult.getFirstObject();
        const mediaData: IMediaData = {
          originPath: asset.uri,
          type: asset.photoType === photoAccessHelper.PhotoType.IMAGE ? 'image' : 'video',
          originSize: Number(asset.get(photoAccessHelper.PhotoKeys.SIZE)),
        }
        mediaItemList.push(new MediaItemData(mediaData))
      }
    }
    try {
      options.sizeType ||= ['original', 'compressed'];
      options.sizeType = Array.from(new Set(options.sizeType));
      let useOriginal =
        (options.sizeType.length === 2) || (options.sizeType[0] === 'original') || PhotoSelectResult.isOriginalPhoto;
      const ret = await getChooseMediaRet(mediaItemList, useOriginal)
      options.complete({
        tempFilePaths: ret.tempFilePaths,
        tempFiles: ret.tempFiles,
        type: ret.type,
        errCode: 0
      })
    } catch (err) {
      options.complete({ errCode: 201, errMsg: 'cancel' })
      isFail = true
      return { options, isFail };
    }
  }
  return { options, isFail };
}


export async function getAssetByUri(uri: string): Promise<photoAccessHelper.PhotoAsset | undefined> {
  const context = getContext();
  let phAccessHelper = photoAccessHelper.getPhotoAccessHelper(context);
  let predicates: dataSharePredicates.DataSharePredicates = new dataSharePredicates.DataSharePredicates();
  predicates.equalTo(photoAccessHelper.PhotoKeys.URI, uri)
  let fetchOptions: photoAccessHelper.FetchOptions = {
    fetchColumns: [
      photoAccessHelper.PhotoKeys.URI,
      photoAccessHelper.PhotoKeys.PHOTO_TYPE,
      photoAccessHelper.PhotoKeys.SIZE,
      photoAccessHelper.PhotoKeys.TITLE,
    ],
    predicates: predicates
  };
  try {
    let fetchResult: photoAccessHelper.FetchResult<photoAccessHelper.PhotoAsset> =
      await phAccessHelper.getAssets(fetchOptions);
    if (fetchResult) {
      return await fetchResult.getFirstObject()
    }
  } catch (err) {
    console.error(IMAGE_API, `getPhotoAssetList failed. Cause: ${JSON.stringify(err)}`);
  }
  return undefined
}

async function chooseCamera(options: ChooseImageOptions, apiName: string, isFail: boolean): Promise<chooseCameraBack> {
  let chosenUris: string[] = [];
  let maxDuration = 30;
  maxDuration = maxDuration > 60 ? 60 : maxDuration;
  maxDuration = maxDuration < 3 ? 3 : maxDuration;
  chosenUris = await getCameraUris(maxDuration, 'back');
  if (chosenUris.length === 0) {
    isFail = true
    options.complete({ errCode: 201, errMsg: `${apiName}:fail to pull up camera app` })
    isFail = true
    return { options, isFail };
  }
  const captureUrl = chosenUris[0]
  const asset = await getAssetByUri(captureUrl)
  const assetType = asset?.photoType === photoAccessHelper.PhotoType.IMAGE ? 'image' : 'video';
  const mediaList: IMediaData[] = [
    {
      originPath: captureUrl,
      type: assetType,
      originSize: Number(asset && asset.get(photoAccessHelper.PhotoKeys.SIZE) || 0), //asset获取SIZE得到undefined时设置为0
    }
  ]
  options.sizeType ||= ['original', 'compressed'];
  options.sizeType = Array.from(new Set(options.sizeType));
  let useOriginal = (options.sizeType.length === 2) || (options.sizeType[0] === 'original');
  const ret = await getChooseMediaRet(mediaList, useOriginal);
  options.complete({
    tempFilePaths: ret.tempFilePaths,
    tempFiles: ret.tempFiles,
    type: ret.type,
    errMsg: `${apiName}:ok`,
    errCode: 0,
  })
  return { options, isFail };
}

export async function getCameraUris(maxDuration: number, cameraPos?: string): Promise<string[]> {
  let uris: string[] = [];
  const context = GlobalThis.getInstance().getContext('GlobalContext') as common.UIAbilityContext;
  // 单独指定使用相机
  const pickerProfile: cameraPicker.PickerProfile = {
    cameraPosition: cameraPos === 'front' ? camera.CameraPosition.CAMERA_POSITION_FRONT :
    camera.CameraPosition.CAMERA_POSITION_BACK,
    videoDuration: maxDuration,
  }
  let mediaTypes: cameraPicker.PickerMediaType[] = []
  mediaTypes.push(cameraPicker.PickerMediaType.PHOTO);
  try {
    const pickerResult: cameraPicker.PickerResult = await cameraPicker.pick(context, mediaTypes, pickerProfile);
    if (pickerResult.resultUri) {
      uris = [pickerResult.resultUri];
    }
  } catch (error) {
    const err = error as BusinessError;
    console.error(IMAGE_API, `Failed camera capture: ${err.message}`);
  }
  return uris;
}


async function getChooseMediaRet(mediaList: IMediaData[], useOriginal: boolean): Promise<ChooseMediaResults> {
  const resTypes: Set<string> = new Set();
  const tempFilePaths: string[] = []
  const tempFiles: MediaFile[] = []
  for (const media of mediaList) {
    resTypes.add(media.type)
    if (useOriginal) {
      // 复制相册原图/原视频到应用沙箱临时路径
      const resMediaInfo: MediaFile = {
        tempFilePath: media.originPath,
        size: media.originSize,
        fileType: media.type
      }
      tempFiles.push(resMediaInfo)
      tempFilePaths.push(media.originPath)
    } else {
      const compress: CompressResult = await compressImage({ src: media.originPath })
      if (compress === undefined || compress.tempFilePath === undefined || compress.tempFileSize === undefined ||
        compress.tempFileName === undefined) {
        continue;
      }
      tempFilePaths.push(compress.tempFilePath)
      tempFiles.push({
        tempFilePath: compress.tempFilePath,
        size: compress.tempFileSize,
        fileType: 'image',
      })
    }
  }
  const resType: string = resTypes.size === 2 ? 'mix' : (resTypes.size === 1 ? Array.from(resTypes)[0] : '')
  const retData: ChooseMediaResults = {
    tempFilePaths: tempFilePaths,
    tempFiles: tempFiles,
    type: resType,
    isFail: false,
    errMsg: `chooseImage:ok`
  }
  return retData
}

export async function generateThumbnailFile(asset: photoAccessHelper.PhotoAsset): Promise<string> {
  try {
    const thumbnail = await asset.getThumbnail({ height: 768, width: 768 });
    const imagePacker = image.createImagePacker();
    const buffer = await imagePacker.packing(thumbnail, {
      format: 'image/jpeg',
      quality: 100,
    });
    const context = getContext();
    const sandboxThumbPath = `${context.tempDir}/${Date.now()}.jpg`;
    const file = fs.openSync(sandboxThumbPath, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
    fs.writeSync(file.fd, buffer);
    fs.closeSync(file.fd);
    return sandboxThumbPath;
  } catch (err) {
    console.info(IMAGE_API, 'generateThumbnailFile failed');
    return '';
  }
}

class MediaItemData {
  public originPath: string;
  public type: string;
  public originSize: number = 0;
  public duration: number = 0;
  public width: number = 0;
  public height: number = 0;
  public isSelected: boolean = false;
  public thumbnail: PixelMap | undefined = undefined;

  constructor(data: IMediaData) {
    this.originPath = data.originPath;
    this.type = data.type;
    this.duration = data.duration || 0;
    this.originSize = data.originSize || 0;
    this.width = data.width || 0;
    this.height = data.height || 0;
  }
}

export async function compressImage(params: CompressOptions): Promise<CompressResult> {
  let options: CompressResult = {};
  const src = params.src;
  let quality = params.quality || 80;
  if (quality && typeof (quality) !== 'number') {
    return options;
  }
  if (quality > 100 || quality < 0) {
    quality = 80;
  }
  try {
    let fd = 0;
    if (FileUtils.isSandboxPath(src)) {
      if (!fs.accessSync(src)) {
        console.error(IMAGE_API, `compressImage fail, src can not access.`);
        return options;
      }
      const file = fs.openSync(src, fs.OpenMode.READ_ONLY);
      if (!file) {
        console.error(IMAGE_API, `compressImage fail, src can not open.`)
        return options;
      }
      fd = file.fd;
    } else if (FileUtils.isFileUri(src)) {
      fd = FileUtils.getFdFromUriOrSandBoxPath(src);
    }
    const supportTypes: string[] = ['jpg', 'png', 'webp'];
    const fileName = src.split('/').pop() || '';
    // 无后缀的src以jpg处理
    const originSrcSuffix = fileName.indexOf('.') >= 0 ? (src.toLowerCase().split('.').pop() || 'jpg') : 'jpg';
    const context = getContext();
    if (supportTypes.includes(originSrcSuffix)) {
      // 压缩
      const arrayBuf = await getArrayBuffer(20, fd, originSrcSuffix, params.compressHeight, params.compressedWidth);
      const newFileName = `IMAGE_${Date.now()}`;
      const tmpPath = `${context.tempDir}/${newFileName}.${originSrcSuffix}`;
      try {
        fs.openSync(tmpPath, fs.OpenMode.CREATE)
        const fileOpen = fs.openSync(tmpPath, fs.OpenMode.READ_WRITE)
        fs.writeSync(fileOpen.fd, arrayBuf)
        // 获取临时文件的大小
        const stat = FileUtils.getFileStatFromUri(tmpPath);
        fs.closeSync(fileOpen);
        return {
          tempFilePath: tmpPath,
          tempFileSize: stat.size,
          tempFileName: newFileName
        };
      } catch (error) {
        console.error(IMAGE_API, `compressImage----file deal error:`, error)
      }
    } else {
      const newFileName = `IMAGE_${Date.now()}`;
      const originTempPath = `${context.tempDir}/${newFileName}.${originSrcSuffix}`;
      const asset = await getAssetByUri(src);
      await asset?.getReadOnlyFd().then((fd) => {
        fs.copyFileSync(fd, originTempPath);
        asset?.close(fd);
      })
      const stat = FileUtils.getFileStatFromUri(originTempPath);
      return {
        tempFilePath: originTempPath,
        tempFileSize: stat.size,
        tempFileName: newFileName,
      };
    }
  } catch (error) {
    console.error(IMAGE_API, `compressImage----pack error:`, error)
  }
  return options;
}

async function getArrayBuffer(quality: number, fd: number, suffix: string, height?: number, width?: number) {
  suffix = ['jpeg', 'jpg'].includes(suffix) ? 'jpeg' : suffix;
  if (height !== undefined || width !== undefined) {
    let heightSize: number = height || width || 0;
    let widthSize: number = width || height || 0;
    const color: ArrayBuffer = new ArrayBuffer(heightSize * widthSize * 4);
    let opts: image.InitializationOptions = {
      editable: true,
      pixelFormat: 3,
      size: { height: heightSize, width: widthSize }
    }
    const pixelMap: image.PixelMap = await image.createPixelMap(color, opts);
    const imagePackerApi: image.ImagePacker = image.createImagePacker();
    let packOpts: image.PackingOption = { format: `image/${suffix}`, quality };
    const arrayBuf = await imagePackerApi.packing(pixelMap, packOpts);
    return arrayBuf;
  } else {
    const imageSourceApi: image.ImageSource = image.createImageSource(fd);
    const imagePackerApi: image.ImagePacker = image.createImagePacker();
    const packOpts: image.PackingOption = { format: `image/${suffix}`, quality };
    if (suffix !== 'png') {
      return (await imagePackerApi.packing(imageSourceApi, packOpts));
    } else {
      const imageInfo = await imageSourceApi.getImageInfo();
      const pixelMap = await imageSourceApi.createPixelMap({
        desiredSize: {
          width: imageInfo.size.width / 2,
          height: imageInfo.size.height / 2,
        }
      });
      return (await imagePackerApi.packing(pixelMap, packOpts));
    }
  }
}

class ImageInParams {
  count: number = 3;
  sourceType: number = 1;
}

class Chooseoptions {
  count: number = 1;
  sourceType?: Array<string>;
  sizeType?: Array<string>;
  success: Function = () => {
  };
  fail: Function = () => {
  };
  complete: Function = () => {
  };
}

class WeexDataResult {
  errCode?: number;
  errMsg?: string;
  tempFilePaths?: Array<string>;
  tempFiles?: Array<string>;
}
