/**
 * @deprecated after native register these modules
 */

/**
 * @module dom
 * @type {Array}
 */
export const dom = [
  /**
   * @method scrollToElement
   * @param {string} ref
   * @param {object} options
   * @param {number} options.offset
   */
  {
    name: 'scrollToElement',
    args: ['string', 'object']
  }
]

/**
 * @module stream
 */
export const stream = [
  /**
   * @method sendHttp
   * @param  {object} params
   * @param  {string} params.url
   * @param  {string} [params.method]
   * @param  {object} [params.header]
   * @param  {object} params.body
   * @param  {function} callback
   */
  {
    name: 'sendHttp',
    args: ['object', 'function']
  }
]

/**
 * @module event
 */
export const event = [
  /**
   * @method openURL
   * @param {string} url
   */
  {
    name: 'openURL',
    args: ['string']
  }
]

/**
 * @module pageInfo
 */
export const pageInfo = [
  /**
   * @method setTitle
   * @param {string} text
   */
  {
    name: 'setTitle',
    args: ['string']
  }
]

/**
 * @module animation
 */
export const animation = [

  {
    name: 'transition',
    args: ['string', 'object', 'function']
  }
]
