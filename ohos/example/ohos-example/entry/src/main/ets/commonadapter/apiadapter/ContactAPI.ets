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

import { CommonConfig, ContactInfo, WSContact } from 'webSceneAPI';
import { WeexResult } from '../apimodel/WeexResult';
import { ApiOptions } from 'WebSceneKitHsp';

export class ContactApi {
  chooseContact(options: ApiOptions) {
    const completeCb = options.completeCb;
    let wSContact: WSContact = new WSContact();
    let contactEvent: CommonConfig<Array<ContactInfo>> = new CommonConfig<Array<ContactInfo>>(
      (status: number, statusMessage: string, data?: Array<ContactInfo>) => {
        console.info('chooseContact complete data ' + JSON.stringify(data));
        completeCb(new WeexResult<Array<ContactResult>>(status, statusMessage, wrapContacts(data)));
      },
    );
    wSContact.chooseContact(contactEvent);
  }
}

function wrapContacts(contactsData: Array<ContactInfo> | undefined): Array<ContactResult> {
  if (!contactsData || contactsData.length === 0) {
    return [];
  }
  let resultArray: Array<ContactResult> = new Array();
  for (let contactData of contactsData) {
    let contactResult: ContactResult = new ContactResult(contactData.fullName, contactData.mobilePhoneNumber);
    resultArray.push(contactResult);
  }
  return resultArray;
}

export class ContactResult {
  mobile: string | undefined = '';
  name: string | undefined = '';

  constructor(name: string | undefined, mobile: string | undefined) {
    this.name = name;
    this.mobile = mobile;
  }
}
