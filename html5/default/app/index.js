/**
 * @fileOverview
 * Weex instance constructor & definition
 */
import { extend } from '../util'
import * as ctrl from './ctrl'
import AppInstance from './instance'

extend(AppInstance.prototype, ctrl)

export default AppInstance
