import oWindow from '@ohos.window'

export const TYPE_SYSTEM = 1 // 表示系统窗口

function getWinDisplay(ctx) {
  return new Promise(res => {
    if (globalThis.isStageModel) {
      oWindow.getLastWindow(ctx, (err, data) => {
        if (err.code) {
          console.error('[QAFAPI] Failed to obtain the top window. Cause: ' + JSON.stringify(err))
        } else {
          res(data)
        }
      })
    } else {
      oWindow.getLastWindow((err, data) => {
        if (err.code) {
          console.error('[QAFAPI] Failed to obtain the top window. Cause: ' + JSON.stringify(err))
        } else {
          res(data)
        }
      })
    }
  })
}

export class AsyncWindowBase {
  static async getWindow (ctx) {
    const windowClass1 = await getWinDisplay(ctx)
    return new Promise(res => {
      windowClass1.getProperties().then((data) => {
        if (data.type === TYPE_SYSTEM) {
          res(data.windowRect)
        }
      }).catch((err) => {
        console.error('[QAFAPI] window.getProperties Failed to obtain the area. Cause:' + JSON.stringify(err))
      })
    })
  }
  static async getCutout (ctx) {
    const windowClass2 = await getWinDisplay(ctx)
    return new Promise(res => {
      windowClass2.getAvoidArea(oWindow.AvoidAreaType.TYPE_CUTOUT, (errs, data) => {
        if (errs.code) {
          console.error('[QAFAPI] window Failed to obtain the area. Cause:' + JSON.stringify(errs))
        } else {
          res(data)
        }
      })
    })
  }
  static async getSystemCutout (ctx) {
    const windowClass2 = await getWinDisplay(ctx)
    return new Promise(res => {
      windowClass2.getAvoidArea(oWindow.AvoidAreaType.TYPE_SYSTEM, (errs, data) => {
        if (errs.code) {
          console.error('[QAFAPI] window Failed to obtain the area. Cause:' + JSON.stringify(errs))
        } else {
          res(data)
        }
      })
    })
  }
}
