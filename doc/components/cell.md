# Cell
one item of [list](list.md) , optimized for high performance scrolling.


## Attribute

- `scope` : optional identifier of item structure . if your list have diverse structure of cell, you should put same `scope` value for same cell with same structure.

**Notes:** if you have a lot of cell with same structure , display logic control statement (  `if` or `repeat` ) inside the cell  will degrade list performance , a common way to help prevent it is setting variables for style going to change , and make these change data-driven.


## Style

See [common style](/references/common-style.md) for more.

## Event

See [common events](/references/common-event.md) for more.

## Notes
you can't give `<cell>` a `flex` value .  width of `<cell>` is equal to width of `<list>` , and `<cell>` must have a given height.


## Code Example

please refer to  [List](list.md)
