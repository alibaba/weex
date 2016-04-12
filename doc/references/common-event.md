# Common Events

## click event

If a component is bound to this event, a click event will be triggered when the user clicks on the component,

**event object**

* `type`: `click`
* `target`: The object where event is triggered
* `timestamp`: Timestamp when event is triggered.

## appear event

If a component in a scroller is bound to this event, an appear event will be triggered when the component comes to be visible.

**event object**

* `type`: `appear`
* `target`: The object where event is triggered
* `timestamp`: Timestamp when event is triggered.
* `direction`: The direction in which the scroller is scrolling. Should be `up` or `down`.

## disappear event

If a component in a scroller is bound to this event, an disappear event will be triggered when the component comes to be invisible.

**event object**

* `type`: `appear`
* `target`: The object where event is triggered
* `timestamp`: Timestamp when event is triggered.
* `direction`: The direction in which the scroller is scrolling. Should be `up` or `down`




