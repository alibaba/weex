/**
 * @deprecated after native register these modules
 */

/**
 * @module dom
 * @type {Array}
 */
export var dom = [
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
export var stream = [
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
export var event = [
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
export var pageInfo = [
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
export var animation = [

  {
    name: 'transition',
    args: ['string', 'object', 'function']
  }
]