# JS Bundle format
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

v0.3.0

## Whole Syntax and Structure

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


## NOTICE
After Weex added multi-module support ( support using `require` in your `<script>` tag  include other we file or js code into current we file). we begin using [Webpack](https://webpack.github.io/) as module bundler in our tool chain. So the eventual format of Weex JSBundle is webpack packed .

if you are JS Ninja, explore [weex-transformer](https://www.npmjs.com/package/weex-transformer) will give your unpacked , original Weex JS Bundle .

## Content of Composed Components

A module of composed component contains 3 parts: whole options definition, additional template option definition and additional style option definition.

- whole options is a piece of JavaScript code to put component options (except `template` option and `style` option) into `module.exports`
- `template` option is a piece of JSON-like object assigned to `module.exports.template` which describes the display structure of this component
- `style` option is a piece of JSON object assigned to `module.exports.style` which describes the reusable styles in this component

The `template` option is required and appeared only once, and the `style` option and whole options definition are optional.

These options are defined and transformed by Transformer. Actually you can also ignore all the format limitation and write options to `module.exports` as the same result if you are not going to use Transformer. But that's not recommended.

### Details of template option definitions

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

### Details of style option definitions

Just a two-levels JSON object.

* The first levels are class names.
* The second levels are k-v pairs which describes style names & properties for each class name.

**Corresponding Keys to Weex Transformer:**

* class name corresponds to first level keys
* prop name corresponds to second level keys
* prop value corresponds to second level values
