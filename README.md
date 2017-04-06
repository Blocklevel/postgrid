# postgrid

> A fully responsive flexbox grid helper.

## Installation
Install the package:

``` bash
$ npm install postgrid --save
```

And load it in the postcss plugins list. For more information on how to install a plugin see the [PostCSS docs](https://github.com/postcss/postcss#usage)


# Example
Columns should always be wrapped inside a flex-wrapper. The following example results in:

- A full width, one column grid. (All columns are 1/1).
- At breakpoint $m it will have 3 even columns (All columns are 1/3).

```html
<div :class="$style.flexWrapper">
  <div :class="$style.col">1/3</div>
  <div :class="$style.col">1/3</div>
  <div :class="$style.col">1/3</div>
</div>
```

```css
.flex-wrapper {
  wrapper: 1280px;
}

.col {
  col: 1 1;

  @media ($m) {
  	col: 1 3;
  }
}
```

### Columns
The grid comes with 12 fluid columns:

![Columns](https://d3vv6lp55qjaqc.cloudfront.net/items/1T1B2A0d2C1U2F2h3T3B/Image%202017-03-09%20at%209.33.58%20PM.png?X-CloudApp-Visitor-Id=1390331&v=cfebed96)

#### Example:

```css
  .col {
	col: 1 4;
  }
```

### Vertical alignment

![Vertical alignment](https://d3vv6lp55qjaqc.cloudfront.net/items/0t0B2a1U2E3t0N3z003q/Image%202017-03-09%20at%209.35.55%20PM.png?X-CloudApp-Visitor-Id=1390331&v=01a382b2)

| Compose | Renders | Description |
|--------|--------|--------|
| `top` | `align-items: flex-start;` | Aligns columns to top |
| `middle` | `align-items: center;` | Aligns columns to middle |
| `bottom` | `align-items: flex-end;` | Aligns columns to bottom |

These styles can only be applied to a flex-grid wrapper.

#### Example:

```css
  .flex-grid {
    align: top;
  }
```

### Horizontal alignment

![Horizontal alignment](https://d3vv6lp55qjaqc.cloudfront.net/items/2s1S2p2q3O410j031W0A/Image%202017-03-09%20at%209.38.31%20PM.png?X-CloudApp-Visitor-Id=1390331&v=6125e11d)

| Compose | Renders | Description |
|--------|--------|--------|
| `left` | `justify-content: flex-start;` | Aligns columns to left |
| `center` | `justify-content: center;` | Aligns columns to center |
| `right` | `justify-content: flex-end;` | Aligns columns to right |

These styles can only be applied to a flex-grid wrapper.

#### Example:

```css
  .col {
	align: right;
  }
```

### Align self
Column specific alignment.

| Compose | Renders | Description |
|--------|--------|--------|
| `top` | `align-self: flex-start;` | Aligns this column to top |
| `middle` | `align-self: center;` | Aligns this column to center |
| `bottom` | `align-self: flex-end;` | Aligns this column to bottom |

These compose styles can only be applied to a column.

#### Example:

```css
  .col {
    align-self: center;
  }
```

### Align content
Aligns a flex container's lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis.

**Note:** this property has no effect when there is only one line of flex items.

![Spacing](https://d3vv6lp55qjaqc.cloudfront.net/items/3S0n1O1q1L461X1L0i2F/Image%202017-03-09%20at%209.45.08%20PM.png?X-CloudApp-Visitor-Id=1390331&v=60a65c56)

#### Space around
Lines evenly distributed with equal space around each line.

Example:

```css
.flex-grid {
  space: around
}
```

#### Space between
lines evenly distributed; the first line is at the start of the container while the last one is at the end.

##### Example:

```css
.flex-grid {
  space: between
}
```

### Gutters

Using a transparent border combined with background-clip: padding-box enables you to use percentages on cols without the need to calc gutters.

> **Important:** When using gutters be sure to compose the corresponding gutter-fix on the flex-grid wrapper:

```css
.flex-grid {
  gutter: 20px;
}
```

**Note:** If you need a solid border around your column use an extra div inside the column.

![Gutters](https://d3vv6lp55qjaqc.cloudfront.net/items/1S352Z262Q272A473o1p/Image%202017-03-09%20at%2010.13.51%20PM.png?X-CloudApp-Visitor-Id=1390331&v=475cfce3)

### Push
Push columns to the right based on col width.

![Push](https://d3vv6lp55qjaqc.cloudfront.net/items/262a3H1E0P263i0a1c06/Image%202017-03-09%20at%2010.21.13%20PM.png?X-CloudApp-Visitor-Id=1390331&v=429fdc22)

#### Example:

```css
.col {
  push: 1 4;
}
```
