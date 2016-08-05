/**
 * @fileOverview
 * instance controls from native
 *
 * - init bundle
 * - fire event
 * - callback
 * - destroy
 *
 * corresponded with the API of instance manager (framework.js)
 */
import { init } from './init'

export {
  updateActions,
  destroy,
  getRootElement,
  fireEvent,
  callback,
  refreshData
} from './misc'
