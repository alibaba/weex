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

import ArrayList from '@ohos.util.ArrayList';
import { Constants } from '../constants/Constants';
import Logger from '../../common/Logger';

const TAG: string = 'BroadcastChannel';

export class BroadcastChannel {
  private static instance: BroadcastChannel;
  bcChannelIdMap: Map<string, Set<number>> = new Map();
  bcChannelCbMap: Map<number, Function> = new Map();
  bcWebIdMap: Map<number, Set<number>> = new Map();

  /**
   * Singleton mode get instance.
   *
   * @returns BroadcastChannel
   */
  public static getInstance(): BroadcastChannel {
    if (!BroadcastChannel.instance) {
      BroadcastChannel.instance = new BroadcastChannel();
      Logger.info(TAG, 'new BroadcastChannel() success.');
    }
    return BroadcastChannel.instance;
  }

  bcPostMessage(data: object) {
    let channelName: string = data[Constants.CHANNEL_NAME] ?? '';
    let message: object | string = data[Constants.CHANNEL_MESSAGE] ?? '';

    let channelIds: Set<number> | undefined = this.bcChannelIdMap.get(channelName);
    if (channelIds === undefined || channelIds.size === 0) {
      Logger.info(TAG, channelName + ' has no any subscribed.');
      return;
    }

    for (let channelId of channelIds) {
      let callback = this.bcChannelCbMap.get(channelId);
      if (callback === undefined) {
        Logger.info(TAG, channelId + ' is not map any callback.');
        channelIds.delete(channelId);
        continue;
      }
      callback(new ReturnMessage("string", message));
    }
    if(channelIds.size === 0){
      this.bcChannelIdMap.delete(channelName);
    }
  }

  bcOnMessage(args: object, callback: Function, webId: number) {
    let channelName: string = args[Constants.CHANNEL_NAME];
    let channelId: number = args[Constants.CHANNEL_ID];
    if (channelName === undefined) {
      Logger.error(TAG, '[bcOnMessage] param error!');
      return;
    }
    this.bcChannelCbMap.set(channelId, callback);
    let IdsForChannel: Set<number> = this.bcChannelIdMap.get(channelName) ?? new Set();
    IdsForChannel.add(channelId);
    this.bcChannelIdMap.set(channelName, IdsForChannel);

    let IdsForWeb: Set<number> = this.bcWebIdMap.get(webId) ?? new Set();
    IdsForWeb.add(channelId);
    this.bcWebIdMap.set(webId, IdsForWeb);
    Logger.info(TAG, '[bcOnMessage] onMessage success.');
  }

  bcClose(args: object) {
    let channelName: string = args[Constants.CHANNEL_NAME];
    let channelIdList: ArrayList<number> = args[Constants.CHANNEL_ID_LIST];
    if (channelName === undefined) {
      Logger.error(TAG, '[bcClose] param error!');
      return;
    }
    if (channelIdList === undefined || channelIdList.length === 0) {
      Logger.info(TAG, '[bcClose] The obj has no any subscribed.');
      return;
    }
    let channelIds: Set<number> = this.bcChannelIdMap.get(channelName) ?? new Set();
    for (let channelId of channelIdList) {
      this.bcChannelCbMap.delete(channelId);
      channelIds.delete(channelId);
    }
    this.bcChannelIdMap.set(channelName, channelIds);
    Logger.info(TAG, '[bcClose] leave the channel: ' + channelName + ' success.');
  }

  bcDeleteCb(webId: number) {
    let channelIds: Set<number> = this.bcWebIdMap.get(webId) ?? new Set();
    for (let channelId of channelIds) {
      if(this.bcChannelCbMap.delete(channelId)) {
        Logger.info(TAG, 'Delete the broadcastChannel callback, webId = ' + webId);
      }
    }
  }
}

class ReturnMessage {
  type: string = '';
  data: object | string = '';

  constructor(type: string, data: object | string) {
    this.type = type;
    this.data = data;
  }
}