'use strict'

import Vlist from './vlist'
import Hlist from './hlist'

function init (Weex) {
  Weex.install(Vlist)
  Weex.install(Hlist)
}

export default { init }
