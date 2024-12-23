/**
  * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
  * Description: default description
  * Author: weisufang
  * Create: 04/12/2023
  * 需要权限: ohos.permission.WRITE_CONTACTS
  */

import contact from '@ohos.contact'
import { context } from '../../../base/bridge/abilityBase'
import abilityAccessCtrl from '@ohos.abilityAccessCtrl'
import { ErrorCode } from '../../../base/util/ErrorCode'

export default class ASContact {
  /**
   * 调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式（APP端目前没有选择步骤，将直接写入）
   * 写入手机系统通讯录，完成手机通讯录联系人和联系方式的增加。
   * @param {string} photoFilePath 头像本地文件路径
   * @param {string} nickName 昵称
   * @param {string} lastName 姓氏
   * @param {string} middleName 中间名
   * @param {string} firstName 名字
   * @param {string} remark 备注
   * @param {string} mobilePhoneNumber 手机号
   * @param {string} weChatNumber 微信号
   * @param {string} addressCountry 联系地址国家
   * @param {string} addressState 联系地址省份
   * @param {string} addressCity 联系地址城市
   * @param {string} addressStreet 联系地址街道
   * @param {string} addressPostalCode 联系地址邮政编码
   * @param {string} organization 公司
   * @param {string} title 职位
   * @param {string} workFaxNumber 工作传真
   * @param {string} workPhoneNumber 工作电话
   * @param {string} hostNumber 公司电话
   * @param {string} email 电子邮件
   * @param {string} url 网站
   * @param {string} workAddressCountry 工作地址国家
   * @param {string} workAddressState 工作地址省份
   * @param {string} workAddressCity 工作地址城市
   * @param {string} workAddressStreet 工作地址街道
   * @param {string} workAddressPostalCode 工作地址邮政编码
   * @param {string} homeFaxNumber 住宅传真
   * @param {string} homePhoneNumber 住宅电话
   * @param {string} homeAddressCountry 住宅地址国家
   * @param {string} homeAddressState 住宅地址省份
   * @param {string} homeAddressCity 住宅地址城市
   * @param {string} homeAddressStreet 住宅地址街道
   * @param {string} homeAddressPostalCode 住宅地址邮政编码
   * @param {function} success - 接口调用成功的回调函数
   * @param {function} fail - 接口调用失败的回调函数
   * @param {function} complete - 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  addPhoneContact (params) {
    return new Promise(async (resolve, reject) => {
      try {
        const atManager = abilityAccessCtrl.createAtManager()
        const { authResults, dialogShownResults} = await atManager.requestPermissionsFromUser(context, ['ohos.permission.WRITE_CONTACTS'])
        if (authResults[0] === 0) {
          console.debug('[AdvancedAPI] request WRITE_CONTACTS permission success')
        } else {
          // 权限拒绝
          reject(['request permission fail', ErrorCode.USER_REJECT, authResults[0], dialogShownResults[0]])
          return
        }
      } catch (err) {
        reject(['request permission fail', ErrorCode.USER_REJECT])
        return
      }
      const {
        photoFilePath,
        nickName = '',
        lastName = '',
        middleName = '',
        firstName = '',
        remark,
        mobilePhoneNumber,
        weChatNumber,
        addressCountry = '',
        addressState = '',
        addressCity = '',
        addressStreet = '',
        addressPostalCode,
        organization,
        url,
        workPhoneNumber,
        workFaxNumber,
        hostNumber,
        email,
        title,
        workAddressCountry = '',
        workAddressState = '',
        workAddressCity = '',
        workAddressStreet = '',
        workAddressPostalCode,
        homeFaxNumber,
        homePhoneNumber,
        homeAddressCountry = '',
        homeAddressState = '',
        homeAddressCity = '',
        homeAddressStreet = '',
        homeAddressPostalCode
      } = params

      if (!weChatNumber) {
        console.error('[AdvancedAPI] weChatNumber do not support.')
      }

      if (!firstName) {
        console.error('[AdvancedAPI] firstName is required.')
        reject(['fail Missing required parameter `firstName`', ErrorCode.PARAMETER_ERROR])
        return
      }

      const contactInfo = {
        name: {
          familyName: lastName,
          middleName: middleName,
          givenName: firstName,
          fullName: lastName + middleName + firstName
        },
        nickName: {
          nickName
        },
        emails: [{
          email: email,
          displayName: '邮箱'
        }],
        phoneNumbers: [{
          phoneNumber: homePhoneNumber,
          labelId: contact.PhoneNumber.NUM_HOME
        }, {
          phoneNumber: mobilePhoneNumber,
          labelId: contact.PhoneNumber.NUM_MOBILE
        }, {
          phoneNumber: homeFaxNumber,
          labelId: contact.PhoneNumber.NUM_FAX_HOME
        }, {
          phoneNumber: workFaxNumber,
          labelId: contact.PhoneNumber.NUM_FAX_WORK
        }, {
          phoneNumber: workPhoneNumber,
          labelId: contact.PhoneNumber.NUM_WORK
        }, {
          phoneNumber: hostNumber,
          labelId: contact.PhoneNumber.NUM_COMPANY_MAIN
        }],
        portrait: { uri: photoFilePath },
        postalAddresses: [{
          city: homeAddressCity,
          country: homeAddressCountry,
          postcode: homeAddressPostalCode,
          street: homeAddressStreet,
          postalAddress: homeAddressCountry + homeAddressState + homeAddressCity + homeAddressStreet,
          labelId: contact.PostalAddress.ADDR_HOME
        }, {
          city: workAddressCity,
          country: workAddressCountry,
          postcode: workAddressPostalCode,
          street: workAddressStreet,
          postalAddress: workAddressCountry + workAddressState + workAddressCity + workAddressStreet,
          labelId: contact.PostalAddress.ADDR_WORK
        }, {
          city: addressCity,
          country: addressCountry,
          postcode: addressPostalCode,
          street: addressStreet,
          postalAddress: addressCountry + addressState + addressCity + addressStreet,
          labelId: contact.PostalAddress.CUSTOM_LABEL
        }],
        websites: [{ website: url }],
        note: { noteContent: remark },
        organization: {
          name: organization,
          title
        }
      }

      contact.addContact(contactInfo).then((contactId) => {
        console.debug(`[AdvancedAPI] addContact callback: success contactId = ${contactId}`)
        resolve()
      }).catch((err) => {
        console.debug(`[AdvancedAPI] addContact callback: err->${JSON.stringify(err)}`)
        reject([err.data, err.code])
      })
    })
  }
}
