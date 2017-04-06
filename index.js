var postcss = require('postcss')

/**
 * Parses data from the declaration value and it applies a default
 * value if it's not defined
 * @param  {String} values
 * @param  {Number} [default=1] default fallback value
 * @return {Array<Number>}
 */
function parseValues (values, defaultValue = 1) {
  return values.split(' ').map(value => {
    return parseInt(value) || defaultValue
  })
}

module.exports = postcss.plugin('postgrid', function (options) {
  return function (css) {
    css.walkDecls(function (decl) {
      /**
       * Wrapper
       *
       * A wrapper which makes all children listen to flex
       */
      if (decl.prop.match(/^wrapper$/i)) {
        const maxWidth = decl.value

        decl.prop = 'display'
        decl.value = 'flex'

        decl.parent.prepend({ prop: 'flex', value: '0 1 auto' })
        decl.parent.prepend({ prop: 'flex-direction', value: 'row' })
        decl.parent.prepend({ prop: 'flex-wrap', value: 'wrap' })
        decl.parent.prepend({ prop: 'max-width', value: maxWidth })

        return
      }

      /**
       * Col
       *
       * Define column widths
       */
      if (decl.prop.match(/^col$/i)) {
        const [count, total] = parseValues(decl.value)
        const perc = `${(count / total) * 100}%`
        const value = total ? perc : 'auto'

        decl.prop = 'flex'
        decl.value = `1 0 ${value}`

        decl.parent.prepend({ prop: 'max-width', value: perc })

        return
      }

      /**
       * Push
       *
       * Push columns to the right based on col width.
       */
      if (decl.prop.match(/^push$/i)) {
        const [count, total] = parseValues(decl.value)
        const perc = `${(count / total) * 100}%`
        const value = total ? perc : 'auto'

        decl.prop = 'margin-left'
        decl.value = value

        return
      }

      /**
       * Align items
       *
       * Vertical alignment.
       */
      if (decl.prop.match(/^align$/i)) {
        switch (decl.value) {
          case 'left':
          case 'center':
          case 'right':
            decl.prop = 'justify-content'
            break;

          case 'top':
          case 'middle':
          case 'bottom':
            decl.prop = 'align-items'
            break;
        }

        switch (decl.value) {
          case 'top':
          case 'left':
            decl.value = 'flex-start'
            break;

          case 'middle':
          case 'center':
            decl.value = 'center'
            break;

          case 'bottom':
          case 'right':
            decl.value = 'flex-end'
            break;
        }

        return
      }

      /**
       * Align self
       *
       * Col alignment exceptions
       */
      if (decl.prop.match(/^align-self$/i)) {
        decl.prop = 'align-self'

        switch (decl.value) {
          case 'top':
            decl.value = 'flex-start'
            break;

          case 'middle':
            decl.value = 'center'
            break;

          case 'bottom':
            decl.value = 'flex-end'
            break;
        }

        return
      }

      /**
       * Space
       *
       * Fill empty space around or between cols
       */
      if (decl.prop.match(/^space$/i)) {
        decl.prop = 'justify-content'
        decl.value = decl.value === 'around' ? 'space-around' : 'space-between'

        return
      }

      /**
       * Gutters
       *
       * Using a transparent border combined with background-clip: padding-box
       * enables you to use percentages on cols without the need to calc gutters
       */
      if (decl.prop.match(/^gutter$/i)) {
        decl.parent.prepend({ prop: 'background-clip', value: 'padding-box !important' })
        decl.parent.prepend({ prop: 'border-color', value: 'transparent !important' })
        decl.parent.prepend({ prop: 'border-style', value: 'solid' })

        decl.prop = 'border-width'

        return
      }
    })
  }
})
