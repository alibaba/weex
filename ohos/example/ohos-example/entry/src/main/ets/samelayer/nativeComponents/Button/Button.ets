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
import { ButtonParams } from '../../interfaces/SameLayer';

@Component
struct NativeButton {
  @ObjectLink params: ButtonParams
  @State bkColor: Color = Color.Blue
  componentId: string = ''

  aboutToAppear(): void {
    console.log('NativeEmbed aboutToAppear ', this.params.componentId)
    this.componentId = this.params.componentId
  }

  build() {
    Column() {
      Button(this.params.text, { type: ButtonType.Normal, stateEffect: true }) {
        // TODO 添加这个后上面this.params.text不显示是为什么？
        Row() {
          Text(this.params.text)
            .fontSize(15)
            .fontColor(Color.White)
          LoadingProgress()
            .width(20)
            .height(20)
            .margin({ left: 12 })
            .color(0xFFFFFF)
          Text('loading')
            .fontSize(15)
            .fontColor(0xffffff)
            .margin({ left: 5, right: 12 })

        }.alignItems(VerticalAlign.Center)
      }
      .height(this.params.height)
      .width(this.params.width)
      .borderRadius(5)
      .fontColor(Color.White)
      .backgroundColor(this.bkColor)
      .onClick(() => {
        console.log("NativeEmbed button onClick.")
        this.params.handleOnTap && this.params.handleOnTap('button onTouch listener.')
      })
    }
  }
}

@Builder
export function NativeButtonBuilder(params: ButtonParams) {
  NativeButton({ params: params })
    .backgroundColor(Color.White)
}