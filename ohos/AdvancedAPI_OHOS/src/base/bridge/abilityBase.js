/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 * Description: ohos ability
 * Author: weisufang
 * Create: 03/7/2022
 * Notes: N/A
 */

import abilityFeatureAbility from '@ohos.ability.featureAbility'

let context = abilityFeatureAbility.getContext()
function initContextOnStageModel (contextOnStageMode) {
  context = contextOnStageMode
  if (!context.startAbilityForResult) {
    context.startAbilityForResult = context.startAbility
  }
  context.getAbilityInfo = function() {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.abilityInfo)
      } catch (error) {
        reject(error)
      }
    })
  }
  context.getFilesDir = function() {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.filesDir)
      } catch (error) {
        reject(error)
      }
    })
  }
  context.getCacheDir = function() {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.cacheDir)
      } catch (error) {
        reject(error)
      }
    })
  }
}

class AbilityBase {
  static abilityInfo = {}

  static hasAbilityInfo = false

  static getAbilityInfo () {
    return new Promise((resolve, reject) => {
      if (this.hasAbilityInfo) {
        resolve(this.abilityInfo)
        return
      }
      context.getAbilityInfo().then(data => {
        this.hasAbilityInfo = true
        this.abilityInfo = data
        console.log('[QAFAPI] getAbilityInfo successful. ')
        resolve(data)
      }).catch((error) => {
        console.error('[QAFAPI] getAbilityInfo failed. Cause: ' + JSON.stringify(error))
        reject(error)
      })
    })
  }
}

export { abilityFeatureAbility, context, AbilityBase, initContextOnStageModel }
