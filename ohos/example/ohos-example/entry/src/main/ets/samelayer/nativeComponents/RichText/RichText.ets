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
import { RichTextParams } from '../../interfaces/SameLayer';

@Component
struct NativeRichText {
  @ObjectLink params: RichTextParams
  @State bkColor: Color = Color.Blue
  componentId: string = ''

  aboutToAppear(): void {
    console.log('NativeEmbed aboutToAppear ', this.params.componentId)
    this.componentId = this.params.componentId
  }

  build() {
    Column() {
      RichText(this.params.text)
        .width(this.params.width)
        .height(this.params.height)
        .backgroundColor(this.params.backgroundColor || Color.White)
        .onClick(() => {
          console.log("NativeEmbed NativeRichText onClick.")
          const callJsOnClick: Function | undefined = (sameLayerManager.getSameLayerArgs(this.componentId) as RichTextParams)?.onClick
          callJsOnClick && callJsOnClick('NativeRichText onClick.')
        })
    }
    // .border({color: Color.Red, width: 1})
  }
}

@Builder
export function NativeRichTextBuilder(params: RichTextParams) {
  NativeRichText({ params: params })
    .backgroundColor(Color.White)
}