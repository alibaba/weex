# image

`image` tag render specified image, it can't contain any children tag bug can using `img` as alias.

alias: `<img>`

## Attribute

- `src`: image source url

## Style

- flexbox an other box model style
- position
- opacity / background-color

See [common style](/references/common-style.md) for more.

### Notes

height and width style of `image` have default value `200`

## Code Example

```html
<container>
  <image src="..."></image>
  <image src="..." style="width: 200; height: 150;"></image>
</container>
```


