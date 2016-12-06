# `color` CSS Unit

Supported value types:

```css
.classA {
  /* 3-chars hex */
  color: #0f0;
  /* 6-chars hex */
  color: #00ff00;
  /* rgba */
  color: rgb(255, 0, 0);
  /* rgba */
  color: rgba(255, 0, 0, 0.5);
  /* transparent */
  color: transparent;
  /* Basic color keywords */
  color: orange;
  /* Extended color keywords */
  color: darkgray;
}
```

## Note

* `hsl()`, `hsla()`, `currentColor`, 8-chars hex colors are not supported.

* `rgb(a,b,c)` or `rgba(a,b,c,d)` have much worse performance than ohter color format. Choose your color format wisely.

See more for [named colors](../../color-names.md).
