# Virtual DOM APIs
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

### `Document`

Each instance has a corresponding document with the same id. A document has many nodes which compose a node tree.

* `new Document(id)`
* `createBody(type, props)` Create body with a certain type and props. The `type` is one of `container`, `list` or `scroller`, and the `props` may contain `attr` and `style`.
* `createElement(tagName, props)` Create a certain type element with props.
* `createComment(text)` Create a comment node with a certain comment text.
* `setListener(listener)` Set a dom listener which listens each dom updates and tells the rendering engine
* `open()` Set a flag which means init rendering start, so each dom update will be called immediately
* `close()` Set a flag which means init rendering finished, so the dom updates later will be batched in each task.
* `addRef(el)` Add a new ref to the internal node map for a `el`
* `getRef(ref)` Get node by `ref` from the internal node map
* `removeRef(ref)` Removes the `ref` record from the internal node map
* `id` document id (also the instance id)
* `listener` dom listener
* `closed` flag which means rendering finished
* `body` document body element
* `eventManager` document event manager

### `Node`

* `create(instanceId)`
* `destroy()`
* `getRenderer()` Get dom listener of the owner document
* `next()` Returns the next sibling or null
* `prev()` Returns the previous sibling or null
* `ref`

### `Element`

extends from `Node`

* `new Element(type, props, ownerDocument)` Create an element and the `props` may contain `attr` and `style`.
* `appendChild(node)`
* `insertBefore(node, before)`
* `insertAfter(node, after)`
* `removeChild(node, preserved)` Removes a child. The parameter `preserved` means whether destroy the removed node immediately or preserve it.
* `clear()`
* `setAttr(key, value)`
* `setStyle(key, value)`
* `setClassStyle(classStyle)`
* `addEvent(type, handler)`
* `removeEvent(type)`
* `toJSON()` Format of `{ref, type, attr{string}, style{string}, event[string], children[Element]}`
* `type` Element type
* `attr` Several attributes for this element
* `style` Several style rules for this element
* `classStyle` Class style map, each class has several style rules
* `event` Event type list

### `Comment`

extends from `Node` and will not passed to rendering engine

* `new Comment(value, ownerDocument)`
* `type` Returns 'comment'
* `value`

### `EventManager`

Document event manager

* `add(el, type, handler)` Adds an event `handler` for certain `type` to a certain `el` element
* `remove(el, type)` Removes event handler for certain `type` to a certain `el` element
* `fire(el, type, e)` Fires a certain event to `el` with `type` and event object `e`
