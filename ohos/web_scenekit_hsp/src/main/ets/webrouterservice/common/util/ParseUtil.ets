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

import common from '@ohos.app.ability.common';
import util from '@ohos.util';
import { BusinessError } from '@kit.BasicServicesKit';
import { Constant } from '../constant/Constant';
import Logger from '../../../common/Logger';
import { Project } from '../entity/Project';
import { RouterStorage } from '../../globalrouter/RouterStorage';
import { UrlInfo } from '../entity/UrlInfo';

const TAG: string = 'ParseUtil';
let projects: Map<string, Project> = new Map();
let urlConfig: Map<string, UrlInfo> = new Map();

export class ParseUtil {
  public static getConfigFile(pathArray: Array<string>, context: common.UIAbilityContext): Array<string> {
    const configFile: Array<string> = [];
    pathArray.forEach((path: string) => {
      let fileList = context.resourceManager.getRawFileListSync(path);
      fileList.forEach((file: string) => {
        if (file.endsWith('.json')) {
          configFile.push(`${path}/${file}`)
        }
      })
    })
    return configFile;
  }

  public static parseConfig(context: common.UIAbilityContext, path: string): Promise<void> {

    return new Promise((resolve, reject) => {

      context.resourceManager.getRawFileContent(path).then((data: Uint8Array) => {
        let jsonObject = JSON.parse(ParseUtil.bufferToString(data.buffer)) as Record<string, Array<JsonProject>>;
        let weexProjects = jsonObject.weexProjects as Array<JsonProject>;
        weexProjects.forEach((jsonProject: JsonProject) => {
          let preloadUrls: Array<string> = new Array();
          jsonProject.urls.forEach((urlParams: UrlParams) => {
            urlConfig.set(urlParams.url, new UrlInfo(urlParams.type, jsonProject.projectName));
            if (urlParams.type === 1) {
              preloadUrls.push(urlParams.url);
            }
          })
          let project: Project = new Project(preloadUrls, jsonProject.preLoad);
          projects.set(jsonProject.projectName, project);
        })

        // 如果项目A依赖B，那么B也要依赖A，否则从B回退A，会重新刷新界面
        projects.forEach((value: Project, key: string) => {
          value.preLoadProjects.forEach((preLoadProjectName: string) => {
            if (!projects.get(preLoadProjectName)?.preLoadProjects.includes(key)) {
              projects.get(preLoadProjectName)?.preLoadProjects.push(key);
            }
          })
        })

        // 如果项目需要依赖自己
        projects.forEach((value: Project, key: string) => {
          if (!value.preLoadProjects.includes(key)) {
            value.preLoadProjects.push(key);
          }
        })

        RouterStorage.getInstance().urlConfig = urlConfig;
        RouterStorage.getInstance().projectsConfig = projects;
        resolve()
      }).catch((error: BusinessError) => {
        let code = error.code;
        let message = error.message;
        Logger.error(TAG, `getRawFileContentSync failed, error code: ${code}, message: ${message}.`);
        reject();
      })
    })
  }


  public static bufferToString(buffer: ArrayBufferLike): string {
    let textDecoder = util.TextDecoder.create(Constant.ENCODING_UTF_8, {
      ignoreBOM: true
    });
    let resultPut = textDecoder.decodeWithStream(new Uint8Array(buffer), {
      stream: true
    });
    return resultPut;
  }
}

interface UrlParams {
  url: string,
  type: number
}

class JsonProject {
  projectName: string
  urls: Array<UrlParams>;
  preLoad: Array<string>;

  constructor(projectName: string, urls: Array<UrlParams>, preLoad: Array<string>) {
    this.urls = urls;
    this.preLoad = preLoad;
    this.projectName = projectName;
  }
}