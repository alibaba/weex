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

/**
 * Common constants for all features.
 */
export class Constants {
  /**
   * Some define of the channel.
   */
  static readonly CHANNEL_NAME: string = 'channelName';

  /**
   * The channel id.
   */
  static readonly CHANNEL_ID: string = 'channelId';

  /**
   * The channel id list.
   */
  static readonly CHANNEL_ID_LIST: string = 'channelIdList';

  /**
   * The channel message.
   */
  static readonly CHANNEL_MESSAGE: string = 'message';

  /**
   * The emitter even of changeLoadStatus.
   */
  static readonly CHANGE_LOAD_STATUS: string = 'changeLoadStatus';

  /**
   * The event name.
   */
  static readonly EVENT_NAME: string = 'eventName';

  /**
   * The url.
   */
  static readonly URL: string = 'url';

  /**
   * The trigger event name is WXApplicationDidBecomeActiveEvent.
   */
  static readonly APPLICATION_DID_BECOME_ACTIVE_EVENT: string = 'WXApplicationDidBecomeActiveEvent';

  /**
   * The api name of navigatorPush.
   */
  static readonly API_NAME_NAVIGATOR_PUSH: string = 'navigatorPush';

  /**
   * The api name of navigatorPop.
   */
  static readonly API_NAME_NAVIGATOR_POP: string = 'navigatorPop';

  /**
   * The api name of navigatorReplace.
   */
  static readonly API_NAME_NAVIGATOR_REPLACE: string = 'navigatorReplace';

  /**
   * The api name of addEventListener.
   */
  static readonly API_NAME_ADD_EVENT_LISTENER: string = 'addEventListener';

  /**
   * The api name of removeEventListener.
   */
  static readonly API_NAME_REMOVE_EVENT_LISTENER: string = 'removeEventListener';

  /**
   * The api name of bcPostMessage.
   */
  static readonly API_NAME_BC_POST_MESSAGE: string = 'bcPostMessage';

  /**
   * The api name of bcClose.
   */
  static readonly API_NAME_BC_CLOSE: string = 'bcClose';

  /**
   * The api name of bcOnMessage.
   */
  static readonly API_NAME_BC_ON_MESSAGE: string = 'bcOnMessage';

  /**
   * The api name of transferSameLayerArgs.
   */
  static readonly API_NAME_TRANSFER_SAME_LAYER: string = 'transferSameLayerArgs';

  /**
   * The api name of saveViewAppear.
   */
  static readonly API_NAME_VIEW_APPEAR: string = 'viewappear';

  /**
   * The api name of saveViewAppear.
   */
  static readonly API_NAME_DIS_VIEW_APPEAR: string = 'viewdisappear';

  /**
   * The api name of saveViewAppear.
   */
  static readonly VIEW_APPEAR_TYPE: string = 'harmonyViewAppear';

  /**
   * The api name of saveViewAppear.
   */
  static readonly VIEW_DIS_APPEAR_TYPE: string = 'harmonyViewDisAppear';

  /**
   * The callback succeed.
   */
  static readonly SUCCEED: string = 'succeed';
}