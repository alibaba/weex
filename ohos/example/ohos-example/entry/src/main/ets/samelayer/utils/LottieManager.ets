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

import lottie, {
  AnimationItem,
  AnimationConfigWithPath,
  AnimationConfigWithData,
  AnimationDirection,
  AnimationEventCallback
} from '@ohos/lottie'

export interface LottieCallbacks {
  createFinish?: Function
  onComplete?: Function
  onEnterFrame?: Function
  onLoopComplete?: Function
}

export class LottieManager {
  private constructor() {
  }

  private static instance: LottieManager;
  private animationMap = new Map<string, AnimationItem>();
  private totalFramesMap = new Map<string, number>();

  public static getInstance(): LottieManager {
    if (!LottieManager.instance) {
      LottieManager.instance = new LottieManager();
    }
    return LottieManager.instance;
  }

  public createAnimation(params: AnimationConfigWithPath | AnimationConfigWithData, initSpeed?: number, LottieCallbacks?: LottieCallbacks) {
    const animationItem = lottie.loadAnimation(params)
    this.animationMap.set(params.name!, animationItem);
    this.totalFramesMap.set(params.name!, animationItem.totalFrames);
    animationItem.setSpeed(initSpeed ?? 1)
    LottieCallbacks?.onLoopComplete && animationItem.addEventListener('loopComplete', LottieCallbacks.onLoopComplete as AnimationEventCallback<ESObject>)
    LottieCallbacks?.onEnterFrame && animationItem.addEventListener('enterFrame', LottieCallbacks.onEnterFrame as AnimationEventCallback<ESObject>)
    LottieCallbacks?.onComplete && animationItem.addEventListener('complete', LottieCallbacks.onComplete as AnimationEventCallback<ESObject>)
    LottieCallbacks?.createFinish?.()
  }

  public destroyAnimation(name: string) {
    lottie.destroy(name);
    if (this.animationMap.has(name)) {
      this.animationMap.delete(name);
      this.totalFramesMap.delete(name);
    }
  }

  public play(name: string, callback?: Function) {
    if (this.animationMap.has(name)) {
      const animationItem = this.animationMap.get(name)!;
      if (!animationItem.isPaused) return;
      const onComplete1 = () => {
        animationItem.removeEventListener('complete', onComplete1);
        callback?.()
      }
      animationItem.addEventListener('complete', onComplete1);
      animationItem.play()
    }
  }

  public pause(name: string) {
    if (this.animationMap.has(name)) {
      this.animationMap.get(name)?.pause()
    }
  }

  public stop(name: string) {
    if (this.animationMap.has(name)) {
      this.animationMap.get(name)?.stop()
    }
  }

  public togglePause(name: string) {
    if (this.animationMap.has(name)) {
      this.animationMap.get(name)?.togglePause()
    }
  }

  public setSpeed(speed: number, name: string) {
    if (this.animationMap.has(name)) {
      this.animationMap.get(name)?.setSpeed(speed)
    }
  }

  public setDirection(dir: AnimationDirection, name: string) {
    if (this.animationMap.has(name)) {
      this.animationMap.get(name)?.setDirection(dir)
    }
  }

  public playFromProgress(from: number, to: number, name: string, callback?: Function) {
    if (this.animationMap.has(name)) {
      const animationItem = this.animationMap.get(name)!
      const onComplete = () => {
        animationItem.removeEventListener('complete', onComplete);
        callback?.()
      }
      const totalFrame = this.totalFramesMap.get(name) || animationItem.totalFrames;
      animationItem.addEventListener('complete', onComplete);
      animationItem.playSegments([Math.floor(totalFrame * from), Math.floor(totalFrame * to)], true);
    }
  }

  public isAnimationPlaying(name: string, callback?: Function) {
    if (this.animationMap.has(name)) {
      const animationItem = this.animationMap.get(name)!
      callback?.(!animationItem.isPaused)
    }
  }
}

