'use strict'

import list from './list'
import scroller from './scroller'
import refresh from './refresh'
import loading from './loading'

export default {
  init: function (Weex) {
    Weex.install(list)
    Weex.install(scroller)
    Weex.install(refresh)
    Weex.install(loading)
  }
}

/* eslint-disable */
;
/* eslint-enable */
