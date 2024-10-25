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
import contact from '@ohos.contact';
import { CallBackAdapter } from '../../model/CallBackAdapter';
import { CommonConfig } from '../../common/entity/CommonConfig';
import Log from '../../common/log/Log';
import { StatusCode } from '../../common/entity/StatusCode';

/**
 * The contact management class provides the method of operating the address book.
 */
export class WSContact {
  /**
   * Select one or more contacts.
   *
   * @param {CommonConfig<Array<ContactInfo>>} contactConfig Result callback.
   */
  @CallBackAdapter
  public chooseContact(contactConfig: CommonConfig<Array<ContactInfo>>) {
    contact.selectContacts({
      isMultiSelect: true
    }, (err: BusinessError, data: Array<contact.Contact>) => {
      if (err) {
        Log.error(`select contacts error code-> ${err.code} , message->${err.message}`);
        contactConfig.complete(StatusCode.FAIL, err.message);
        return;
      }
      if (data.length > 0) {
        contactConfig.complete(StatusCode.SUCCESS, StatusMsg.SUCCESS, this.wrapContacts(data));
        return;
      }
      contactConfig.complete(StatusCode.CANCEL, StatusMsg.CANCEL);
    });
  }

  private wrapContacts(contactsData: Array<contact.Contact>): Array<ContactInfo> {
    let contactsWrapped: Array<ContactInfo> = [];
    for (let contactData of contactsData) {
      contactsWrapped.push(this.wrapContact(contactData));
    }
    return contactsWrapped;
  }

  private wrapContact(contactData: contact.Contact): ContactInfo {
    let contactWrapped: ContactInfo = new ContactInfo();
    contactWrapped.familyName = contactData.name?.familyName;
    contactWrapped.middleName = contactData.name?.middleName;
    contactWrapped.givenName = contactData.name?.givenName;
    contactWrapped.fullName = contactData.name?.fullName;
    contactWrapped.nickName = contactData.nickName?.nickName;
    contactWrapped.emails = contactData.emails?.pop()?.email;
    contactWrapped.websiteUrl = contactData.websites?.pop()?.website;
    contactWrapped.remark = contactData.note?.noteContent;
    contactWrapped.mobilePhoneNumber = contactData.phoneNumbers?.pop()?.phoneNumber;
    contactWrapped.organization = contactData.organization?.name;
    contactWrapped.title = contactData.organization?.title;
    this.setPostalAddressResult(contactWrapped, contactData.postalAddresses ?? []);
    return contactWrapped;
  }

  private setPostalAddressResult(contactWrapped: ContactInfo, postalAddress: contact.PostalAddress[]) {
    for (let i = 0; i < postalAddress.length; i++) {
      let workPostalAddress: contact.PostalAddress = postalAddress[i];
      switch (workPostalAddress.labelId) {
        case contact.PostalAddress.ADDR_WORK:
          contactWrapped.workAddressCountry = workPostalAddress.country;
          contactWrapped.workAddressRegion = workPostalAddress.region;
          contactWrapped.workAddressCity = workPostalAddress.city;
          contactWrapped.workAddressStreet = workPostalAddress.street;
          contactWrapped.workAddressPostalCode = workPostalAddress.postcode;
          break;
        case contact.PostalAddress.ADDR_HOME:
          contactWrapped.homeAddressCountry = workPostalAddress.country;
          contactWrapped.homeAddressRegion = workPostalAddress.region;
          contactWrapped.homeAddressCity = workPostalAddress.city;
          contactWrapped.homeAddressStreet = workPostalAddress.street;
          contactWrapped.homeAddressPostalCode = workPostalAddress.postcode;
          break;
        default:
          break;
      }
    }
  }
}

/**
 * Contact information to be returned.
 */
export class ContactInfo {
  familyName?: string;
  middleName?: string;
  givenName?: string;
  fullName?: string;
  nickName?: string;
  emails?: string;
  websiteUrl?: string;
  remark?: string;
  mobilePhoneNumber?: string;
  organization?: string;
  title?: string;
  workAddressCountry?: string;
  workAddressRegion?: string;
  workAddressCity?: string;
  workAddressStreet?: string;
  workAddressPostalCode?: string;
  homeAddressCountry?: string;
  homeAddressRegion?: string;
  homeAddressCity?: string;
  homeAddressStreet?: string;
  homeAddressPostalCode?: string;
}

enum StatusMsg {
  SUCCESS = '获取联系人信息成功',
  CANCEL = '⽤⼾取消操作'
}