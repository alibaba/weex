import router from '@ohos.router'
import { ErrorCode } from '../../../base/util/ErrorCode'

export default class ASRouter {
  /**
   * 保留当前页面，跳转到应用内的某个页面
   * @param {string} url - 需要跳转的应用内非 tabBar 的页面的路径
   * @param {string} animationType - 窗口显示的动画效果（不支持）
   * @param {number} animationDuration - 窗口动画持续时间，单位为 ms（不支持）
   * @param {object} events - 页面间通信接口，用于监听被打开页面发送到当前页面的数据。（不支持）
   * @param {function} success
   * @param {function} fail
   * @param {function} complete
   */
  navigateTo (params) {
    return new Promise((resolve, reject) => {
      if (typeof params.url !== 'string') {
        reject(['param url', ErrorCode.PARAMETER_ERROR])
        return
      }
      const { url, urlParams } = getUrlParams(params.url)
      console.debug('[AdvancedAPI] navigateTo urlParams = %s', JSON.stringify(urlParams))
      router.pushUrl({
        url: url,
        params: urlParams
      }).then(() => {
        resolve()
      }).catch(err => {
        console.error(`[AdvancedAPI] pushUrl failed, code is ${err.code}, message is ${err.message}`)
        reject([err.message, err.code])
      })
    })
  }

  /**
   * 关闭当前页面，跳转到应用内的某个页面
   * @param {string} url - 需要跳转的应用内非 tabBar 的页面的路径
   * @param {function} success
   * @param {function} fail
   * @param {function} complete
   */
  redirectTo (params) {
    return new Promise((resolve, reject) => {
      if (typeof params.url !== 'string') {
        reject(['param url', ErrorCode.PARAMETER_ERROR])
        return
      }
      const { url, urlParams } = getUrlParams(params.url)
      console.debug('[AdvancedAPI] redirectTo urlParams = ' + JSON.stringify(urlParams))
      router.replaceUrl({
        url,
        params: urlParams
      }).then(() => {
        resolve()
      }).catch(err => {
        console.error(`[AdvancedAPI] replaceUrl failed, code is ${err.code}, message is ${err.message}`)
        reject([err.message, err.code])
      })
    })
  }

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
   * 当时无法实现：需要通过api来控制tabs组件的index
   * @param {string} url - 需要跳转的 tabBar 页面的路径
   * @param {function} success
   * @param {function} fail
   * @param {function} complete
   */
  switchTab (params) {
    return new Promise(async (resolve, reject) => {
      reject('[AdvancedAPI] switchTab do not support')
    })
  }

  /**
   * 关闭当前页面，返回上一页面或多级页面。
   * @param {number} delta - 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
   * @param {string} animationType - 窗口关闭的动画效果
   * @param {number} animationDuration - 窗口关闭动画的持续时间，单位为 ms
   * @param {function} success
   * @param {function} fail
   * @param {function} complete
   */
  navigateBack (params) {
    return new Promise((resolve, reject) => {
      let { delta = 1 } = params
      if (delta === null) {
        delta = 1
      }
      if (typeof delta !== 'number') {
        reject(['parameter delta', ErrorCode.PARAMETER_ERROR])
        return
      }
      const pageLengths = Number(router.getLength())
      if (delta > pageLengths) {
        delta = pageLengths - 1
      }
      try {
        // 此处应该是要获取到页面栈所有对象的路径，然后调用鸿蒙的back接口指定返回页面的路劲
        // 但是鸿蒙没有提供获取所有页面路径的接口
        for (let i = 0; i < delta; i++) {
          router.back()
        }
        resolve()
      } catch (err) {
        reject([err.data, err.code])
      }
    })
  }
}

/**
  * 解析url=pages/Index?id=1&name=uniapp
  * @param {string} url
  * @return {object} object
  */
function getUrlParams (url = '') {
  const urlParams = {}
  const urlArr = url.split('?')
  url = urlArr[0]
  let tempParams = urlArr[1] || ''
  tempParams = tempParams.split('&')
  tempParams.forEach(item => {
    const itemArr = item.split('=')
    urlParams[itemArr[0]] = itemArr[1]
  })
  return { url, urlParams }
}
