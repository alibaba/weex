/**
 * gesture-loader插件
 * 
 */
const { parse:domParse } = require('@vue/compiler-dom')
const compiler = require('vue-template-compiler')
const babelParser = require('@babel/parser')
const babelTraverse = require('@babel/traverse').default
const babelGenerator = require('@babel/generator').default
const t = require('@babel/types')
const path = require('path')
const { parse, stringify } = require('himalaya')

// 为当前模块生成一个哈希值
let moduleHash = ''


// ***************工具函数： 生成SFC代码相关函数 ****************//
/**
 * 解析<template> <script> <style>三段式中开标签的属性
 */
function resolveOpeningElementAttrs(attrs){
  const attrKeys = Object.keys(attrs)
  let attrsString = ''
  if(attrKeys.length == 0) return ''
  
  attrKeys.forEach((key) =>{
    if(typeof attrs[key] === 'boolean') {
      // 如果属性值为true 则在开标签的写法为 <script module>
      // 为保持格式一直，在属性前空格
      attrsString += ` ${key}`   
    } else if(typeof attrs[key] === 'string') {
      // 如果属性值为字符串 则在开标签的写法为 <script lang='ts'>
      // 为保持格式一直，在属性前空格
      attrsString += ` ${key}=${attrs[key]}`
    }
  })
  return attrsString
}

/**
 * 将vue三段式中的template组成完成的字符串代码
 */
function generateTemplateCode(template){
  // 兼容.vue文件中没有template模块情况
  if(!template) return ''
  const templateContent = template.content
  let templateString = ''

  templateString = `<template>${templateContent}</template>`
  return templateString
}

/**
 * 将vue三段式中的script组成完成的字符串代码
 */
function generateScriptCode(script){
  // 兼容.vue文件中没有script模块情况
  if(!script) return ''
  const scriptContent = script.content
  let scriptString = ''

  // 处理<script>开标签上面的 lang module 等属性
  const scriptAttrs = script.attrs
  const scriptAttrsString = resolveOpeningElementAttrs(scriptAttrs)
  scriptString = `<script${scriptAttrsString}>${scriptContent}</script>`

  return scriptString
}

/**
 * 将vue三段式中的styles组成完成的字符串代码
 */

function generateStyleCode(styles){
  // styles是一个数组，在vue中<style>标签可以有多个用于作用于同一个组件
  if(styles.length == 0) return ''

  const stylesString = []
  styles.forEach((style) => {
    let styleString = ''
    const styleContent = style.content
    const styleSttrs = style.attrs
    const styleAttrsString = resolveOpeningElementAttrs(styleSttrs)
    styleString = `<style${styleAttrsString}>${styleContent}</style>`
    stylesString.push(styleString)
  })

  return stylesString.join('') 
}

/**
 * 将vue三段式组成完成字符串代码
 */
function generateSFC(template, script, styles){
  const templateCode = generateTemplateCode(template)
  const scriptCode = generateScriptCode(script)
  const styleCode = generateStyleCode(styles)

  return `${templateCode}${scriptCode}${styleCode}`
}



// ***************工具函数： 解析template及script相关函数 ****************//

// 记录小驼峰或大驼峰写法的组件
let camelCaseMap = new Set()

/**
 * 判断是否为windows环境
 * @returns
 */
function isWin32(){
  if(process.platform === 'win32') {
      return true
  } else {
      return false
  }
}

/**
 * 清除当前模块的全局变量，以便下次循环使用
 */
function clearData(){
  camelCaseMap.clear()
  eventOrAttrsMap = []
  classNameId = 1
  elementMap = []
}

/**
 * 计算插件位置
 */
function getPluginPath(){
  const currentPath = path.resolve(__dirname, './registerGesture.js')
  if(isWin32()) {
      return path.relative(currentResolveModulePath, currentPath).replace('..\\','').replace(/\\/g,'/')
  } else {
      return path.relative(currentResolveModulePath, currentPath).replace('../','')
  }
}

/**
 * 解析元素标签名，若为驼峰格式则记录到camelCaseMap中
 */
function camelCaseParseNode(element){
  const isCamelCase = /^[a-z][a-zA-z0-9]*$/   // 检测小驼峰和全小写
  const isPascalCase = /^[A-Z][a-zA-Z0-9]*$/  // 检测大驼峰
  const { tag, children } = element
  if(tag) {
    if(isCamelCase.test(tag) || isPascalCase.test(tag)){
      if(!/^[a-z0-9]*$/.test(tag)){
        // 记录驼峰形式命名的组件
        camelCaseMap.add(tag)
      }
    }
  }
  children?.forEach((item) => {
    camelCaseParseNode(item)
})
}

/**
 * 扫描标签，收集驼峰形式的组件名
 */
function isCamelCase(templateString){
  const ast = domParse(templateString)
  ast.children.forEach((element) =>{
    camelCaseParseNode(element)
  })
}

/**
 * 解析元素标签名，如果该标签名和camelCaseMap中的标签名相同，则该标签名还原
 */
function parseNodeName(node){
  if(node && node.tagName) {
    const { tagName, children } = node
    camelCaseMap.forEach((item) => {
      if(item.toLowerCase() === tagName) {
        node.tagName = item
      }
    })

    children.forEach((childrenNode) => {
      parseNodeName(childrenNode)
    })
  }
}

/**
 * 遍历元素节点，让组件名复位
 */
function resetComponentName(templateAst){
  templateAst.forEach((node) => {
    parseNodeName(node)
  })
}

/**
 * 判断直接子节点是否设置PagingEnabled属性，如果直接子节点存在该属性，则：
 * 0、如果元素上已经有:style='weexHarmonyDivStyle'，则表示已经对list列表做处理
 * 1、动态去除:paging-enabled属性
 * 2、添加该子元素添加父元素div并设置style属性为动态样式
 */
function parsePagingEnabledNode(node){
    // 如果无子节点直接返回
    const { children } = node
    if(!children || children.length === 0) return 
  
    // 如果元素上已经有:style='weexHarmonyDivStyle'，则表示已经对list列表做处理
    if(node.attributes?.find((attr) => attr.key === ':style' && attr.value === 'weexHarmonyDivStyle')) return
  
    let isPagingEnabled = false
    // 遍历直接子节点，判断直接子节点是否存在PagingEnabled属性
    children.forEach((node) => {
      if(node.attributes?.find((attr) => attr.key === ':paging-enabled')) {
        isPagingEnabled = true
      }
    })
  
    // 如果设置 pagingEnabled属性
    if(isPagingEnabled) {
      const nodeArray = []
       node.children.forEach((node) => {
        if(node.attributes?.find((attr) => attr.key === ':paging-enabled')){
          nodeArray.push({
            type:'element',
            tagName: 'div',
            attributes: [{
              key:':style', value: 'weexHarmonyDivStyle'
            }],
            children: [node]
          })
        } else {
          nodeArray.push(node)
        }
      })
      node.children = nodeArray
    }

    children.forEach((node) => {
        if(node.type === 'element') {
            parsePagingEnabledNode(node)
        }
    })
}

/**
 * 感知该属性并为List添加必要属性：style以及classId
 */
function checkPagingEnabled(templateAst){
    if(!templateAst) return
    templateAst.forEach((node) => {
        if(node.type === 'element') {
            if(node.attributes?.find((attr) => attr.key === ':paging-enabled')){
                node.attributes.push({
                    key:'style',
                    value: 'overflow: hidden !important'
                })
                eventOrAttrsMap.push({
                    isEvent: false,
                    name: ':paging-enabled',
                    params: [],
                    handler: ''
                  })
                // 为元素设置id
                setClassId(node.attributes)
            }
        }
        checkPagingEnabled(node.children)
    })
}

/**
 * 给List添加父元素div并且div添加动态style属性
 */
function addParentElement(templateAst){
    templateAst.forEach((node) => {
        if(node.type === 'element') {
            parsePagingEnabledNode(node)
        }
    })
}

/**
 * 解析paging-enabled属性分两步：
 * 1、感知该属性并为List添加必要属性：style以及classId
 * 2、给List添加父元素div并且div添加动态style属性
 */
function parsePagingEnable(templateAst){
    checkPagingEnabled(templateAst)
    addParentElement(templateAst)
}

let needTranslate = false

/**
 * 解析template，当前解析template使用的是himalaya，该工具包会将小驼峰解析为全小写
 * 因此需要将hlText转为hl-text
 */
function resolveTemplate(template){
  const templateContent = template.content
  const templateAst = parse(templateContent)

  // 遍历元素，记录驼峰写法的组件名
  isCamelCase(templateContent)

  // 遍历 template 元素节点，记录绑定事件或属性信息
  traverseTemplateNode(templateAst)

  // 解析paging-enable属性
  parsePagingEnable(templateAst)

  // 解析 v-delete-children 属性
  parseDeleteChildren(templateAst)

  // 解析 v-grouping-child-elements 属性
  parseGroupingChildElements(templateAst)

  // 只有当模块中存在绑定指定的事件和属性时，才会做组件名还原和将templateAst转为代码字符串
  if(elementMap.length !== 0 || needTranslate) {
    // 遍历节点，将himalaya改动的组件名还原
    resetComponentName(templateAst)

    template.content = stringify(templateAst)
  }
}

/**
 * 解析 script
 */
function resolveScript(script) {
  const scriptConent = script.content
  const scriptAst = babelParser.parse(scriptConent, {
    sourceType: 'module',
  })

  // 遍历scriptAst
  traverseNode(scriptAst)
  const { code } = babelGenerator(scriptAst)
  script.content = code
}

/**
 * 解析Vue的SFC代码
 */
function resolveVueSFC(source){
  const moduleResoveRet = compiler.parseComponent(source)
  const { template, script, styles } = moduleResoveRet
    
  // 解析 template 和 script代码
  resolveTemplate(template)

  // 只有当模块中存在绑定指定的事件和属性时，才会解析scriptAst
  if(elementMap.length !== 0 || needTranslate) {
    resolveScript(script)
    // 清除缓存，准备进入下次循环
    clearData()
    needTranslate = false
  }

  // 生成SFC代码
  const newCode = generateSFC(template, script, styles)
  return newCode
}




// ***************业务函数： 在template、script中解析或者添加代码 ****************//

// 测试路径
const TEST_PATH = ''

// 当前解析模块的路径
let currentResolveModulePath = ''

// 需要检测的事件
const EVENTS_MAP = [
  '@touchstart',
  '@touchmove',
  '@touchend',
  '@stopPropagation',
  '@panstart',
  '@panmove',
  '@panend',
  '@horizontalpan',
  '@verticalpan',
  '@swipe',
  '@longpress',
  '@viewappear',
  '@viewdisappear',
  '@keyboard',
]

// 需要检测的属性名
/**
 * 这里解析的是属性，针对于属性写法有两中例如 :paging-enabled 和 paging-enabled 
 * 为了方便解析，在MAP中统一去掉冒号。同时在registerGesture.js文件中的gestureMap中也统一去除冒号
 */
const ATTRS_MAP = [
  'show-scrollbar',
]


// class名的序列号，若该元素节点绑定了指定属性或属性则会给元素绑定一个指定id
let classNameId = 1

/**
 * eventOrAttrsMap: object[] 该数组用于存储单个元素节点绑定的事件或者手势
 * { name, handler, params, isEvent, modifier }
 * name: 绑定的事件或属性名
 * handler: 绑定的事件或属性名对应的回调(属性值)
 * params: 回调函数的参数
 * isEvent: 是否是事件，该字段用于区分属性和事件
 * modifier: [] 当前事件的修饰符(可以有多个)
 * isIdentifer?: 是否是变量属性值，即:paging-enabled这种格式，该字段只有解析属性值时存在，如果是事件则不存在
 */
let eventOrAttrsMap = []


/**
 * elementMap： object[] 该数组用于存放元素和绑定事件(属性)的映射
 * { className, eventOrAttrsMap }
 * className: 为元素设置的id
 * eventOrAttrsMap: 该元素绑定的事件(属性)数组
 */
let elementMap = []
/**
 * 解析事件的属性值
 */
function parseEventAttrValue(attrValue){
  // 当属性值存在即 @touchstart="fnc" 这种格式
  if(attrValue) {
    // 匹配回调函数参数，例如xxx='xxx(index, item)' 这种调用形式，则会匹配index和item参数值
    const regTem = /([a-zA-Z_$][a-zA-Z\d_$]*)\s*(?=[,\)])/g   
    // 如果未匹配到即params为null，则说明不是函数调用形式而是变量引用形式，例如 xxx='xxx'格式
    let params = attrValue.match(regTem)
    // 如果params有值，则handler则会去掉()这种形式，从xxx='xxx(index, item)' 变为xxx='xxx'
    let handler = params ? attrValue.split('(')[0]?.trim() : attrValue
    
    return {
      handler,
      params
    }
  } else {
    // 当属性值不存在，即@touchstart.stop这种形式
    return {
      handler: '',
      params: []
    }
  }
}

/**
 * 当元素绑定事件或属性后，则为元素设置唯一classID
 */
function setClassId(attributes){
  const className = 'weex-harmony-register-' + moduleHash + '-' + classNameId
  classNameId++

  elementMap.push({
    className,
    eventOrAttrsMap: [...eventOrAttrsMap]
  })

  const classProperty = attributes.find((item) => item.key === 'class')
  if(classProperty) {
    classProperty.value = `${classProperty.value} ${className}`
  } else {
      attributes.push({
          key: 'class',
          value: className
      })
  }

  // 将eventOrAttrsMap清空，方便解析下一个元素节点时使用
  eventOrAttrsMap = []
}

/**
 * 解析修饰符
 */
function parseModifier(key){
    const modifier = key.split('.').slice(1)
    return modifier
}

/**
 * 解析属性的属性值
 *  :show-scrollbar="showScrollbar"   this.showScrollbar
    :show-scrollbar="true"            true
    :show-scrollbar="false"           false
    show-scrollbar                    null
    show-scrollbar=''                 ''
    show-scrollbar='true'             "true"
    show-scrollbar=' '                ' '
 */
function parseAttrValue(attrKey, attrValue) {
  if(attrKey.startsWith(':')) {
    return  { handler:attrValue, isIdentifer: true }
  } else {
    if(attrValue === null) {
      return { handler: null, isIdentifer: false }
    } else if(attrValue === ''){
      return { handler: '', isIdentifer: false }
    } else {
      return { handler: attrValue, isIdentifer: false }
    }
  }
}

/**
 * 对单个element元素节点进行解析，其中主要功能：
 * 1、解析元素是否绑定指定属性或事件
 * 2、若绑定则记录绑定事件到数组中并为元素设置唯一id
 * 3、去掉绑定的属性或者事件
 */
function parseTemplateNode(node){
  if(!node) return 
  const { attributes, children } = node
  let isBindEventOrAttrs = false

  // 遍历属性，收集属性和事件信息
  attributes.forEach((attr) => {
    // 遍历事件
    if(EVENTS_MAP.find((item) => attr.key.includes(item))) {
        const modifier = parseModifier(attr.key)
        const { handler, params } = parseEventAttrValue(attr.value)
        eventOrAttrsMap.push({
          isEvent: true,
          name: attr.key,
          modifier,
          handler,
          params,
        })
        isBindEventOrAttrs = true
    }

    // 遍历属性
    if(ATTRS_MAP.find((item) => attr.key.includes(item))) {
      const { handler, isIdentifer } = parseAttrValue(attr.key, attr.value)
      eventOrAttrsMap.push({
        isEvent: false,
        name: attr.key.startsWith(':') ? attr.key.split(':')[1] : attr.key,
        modifier: [],
        handler,
        params: [],
        isIdentifer,
      })
      isBindEventOrAttrs = true
    }
  })

  if(isBindEventOrAttrs) {
    // 为元素设置id
    setClassId(attributes)
    // 去掉事件或，如果不清除原来绑定的事件，则有的事件会触发两次
    node.attributes = attributes.filter((attr) =>{
        return !EVENTS_MAP.find((item) => attr.key.includes(item))
    })
  }

  // 遍历下一个元素节点
  children.forEach((node) => {
    if(node.type === 'element') {
      parseTemplateNode(node)
    }
  })
}

/**
 * 处理子元素
 */
function parseNode(node){
  if(!node) return 
  const { attributes, children } = node
  let isBindEventOrAttrs = false

  // 遍历属性，收集属性和事件信息
  attributes.forEach((attr) => {
    // 遍历事件
    if(attr.key.includes('appear') || attr.key.includes('disappear')) {
        const modifier = parseModifier(attr.key)
        const { handler, params } = parseEventAttrValue(attr.value)
        eventOrAttrsMap.push({
          isEvent: true,
          name: attr.key,
          modifier,
          handler,
          params,
        })
        isBindEventOrAttrs = true
    }
  })

  if(isBindEventOrAttrs) {
    // 为元素设置id
    setClassId(attributes)
    // 去掉事件或，如果不清除原来绑定的事件，则有的事件会触发两次
    node.attributes = attributes.filter((attr) =>{
        return !(attr.key.includes('appear') || attr.key.includes('disappear'))
    })
  }

  // 遍历下一个元素节点
  children.forEach((node) => {
    if(node.type === 'element') {
      parseNode(node)
    }
  })
}

/**
 * 当解析到含有pading-enabled属性的list组件时，此时对list组件的子元素单独处理
 */
function parseApparOrDisappear(nodes){
  nodes.forEach((node) => {
    if(node.type === 'element') {
      parseNode(node)
    }
  })
}

/**
 * 专门用于遍历开启pagingEnabled状态下的
 */
function traverseAppearOrDisappear(node){
  if(!node) return 
  const { attributes, children } = node
  let hasPagingEnabled = false
  attributes.forEach((attr) => {
    if(attr.key.includes('paging-enabled')){
      hasPagingEnabled = true
    }
  })

  // 如果遍历到含有pading-enabled的List组件，则将子元素单独遍历，如果没有则继续遍历子元素
  if(hasPagingEnabled) {
    parseApparOrDisappear(children)
  } else {
    // 遍历下一个元素节点
    children.forEach((node) => {
      if(node.type === 'element') {
        traverseAppearOrDisappear(node)
      }
    })
  }
}

/**
 * 遍历template中的元素节点
 */
function traverseTemplateNode(templateAst){
  templateAst.forEach((node) => {
    if(node.type === 'element') {
      // 遍历开启pading-enabled状态下的appear/disappear
      traverseAppearOrDisappear(node)

      // 遍历节点扫描指定事件和属性
      parseTemplateNode(node)
    }
  })
}


/**
 * 创建import导入节点用于导入 weex_harmongy_registerGesture和chunkArray 注册函数
 */
function buildImportDeclaration(){
  const importNode = t.importDeclaration(
      [
        t.importSpecifier(t.identifier('weex_harmongy_registerGesture'), t.identifier('weex_harmongy_registerGesture')),
        t.importSpecifier(t.identifier('weex_harmony_chunkArray'), t.identifier('weex_harmony_chunkArray'))
      ],
      t.stringLiteral(getPluginPath())
  )
  return importNode
}


/**
 * 解析handler，生成对应的ast节点
 */
function parseHandler(eventOrAttrs){
  if(eventOrAttrs.isEvent) {
    // 解析事件handler
    return eventOrAttrs.handler ? t.memberExpression(t.thisExpression(), t.identifier(eventOrAttrs.handler)) : t.stringLiteral('')
  } else {
    // 解析属性handler
    if(eventOrAttrs.isIdentifer) {
      // handler的值为数字、布尔值、或者变量
      if(!Number.isNaN(Number(eventOrAttrs.handler))) {
        return t.numericLiteral(Number(eventOrAttrs.handler))
      } else if(eventOrAttrs.handler === 'true') {
        return t.booleanLiteral(true)
      } else if(eventOrAttrs.handler === 'false'){
        return t.booleanLiteral(false)
      } else {
       return t.memberExpression(t.thisExpression(), t.identifier(eventOrAttrs.handler))
      }
    } else {
      if(eventOrAttrs.handler === null) {
        return t.nullLiteral()
      } else if(eventOrAttrs.handler === '') {
        return t.stringLiteral('')
      } else {
        return t.stringLiteral(eventOrAttrs.handler)
      }
    }
  }
}

/**
 * 该函数作用是在mounted(){}生命周期添加 weex_harmongy_registerGesture() 执行语句,具体语句如下：
 * weex_harmongy_registerGesture( className,[
 *  { name: '@touchstart', handler: xxxx, params: xxx }
 * ])
 */
function buildHandlerNode() {
  // 注册函数执行的表达式节点数组
  const handlerNodeMap = []

  elementMap.forEach((item) => {
    const objectNodes = item.eventOrAttrsMap.map((eventOrAttrs) => {
      // 处理回调函数参数
      const paramsElements = eventOrAttrs.params?.map((param) => {
        return t.stringLiteral(param)
      })

      // 处理事件绑定的修饰符，例如.stop .prevent等
      const modifiers = eventOrAttrs.modifier?.map((modifier) => {
        return t.stringLiteral(modifier)
      })

      // 返回对象表达式 { name: '@touchstart', handler: callback, params: ['item', 'index'], modifier: ['stop'] }
      return t.objectExpression([
        t.objectProperty(
          t.identifier('name'),
          t.stringLiteral(eventOrAttrs.name)
        ),
        t.objectProperty(
          t.identifier('handler'),
          parseHandler(eventOrAttrs)
        ),
        t.objectProperty(
          t.identifier('params'),
          t.arrayExpression(paramsElements)
        ),
        t.objectProperty(
          t.identifier('isEvent'),
          t.booleanLiteral(eventOrAttrs.isEvent)
        ),
        t.objectProperty(
          t.identifier('modifier'),
          t.arrayExpression(modifiers)
        ),
      ])
    })

    // 生成weex_harmongy_registerGesture()表达式节点
    handlerNodeMap.push(t.expressionStatement(
      t.callExpression(t.identifier('weex_harmongy_registerGesture'), [
        t.arrayExpression(objectNodes),
        t.stringLiteral(item.className)
      ])
    ))

    let hasPagingEnabled = false
    elementMap.forEach((item) => {
      item.eventOrAttrsMap.forEach((item) => {
        if (item.name === ':paging-enabled') {
          hasPagingEnabled = true
        }
      })
    })

    if (hasPagingEnabled) {
      let left = t.memberExpression(t.thisExpression(), t.identifier('weexHarmonyDivStyle'))
      let right = t.objectExpression([
        t.objectProperty(
          t.identifier('height'),
          t.templateLiteral([
            t.templateElement({ raw: '', cooked: '' }),
            t.templateElement({ raw: 'rem', cooked: 'rem' }),
          ], [
            t.binaryExpression(
              '/',
              t.memberExpression(t.memberExpression(t.identifier('document'), t.identifier('documentElement')), t.identifier('clientHeight')),
              t.callExpression(
                t.identifier('parseFloat'),
                [t.memberExpression(t.memberExpression(t.memberExpression(t.identifier('document'), t.identifier('documentElement')), t.identifier('style')), t.identifier('fontSize'))]
              )
            )
          ])
        )
      ])
      handlerNodeMap.push(t.expressionStatement(
        t.assignmentExpression('=', left, right)
      ))
    }
  })
  return handlerNodeMap
}

/**
 * 解析mounted属性
 */
function parseMounted(path){
  const node = path.node
  if (t.isObjectExpression(node.declaration)) {
    const properties = node.declaration.properties
    const result = properties.find(item => item.key.name == 'mounted')
    if(result) {
        result.body.body.push(...buildHandlerNode())
    } else {
        const mountedNode = t.objectMethod(
            'method',
            t.identifier('mounted'),
            [],
            t.blockStatement(buildHandlerNode())
        )
        properties.push(mountedNode)
    }
  }
}

/**
 * 在data中添加数据
 */
function addDataNode(path){
    const node = path.node
    if (elementMap.length !== 0) {
        if (t.isObjectExpression(node.declaration)) {
            const properties = node.declaration.properties
            let hasPagingEnabled = false

            // 遍历elementMap数组，检测是否存在:paging-enabled属性
            elementMap.forEach((item) => {
              item.eventOrAttrsMap.forEach((item) => {
                if(item.name === ':paging-enabled') {
                  hasPagingEnabled = true
                }
              })
            })

            if(hasPagingEnabled) {
              const dataPropertyes = properties.find(item => item.key.name == 'data')
              // 如果原来存在data属性则之间添加
              if(dataPropertyes) {
                const returnNode = dataPropertyes.body.body[0]
                if(t.isReturnStatement(returnNode)) {
                  const args = returnNode.argument
                  if(t.isObjectExpression(args)){
                    args.properties.push(t.objectProperty(
                      t.identifier('weexHarmonyDivStyle'),
                      t.stringLiteral('')
                    ))
                  }
                }
              } else {
                // 如果原来不存在data属性则手动添加data(){}
                const dataNode = t.objectMethod(
                  'method',
                  t.identifier('data'),
                  [],
                  t.blockStatement(
                    t.returnStatement(
                      t.objectExpression([
                        t.objectProperty(
                          t.identifier('weexHarmonyDivStyle'),
                          t.stringLiteral('')
                        )
                      ])
                    )
                  )
              )
              properties.push(dataNode)
              }
            }
        }
    }
}

/**
 * 解析methods，为其添加自定义方法
 * @param {*} path 
 */
function parseMethods(path) {
  const node = path.node
  if (t.isObjectExpression(node.declaration)) {
    const properties = node.declaration.properties
    const result = properties.find(item => item.key.name == 'methods')
    const newMethod = t.objectMethod(
      'method',
      t.identifier('_chunkArray'),
      [t.restElement(t.identifier('args'))],
      t.blockStatement([
        t.returnStatement(t.callExpression(t.identifier('weex_harmony_chunkArray'), [t.spreadElement(t.identifier('args'))])),
      ])
    )
    if (result) {
      result.value.properties.push(newMethod)
    } else {
      const methodsNode = t.objectProperty(
        t.identifier('methods'),
        t.objectExpression([
          newMethod
        ])
      )
      properties.push(methodsNode)
    }
  }
}

/**
 * 对vue默认导出做增删改操作
 */
function parseDefaultDeclarationNode(path){
  if (elementMap.length !== 0) {
    // 解析mounted属性
   parseMounted(path)
   // 添加data数据
   addDataNode(path)
   //解析methods属性
   parseMethods(path)
  }
}

/**
 * 遍历scriptAst节点
 */
function traverseNode(scriptAst){
  if(!scriptAst) return

  babelTraverse(scriptAst, {
    Program(path) {
      // 在js代码首部添加注册函数导入语句
      path.unshiftContainer('body', buildImportDeclaration())
    },
    ExportDefaultDeclaration(path) {
      // 对export default {} 做增删改操作
      parseDefaultDeclarationNode(path)
    }
  }) 
}


function createHash(string){
  var hash = 0, i, chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
  chr = string.charCodeAt(i);
  hash = ((hash << 5) - hash) + chr;
  hash |= 0; 
  }
  return hash;
}


function parseDeleteChildren(templateAst) {
  if(!templateAst) return
  templateAst.forEach((node) => {
    if (node.type === 'element' && node.attributes?.find((attr) => attr.key === 'v-delete-children')){
      node.children = []
      needTranslate = true
    }
    parseDeleteChildren(node.children)
  })
}

/**
 * 遍历元素节点
 * v-grouping-child-elements
 */
function parseGroupingChildElements(templateAst) {
  checkGroupingChildElements(templateAst)
}


/**
 * 感知该属性并为List添加必要属性：style以及classId
 */
function checkGroupingChildElements(templateAst){
  if(!templateAst) return
  templateAst.forEach((node) => {
    if (node.type === 'element' && node.attributes?.find((attr) => attr.key === 'v-grouping-child-elements')){
      setClassId(node.attributes)
      commitGroupingChildElements(node)
      needTranslate = true
    }
    checkGroupingChildElements(node.children)
  })
}

function commitGroupingChildElements(node){
  needTranslate = true
  const { attributes, children } = node
  let chunkNum
  attributes.forEach((attr) => {
    if (attr.key.includes('v-grouping-child-elements')) {
      chunkNum = attr.value
    }
  })
  // 去除 v-grouping-child-elements 属性
  node.attributes = node.attributes.filter((attr) => attr.key !== 'v-grouping-child-elements')
  

  // 处理 node 的子元素
  const newChildren = []
  for (const child of children) {
    if (child.type === 'element' && child.attributes?.find((attr) => attr.key === 'v-for')) {
      // v-for 的内容
      const value = child.attributes.find((attr) => attr.key === 'v-for').value
      let left, right

      /*
       * v-for 支持 "item of list" 和 "item in list" 两种语法，以下代码是对齐的兼容
       * 注意可能会出现罕见的 "item of (attr in obj ? ls1 : ls2)" 的情况。
       */
      const IN_SEPARATOR = ' in '
      const IN_POSITION = value.indexOf(IN_SEPARATOR)
      const OF_SEPARATOR = ' of '
      const OF_POSITION = value.indexOf(OF_SEPARATOR)
      if (IN_POSITION >= 0 && (OF_POSITION === -1 || IN_POSITION < OF_POSITION)) {
        [left, right] = [value.slice(0, IN_POSITION), value.slice(IN_POSITION + IN_SEPARATOR.length)];
      } else if (OF_POSITION >= 0) {
        [left, right] = [value.slice(0, OF_POSITION), value.slice(OF_POSITION + OF_SEPARATOR.length)];
      } else {
        console.error('v-grouping-child-elements 的子元素中的 v-for 格式不正确。')
        return
      }

      const ITEM_SYMBOL = '__GROUPING_ITEM'
      const INDEX_SYMBOL = '__GROUPING_INDEX'
      const SYMBOL_FOR_OLD_INDEX = '__GROUPING_ITEM_OLD_'
      const newChildrenItem = {
        ...child
      }
      // TODO: 1. 转换后的 index 会发生改变
      // 转换后的 index 会发生改变，需要重命名 index
      const HAS_INDEX = left.includes(',')
      let item, index
      if (HAS_INDEX) {
        [item, index] = left.split(',')
        index = index.trim().replace(")", "")
        left = `${item}, ${SYMBOL_FOR_OLD_INDEX}${index})`
      }
      newChildrenItem.attributes = child.attributes.filter((attr) => attr.key !== 'v-for').concat([
        {
          key: 'v-for',
          value: `${left} in ${ITEM_SYMBOL}`
        }
      ])

      const innerChild = [{
          type: 'element',
          tagName: 'div',
          attributes: [
            {
              key: 'v-for',
              value: `${index} in [${INDEX_SYMBOL} * ${chunkNum} + ${SYMBOL_FOR_OLD_INDEX}${index}]`,
            }
          ],
          children: [
            ...newChildrenItem.children
          ]
        }]
        newChildrenItem.children = innerChild

      // 添加中间层
      newChildren.push({
        type: 'element',
        tagName: 'div',
        attributes: [
          {
            key: 'v-for',
            value: `(${ITEM_SYMBOL}, ${INDEX_SYMBOL}) in _chunkArray(${right}, ${chunkNum})`,
          }
        ],
        children: [
          newChildrenItem
        ]
      })
    } else {
      newChildren.push(child)
    }
  }
  node.children = newChildren
}


module.exports = function (source){
  if(process.env.ISHARMONY === 'true') {
    // 根据当前解析模块路径生成对应的路径哈希
    moduleHash = createHash(this.resourcePath)
    // 获取当前解析模块的路径
    currentResolveModulePath = this.resourcePath
    source = resolveVueSFC(source)
  }
  return source
}