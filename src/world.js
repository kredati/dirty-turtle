const w = require('./walker')
const v = require('./vector')
const {append, last, but_last} = require('./array')

const Types = require('./types')
const {conform} = Types
const Color = require('./color')
const {colors} = Color
window.conform = conform

const vocabulary = require('./arcs')

const quickdraw = require('./quickdraw')
const shoot = require('./shoot')

// helper functions
const globalize = obj => {
  Object.keys(obj).forEach(key => { window[key] = obj[key] })

  return obj
}

// user-facing dsl/helper functions
const range = size => {
  size = conform(Number, size, `Argument to range must be a number. You gave me a(n) ${typeof size}: ${size}.`)
  
  return [...Array(size)].map((_, i) => i)
}

const repeat = (times, fn) => {
  times = conform(Number, times, `First argument to repeat must be a number. You gave me a(n) ${typeof times}: ${times}.`)
  fn = conform(Function, fn, `Second argument to repeat must be a function. You gave me a(n) ${typeof fn}: ${fn}.`)

  range(times).forEach(time => fn(time))

  const msg = fn.name || fn
  return ok(repeat, [times, msg])
}

const loop = (times, fn, first) => {
  times = conform(Number, times, `First argument to loop must be a number. You gave me a(n) ${typeof times}: ${times}.`)
  fn = conform(Function, fn, `Second argument to loop must be a function. You gave me a(n) ${typeof times}: ${fn}.`)

  return range(times).reduce((acc, time) => fn(acc, time), first)
}

const reset = () => {
  stop_quickdraw()
  stop_shoot()
  create(world.draw)
  return ok(reset)
}

const print = x => (console.log(x), x)

const position = () => world.walker.turtle.position

const heading = () => world.walker.turtle.heading

const current_color = () => world.walker.path.current_color

const state = () => ({
  position: position(),
  heading: heading(),
  color: current_color()
})

const report = () => {
  const {x, y} = position()
  let color = current_color()
  let named_color = Object.entries(colors)
    .filter(([_, value]) => value === color)
    .reduce((_, [name]) => name, '')
  print(`Position: (${x}, ${y}). Heading: ${heading()}. Color: ${named_color || color}.`)

  return ok(report)
}

const undo = Function.tco((count = 1) => {
  count = conform(Number, count, `Argument to undo must be a number. You gave me a(n) ${typeof count}: ${count}.`)
  
  if (count === 0) return ok(undo)

  if (world.stack.length <= 1) {
    console.warn('Nothing to undo.')
    return ok(undo)
  }

  world.redo = append(world.redo, last(world.stack))
  world.stack = but_last(world.stack)
  world.walker = last(world.stack)

  return undo(count - 1)
})

const redo = Function.tco((count = 1) => {
  count = conform(Number, count, `Argument to redo must be a number. You gave me a(n) ${typeof count}: ${count}.`)

  if (count === 0) return ok(redo)

  if (world.redo.length === 0) {
    console.warn('Nothing to redo.')
    return ok(redo)
  }

  world.stack = append(world.stack, last(world.redo))
  world.redo = but_last(world.redo)
  world.walker = last(world.stack)

  return redo(count - 1)
})

const background = color => {
  color = Color.conform(color)

  world.background = color

  return ok(background, color)
}

const hard_reset = () => window.location.reload()

const helpers = {
  range, 
  repeat, 
  loop, 
  reset, 
  undo, 
  redo, 
  print, 
  background, bg: background,
  position,
  heading,
  current_color,
  state,
  report,
  hard_reset
}

const start_quickdraw = () => quickdraw.api.start()
const stop_quickdraw = () => quickdraw.api.stop()

const start_shoot = (size) => shoot.api.start(size)
const stop_shoot = () => shoot.api.stop()
const new_shot = () => shoot.api.renew_shot(world)

const games = {start_quickdraw, stop_quickdraw, start_shoot, stop_shoot, new_shot,...shoot.levels}

const modules = {...vocabulary, vector: v}

const world = {
  //fixed attributes
  size: v.create(800, 600)
}

const ok = (action, args = []) => Object.defineProperty(ok, 'toString', 
  {value: () => `Ok: ${action.name ? action.name : action}(${args.join(', ')})`, writable: true})

const create = (draw) => {
  console.log('Hello world! I am turtle, make me draw.')

  //context-sensitive attributes
  world.draw = draw

  //variable attributes
  world.walker = w.create(world)
  world.background = colors.black
  world.stack = []
  world.redo = []

  const api = {}

  for (const action in w.api) {
    api[action] = (...args) => {
      world.redo = []
      world.walker = w.api[action](world.walker, ...args)

      return ok(action, args)
    }
  }

  world.api = api
  
  globalize({
    ...api, 
    ...helpers, 
    ...modules, 
    colors, ...colors,
    ...games
  })

  const help = require('./docs')

  globalize(help)

  return world
}

const render = () => {
  if (world.stack[world.stack.length - 1] !== world.walker)
    world.stack = [...world.stack, world.walker]
  world.draw.background(world.background)
  w.render(world, world.walker)
  
  quickdraw.render(world)
  shoot.render(world)
}

module.exports = {create, render}
