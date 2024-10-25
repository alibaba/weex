import Binding from 'weex-bindingx';
const weexModule = weex.requireModule('weexModule') 


/**
 * 元素绑定的appear、disappear事件集合
 */
const appearOrDisappearMap = []

// 阻止冒泡事件
function stopModifier(e){
  e.stopPropagation()
}

// 阻止默认事件
function preventModifier(e){
  e.cancelable && e.preventDefault();
}

const modifierMap = new Map([
  ['stop', stopModifier],
  ['prevent', preventModifier],
])

// touchstart 手势事件
function touchstart(elements, touchEventMap){
  // 放缩倍率
  const rate = 750 / document.documentElement.clientWidth
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler
  const modifiers = touchEventMap.modifier

  elementArray.forEach((element) => {
    element.addEventListener('touchstart', (event) =>{
      
      if(typeof callback == 'function') {
        const callbackParams = {
          changedTouches: [{
            identifier: event.changedTouches[0].identifier,
            pageX: event.changedTouches[0].pageX,
            pageY: event.changedTouches[0].pageY,
            screenX: event.changedTouches[0].screenX * rate,
            screenY: event.changedTouches[0].screenY * rate,
            force: event.changedTouches[0].force
          }]
        }
        if(params.length == 0) {
          callback(callbackParams)
        } else {
          const paramsArray = []
          const firstParam = params[0]
          if(firstParam == 'event') {
            paramsArray.push(callbackParams)
            params.slice(1).forEach((item) => {
              const attrValue = element.attrs[item]
              paramsArray.push(attrValue)
            })
          } else {
              params.forEach((item) => {
              const attrValue = element.getAttribute(item)
              paramsArray.push(attrValue)
            })
          }
          callback(...paramsArray)
        }
      }

      // 处理修饰符
      modifiers.forEach((modifier) => {
        modifierMap.get(modifier)(event)
      })
    })
  })
}

// touchmove 手势事件
function touchmove(elements, touchEventMap){
  const rate = 750 / document.documentElement.clientWidth
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler
  const modifiers = touchEventMap.modifier

  elementArray.forEach((element) => {
    element.addEventListener('touchmove', (event) =>{
      if(typeof callback == 'function') {
        const callbackParams = {
          changedTouches: [{
            identifier: event.changedTouches[0].identifier,
            pageX: event.changedTouches[0].pageX,
            pageY: event.changedTouches[0].pageY,
            screenX: event.changedTouches[0].screenX * rate,
            screenY: event.changedTouches[0].screenY * rate,
            force: event.changedTouches[0].force
          }]
        }
        if(params.length == 0) {
          callback(callbackParams)
        } else {
          const paramsArray = []
          const firstParam = params[0]
          if(firstParam == 'event') {
            paramsArray.push(callbackParams)
            params.slice(1).forEach((item) => {
              const attrValue = element.attrs[item]
              paramsArray.push(attrValue)
            })
          } else {
              params.forEach((item) => {
              const attrValue = element.getAttribute(item)
              paramsArray.push(attrValue)
            })
          }
          callback(...paramsArray)
        }
      }
      // 处理修饰符
      modifiers.forEach((modifier) => {
        modifierMap.get(modifier)(event)
      })
    })
  })
}

// touchend 手势事件
function touchend(elements, touchEventMap){
  const rate = 750 / document.documentElement.clientWidth
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler
  const modifiers = touchEventMap.modifier
  
  elementArray.forEach((element) => {
    element.addEventListener('touchend', (event) =>{
      if(typeof callback == 'function') {
        const callbackParams = {
          changedTouches: [{
            identifier: event.changedTouches[0].identifier,
            pageX: event.changedTouches[0].pageX,
            pageY: event.changedTouches[0].pageY,
            screenX: event.changedTouches[0].screenX * rate,
            screenY: event.changedTouches[0].screenY * rate,
            force: event.changedTouches[0].force
          }]
        }
        if(params.length == 0) {
          callback(callbackParams)
        } else {
          const paramsArray = []
          const firstParam = params[0]
          if(firstParam == 'event') {
            paramsArray.push(callbackParams)
            params.slice(1).forEach((item) => {
              const attrValue = element.attrs[item]
              paramsArray.push(attrValue)
            })
          } else {
              params.forEach((item) => {
              const attrValue = element.getAttribute(item)
              paramsArray.push(attrValue)
            })
          }
          callback(...paramsArray)
        }
      }

      // 处理修饰符
      modifiers.forEach((modifier) => {
        modifierMap.get(modifier)(event)
      })
    })
  })
}

// horizontalpan 手势事件，当用户水平滑动时会触发
function horizontalpan(elements, touchEventMap){
  const rate = 750 / document.documentElement.clientWidth
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler

  elementArray.forEach((element) => {
      // 定义变量记录触摸时的初始位置
      let startX = 0
      let endX = 0
      let startY = 0
      let endY = 0

      element.addEventListener('touchstart', (event) => {
        startX = event.touches[0].pageX
        startY = event.touches[0].pageY
        const callbackParams = {
          state: 'start',
          changedTouches: [{
            identifier: event.changedTouches[0].identifier,
            pageX: event.changedTouches[0].pageX,
            pageY: event.changedTouches[0].pageY,
            screenX: event.changedTouches[0].screenX * rate,
            screenY: event.changedTouches[0].screenY * rate,
            force: event.changedTouches[0].force
          }]
        }
        callback(callbackParams)
      })
      element.addEventListener('touchmove', (event) => {
        const callbackParams = {
          state: 'move',
          changedTouches: [{
            identifier: event.changedTouches[0].identifier,
            pageX: event.changedTouches[0].pageX,
            pageY: event.changedTouches[0].pageY,
            screenX: event.changedTouches[0].screenX * rate,
            screenY: event.changedTouches[0].screenY * rate,
            force: event.changedTouches[0].force
          }]
        }
        callback(callbackParams)
      })
      element.addEventListener('touchend', (event) => {
        endX = event.changedTouches[0].pageX;
        const dx = endX - startX
        if(Math.abs(dx) > 10) {
          const callbackParams = {
            state: 'end',
            changedTouches: [{
              identifier: event.changedTouches[0].identifier,
              pageX: event.changedTouches[0].pageX,
              pageY: event.changedTouches[0].pageY,
              screenX: event.changedTouches[0].screenX * rate,
              screenY: event.changedTouches[0].screenY * rate,
              force: event.changedTouches[0].force
            }]
          }
          if(params.length == 0) {
            callback(callbackParams)
          } else {
            const paramsArray = []
            const firstParam = params[0]
            if(firstParam == 'event') {
              paramsArray.push(callbackParams)
              params.slice(1).forEach((item) => {
                const attrValue = element.attrs[item]
                paramsArray.push(attrValue)
              })
            } else {
                params.forEach((item) => {
                const attrValue = element.getAttribute(item)
                paramsArray.push(attrValue)
              })
            }
            callback(...paramsArray)
          }
        }
      })
  })
}

// longpress 手势事件
function longpress(elements, touchEventMap){
  const rate = 750 / document.documentElement.clientWidth
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler

  elementArray.forEach((element) => {
    let start = 0
    element.addEventListener('touchstart', (event) => {
        start = Date.now()
    });
  
    element.addEventListener('touchend', (event) => {
        let currenttime = Date.now()
        if (currenttime - start > 500) {
          const callbackParams = {
            changedTouches: [{
              identifier: event.changedTouches[0].identifier,
              pageX: event.changedTouches[0].pageX,
              pageY: event.changedTouches[0].pageY,
              screenX: event.changedTouches[0].screenX * rate,
              screenY: event.changedTouches[0].screenY * rate,
              force: event.changedTouches[0].force
            }]
          }
          if(params.length == 0) {
            callback(callbackParams)
          } else {
            const paramsArray = []
            const firstParam = params[0]
            if(firstParam == 'event') {
              paramsArray.push(callbackParams)
              params.slice(1).forEach((item) => {
                const attrValue = element.attrs[item]
                paramsArray.push(attrValue)
              })
            } else {
                params.forEach((item) => {
                const attrValue = element.getAttribute(item)
                paramsArray.push(attrValue)
              })
            }
            callback(...paramsArray)
          }
        }
      }
    )
  })
}

// panstart 手势事件
function panstart(elements, touchEventMap){
  const rate = 750 / document.documentElement.clientWidth
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler
  elementArray.forEach((element) => {
    element.addEventListener('touchstart', (event) =>{
      if(typeof callback == 'function') {
        const callbackParams = {
          changedTouches: [{
            identifier: event.changedTouches[0].identifier,
            pageX: event.changedTouches[0].pageX,
            pageY: event.changedTouches[0].pageY,
            screenX: event.changedTouches[0].screenX * rate,
            screenY: event.changedTouches[0].screenY * rate,
            force: event.changedTouches[0].force
          }]
        }
        if(params.length == 0) {
          callback(callbackParams)
        } else {
          const paramsArray = []
          const firstParam = params[0]
          if(firstParam == 'event') {
            paramsArray.push(callbackParams)
            params.slice(1).forEach((item) => {
              const attrValue = element.attrs[item]
              paramsArray.push(attrValue)
            })
          } else {
              params.forEach((item) => {
              const attrValue = element.getAttribute(item)
              paramsArray.push(attrValue)
            })
          }
          callback(...paramsArray)
        }
      }
    })
  })
}

// panmove 手势事件
function panmove(elements, touchEventMap){
  const rate = 750 / document.documentElement.clientWidth
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler

  elementArray.forEach((element) => {
    element.addEventListener('touchmove', (event) =>{
      if(typeof callback == 'function') {
        const callbackParams = {
          changedTouches: [{
            identifier: event.changedTouches[0].identifier,
            pageX: event.changedTouches[0].pageX,
            pageY: event.changedTouches[0].pageY,
            screenX: event.changedTouches[0].screenX * rate,
            screenY: event.changedTouches[0].screenY * rate,
            force: event.changedTouches[0].force
          }]
        }
        if(params.length == 0) {
          callback(callbackParams)
        } else {
          const paramsArray = []
          const firstParam = params[0]
          if(firstParam == 'event') {
            paramsArray.push(callbackParams)
            params.slice(1).forEach((item) => {
              const attrValue = element.attrs[item]
              paramsArray.push(attrValue)
            })
          } else {
              params.forEach((item) => {
              const attrValue = element.getAttribute(item)
              paramsArray.push(attrValue)
            })
          }
          callback(...paramsArray)
        }
      }
    })
  })
}

// panend 手势事件
function panend(elements, touchEventMap){
  const rate = 750 / document.documentElement.clientWidth
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler

  elementArray.forEach((element) => {
    element.addEventListener('touchend', (event) =>{
      if(typeof callback == 'function') {
        const callbackParams = {
          changedTouches: [{
            identifier: event.changedTouches[0].identifier,
            pageX: event.changedTouches[0].pageX,
            pageY: event.changedTouches[0].pageY,
            screenX: event.changedTouches[0].screenX * rate,
            screenY: event.changedTouches[0].screenY * rate,
            force: event.changedTouches[0].force
          }]
        }
        if(params.length == 0) {
          callback(callbackParams)
        } else {
          const paramsArray = []
          const firstParam = params[0]
          if(firstParam == 'event') {
            paramsArray.push(callbackParams)
            params.slice(1).forEach((item) => {
              const attrValue = element.attrs[item]
              paramsArray.push(attrValue)
            })
          } else {
              params.forEach((item) => {
              const attrValue = element.getAttribute(item)
              paramsArray.push(attrValue)
            })
          }
          callback(...paramsArray)
        }
      }
    })
  })
}

// verticalpan 手势事件, 用户垂直滑动时触发
function verticalpan(elements, touchEventMap){
  const rate = 750 / document.documentElement.clientWidth
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler

  elementArray.forEach((element) => {
    let startY = 0
    let endY = 0
  
    element.addEventListener('touchstart', (event) => {
      startY = event.touches[0].pageY
      const callbackParams = {
        state: 'start',
        changedTouches: [{
          identifier: event.changedTouches[0].identifier,
          pageX: event.changedTouches[0].pageX,
          pageY: event.changedTouches[0].pageY,
          screenX: event.changedTouches[0].screenX * rate,
          screenY: event.changedTouches[0].screenY * rate,
          force: event.changedTouches[0].force
        }]
      }
      callback(callbackParams)
    })
    element.addEventListener('touchmove', (event) => {
      const callbackParams = {
        state: 'move',
        changedTouches: [{
          identifier: event.changedTouches[0].identifier,
          pageX: event.changedTouches[0].pageX,
          pageY: event.changedTouches[0].pageY,
          screenX: event.changedTouches[0].screenX * rate,
          screenY: event.changedTouches[0].screenY * rate,
          force: event.changedTouches[0].force
        }]
      }
      callback(callbackParams)
    })
    element.addEventListener('touchend', (event) => {
      endY = event.changedTouches[0].pageY;
      const dy = endY - startY
      if(Math.abs(dy) > 5) {
        const callbackParams = {
          state: 'end',
          changedTouches: [{
            identifier: event.changedTouches[0].identifier,
            pageX: event.changedTouches[0].pageX,
            pageY: event.changedTouches[0].pageY,
            screenX: event.changedTouches[0].screenX * rate,
            screenY: event.changedTouches[0].screenY * rate,
            force: event.changedTouches[0].force
          }]
        }
        if(params.length == 0) {
          callback(callbackParams)
        } else {
          const paramsArray = []
          const firstParam = params[0]
          if(firstParam == 'event') {
            paramsArray.push(callbackParams)
            params.slice(1).forEach((item) => {
              const attrValue = element.attrs[item]
              paramsArray.push(attrValue)
            })
          } else {
              params.forEach((item) => {
              const attrValue = element.getAttribute(item)
              paramsArray.push(attrValue)
            })
          }
          callback(...paramsArray)
        }
      }
    })
  })
}

// swipe 手势事件，swipe 将会在用户在屏幕上滑动时触发，一次连续的滑动只会触发一次 swipe 手势
function swipe(elements, touchEventMap){
  const rate = 750 / document.documentElement.clientWidth
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler

  elementArray.forEach((element) => {
    let startX = 0
    let startY = 0
    let endX = 0
    let endY = 0
  
    element.addEventListener('touchstart', (event) => {
      startX = event.touches[0].pageX
      startY = event.touches[0].pageY
    })
  
    element.addEventListener('touchend', (event) => {
      endX = event.changedTouches[0].pageX
      endY = event.changedTouches[0].pageY
  
      const dx = endX - startX
      const dy = endY - startY
      const callbackParams = {
        direction: '',
        changedTouches: [{
          identifier: event.changedTouches[0].identifier,
          pageX: event.changedTouches[0].pageX,
          pageY: event.changedTouches[0].pageY,
          screenX: event.changedTouches[0].screenX * rate,
          screenY: event.changedTouches[0].screenY * rate,
          force: event.changedTouches[0].force
        }]
      }
      if(dx >= 10 && Math.abs(dx) > Math.abs(dy)) {
        // 向右滑动
        callbackParams.direction = 'right'
      } else if(dx <= -10 && Math.abs(dx) > Math.abs(dy)) {
        // 向左滑动
        callbackParams.direction = 'left'
      } else if(dy >= 10 && Math.abs(dy) > Math.abs(dx)) {
        // 向下滑动
        callbackParams.direction = 'bottom'
      } else if(dy <= -10 && Math.abs(dy) > Math.abs(dx)) {
        // 向上滑动
        callbackParams.direction = 'up'
      }

      if(params.length == 0) {
        callback(callbackParams)
      } else {
        const paramsArray = []
        const firstParam = params[0]
        if(firstParam == 'event') {
          paramsArray.push(callbackParams)
          params.slice(1).forEach((item) => {
            const attrValue = element.attrs[item]
            paramsArray.push(attrValue)
          })
        } else {
            params.forEach((item) => {
            const attrValue = element.getAttribute(item)
            paramsArray.push(attrValue)
          })
        }
        callback(...paramsArray)
      }

    })
  })
}


// stopPropagation 手势事件
function stopPropagation(elements, touchEventMap){
  const rate = 750 / document.documentElement.clientWidth
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler

  elementArray.forEach((element) => {
    element.addEventListener('touchstart', (event) => {
      if(typeof callback == 'function') {
        const callbackParams = {
          changedTouches: [{
            identifier: event.changedTouches[0].identifier,
            pageX: event.changedTouches[0].pageX,
            pageY: event.changedTouches[0].pageY,
            screenX: event.changedTouches[0].screenX * rate,
            screenY: event.changedTouches[0].screenY * rate,
            force: event.changedTouches[0].force
          }]
        }
        if(params.length == 0) {
          const result = callback(callbackParams)
          if(result) {
            event.stopPropagation()
          }
        } else {
          const paramsArray = []
          const firstParam = params[0]
          if(firstParam == 'event') {
            paramsArray.push(callbackParams)
            params.slice(1).forEach((item) => {
              const attrValue = element.attrs[item]
              paramsArray.push(attrValue)
            })
          } else {
              params.forEach((item) => {
              const attrValue = element.getAttribute(item)
              paramsArray.push(attrValue)
            })
          }
          const result = callback(...paramsArray)
          if(result) {
            event.stopPropagation()
          }
        }
      }
    })
  })
}
function getEl(el){
  if (typeof el === 'string' || typeof el === 'number') return el;
  return el
}
function computeItemIndex(listChangeHeight){
  return Math.round(listChangeHeight / document.documentElement.clientHeight) + 1
}

var __listChangeHeight__ = 0    // list列表移动的偏移量     该值 > 0

function BindingXCallback(dy,height, element, type, startHeight){
  // dy: BindingX高度跟随的距离
  // height: 手机可视区高度
  // element: List元素
  // type: 触发类型，包含 distance | speed | reback
  // startHeight: 表示跟随起始高度

  const rate = 750 / document.documentElement.clientWidth           // 750设计稿放缩倍率
  const deviceHeight = document.documentElement.clientHeight        // 手机可视区高度
  const myList = getEl(element.children[0])                         // list列表容器
  const listHeight = element.children[0].offsetHeight            // list列表高度

  let changed_distance = 0       // 需要让BindingX移动的距离   正值表示下移，负值表示上移
  let changed_start_length = 0  // 表示起始位置的长度，该值是一个正值
  let changed_start = 0       // 需要让BindingX移动时的起始位置,BindingX移动的是整个列表，因此所谓的起始位置表示列表顶部的坐标参数。一般情况下该坐标都是负值。只有当在Index = 0时向下滑动该值才会为正
  let translate_y_origin = '';      // BindingX表达式内容
  let direction = null      // 当前滑动方向

  if (parseInt(listHeight / height) == 1) {
    type = 'oneCell'
  }

  if(computeItemIndex(__listChangeHeight__) == 1 && dy < 0) {         // index = 1 向上滑动
    if(type === 'speed') {
      changed_distance = ((deviceHeight) * rate - Math.abs(dy)) * (-1)
      changed_start_length = __listChangeHeight__ * rate + Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
      __listChangeHeight__ = __listChangeHeight__ + deviceHeight
      startHeight.height = startHeight.height - deviceHeight * rate
    } else if(type === 'distance'){
      changed_distance = ((deviceHeight) * rate - Math.abs(dy)) * (-1)
      changed_start_length = __listChangeHeight__ * rate + Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
      __listChangeHeight__ = __listChangeHeight__ + deviceHeight
      startHeight.height = startHeight.height - deviceHeight * rate
    } else if(type === 'reback' || type === 'oneCell') {
      changed_distance = Math.abs(dy)
      changed_start_length = __listChangeHeight__ * rate + Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
    }
    direction = 'up'
  } else if(computeItemIndex(__listChangeHeight__) == 1 && dy > 0){         // index = 1 向下滑动
    type = 'reback'
    changed_distance = Math.abs(dy) * (-1)
    changed_start_length = __listChangeHeight__ * rate - Math.abs(dy)
    changed_start = changed_start_length * (-1)
    translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
    direction = 'down'
  } else if(computeItemIndex(__listChangeHeight__) === parseInt(listHeight / height) && dy < 0){          // index = lastone 向上滑动
    type = 'reback'
    changed_distance = Math.abs(dy)
    changed_start_length = __listChangeHeight__ * rate + Math.abs(dy)
    changed_start = changed_start_length * (-1)
    translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
    direction = 'up'
  } else if(computeItemIndex(__listChangeHeight__) === parseInt(listHeight / height) && dy > 0){          // index = lastone 向下滑动
    if(type === 'speed') {
      changed_distance = ((deviceHeight) * rate - Math.abs(dy))
      changed_start_length = __listChangeHeight__ * rate - Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
      __listChangeHeight__ = __listChangeHeight__ - deviceHeight
      startHeight.height = startHeight.height + deviceHeight * rate
    } else if(type === 'distance'){
      changed_distance = ((deviceHeight) * rate - Math.abs(dy))
      changed_start_length = __listChangeHeight__ * rate - Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
      __listChangeHeight__ = __listChangeHeight__ - deviceHeight
      startHeight.height = startHeight.height + deviceHeight * rate
    } else if(type === 'reback') {
      changed_distance = Math.abs(dy) * (-1)
      changed_start_length = __listChangeHeight__ * rate - Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
    }
    direction = 'down'
  } else if(computeItemIndex(__listChangeHeight__) > 1 && dy < 0){          // index !== 1 && index !== lastone 向上滑动
    if(type === 'speed') {
      changed_distance = ((deviceHeight) * rate - Math.abs(dy)) * (-1)
      changed_start_length = __listChangeHeight__ * rate + Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
      __listChangeHeight__ = __listChangeHeight__ + deviceHeight
      startHeight.height = startHeight.height - deviceHeight * rate
    } else if(type === 'distance'){
      changed_distance = ((deviceHeight) * rate - Math.abs(dy)) * (-1)
      changed_start_length = __listChangeHeight__ * rate + Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
      __listChangeHeight__ = __listChangeHeight__ + deviceHeight
      startHeight.height = startHeight.height - deviceHeight * rate
    } else if(type === 'reback') {
      changed_distance = Math.abs(dy)
      changed_start_length = __listChangeHeight__ * rate + Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
    }
    direction = 'up'
  } else if(computeItemIndex(__listChangeHeight__) != 1 && dy > 0){         // index !== 1 && index !== lastone 向下滑动
    if(type === 'speed') {
      changed_distance = ((deviceHeight) * rate - Math.abs(dy))
      changed_start_length = __listChangeHeight__ * rate - Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
      __listChangeHeight__ = __listChangeHeight__ - deviceHeight
      startHeight.height = startHeight.height + deviceHeight * rate
    } else if(type === 'distance'){
      changed_distance = ((deviceHeight) * rate - Math.abs(dy))
      changed_start_length = __listChangeHeight__ * rate - Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
      __listChangeHeight__ = __listChangeHeight__ - deviceHeight
      startHeight.height = startHeight.height + deviceHeight * rate
    } else if(type === 'reback') {
      changed_distance = Math.abs(dy) * (-1)
      changed_start_length = __listChangeHeight__ * rate - Math.abs(dy)
      changed_start = changed_start_length * (-1)
      translate_y_origin = `${changed_start} + ${changed_distance}*(min(t, 200)/200)`
    }
    direction = 'down'
  } 

  Binding.bind(
    {
      eventType: 'timing',
      exitExpression: 't>200',
      props: [
        {
          element: myList,
          property: 'transform.translateY',
          expression: translate_y_origin,
        },
      ],
    },
    function (e) {
      if(e.state === 'start'){
        startHeight.isAnimate = true
        Binding.unbind({
          eventType:'pan',
          token: __GlobalToken__
        })
        __GlobalToken__ = undefined
      }
      if(e.state === 'exit') {
        startHeight.isAnimate = false
        if(type === 'speed' || type === 'distance') {
          const timer = setTimeout(() => {
            let el = computeItemIndex(__listChangeHeight__) - 1
            let fixDistance = myList.children[el].getBoundingClientRect().top    // 向上：正数   向下：负数
            let rectList = myList.getBoundingClientRect().top              // 超出viewPort为负数
            myList.style.transform = `translateY(${rectList + fixDistance * (-1)}px)`  // 向上：正数补偿 * (-1)  向下：负数补偿 *(-1)
            __listChangeHeight__ = __listChangeHeight__ + fixDistance
            startHeight.height = startHeight.height + fixDistance * (-1)
            clearTimeout(timer)
          })
          // 当完成滑动，则需要判断的条件有：
          // 1、判断数组中元素是否处于显示状态，若显示则更改状态和调用回调(如果回调存在)
          // 2、判断数组中元素时是否处于隐藏状态，如果隐藏则修改状态并调用回调(如果回调存在)

          // 先隐藏调用后显示调用
          appearOrDisappearMap.forEach((item) => {
            if(item.state === 'appear') {
              if(item.event.disappear?.callback) {
                const callbackParams = {
                  type: 'disappear',
                  target: item.element,
                  direction: direction,
                  timestamp: Date.now() 
                }
                if(item.event.disappear?.params.length == 0) {
                  item.event.disappear.callback(callbackParams)
                } else {
                  const paramsArray = []
                  const firstParam = item.event.disappear?.params[0]
                  if(firstParam == 'event') {
                    paramsArray.push(callbackParams)
                      item.event.disappear?.params.slice(1).forEach((key) => {
                      const attrValue = item.element.getAttribute(key)
                      paramsArray.push(attrValue)
                    })
                  } else {
                      item.event.disappear?.params.forEach((key) => {
                      const attrValue = item.element.getAttribute(key)
                      paramsArray.push(attrValue)
                    })
                  }
                  item.event.disappear.callback(...paramsArray)
                }
              }
              item.state = 'disappear'
            }
          })

          appearOrDisappearMap.forEach((item) => {
            if(isInViewport(item.element)) {
              if(item.event.appear?.callback) {
                const callbackParams = {
                  type: 'appear',
                  target: item.element,
                  direction: direction,
                  timestamp: Date.now()
                }
                if(item.event.appear?.params.length == 0) {
                  item.event.appear.callback(callbackParams)
                } else {
                  const paramsArray = []
                  const firstParam = item.event.appear?.params[0]
                  if(firstParam == 'event') {
                    paramsArray.push(callbackParams)
                      item.event.appear?.params.slice(1).forEach((key) => {
                      const attrValue = item.element.getAttribute(key)
                      paramsArray.push(attrValue)
                    })
                  } else {
                      item.event.appear?.params.forEach((key) => {
                      const attrValue = item.element.getAttribute(key)
                      paramsArray.push(attrValue)
                    })
                  }
                  item.event.appear.callback(...paramsArray)
                }
              }
              item.state = 'appear'
            }
          })
        }
      }
    },
  )
}

let __GlobalToken__ = 0

/**
 * 判断元素是否在视口中
 * rect.top 元素上边距离页面上边的距离
 * rect.bottom 元素下边距离页面上边的距离
 */
function isInViewport(element){
  const rect = element.getBoundingClientRect()
  let isInViewport = Math.abs(rect.top) <= 2
  return isInViewport
}

/**
 * 判断初始状态下只会触发元素的显示回调，隐藏不会被触发
 * {
      element: element,
      elementId: elementId,
      state: 'disappear',
      event: {
        appear?: {
          callback,
          params
        },
        disappear?: {
          callback,
          params
        }
      }
    }
 */
function initState(){
  appearOrDisappearMap.forEach((item) => {
      if(isInViewport(item.element)) {
        if(item.event.appear) {
          const callbackParams = {
            type: 'appear',
            target: item.element,
            direction: null,
            timestamp: Date.now()
          }
          if(item.event.appear?.params.length == 0) {
            item.event.appear.callback(callbackParams)
          } else {
            const paramsArray = []
            const firstParam = item.event.appear?.params[0]
            if(firstParam == 'event') {
              paramsArray.push(callbackParams)
                item.event.appear?.params.slice(1).forEach((key) => {
                const attrValue = item.element.getAttribute(key)
                paramsArray.push(attrValue)
              })
            } else {
                item.event.appear?.params.forEach((key) => {
                const attrValue = item.element.getAttribute(key)
                paramsArray.push(attrValue)
              })
            }
            item.event.appear.callback(...paramsArray)
          }
          item.state = 'appear'
        }
      }
  })
}

function padingEnabled(elements){
  const elementArray = Array.from(elements)
  elementArray.forEach((element) => {
    const height = document.documentElement.clientHeight
    let startTime = 0
    let endTime = 0
    let speed = 0
    let startHeight = {
      height: 0,
      isAnimate: false
    }

    initState()

    element.addEventListener('touchstart', (e) => {
      startTime = Date.now()
      // 该bind相当于手势跟随
      if(!startHeight.isAnimate) {
        const res = Binding.bind(
          {
            anchor: getEl(element.children[0]),
            eventType: 'pan',
            props: [
              {
                element: getEl(element.children[0]),
                property: 'transform.translateY',
                expression: `${startHeight.height} + y`,   //  y+0    ${this.y}+0
              },
            ],
          },
          function (e) {
            if(e.state === 'start') {
            }
            if (e.state === 'end') {
              endTime = Date.now()
              speed = Math.abs(e.deltaY / (endTime - startTime))
              if(Math.abs(e.deltaY) > 3) {
                if(speed > 0.5) {
                  // 滑动速度大于0.5触发单体cell移动事件
                  BindingXCallback(e.deltaY, height, element, 'speed', startHeight)
                } else if(Math.abs(e.deltaY) > height/2){
                  BindingXCallback(e.deltaY, height, element, 'distance', startHeight)
                } else {
                  // 列表回弹
                  BindingXCallback(e.deltaY, height, element, 'reback', startHeight)
                }
              }
            }
          }
        )
        __GlobalToken__ = res.token
      }
    })

  })
}


function registerViewAppear(elements, touchEventMap) {
  const elementArray = Array.from(elements)
  const callback = touchEventMap.handler
  elementArray.forEach((element) => {
    if (typeof callback === 'function') {
      const params = {
        target: element,
        timestamp: Date.now(),
        type: 'viewappear'
      }
      weexModule.callNative("viewappear",{})  // mount完成后触发
      window.harmonyViewAppear = function () {
        callback(params)
      }
      callback(params)
    }
  })
}

function registerViewDisAppear(elements, touchEventMap) {
  const elementArray = Array.from(elements)
  const callback = touchEventMap.handler
  elementArray.forEach((element) => {
    if (typeof callback === 'function') {
      const params = {
        target: element,
        timestamp: Date.now(),
        type: 'viewdisappear'
      }
      weexModule.callNative("viewdisappear", {})  // 是否可以在shell中检查，加载完成后触发
      window.harmonyViewDisAppear = function () {
        callback(params)
      }
    }
  })
}

function registerInputKeyboard(elements, item) {
  const elementArray = Array.from(elements)
  const keyboardHandler = item.handler
  elementArray.forEach((element) => {
    if (element.tagName === 'INPUT' && typeof keyboardHandler === 'function') {
      element.addEventListener('focus', (event) => {
        weexModule.callNative("onKeyboard", {}, keyboardHandler);
      })
      element.addEventListener('blur', (event) => {
        weexModule.callNative("offKeyboard", {}, null);
      })
    }
  })
}

function showScrollbar(elements, touchEventMap, classNameId) {
    const handler = touchEventMap.handler
    if(handler === null || handler === true) {
      document.styleSheets[0].insertRule(`.${classNameId}::-webkit-scrollbar {display: block;width: 15px;height: 18px;background-color: #aaa;}`, 0)
      document.styleSheets[0].insertRule(`.${classNameId}::-webkit-scrollbar-thumb {background-color: #000;}`, 0)
    }
}


// 当list开启padingEnabled属性时，注册该事件来实现元素显示时触发回调
function registerAppear(elements, touchEventMap, elementId){
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler
  
  if(elementArray.length === 1) {
    const element = elementArray[0]
    let hasCurrentElement = false
    appearOrDisappearMap.forEach((item) => {
      if(item.elementId === elementId) {
        hasCurrentElement = true
        item.event['appear'] = {
          callback,
          params
        }
      }
    })
    if(!hasCurrentElement) {
      appearOrDisappearMap.push({
        element: element,
        elementId: elementId,
        state: 'disappear',
        event: {
          appear: {
            callback,
            params
          }
        }
      })
    }
  } else {
    // v-for 形式
    elementArray.forEach((element) => {
      let hasCurrentElement = false
      appearOrDisappearMap.forEach((item) => {
        if(item.element === element) {
          hasCurrentElement = true
          item.event['appear'] = {
            callback,
            params
          }
        }
      })
      if(!hasCurrentElement) {
        appearOrDisappearMap.push({
          element: element,
          elementId: elementId,
          state: 'disappear',
          event: {
            appear: {
              callback,
              params
            }
          }
        })
      }
    })
  }
}

function registerDisappear(elements, touchEventMap, elementId){
  const elementArray = Array.from(elements)
  const params = touchEventMap.params
  const callback = touchEventMap.handler

  if(elementArray.length === 1) {
    const element = elementArray[0]
    let hasCurrentElement = false
    appearOrDisappearMap.forEach((item) => {
      if(item.elementId === elementId) {
        hasCurrentElement = true
        item.event['disappear'] = {
          callback,
          params
        }
      }
    })
    if(!hasCurrentElement) {
      appearOrDisappearMap.push({
        element: element,
        elementId: elementId,
        state: 'disappear',
        event: {
          disappear: {
            callback,
            params
          }
        }
      })
    }
  } else {
     // v-for 形式
    elementArray.forEach((element) => {
      let hasCurrentElement = false
      appearOrDisappearMap.forEach((item) => {
        if(item.elementId === elementId) {
          hasCurrentElement = true
          item.event['disappear'] = {
            callback,
            params
          }
        }
      })
      if(!hasCurrentElement) {
        appearOrDisappearMap.push({
          element: element,
          elementId: elementId,
          state: 'disappear',
          event: {
            disappear: {
              callback,
              params
            }
          }
        })
      }
    })
  }
}


const gestureMap = new Map([
  ['@touchstart', touchstart],
  ['@touchmove', touchmove],
  ['@touchend', touchend],
  ['@horizontalpan', horizontalpan],
  ['@longpress', longpress],
  ['@panstart', panstart],
  ['@panmove', panmove],
  ['@panend', panend],
  ['@verticalpan', verticalpan],
  ['@swipe', swipe],
  ['@stopPropagation', stopPropagation],
  ['@viewappear',registerViewAppear],
  ['@viewdisappear', registerViewDisAppear],
  [':paging-enabled', padingEnabled],
  ['@keyboard', registerInputKeyboard],
  ['show-scrollbar', showScrollbar],
  ['@appear', registerAppear],
  ['@disappear',registerDisappear]
])

/**
 *  weex_harmongy_registerGesture([{
      name: "@swipe",
      handler: this.swipe,
      params: [],
      isEvent: true,
      modifier: ['stop']
    },{
      name: "@touchstart",
      handler: this.touchstart,
      params: [],
      isEvent: true,
      modifier: ['stop']
    }], "weex-harmony-register-11");
 */
export function weex_harmongy_registerGesture(eventOrAttrsMap, elementId){
  const elements = document.getElementsByClassName(elementId)
  eventOrAttrsMap.forEach((item) => {
    const gestureAPI = gestureMap.get(item.name.split('.')[0])
    if(gestureAPI) {
      gestureAPI(elements, item, elementId)
    }
  })
}

export function weex_harmony_chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
  }
  return result;
}