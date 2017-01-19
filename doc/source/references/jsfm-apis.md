---
title: JS Framework APIs 
type: references
order: 1.3
version: 2.1
---

# JS Framework APIs 

## BroadcastChannel <span class="api-version">v0.9+</span>

`BroadcastChannel` API is the solution for inter-instance communication.

###  Reference

+ [BroadcastChannel specification](https://html.spec.whatwg.org/multipage/comms.html#broadcasting-to-other-browsing-contexts).
+ [MessageEvent specification](https://html.spec.whatwg.org/multipage/comms.html#messageevent)

### API

+ `postMessage(message)`: Sends the given message to other BroadcastChannel objects set up for this channel.
+ `close`: Closes the BroadcastChannel object, opening it up to garbage collection.
+ `onmessage`: Event handler, the event will be triggered when the instance receive a message.

### Usage

```javascript
const Stack = new BroadcastChannel('Avengers')
Stack.onmessage = function (event) {
  console.log(event.data) // in this case, it's "Hulk Smash !!!"
}

// in another instance
const Hulk = new BroadcastChannel('Avengers')
Hulk.postMessage("Hulk Smash !!!")
```

Run the code above, Stack can receive the message from Hulk.

### Notice

One thing should be noticed: **The `message` object is not deep cloned.**

See the demo below:

```javascript
const a = new BroadcastChannel('app')
const b = new BroadcastChannel('app')

const message = {
  lists: ['A', 'B']
}

a.onmessage = function (event) {

  // in this case, event.data is a reference of message
  console.assert(event.data === message)

}

b.postMessage(message)
```

In this case, `event.data` is strict equal to `message`.

Compared to the deep clone, this behavior improves efficiency and reduces memory cost. However, developers are not recommended to cache or modify the `event` object when they are using it (All type of event handlers should have this restriction).
