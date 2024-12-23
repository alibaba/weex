import promptAction from '@ohos.promptAction'
export class PromptBase {
  static showToast (params) {
    return new Promise((resolve, reject) => {
      promptAction.showToast(params)
      resolve()
    })
  }

  static showDialog (params, callback) {
    return new Promise((resolve, reject) => {
      promptAction.showDialog(params, callback)
    })
  }

  static showActionMenu (params, callback) {
    return new Promise((resolve, reject) => {
      promptAction.showActionMenu(params, callback)
    })
  }

  // 弹框(返回promise)
  static ohosShowDialog (params) {
    return promptAction.showDialog(params)
  }
}
