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

import { TextAreaParams } from '../../interfaces/SameLayer';
import { sameLayerManager } from 'WebSceneKitHsp/Index';

@Component
struct NativeTextArea {
  @ObjectLink params: TextAreaParams
  @State bkColor: Color = Color.Blue
  componentId: string = ''
  controller: TextAreaController = new TextAreaController()

  aboutToAppear(): void {
    console.log('NativeEmbed aboutToAppear ', this.params.componentId)
    this.componentId = this.params.componentId
  }

  build() {
    Column() {
      TextArea({
        placeholder: this.params.placeholder,
        controller: this.controller
      })
        .placeholderFont({ size: 8, weight: 400 })
        .width(this.params.width)
        .height(this.params.height)
        .fontSize(16)
        .borderRadius(0)
        .padding(0)
        .fontColor('#182431')
        .backgroundColor(this.params.backgroundColor || Color.Blue)
        .onChange((value: string) => {
          console.log("NativeEmbed NativeTextArea onClick.")
          const callJsOnClick: Function | undefined = (sameLayerManager.getSameLayerArgs(this.componentId) as TextAreaParams)?.onChange
          callJsOnClick && callJsOnClick('NativeTextArea onClick.')
        })
    }
  }
}

@Builder
export function NativeTextAreaBuilder(params: TextAreaParams) {
  NativeTextArea({ params: params })
    .backgroundColor(Color.White)
}