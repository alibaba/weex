# Text

render text with specified style ruler , `<text>` tag can contain text value only.

you can using variable in text value ,eg:

'''
<text>Hello {{name}}</text>
'''

## Attribute

- `value`: text value for render , the  attribute is equal to content of `<text>` tag.

## Style
- [common style](/references/common-style.md)
- flexbox an other box model style (inner of cell)
- position
- opacity / background-color
- `lines`:  lines number , default value is `0` for unlimited .
- `color`: text color
- `font-size`: 
    + iOS: default vlaue `32`
    + Android: platform specify
    + HTML5: default value `24`
- `font-style`: `normal` | `italic` 
- `font-weight`: `normal` | `bold` 
- `text-decoration`: `none` | `underline` | `line-through` 
- `text-align`: `left` | `center` | `right`

if not specify width , `<text>` width will be equal to container width.

## Event

cell support `click` / `appear` / `disappear` .
please refer to  [Common Events](/references/common-event.md)

## Code Example

```html
<container>
  <text>...</text>
  <text value="..."></text>
  <text style="font-size: 24; text-decoration: underline;">{{price}}</text>
  <text value="{{...}}"></text>
</container>
```
