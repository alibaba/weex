const compiler = require('vue-template-compiler')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')
const { parse } = require('himalaya')
const path = require('path')

let currentModulePath = ''

// 组件引入基路径，baseUrl的值为引入组件路径的公共部分
const baseUrl = '../src/components/'

/**
 * componentName:该属性的值是导入和注册组件时的组件名称，使用时请遵循Vue组件的命名和使用规范
 * 
 * componentAddress: 组件所在地址
 * 
 * isInPlugin: 是否从三方库引入
 */
const componentMap = [
  {
    componentName: 'HlRichtext',
    componentAddress: 'hl-richtext-base.vue',
    isInPlugin: false
  },
  {
    componentName: 'HlVideo',
    componentAddress: 'hl-video-base.vue',
    isInPlugin: false
  },
  {
    componentName: 'HlLottie',
    componentAddress: 'hl-lottie-base.vue',
    isInPlugin: false
  },
  {
    componentName: 'HlWeb',
    componentAddress: 'hl-web-base.vue',
    isInPlugin: false
  },
  {
    componentName: 'HlTextarea',
    componentAddress: 'hl-textarea-base.vue',
    isInPlugin: false
  },
  {
    componentName: 'HlButton',
    componentAddress: 'hl-button-base.vue',
    isInPlugin: false
  },
  {
    componentName: 'HlSlider',
    componentAddress: 'hl-slider-base.vue',
    isInPlugin: false
  }
]
const componentSet = new Set()

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
 * 处理解析标签名，将<hl-video>这种转为HlVideo
 * @param {*} tagName 
 */
function transformTagName(tagName) {
  if(tagName.includes('-')) {
    const nameSplit = tagName.split('-')
    return nameSplit.join('')
  }
  return tagName
}

function hasTargetElement(tagName) {
  let hasElement = false
  let componentName = ''
  componentMap.forEach((item) => {
    if(item.componentName.toLowerCase() === transformTagName(tagName)) {
      hasElement = true
      componentName = item.componentName
    }
  })

  return {
    hasElement,
    componentName
  }
}

/**
 * 遍历html节点，将需要引入的组件添加到componentSet中
 * @param {*} node html节点
 */
function traverseNode(node) {
  if (node.type === 'element') {
    const {hasElement, componentName} = hasTargetElement(node.tagName)
    if (hasElement) {
      componentSet.add(componentName)
    }
    if (node.children) {
      node.children.forEach((child) => {
        traverseNode(child)
      })
    }
  }
}

/**
 * 创建import组件导入节点
 * @param {*} componentName 组件名称
 * @returns 导入的ast节点
 */
function buildImportDeclaration(componentName) {
  let isInPlugin = getIsInPlugin(componentName)
  return t.importDeclaration(
    isInPlugin ? [t.importSpecifier(t.identifier(componentName), t.identifier(componentName), false, true)] : [t.importDefaultSpecifier(t.identifier(componentName))],
    t.stringLiteral(getComponentLoc(componentName))
  )
}

/**
 * 判断当前组件的引入是否是三方库引入
 * @param {*} componentName 
 */
function getIsInPlugin(name) {
  let isInPlugin = false
  componentMap.forEach((item) => {
    if(item.componentName === name) {
      isInPlugin = item.isInPlugin
    }
  })
  
  return isInPlugin
}

/**
 * 通过组件名称获取组件所在位置
 * @param {*} name 组件名称
 */
function getComponentLoc(name) {
  let address = ''
  let isInPlugin = false
  componentMap.forEach((item) => {
    if(item.componentName === name) {
      address = baseUrl + item.componentAddress
      isInPlugin = item.isInPlugin
    }
  })

  if (isInPlugin) {
    return address
  } else {
    return getAbsPath(address)
  }
}

/**
 * 根据引入的路径获取组件导入的路径
 * @param {*} address 
 * @returns 
 */
function getAbsPath(address){
  const componentAbsolute = path.resolve(__dirname, address)
  if(isWin32()) {
    return path.relative(currentModulePath, componentAbsolute).replace('..\\','').replace(/\\/g,'/')
  } else {
    return path.relative(currentModulePath, componentAbsolute).replace('../','')
  }
}

/**
 * 生产SFC代码
 * @param {*} moduleResoveRet 
 */
function generateCode(moduleResoveRet) {
  let styleTemplate = ''
  let styleAttrs = ''
  let scriptAttrs = ''

  moduleResoveRet.styles.forEach((item) => {
    styleTemplate += item.content
  })

  Object.keys(moduleResoveRet.script.attrs).forEach((item) => {
    if (typeof moduleResoveRet.script.attrs[item] === 'boolean') {
      scriptAttrs += ` ${item}`
    } else {
      scriptAttrs += ` ${item}="${moduleResoveRet.script.attrs[item]}"`
    }
  })

  if(moduleResoveRet.styles.length){
    Object.keys(moduleResoveRet.styles[0].attrs).forEach((item) => {
      if (typeof moduleResoveRet.styles[0].attrs[item] === 'boolean') {
        styleAttrs += ` ${item}`
      } else {
        styleAttrs += ` ${item}="${moduleResoveRet.styles[0].attrs[item]}"`
      }
    })
  }

  const template = `
<template>${moduleResoveRet.template.content}</template>
<script${scriptAttrs}>${moduleResoveRet.script.content}</script>
<style${styleAttrs}>${styleTemplate}</style>
  `
  return template
}

/**
 * 添加components对象
 * @param {*} data 
 */
function addComponentsProperty(data) {
  if (componentSet.size !== 0) {
    componentSet.forEach((value) => {
      if (!data.value.properties.some(item => item.value.name == value)) {
        const newProperty = t.objectProperty(t.identifier(value), t.identifier(value),false, true)
        data.value.properties.push(newProperty)
      }
    })
  }
}

module.exports = function (source) {
  if (process.env.ISHARMONY === 'true') {
    currentModulePath = this.resourcePath
    const moduleResoveRet = compiler.parseComponent(source)
    const { template, script, styles } = moduleResoveRet
    const tempAst = parse(template.content)
    tempAst.forEach((node) => {
      traverseNode(node)
    })
  
    // 单模块中引入了自定义组件
    if (componentSet.size !== 0) {
      const scriptAst = parser.parse(script.content, {
        sourceType: 'module',
        // 在此添加需要解析的插件
      })
    
      traverse(scriptAst, {
        Program(path) {
          componentSet.forEach((componentName) => {
            path.unshiftContainer('body', buildImportDeclaration(componentName))
          })
        },
        ExportDefaultDeclaration(path) {
          if (componentSet.size !== 0) {
            if (t.isObjectExpression(path.node.declaration)) {
              const properties = path.node.declaration.properties
              const result = properties.find(item => item.key.name == 'components')
              if (result) {
                addComponentsProperty(result)
              } else {
                const componentsAst = t.objectProperty(t.identifier('components'), t.objectExpression([]))
                properties.push(componentsAst)
                addComponentsProperty(componentsAst)
              }
            }
          }
        }
      })

      // 清除componentSet中的缓存，准备进入下次循环
      componentSet.clear()
    
      const { code } = generator(scriptAst)
      moduleResoveRet.script.content = code
      source = generateCode(moduleResoveRet)
    }
  }
  return source
}