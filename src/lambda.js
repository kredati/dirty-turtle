const bind = (...fns) => arg => fns.reduce((result, fn) => fn(result), arg)

module.exports = {bind}
