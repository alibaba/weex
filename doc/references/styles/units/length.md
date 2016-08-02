# `length` CSS Unit

In Weex, we only support `px` length unit. And it will be parsed to a number type in JavaScript Runtime and native renderer. So you can also use a number without `px` unit suffix.

Think about these styles, they are parsed into the same result.

```css
.classA { font-size: 48; line-height: 64; }
.classB { font-size: 48px; line-height: 64px; }
```

Other length units in CSS standard like `em`, `rem`, `pt` are not supported.
