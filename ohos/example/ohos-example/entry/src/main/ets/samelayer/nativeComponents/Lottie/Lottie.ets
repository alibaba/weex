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

import http from '@ohos.net.http';
import { LottieManager, LottieCallbacks } from '../../utils/LottieManager';
import { LottieParams } from '../../interfaces/SameLayer';

@Component
export struct Lottie {
  @ObjectLink params: LottieParams
  private renderingSettings: RenderingContextSettings = new RenderingContextSettings(true);
  private renderingContext: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.renderingSettings);

  destroyAnimation() {
    LottieManager.getInstance().destroyAnimation(this.params.componentId)
  }

  aboutToDisappear(): void {
    this.destroyAnimation()
  }

  async loadAnimation() {
    const events: LottieCallbacks = {
      createFinish: this.params?.onCreateFinish,
      onComplete: this.params?.onLoopComplete,
      onEnterFrame: this.params?.onEnterFrame,
      onLoopComplete: this.params?.onLoopComplete,
    };
    let sourceJSON = this.params.sourceJson
    if (this.params.sourceUrl) {
      let httpRequest = http.createHttp();
      await httpRequest.request(this.params.sourceUrl)
        .then((data: http.HttpResponse) => {
          sourceJSON = data.result as string
        }).catch((err: Error) => {
          console.info('error:' + JSON.stringify(err));
        });
    }
    LottieManager.getInstance().createAnimation({
      container: this.renderingContext,
      renderer: 'canvas',
      loop: this.params.loop || false,
      autoplay: this.params.autoplay || false,
      name: this.params.componentId,
      animationData: sourceJSON ? JSON.parse(sourceJSON) : undefined,
    }, this.params?.speed, events);
  }

  build() {
    Column() {
      Canvas(this.renderingContext)
        .onReady(() => {
          //抗锯齿的设置
          this.renderingContext.imageSmoothingEnabled = true
          this.renderingContext.imageSmoothingQuality = 'high'
          this.loadAnimation()
        })
        .backgroundColor(Color.White)
    }
    .width(this.params.width)
    .height(this.params.height)
  }
}

@Builder
export function NativeLottieBuilder(params: LottieParams) {
  Lottie({ params: params })
}
