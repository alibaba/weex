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

export class Constant {
  /**
   * The fake domain.
   */
  static readonly FAKE_DOMAIN: string = 'https://675554.com/';

  /**
   * The prefix of https://.
   */
  static readonly PREFIX_HTTPS: string = 'https://';

  /**
   * The prefix of http://.
   */
  static readonly PREFIX_HTTP: string = 'http://';

  /**
   * The question mark.
   */
  static readonly QUESTION_MARK: string = '?';

  /**
   * The Encoding of utf-8.
   */
  static readonly ENCODING_UTF_8: string = 'utf-8';

  /**
   * The response code is 200.
   */
  static readonly RESPONSE_CODE: number = 200;

  /**
   * The reason message ok.
   */
  static readonly REASON_MESSAGE_OK: string = 'OK';

  /**
   * The mime type is text/html.
   */
  static readonly MIME_TYPE_TEXT_HTML: string = 'text/html';

  /**
   * The url head of resource://rawfile/.
   */
  static readonly URL_HARD_RESOURCE: string = 'resource://rawfile/';

  /**
   * The web adapter.
   */
  static readonly WEB_ADAPTER: string = 'WebAdapter';

  /**
   * The run.
   */
  static readonly RUN: string = 'run';

  /**
   * The async run.
   */
  static readonly ASYNC_RUN: string = 'asyncRun';

  /**
   * The asterisk.
   */
  static readonly ASTERISK: string = '*';

  /**
   * The tag of is preload finish.
   */
  static readonly FINISH: string = 'finish';

  /**
   * The loading.
   */
  static readonly LOADING: string = 'loading';

  /**
   * The status of initial.
   */
  static readonly STATUS_INITIAL: string = 'initial';

  /**
   * The file type of js.
   */
  static readonly FILE_TYPE_JS: string = '.js';

  /**
   * The response data id.
   */
  static readonly RESPONSE_DATA_ID: string = 'ResponseDataID';

  /**
   * The tag of GlobalContext.
   */
  static readonly GLOBAL_CONTEXT: string = 'GlobalContext';

  /**
   * The width of 20%.
   */
  static readonly WIDTH_PERCENT_TWENTY: string = '20%';

  /**
   * The height of 20%.
   */
  static readonly HEIGHT_PERCENT_TWENTY: string = '20%';

  /**
   * The width or height for 100%.
   */
  static readonly FULL_PERCENT: string = '100%';

  static readonly TEMPLATE_START_WEB_ID: number = 101;

  static readonly MIX_WEB_START_WEB_ID: number = 200;

  static readonly PRERENDER_START_WEB_ID: number = 300;

  static readonly PRERENDER_MIX_WEB_START_WEB_ID: number = 400;

}