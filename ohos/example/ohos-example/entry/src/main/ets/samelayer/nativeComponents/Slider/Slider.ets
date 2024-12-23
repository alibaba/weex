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

import { SliderParams } from '../../interfaces/SameLayer'

@Component
struct NativeSlider {
  @ObjectLink params: SliderParams
  @State bkColor: Color = Color.Blue
  componentId: string = ''

  aboutToAppear(): void {
    console.log('NativeEmbed aboutToAppear ', this.params.componentId)
    this.componentId = this.params.componentId
  }

  build() {
    Column({ space: 8 }) {
      Text('outset slider').fontSize(9).fontColor(0xCCCCCC).width('90%').margin(15)
      Row() {
        Slider({
          min: this.params.min,
          max: this.params.max,
          value: this.params.value,
          style: SliderStyle.OutSet
        })
          .showTips(true)
          .onChange((value: number, mode: SliderChangeMode) => {
            console.info('value:' + value + 'mode:' + mode.toString())
            console.log("NativeEmbed slider onChange.")
            this.params.handleOnChange && this.params.handleOnChange({ value: value, mode: mode })
          })
      }
      .width('80%')
      Row() {
        Slider({
          step: this.params.step,
          style: SliderStyle.OutSet
        })
          .showSteps(true)
          .onChange((value: number, mode: SliderChangeMode) => {
            console.info('value:' + value + 'mode:' + mode.toString())
            console.log("NativeEmbed slider onChange.")
            this.params.handleOnChange && this.params.handleOnChange({ value: value, mode: mode })
          })
      }
      .width('80%')
    }
    .width(this.params.width)
    .height(this.params.height)
  }
}

@Builder
export function NativeSliderBuilder(params: SliderParams) {
  NativeSlider({ params: params })
    .backgroundColor(Color.White)
}