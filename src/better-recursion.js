const init = (recursion_limit = 500) => {  

  Function.prototype.recursion_limit = recursion_limit

  Function.prototype.recur = function(...args) {
    if (this.recursion_count === undefined) this.recursion_count = 0

    if (this.recursion_count > this.recursion_limit) {
      console.warn(`Too much recursion in ${this.name || 'anonymous function'}.`)
      this.recursion_count = undefined
      return void null
    }

    this.recursion_count++
    const result = this.apply(this, args)
    this.recursion_count = undefined
    return result

  }
  
  const recursion_symbol = Symbol("Recursion symbol.")

  const is_recursive_call = result => 
    result != null && 
    typeof result === 'object' &&
    recursion_symbol in result
  
  Function.tco = f => {
    f.recur = (...args) => ({recur: recursion_symbol, args})

    const call = (...args) => {
      let result = f(...args)
      
      let recursion_count = 0

      while (is_recursive_call(result)) {
        if (recursion_count > f.recursion_limit) {
          console.warn(`Too much recursion in ${f.name || 'anonymous function'}.`)
          return void null
        }
        recursion_count++
        result = f(...result.args)
      }

      return result
    }

    return Object.defineProperty(call, 'name', {
      value: f.name,
      enumerable: false
    })
  }
}

module.exports = {init}