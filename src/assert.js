const assert = (fn, msg) => {
  if (typeof fn !== 'function') throw Error('First argument to assert must be a function.')
  if (typeof msg !== 'string') throw Error('Second argument to assert must be a string.')

  let error = null

  try {
    const result = fn()
    if (result) return result
  } catch (e) {
    error = e
  }

  if (error) throw error
  throw Error(msg)
}

module.exports = assert