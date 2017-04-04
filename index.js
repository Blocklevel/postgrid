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
       * wrapper
       * A wrapper which makes all children listen to flex
       * @example
       */
      if (decl.prop.match(/^wrapper$/i)) {
        const maxWidth = decl.value

        decl.prop = 'display'
        decl.value = 'flex'

        decl.parent.append({ prop: 'flex', value: '0 1 auto' })
        decl.parent.append({ prop: 'flex-direction', value: 'row' })
        decl.parent.append({ prop: 'flex-wrap', value: 'wrap' })
        decl.parent.append({ prop: 'max-width', value: maxWidth })

        return
      }

      /**
       * col
       * Define column widths
       * @example
       */
      if (decl.prop.match(/^col$/i)) {
        const [count, total] = parseValues(decl.value)
        const perc = `${(count / total) * 100}%`
        const value = total ? perc : 'auto'

        decl.prop = 'flex'
        decl.value = `1 0 ${value}`

        decl.parent.append({ prop: 'max-width', value: perc })

        return
      }

      /**
       * push
       * Push columns to the right based on col width.
       * @example
       */
      if (decl.prop.match(/^push$/i)) {
        const [count, total] = parseValues(decl.value)
        const perc = `${(count / total) * 100}%`
        const value = total ? perc : 'auto'

        decl.prop = 'margin-left'
        decl.value = value
      }
    })
  }
})
