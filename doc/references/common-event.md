# Common Events
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/issues/33"  class="weex-translate">cn</a>

## Click event

If a `click` event is bound to a component, the event will be triggered when the user clicks on it.

**Notes:** The component `input` and `switch` do not currently support this event, please use `change` or `input` event instead.

**event object**

* `type`: `click`
* `target`: The target component where the event is triggered
* `timestamp`: Timestamp when event is triggered.

## Appear event

If a `appear` event is bound to a component inside a scroller, the event will be triggered when the component comes to be visible.

**event object**

* `type`: `appear`
* `target`: The target component where event is triggered
* `timestamp`: Timestamp when event is triggered.
* `direction`: The direction in which the scroller is scrolling. Should be `up` or `down`.

## Disappear event

If a `disappear` event is bound to a component inside a scroller, the event will be triggered when the component scrolls out of viewport and disappears from your sight.

**event object**

* `type`: `disappear`
* `target`: The object where event is triggered
* `timestamp`: Timestamp when event is triggered.
* `direction`: The direction in which the scroller is scrolling. Should be `up` or `down`


