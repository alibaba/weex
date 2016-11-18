'use strict'

import Weex from './render/index'

import root from './base/root'
import div from './base/div'
import droot from './base/droot'

// install the extended apis and components.
import extensions from './extend'

Weex.install(root)
Weex.install(div)
Weex.install(droot)

Weex.install(extensions)

global.registerComponents([
  { type: 'input', methods: ['focus', 'blur'] }
])

export default Weex
