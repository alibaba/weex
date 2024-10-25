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

import { WeexProxyResult, ResultStr } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class PickerAPI {
  pick(options: ApiOptions) {
    const args: PickOptions = JSON.parse(options.args);
    const completeCb = options.completeCb;
    try {
      let pickParams: PickParams = (args as PickOptions).options;
      console.info("WANG pickParams :" + JSON.stringify(pickParams))
      let select: number | number[] = pickParams.index;
      let fruits: string[] = pickParams.items;
      TextPickerDialog
        .show({
          range: fruits,
          selected: select,
          onAccept: (value: TextPickerResult) => {
            // 设置select为按下确定按钮时候的选中项index，这样当弹窗再次弹出时显示选中的是上一次确定的选项
            select = value.index;
            console.info("WANG TextPickerDialog:onAccept()" + JSON.stringify(value))
            completeCb(new WeexProxyResult(ResultStr.SUCCESS, select));
          },
          onCancel: () => {
            console.info("WANG TextPickerDialog:onCancel()")
            completeCb(new WeexProxyResult(ResultStr.CANCEL, ''));
          }
        })
    } catch (err) {
      console.info("WANG TextPickerDialog:err:" + JSON.stringify(err));
      completeCb(new WeexProxyResult(ResultStr.FAIL, ''));
    }
  }

  pickDate(options: ApiOptions) {
    const args: PickDateOptions = JSON.parse(options.args);
    const completeCb = options.completeCb;
    try {
      let pickDateParams: PickDateParams = (args as PickDateOptions).options;
      let selectedDate: Date = new Date(pickDateParams.value);
      console.info("WANG pickDateParams:" + JSON.stringify(pickDateParams));
      DatePickerDialog.show({
        start: new Date(pickDateParams.min),
        end: new Date(pickDateParams.max),
        selected: selectedDate,
        onDateAccept: (value: Date) => {
          // 通过Date的setFullYear方法设置按下确定按钮时的日期，这样当弹窗再次弹出时显示选中的是上一次确定的日期
          selectedDate.setFullYear(value.getFullYear(),value.getMonth(), value.getDate())
          selectedDate = value
          let dateRet = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
          console.info("WANG DatePickerDialog:onDateAccept()" + JSON.stringify(value))
          console.info("WANG DatePickerDialog:dateRet" + JSON.stringify(dateRet))
          console.info("WANG DatePickerDialog:selectedDate" + JSON.stringify(selectedDate.toLocaleString()))
          completeCb(new WeexProxyResult(ResultStr.SUCCESS, dateRet));
        },
        onCancel: () => {
          console.info("WANG DatePickerDialog:onCancel()")
          completeCb(new WeexProxyResult(ResultStr.CANCEL, ''));
        }
      })
    } catch (err) {
      console.info("WANG TextPickerDialog:err:" + JSON.stringify(err));
      completeCb(new WeexProxyResult(ResultStr.FAIL, ''));
    }
  }

  pickTime(options: ApiOptions) {
    const args: PickTimeOptions = JSON.parse(options.args);
    const completeCb = options.completeCb;
    try {
      let pickTimeParams: PickTimeParams = (args as PickTimeOptions).options;
      console.info("WANG pickDateParams:" + JSON.stringify(pickTimeParams));
      let year: number = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let fullMonth: string = '';
      if (month < 10) {
        fullMonth = '0' + month ;
      } else {
        fullMonth = month.toString();
      }
      let date: number = new Date().getDate();
      let strDateTime: string = year + '-' + fullMonth + '-' + date + 'T' + pickTimeParams.value + ':00'
      let selectTime: Date = new Date(strDateTime)

      TimePickerDialog.show({
        selected: selectTime,
        useMilitaryTime: true,
        onAccept: (value: TimePickerResult) => {
          selectTime.setHours(value.hour, value.minute);
          let hour: string = '';
          let minute: string = '';
          if (selectTime.getHours() < 10) {
            hour = '0' + selectTime.getHours().toString();
          } else {
            hour = selectTime.getHours().toString();
          }
          if (selectTime.getMinutes() < 10) {
            minute = '0' + selectTime.getMinutes().toString();
          } else {
            minute = selectTime.getMinutes().toString();
          }
          let timeRet: string = hour + ':' + minute;
          console.info("WANG TimePickerDialog:onAccept() timeRet:" + JSON.stringify(timeRet));
          completeCb(new WeexProxyResult(ResultStr.SUCCESS, timeRet));
        },
        onCancel: () => {
          console.info("WANG  TimePickerDialog:onCancel()")
          completeCb(new WeexProxyResult(ResultStr.CANCEL, ''));
        }
      })
    } catch (err) {
      console.info("TextPickerDialog:err:" + JSON.stringify(err));
      completeCb(new WeexProxyResult(ResultStr.FAIL, ''));
    }
  }
}

class PickOptions {
  options: PickParams;

  constructor(options: PickParams) {
    this.options = options;
  }
}

class PickParams {
  index: number | number[] = 0;
  items: string[] = [''];
}

class PickDateOptions {
  options: PickDateParams;

  constructor(options: PickDateParams) {
    this.options = options;
  }
}

class PickDateParams {
  value: string = '';
  max: string = '';
  min: string = ''
}

class PickTimeOptions {
  options: PickTimeParams;

  constructor(options: PickTimeParams) {
    this.options = options;
  }
}

class PickTimeParams {
  value: string = '';
}
