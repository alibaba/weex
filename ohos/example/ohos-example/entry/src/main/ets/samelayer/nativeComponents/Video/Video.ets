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

import { sameLayerManager } from 'WebSceneKitHsp/Index';
import { VideoParams } from '../../interfaces/SameLayer';

@Component
export struct NativeVideo {
  @ObjectLink params: VideoParams
  videoController: VideoController = new VideoController();

  build() {
    Column() {
      Video({
        src: this.params.src,
        controller: this.videoController
      })
        .objectFit(ImageFit.Fill)
        .autoPlay(this.params.autoPlay ?? true)
        .muted(this.params.muted ?? false)
        .loop(this.params.loop ?? false)
        .controls(this.params.controls ?? true)
        .onClick((event) => {
          console.log('NativeEmbed video onClick.')
        })
        .onStart(() => {
          console.log('NativeEmbed video onPlay.', this.params.height)
          const callJsOnPlay: Function | undefined = (sameLayerManager.getSameLayerArgs(this.params.componentId) as VideoParams)?.onPlay
          callJsOnPlay && callJsOnPlay('Native Video playing.')
        })
        .onPause(() => {
          console.log('NativeEmbed video onPause.')
          const callJsOnPause: Function | undefined = (sameLayerManager.getSameLayerArgs(this.params.componentId) as VideoParams)?.onPause
          callJsOnPause && callJsOnPause('Native Video paused.')
        })
    }
    .width(this.params.width)
    .height(this.params.height)
  }
}

@Builder
export function NativeVideoBuilder(params: VideoParams) {
  NativeVideo({ params: params })
    .backgroundColor(Color.Green)
}

