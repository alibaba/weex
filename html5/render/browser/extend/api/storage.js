/* global localStorage */
'use strict'

const supportLocalStorage = typeof localStorage !== 'undefined'
const SUCCESS = 'success'
const FAILED = 'failed'
const INVALID_PARAM = 'invalid_param'
const UNDEFINED = 'undefined'

const storage = {

  /**
   * When passed a key name and value, will add that key to the storage,
   * or update that key's value if it already exists.
   * @param {string} key
   * @param {string} value
   * @param {function} callbackId
   */
  setItem: function (key, value, callbackId) {
    if (!supportLocalStorage) {
      console.error('your browser is not support localStorage yet.')
      return
    }
    const sender = this.sender
    if (!key || !value) {
      sender.performCallback(callbackId, {
        result: 'failed',
        data: INVALID_PARAM
      })
      return
    }
    try {
      localStorage.setItem(key, value)
      sender.performCallback(callbackId, {
        result: SUCCESS,
        data: UNDEFINED
      })
    }
    catch (e) {
      // accept any exception thrown during a storage attempt as a quota error
      sender.performCallback(callbackId, {
        result: FAILED,
        data: UNDEFINED
      })
    }
  },

  /**
   * When passed a key name, will return that key's value.
   * @param {string} key
   * @param {function} callbackId
   */
  getItem: function (key, callbackId) {
    if (!supportLocalStorage) {
      console.error('your browser is not support localStorage yet.')
      return
    }
    const sender = this.sender
    if (!key) {
      sender.performCallback(callbackId, {
        result: FAILED,
        data: INVALID_PARAM
      })
      return
    }
    const val = localStorage.getItem(key)
    sender.performCallback(callbackId, {
      result: val ? SUCCESS : FAILED,
      data: val || UNDEFINED
    })
  },

  /**
   *When passed a key name, will remove that key from the storage.
   * @param {string} key
   * @param {function} callbackId
   */
  removeItem: function (key, callbackId) {
    if (!supportLocalStorage) {
      console.error('your browser is not support localStorage yet.')
      return
    }
    const sender = this.sender
    if (!key) {
      sender.performCallback(callbackId, {
        result: FAILED,
        data: INVALID_PARAM
      })
      return
    }
    localStorage.removeItem(key)
    sender.performCallback(callbackId, {
      result: SUCCESS,
      data: UNDEFINED
    })
  },

  /**
   * Returns an integer representing the number of data items stored in the Storage object.
   * @param {function} callbackId
   */
  length: function (callbackId) {
    if (!supportLocalStorage) {
      console.error('your browser is not support localStorage yet.')
      return
    }
    const sender = this.sender
    const len = localStorage.length
    sender.performCallback(callbackId, {
      result: SUCCESS,
      data: len
    })
  },

  /**
   * Returns an array that contains all keys stored in Storage object.
   * @param {function} callbackId
   */
  getAllKeys: function (callbackId) {
    if (!supportLocalStorage) {
      console.error('your browser is not support localStorage yet.')
      return
    }
    const sender = this.sender
    const _arr = []
    for (let i = 0; i < localStorage.length; i++) {
      _arr.push(localStorage.key(i))
    }
    sender.performCallback(callbackId, {
      result: SUCCESS,
      data: _arr
    })
  }
}

const meta = {
  storage: [{
    name: 'setItem',
    args: ['string', 'string', 'function']
  }, {
    name: 'getItem',
    args: ['string', 'function']
  }, {
    name: 'removeItem',
    args: ['string', 'function']
  }, {
    name: 'length',
    args: ['function']
  }, {
    name: 'getAllKeys',
    args: ['function']
  }]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('storage', storage, meta)
  }
}
