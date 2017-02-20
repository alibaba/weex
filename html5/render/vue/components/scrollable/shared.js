import { extend } from '../../utils'
// import header from './header'
import refresh from './refresh'
import loading from './loading'

// export function createHeader (context, createElement) {
//   return createElement(header)
// }

export function createLoading (context, createElement, vnode) {
  const options = vnode.componentOptions
  return createElement(loading, extend({
    on: options.listeners
  }, vnode.data), options.children)
}

export function createRefresh (context, createElement, vnode) {
  const options = vnode.componentOptions
  return createElement(refresh, extend({
    on: options.listeners
  }, vnode.data), options.children)
}
