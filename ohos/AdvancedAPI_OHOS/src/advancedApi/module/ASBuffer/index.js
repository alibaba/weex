import buffer from '@ohos.buffer'

export default class ASBuffer {
  /**
   * 将 ArrayBuffer 对象转成 Base64 字符串
   * @param {arrayBuffer} arrayBuffer - 要转化成 ArrayBuffer 对象的 Base64 字符串
   * @return {string} - base64编码的字符串
   */
  arrayBufferToBase64 (arrayBuffer) {
    if (!arrayBuffer || arrayBuffer.byteLength === undefined) {
      return new Error('[AdvancedAPI] [arrayBufferToBase64] param type is not arrayBuffer')
    }
    if (!(arrayBuffer instanceof Uint8Array)) {
      arrayBuffer = new Uint8Array(arrayBuffer)
    }
    const buf = buffer.allocUninitializedFromPool(arrayBuffer.byteLength)
    const b = buf.fill(arrayBuffer)
    return b.toString('base64')
  }
}
