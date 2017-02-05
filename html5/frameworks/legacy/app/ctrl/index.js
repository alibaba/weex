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
export { init } from './init'

export {
  refresh,
  destroy,
  getRootElement,
  fireEvent,
  callback,
  updateActions,
  callTasks
} from './misc'
