---
title: JS Bundle format (英)
type: references
order: 5
has_chapter_content: false
chapter_title: 底层规范
version: 0.10
---

# JS Bundle format

JS Bundle Version: v0.3.0

## v0.5.0

### Whole Syntax and Structure

A JS Bundle is actually a JavaScript file which follows **ES5** standard. The code is used to define some custom components for the instance and bootstrap the instance with certain name, config and data. Developers could use all kinds of JS code packager like webpack, browserify, requirejs to organize your whole instance code.

### Meta Info

The JS Bundle Must begin with a comment line which is a JSON object like:

```javascript
// { "framework": "Weex", "version": "0.5.0" }
```

This JSON object as least contains:

* property `framework` must be `"Weex"`
* property `version` should be corresponded with the JS Bundle format version

### Global Members

* `__weex_define__(name, options)`
* `__weex_bootstrap__(name, config, data)`
* `__weex_document__`
* `__weex_require__(name)`

#### `__weex_define__(name:string, options: object)`

Define a custom component named `name` for current instance with `options`.

**example:**

```javascript
__weex_define__('rmb', {
  template: {
    type: 'div',
    style: {flexDirection: 'row'},
    children: [
      {type: 'text', attr: {value: '￥'}},
      {type: 'text', attr: {value: this.value}}
    ]
  },
  data: function () {
    return {
      value: '0'
    }
  },
  methods: {...}
})
```

The enabled component options contains:

* `template`: just the same as [v0.3.0](#details-of-template-option-definitions)
* `style`: just the same as [v0.3.0](#details-of-style-option-definitions)
* `data`: a function which return a plain object to observe by the ViewModel
* `methods`: a function map to proxy to the ViewModel
* `computed`: a map of several computed keys for the ViewModel
* `init`, `created`, `ready`: lifecycle methods
* `events`: event handlers for the ViewModel
<!-- * `components`: a map for options of sub components the ViewModel needed (So `__weex_define__(name, options)` equals to run `this.components[name] = options` in each custom components when `init`) -->

The enabled ViewModel APIs contains:

* `$el(id): Element`: find element by id in current ViewModel scope
* `$vm(id): ViewModel`: find sub ViewModel by id
* `$getConfig(): object`: get instance config info
* `$broadcast`/`$emit`/`$dispatch`/`$on`/`$off`: listen and fire component events
* `$transition` *(experimental)*: animation transition (see more in [animation native module](../animation.html))

#### `__weex_require__(name: string): object`

Get a Weex native module with several native APIs.

**example:**

```javascript
var modal = __weex_require__('modal')
modal.toast({
  message: 'Hey!',
  duration: 2
})
```

polyfill for v0.3.0

```javascript
function __weex_require__(name) {
  var result
  define('__weex_require__', function (r, e, m) {
    result = r('@weex-module/' + name)
  })
  return result
}
```

#### `__weex_bootstrap__(nameOrOptions: string|object, config: object?, data: object?): AppInstance | Error`

Start to render by a certain component name or a direct component options as the root element, and some instance `config` and instance `data`. If everything fine, it will returns the root app instance. Otherwise it will return an `Error` instance which describes something wrong.

**example:**

```javascript
__weex_bootstrap__(
  'root',
  {
    // format 1:
    // downgrade: { appVersion: '>= 0.5.0' },
    // format 2:
    // downgrade: function (config) { return true }
  },
  {
    // external data
    // value: '12345'
  }
)
```

The instance `config` now only support `downgrade` property which allows two format:

1. an object like `{ osVersion, appVersion, weexVersion, deviceModel }`
2. a function like `function (config) { return true }` to return a boolean value. `true` means normal and `false` means downgrade.

The instance `data` will merge to root component data. So the root component is also easy to reuse and the instance data is easy to customize.

#### `__weex_document__`

An virtual-DOM `Document` instance. Also the host of [virtual-DOM APIs](./virtual-dom-apis.html). Every Weex instance has and must have just one `Document` instance.

### Preserved Global Variables

`define`, `bootstrap`, `module`, `exports`, `document`, `require`, `register`, `render`

### A whole example

```javascript
// { "framework": "Weex", "version": "0.5.0" }

var modal = __weex_require__('modal')

__weex_define__('item', {
  template: {
    type: 'div',
    style: { flexDirection: 'row' },
    event: {
      click: function (e) {
        this.update(e)
      }
    },
    children: [
      { type: 'image', attr: { src: this.imageUrl }, ...},
      { type: 'text', attr: { value: this.title }, ...}
    ]
  },
  data: function () {
    return {
      imageUrl: '',
      title: ''
    }
  },
  methods: {
    update: function (e) {
      modal.toast({ message: this.title })
    }
  }
})

__weex_define__('app', {
  template: {
    type: 'div',
    children: [
      {
        type: 'item',
        repeat: {
          expression: function () {
            return this.list
          },
          key: '$index',
          value: '$value'}
        },
        attr: {
          imageUrl: function () {
            return this.$value.imageUrl
          },
          title: function () {
            return this.$value.title
          }
        }
      }
    ]
  },
  data: function () {
    return {
      list: [
        { imageUrl: 'xxx', title: '111' },
        { imageUrl: 'yyy', title: '222' },
        { imageUrl: 'zzz', title: '333' }
      ]
    }
  }
})

__weex_bootstrap__('app')
```

## v0.3.0

### Whole Syntax and Structure

A JS Bundle is actually a JavaScript file which follows **ES5** standard. The code is organized by several modules with AMD-like format:

```javascript
define('moduleName1', function (require, exports, module) {
  // content of module1
})

define('moduleName2', function (require, exports, module) {
  // content of module2
})

...
```

A whole Weex JS Bundle is concatenated by these modules and last a `bootstrap(rootComponentName, optionalConfig, optionalExternalData)` function call.

```javascript
define('@weex-component/a', function (require, exports, module) {
  // content of composed component <a>
})

define('@weex-component/b', function (require, exports, module) {
  // content of composed component <b>
})

bootstrap('@weex-component/b')
```

As the sample above, the component name should be hyphenated (a-z, 0-9, "-"). Other characters are not allowed.

And, the method call `bootstrap()` allows 1~3 parameters: root module name (String), config info (optional JSON) and external data (optional JSON).

### Content of Composed Components

A module of composed component contains 3 parts: whole options definition, additional template option definition and additional style option definition.

- whole options is a piece of JavaScript code to put component options (except `template` option and `style` option) into `module.exports`
- `template` option is a piece of JSON-like object assigned to `module.exports.template` which describes the display structure of this component
- `style` option is a piece of JSON object assigned to `module.exports.style` which describes the reusable styles in this component

The `template` option is required and appeared only once, and the `style` option and whole options definition are optional.

These options are defined and transformed by Transformer. Actually you can also ignore all the format limitation and write options to `module.exports` as the same result if you are not going to use Transformer. But that's not recommended.

#### Details of template option definitions

A piece of multi-level embedded JSON-like object which describes the view structure.

Every level JSON-like object has these members below:

* `type`: a required string, component name/type
* `component`: an optional boolean, whether this component is composed or native
* `attr`: an optional k-v pairs which contains all attributes of an element, the value could be a string, number, boolean or a function that bind some data value
* `style`: an optional k-v pairs which contains all styles of an element, just the same format as the `attr`
* `classList`: an optional array of strings which contains class names for styling.
* `events`: an optional k-v pairs whose keys are event type and values are corresponding method names
* `children`: an optional array of child components info
* `append`: an optional string which determines a compiling workflow strategy: append node-by-node singly or a whole node tree just one time. the default value is `node` and another supported value is `tree`.
* `shown`: a optional function which returns a boolean value to determine whether this component should be displayed
* `repeat`: a optional function which returns a list data to displays components with each

**Corresponding Keys to Weex Transformer:**

- tag `name` in Weex file corresponds to `type`
- attr `if` in Weex file corresponds to `shown`
- attr `repeat` in Weex file corresponds to `repeat`
- attr `append` in Weex file corresponds to `append`
- attr `style` in Weex file with CSS syntax corresponds to `style`
- attr `class` in Weex file with class names separated by blanks corresponds to `classList`
- attr `on***` in Weex file with prefix `on` corresponds to a k-v pair in `events`
- other attributes in Weex file corresponds to `attr`
- Child nodes in Weex file corresponds to `children`

All tag names, attr names are case-insensitive and transformed to lower-cased. But the attr values are case-sensitive.

#### Details of style option definitions

Just a two-levels JSON object.

* The first levels are class names.
* The second levels are k-v pairs which describes style names & properties for each class name.

**Corresponding Keys to Weex Transformer:**

* class name corresponds to first level keys
* prop name corresponds to second level keys
* prop value corresponds to second level values
