import { checkDataType } from '../../../base/util/checkDataType'

export default class FileCallback {
  constructor({ success, fail, complete }) {
    if (checkDataType(success, false, 'function')) {
      this.successFn = success
    }
    if (checkDataType(fail, false, 'function')) {
      this.failFn = fail
    }
    if (checkDataType(complete, false, 'function')) {
      this.completeFn = complete
    }
  }

  success (...args) {
    if (this.successFn) {
      try {
        this.successFn(...args)
      } catch (err) {
        console.error(err)
      }
    }
    if (this.completeFn) {
      try {
        this.completeFn(...args)
      } catch (err) {
        console.error(err)
      }
    }
  }

  fail (...args) {
    if (this.failFn) {
      try {
        this.failFn(...args)
      } catch (err) {
        console.error(err)
      }
    }
    if (this.completeFn) {
      try {
        this.completeFn(...args)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
