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

@Observed
export class RichTextParams {
  width: number
  height: number
  componentId: string
  text: string
  backgroundColor?: string
  onClick?: (res?: string) => void

  constructor() {
    this.width = 0;
    this.height = 0;
    this.componentId = '';
    this.text = '';
  }
}

@Observed
export class TextAreaParams {
  width: number
  height: number
  componentId: string
  placeholder: string
  backgroundColor?: string
  onChange?: (res?: string) => void

  constructor() {
    this.width = 0;
    this.height = 0;
    this.componentId = '';
    this.placeholder = '';
  }
}

@Observed
export class ButtonParams {
  width: number
  height: number
  text?: string
  loading?: boolean
  componentId: string
  handleOnTap?: Function

  constructor() {
    this.width = 0;
    this.height = 0;
    this.componentId = '';
  }
}

@Observed
export class SliderParams {
  width: number
  height: number
  componentId: string
  value: number
  min: number
  max: number
  handleOnChange?: Function
  step?: number

  constructor() {
    this.width = 0;
    this.height = 0;
    this.componentId = '';
    this.value = 0;
    this.min = 0;
    this.max = 0;
    this.step = 0;
  }
}

@Observed
export class VideoParams {
  width: number // 组件宽度
  height: number // 组件高度
  componentId: string // 组件ID
  src: string // 要播放视频的资源地址
  controls?: boolean // 是否显示播放控件
  muted?: boolean // 是否静音
  loop?: boolean
  autoPlay?: boolean
  onPlay?: (res?: string) => void
  onPause?: (res?: string) => void

  constructor() {
    this.width = 0;
    this.height = 0;
    this.componentId = '';
    this.src = '';
  }
}

@Observed
export class LottieParams {
  componentId: string
  width: number
  height: number
  sourceUrl?: string
  sourceJson?: string
  speed?: number
  loop?: boolean | number
  autoplay?: boolean
  onEnterFrame?: Function
  onLoopComplete?: Function
  onComplete?: Function
  onCreateFinish?: Function

  constructor() {
    this.width = 0;
    this.height = 0;
    this.componentId = '';
  }
}

@Observed
export class WebParams {
  componentId: string
  src: string
  width?: number
  height?: number
  pagestart?: Function
  pagefinish?: Function
  error?: Function
  receivedtitle?: Function
  message?: Function

  constructor() {
    this.componentId = '';
    this.src = '';
  }
}
