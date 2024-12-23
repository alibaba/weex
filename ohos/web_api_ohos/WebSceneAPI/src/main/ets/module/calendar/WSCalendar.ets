/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BusinessError } from '@ohos.base';
import BusinessConstants from '../../common/constants/BusinessConstants'
import common from '@ohos.app.ability.common';
import calendarManager from '@ohos.calendarManager';
import { CommonConfig } from '../../common/entity/CommonConfig';
import { CallBackAdapter } from '../../model/CallBackAdapter';
import { GlobalThis } from '../../model/GlobalThis';
import PermissionUtil from '../../common/utils/PermissionUtil';
import Log from '../../common/log/Log';
import { StatusCode } from '../../common/entity/StatusCode';

const TAG: string = 'WSCalendar';

export class WSCalendar {
  /**
   * Add an event to the system calendar.
   *
   * @param addCalendarConfig Result callback.
   */
  @CallBackAdapter
  public addPhoneCalendar(addCalendarConfig: AddCalendarConfig) {
    if (!this.paramsCheckSuccess(addCalendarConfig)) {
      return;
    }
    let context: common.UIAbilityContext | undefined = GlobalThis.getInstance().getContext();
    if (context === undefined) {
      Log.error(TAG, BusinessConstants.CONTEXT_UNDEFINED);
      addCalendarConfig.complete(StatusCode.FAIL, BusinessConstants.CONTEXT_UNDEFINED);
      return;
    }
    PermissionUtil.RequestPermissions(BusinessConstants.CALENDAR_PERMISSIONS, (data: boolean) => {
      if (data) {
        let calendarMgr: calendarManager.CalendarManager = calendarManager.getCalendarManager(context);
        const calendarAccount: calendarManager.CalendarAccount = {
          name: 'default',
          type: calendarManager.CalendarType.BIRTHDAY
        };
        try {
          calendarMgr.createCalendar(calendarAccount, (err: BusinessError, dataCalendar: calendarManager.Calendar) => {
            if (err) {
              addCalendarConfig.complete(StatusCode.FAIL, err.message);
              return;
            }
            dataCalendar.addEvent(this.getEvent(addCalendarConfig), (err: BusinessError, data: number): void => {
              if (err) {
                calendarMgr.deleteCalendar(dataCalendar, (err: BusinessError) => {
                  addCalendarConfig.complete(StatusCode.FAIL, err.message);
                  return;
                })
              }
              addCalendarConfig.complete(StatusCode.SUCCESS, StatusMsg.SUCCESS);
            });
          });
        } catch (error) {
          addCalendarConfig.complete(StatusCode.FAIL, error.message);
        }
      } else {
        addCalendarConfig.complete(StatusCode.UNAUTHORIZED, StatusMsg.UNAUTHORIZED);
      }
    })
  }

  private paramsCheckSuccess(addCalendarConfig: AddCalendarConfig): boolean {
    let mStarTime: number = addCalendarConfig.startTime;
    let mEndTime: number = addCalendarConfig.endTime;
    if (!mStarTime || mStarTime < 0) {
      addCalendarConfig.complete(StatusCode.FAIL, StatusMsg.START_TIME_ILLEGAL);
      return false;
    }
    if (!mEndTime || mEndTime < 0) {
      addCalendarConfig.complete(StatusCode.FAIL, StatusMsg.END_TIME_ILLEGAL);
      return false;
    }
    if (mStarTime > mEndTime) {
      addCalendarConfig.complete(StatusCode.FAIL, StatusMsg.START_TIME_LARGER);
      return false;
    }
    return true;
  }

  private getEvent(addCalendarConfig: AddCalendarConfig): calendarManager.Event {
    let event: calendarManager.Event = {
      title: addCalendarConfig.title,
      type: calendarManager.EventType.NORMAL,
      startTime: addCalendarConfig.startTime,
      endTime: addCalendarConfig.endTime,
      isAllDay: addCalendarConfig.allDay,
      description: addCalendarConfig.description,
      location: {
        location: addCalendarConfig.location
      },
      reminderTime: addCalendarConfig.reminderTime
    };
    return event;
  }
}

/**
 * AddCalendarConfig Information class.
 */
export class AddCalendarConfig extends CommonConfig<string> {
  title: string = '';
  startTime: number = 0;
  endTime: number = 0;
  allDay?: boolean;
  description?: string;
  location?: string;
  alarm?: boolean;
  alarmOffset?: number;
  reminderTime?: number[];
}

enum StatusMsg {
  SUCCESS = '向系统日历添加事件成功',
  UNAUTHORIZED = '权限未授权',
  START_TIME_ILLEGAL = 'StarTime不合法',
  END_TIME_ILLEGAL = 'EndTime不合法',
  START_TIME_LARGER = 'StarTime不能大于EndTime'
}



