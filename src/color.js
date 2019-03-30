const Types = require('./types')
const {conform} = Types
const {assert} = require('./assert')

const color = (r, g, b, a = 255) => [r, g, b, a]

const conform_to_color = c => {
  c = conform(Array, c, `Colors must be arrays. You gave me ${c}.`)
  assert(() => c.length === 4, `Colors must be arrays with four elements. You gave me ${c.length} elements.`)
  c = c.map((n, i) => conform(Number, n, `Colors must be arrays of numbers. You gave me ${typeof n}: ${n}, at index ${i}.`))

  return c
}

module.exports = {color, conform: conform_to_color}
