# &lt;switch&gt;

### summary

The weex builtin component `switch` is used to create and manage a IOS styled On/Off buttons used, for example, in the Settings app for options such as 'muted' and 'toggle color'.

### subcomponents

This component supports no subcomponents.

### attributes

- `checked`: the initial value of whether the status of this button is `On` or `Off`.

### styles

**common styles**: check out [common styles for components](/references/common-style.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

**special styles**

This component supports no special styles.

### events

- support `click` event. Check out [common events](/references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](/references/common-event.md) *non-standard*
- support `change` event. The change event is fired when a change to the component's value is commited by the user.

### parameters of events' object

- for ``change`` event:
  - value: the value of the component who dispatched this event, which is the boolean value ``true`` or ``false``.
  - timeStamp: the time stamp of the event.

### example

```html
<container>
  <text>muted:</text>
  <switch checked="true"></switch>
</container>
```
