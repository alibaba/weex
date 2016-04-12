# APIs

## $(id)

Return the vm element referenced by specific id.

### Arguments

* `id`*(string)*: Unique identifier.

### Returns

* *(Vm)*: Vm object referenced.

### Tips
* id is only guaranteed to be unique within the current (page)components, if you are looking for the parent components or child components, you can make use of the communication mode between components.
* Further reading: [id], [Communicate Between Components]

## $scrollTo(id, offset)

Scroll to the position which has an offset to the position making a specific element visible.

### Arguments

* `id`*(string)*: An identify to find the element.
* `offset`*(number)*: An offset to the visible position, default is `0`.

## $transition(id, options, callback)

Apply transition animation to a specific element.

### Arguments

* `id`*(string)*: An identify to find the element.
* `options`*(object)*: Transition options.
* `options.styles`*(object)*: Specify the names and values of styles to which a transition effect should be applied.
* `options.duration`*(number)*: Specifies the number of milliseconds a transition animation should take to complete. By default, the value is `0ms`, meaning that no animation will occur.
* `options.timingFunction`*(string)*: Used to describe how the intermediate values of the styles being affected by a transition effect are calculated. By default, the value is `linear`.
* `options.delay`*(number)*: Specifies the amount of milliseconds to wait between a change being requested to a property that is to be transitioned and the start of the transition effect. By default, the value is `0ms`.
* `callback`*(Function)*: Callback which is called after the completion of transition.

### Examples

$transition('id', {
  styles: {
    backgroundColor:'#FF0000’,
    transformOrigin: 'left top',
    transform: 'rotate(45deg) scale(1.5) translate(50%, 50%)'
  },
  timingFunction:”ease-in-out’,
  duration:1000,
  delay:500
}, function(){
  nativeLog(‘Transition is completed’);
});

## $getConfig()

Get the current global environment variables and configuration information.

### Return

 * @return {object}
 * @property {string} bundleUrl
 * @property {boolean} debug
 * @property {object} env
 * @property {string} env.weexVersion(ex. 1.0.0)
 * @property {string} env.appName(ex. TB/TM)
 * @property {string} env.appVersion(ex. 5.0.0)
 * @property {string} env.platform(ex. iOS/Android)
 * @property {string} env.osVersion(ex. 7.0.0)
 * @property {string} env.deviceModel **native only**
 * @property {number} env.[deviceWidth=750]
 * @property {number} env.deviceHeight


## $call(module, method, ...args)

Call the module method registered by client.

### Argument

* `module`*(string)*: Registered module name.
* `method`*(string)*: Registered method name.
* `args`*()*: method variable parameter.
