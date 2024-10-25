import wantConstant from '@ohos.ability.wantConstant'
export class WantConstantBase {
  static getAction(type) {
    return wantConstant.Action[type]
  }
}
