---
title: Gesture
type: references
order: 1.8
version: 2.1
has_chapter_content: true
---

# Gesture

> Experiment Feature

Weex encapsulates native touch events to provide a gesture system. Using gesture is similar to use event in Weex. Just set `on` attributes on a node to listen to gesture.

## Type
For now, there are four types of gestures:

* **Touch**. Touch gesture is fired when a touch point is placed, moved or removed from the touch surface. Touch gesture is accuracy as it will report every trivial event. As a result, listening to touch gesture may be slow, a great deal of events needs to be processed even a small move happened. There are three types of Touch gesture:
	* `touchstart` will be fired when a touch point is placed on the touch surface.
	* `touchmove` will be fired when a touch point is moved along the touch surface.
	* `touchend` will be fired when a touch point is removed from the touch surface.
* **Pan**. Pan gesture also report motion of touch point on the touch surface, which is similar to touch gesture. But Pan gesture is sampled and faster than the touch event. As consequence, it is less accuracy than touch gesture. There are also three types of Pan gesture, and the meaning of these types is very close to types of Touch.
	* `panstart`
	* `panmove`
	* `panend`
* **Horizontal/Vertical Pan** <span class="api-version">v0.10+</span> . Mainly used for cell swipe gestures before conflict resolving system is completed. start/move/end state of the gesture will be passed by `state` property. **Note**: These gestures are in conflict with click event on Android currently.
  * `horizontalpan`
  * `verticalpan`
* **Swipe**. Swipe is fired when user swipe a touch point on the screen. A serial of motion will only trigger one Swipe gesture.
* **LongPress**. Swipe is fired when a touch point is held for 500 ms or more.

The Touch gesture and Pan is very close to each other, with following features hold:

* **Touch**. Not sampled, accuracy, but slow.
* **Pan**. Sampled, fast, less accuracy.

Users may choose their gesture according to their situation.

## Properties
The following properties can be used in gesture callback:

* `direction`. Only exists for **Swipe** gesture. Indicate the direcion of the swipe, choose from `up`, `left`, `bottom`, `right`.
* `changedTouches`. An array of motion for every touch pointer that has contribute to the current gesture.

### changedTouches

`changedTouches` is an array, with the following properties in its children:

* `identifier`. A unique identifier for a touch pointer.
* `pageX`. The X coordinate of the touch pointer relative to the left edge of the document.
* `pageY`. The Y coordinate of the touch pointer relative to the top of the document.
* `screenX`. The X coordinate of the touch point relative to the left edge of the screen.
* `screenY`. The Y coordinate of the touch point relative to the top edge of the screen.

## Constrain
Currently, Weex Android do not support listening to gesture on `scroller`, `list` and `webview`, as it would lead a large amount of event conflicting.
