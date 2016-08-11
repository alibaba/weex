/**
 * @fileOverview
 * Weex instance constructor & definition
 */
import * as ctrl from './ctrl'
import { extend } from '../../utils'
import AppInstance from '../../../default/app/instance'

extend(AppInstance.prototype, ctrl)

export default AppInstance
