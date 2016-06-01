# Virtual DOM APIs
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

### `Document`

Each instance has a corresponding document with the instance id. A document has many nodes which compose a node tree.

#### Constructor

* `new Document(id)`

#### Members

* `createBody(type, props): Node` Create document body. The `type` must be one of `div`, `list` or `scroller`. And the `props` may contain `attr` object and `style` object. e.g. `createBody('div', {style: {backgroundColor: '#ffffff'}})`
* `createElement(tagName, props): Node` Create a certain type `Element` with props.
* `createComment(text): Node` Create a `Comment` with a certain comment text.
* `open()` Set a flag which means init rendering start, so each dom update will be called immediately
* `close()` Set a flag which means init rendering finished, so the dom updates later will be batched in each task.
* `id: string` document id (also the instance id)
* `closed: boolean` flag which means rendering finished
* `body: Node` document body element

#### Internal Members

* `addRef(el)` Add a new ref to the internal node map for a `el`
* `getRef(ref)` Get node by `ref` from the internal node map
* `removeRef(ref)` Removes the `ref` record from the internal node map
* `eventManager` document event manager
* `listener` dom listener
* `setListener(listener)` Set a dom listener which listens each dom updates and tells the rendering engine

### `Node`

#### Constructor

* `new Node()`

#### Members

* `next()` Returns the next sibling or null
* `prev()` Returns the previous sibling or null
* `destroy()`

**Read-only**

* `ref`

#### Internal Members

* `create(instanceId)`
* `getRenderer()` Get dom listener of the owner document

### `Element` extends `Node`

#### Constructor

* `new Element(type, props, ownerDocument)` Create an element and the `props` may contain `attr` and `style`.

#### Members

**DOM Tree**

* `appendChild(node)`
* `insertBefore(node, before)`
* `insertAfter(node, after)`
* `removeChild(node, preserved)` Removes a child. The parameter `preserved` means whether destroy the removed node immediately or preserve it.
* `clear()`

**DOM props**

* `setAttr(key, value, silent)`
* `setStyle(key, value, silent)`
* `setClassStyle(classStyle)`
* `addEvent(type, handler)`
* `removeEvent(type)`

**Read-only**

* `toJSON()` Format of `{ref, type, attr{string}, style{string}, event[string], children[Element]}`
* `type` Element type
* `attr` Several attribuets for this element
* `style` Several style rules for this element
* `classStyle` Class style map, each class has several style rules
* `event` Event type list

### `Comment` extends `Node`

`Comment` won't be passed to the rendering engine. So it's very useful as a assistant placeholder sometimes.

* `new Comment(value, ownerDocument)`
* `type` Returns 'comment'
* `value`

### `EventManager`

Document event manager

#### Constructor

* `new EventManager()`

#### Members

* `add(el, type, handler)` Adds an event `handler` for certain `type` to a certain `el` element
* `remove(el, type)` Removes event handler for certain `type` to a certain `el` element
* `fire(el, type, e)` Fires a certain event to `el` with `type` and event object `e`
