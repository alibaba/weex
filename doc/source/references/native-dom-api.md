---
title: Native DOM APIs   
type: references
order: 6
version: 2.1
has_chapter_content: true
---

# Native DOM APIs

Weex in the JS engine, for each page provides a set of Native DOM APIs. This interface is very close to the HTML DOM APIs. Using this interface we can control native rendering logic via JavaScript. And Weex upper layer of Vue 2.0 is based on this interface to adapt.   

In most cases, the JS framework will encapsulate native DOM APIs. That way, the developer does not need to work directly on the Native DOM.   

+ `Document` class: full page document.
+ `Node` class: the base class of nodes.
+ `Element` class: element node, inherited from Node, single view unit.
+ `Comment` class: comment node, inherited from Node, no practical meaning, usually used as placeholders.       

Each Weex page has a `weex.document` object, which is an instance of the Document class and is the starting point for all the following interface calls.

Let's take a look at their usage in detail:    

## `Document` class
Each `Document` instance will automatically have a `documentElement` property when it is created. This attribute represents the document node. The document node can have a body, which is the main node of the document.   

Note: The document node body only accepts `<div>`, `<list>`, or `<scroller>` three types of element nodes.   

### Constructor
`new Document(id: string, url: string?)`

### Member method 
`createElement(tagName: string, props: Object?): Element`   

+ Creates an `Element` instance of a specific type `tagName`, which is an element node. Props can contain attr objects and style objects. Such as `createBody ('div', {style: {backgroundColor: '#ffffff'}})`.     

`createComment(text: string): Comment`  
 
+ Create an instance of ·`Comment`, which is a comment node and set a text description.

`createBody(tagName: string, props: Object?): Element`

+ Create a document body node and automatically mount it under `documentElement`.   

`fireEvent(el: Element, type: string, e: Object?, domChanges: Object?)`
Triggers a particular type of event. When the event modifies the DOM's properties or styles during the generation process, the fourth argument is used to describe the changes, and the parameter format is the same as the format of the `createElement` method above.

`destroy()`   

+ Destroy the current document. Once the document is destroyed, it will no longer work.   

### Read-only member variables
`id: string`

+ Each `Document` instance has a unique id. This is also the only id that each Weex page has.

`URL: string?`

+ If the current Weex page has a JS bundle URL, the URL will be returned here.  

`body: Element`  

+ The main body of the document, the concept similar to the HTML DOM document.body.  

`documentElement: Element` 
 
+ Document node, the concept similar to the HTML DOM document.documentElement.
+ The relationship between body and documentElement is: documentElement is the parent of the body.   

`getRef(id): Node`

+ Get the node based on the node id.

## `Node` Class  
### Constructor  
`new Node()`

### Member method 
`destroy()`

### Read-only member variables or methods  
`ref: string`  

+ Each `Node` instance has its own unique ref value in the entire `Document instance.

`nextSibling: Node?`

`previousSibling: Node?`

`parentNode: Node?`

+ The three interfaces are consistent with the definition of HTML DOM.  

`children: Node[]`

+ The node has an array of all child nodes.

`pureChildren: Node[]`    

The node has an array of all the child elements. The difference between it and `children` is that `pureChildren` contains only the `Element` instance and not the `Comment` instance.   


## `Element` class, inherited from `Node`   
### Constructor 
`new Element(type: string, props: Object?)`

+ Creates an element node of a particular type `type`, and the `props` parameter can contain an `attr` object or a `style` object.   

### DOM tree operation
`appendChild(node: Node)`
`insertBefore(node: Node, before: Node?)`

+ The two interfaces are similar to HTML DOM.  

`insertAfter(node: Node, after: Node?)`  

+ Insert a new node before a child node.

`removeChild(node: Node, preserved: boolean?)`

+ Delete the child node node. Parameters `preserved` whether it is immediately removed from memory or temporarily retained.   

`clear()`

+ Clear all child nodes.  

### The DOM property itself operates  

`setAttr(key: string, value: string, silent: boolean?)`

`setStyle(key: string, value: string, silent: boolean?)`

+ In the above two interfaces, when `silent` is true, the node only updates itself, does not pass the command to the client render layer. This parameter is used to handle user events that have changed the node-related properties at the time of occurrence, and will not send commands repeatedly to the client after the Native DOM has changed.     

`addEvent(type: string, handler: Function)`

`removeEvent(type: string)`

`fireEvent(type: string, e: any)`

+ Bind events, unbind events, trigger events.   

#### Component method for a specific component type  

Special: Different component types can have their own unique methods, such as `<web>` components support `refresh` method. You can see the description of each component. In this case, we will generate a specific component type of class, such as `WebElement`, which inherited from `Element`.      

Such as:     

>`WebElement` inherited from `Element`           
>Indicates that a webview is embedded in the Wex page

>`Refresh ()`: Refreshes the current webview    


### Read-only member variables or methods  

`ref`, `nextSibling`, `previousSibling`, `parentNode`  

+ Inherited from `Node`.   

`nodeType: number`

+ The number is always  1.


`type: string`

+ Consistent with the `type` in the constructor.  

`attr: Object`

+ The key pair of all the characteristics of the current node. It is recommended to use the `setAttr ()` method to modify, rather than directly modify the object here.   

`style: Object`

+ The value of all the keys of the current node. It is recommended to modify the `setStyle ()` method, rather than directly modify the object here.   

`event: Object`

+ All events of the current node are bound. Each event type corresponds to an event handler method. It is recommended to use the `addEvent () / removeEvent ()` method to modify, rather than directly modify the object here.   

`toJSON(): Object`

+ Returns a JSON object that describes the element's node, such as: `{ref: string, type: string, attr: Object, style: Object, event: Array (string), children: Array}`.


## `Comment` class, inherited from `Node`

### Constructor 
`new Comment(value: string)`  

### Read-only member variables or methods  

`ref`, `nextSibling`, `previousSibling`, `parentNode`

+ Inherited from `Node`.

`nodeType: number`

+ The number is always 8.  

`type: string`  

+ The type  is always `'comment'` 

`value: string`

+ Consistent with the value in the constructor.

`toJSON(): Object` 

+ Returns a JSON object describing the annotation node. For example: `<! - value ->`.
