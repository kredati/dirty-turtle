const w = require('./walker')
const v = require('./vector')
const {append, last, but_last} = require('./array')

const vocabulary = require('./test_functions')

// helper functions
const globalize = obj => {
  for (const key in obj) {
    window[key] = obj[key]
  }

  return obj
}

// user-facing dsl/helper functions
const range = size => [...Array(size)].map((_, i) => i)

const repeat = (times, fn) => range(times).forEach(_ => fn())

const loop = (times, fn) => range(times).forEach(time => fn(time))

const reset = () => create(world.draw)

const print = x => console.log(x)

const position = () => world.walker.turtle.position

const heading = () => world.walker.turtle.heading

const current_color = () => world.walker.path.current_color

const report = () => ({
  position: position(),
  heading: heading(),
  color: current_color()
})

const undo = Function.tco((count = 1) => {
  if (count === 0) return world

  if (world.stack.length <= 1) {
    console.warn('Nothing to undo.')
    return world
  }

  world.redo = append(world.redo, last(world.stack))
  world.stack = but_last(world.stack)
  world.walker = last(world.stack)

  return undo(count - 1)
})

const redo = Function.tco((count = 1) => {
  if (count === 0) return world

  if (world.redo.length === 0) {
    console.warn('Nothing to redo.')
    return world
  }

  world.stack = append(world.stack, last(world.redo))
  world.redo = but_last(world.redo)
  world.walker = last(world.stack)

  return redo(count - 1)
})

const background = color => {
  world.background = color
}

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
  report
}

const modules = {...vocabulary, vector: v}

const world = {
  //fixed attributes
  size: v.create(800, 600)
}

const create = (draw) => {
  console.clear()
  console.log('Hello world! I am turtle, make me draw.')

  //context-sensitive attributes
  world.draw = draw

  //variable attributes
  world.walker = w.create(world)
  world.background = [0, 0, 0, 255]
  world.stack = []
  world.redo = []

  const api = {}

  for (const action in w.api) {
    api[action] = (...args) => {
      world.redo = []
      world.walker = w.api[action](world.walker, ...args)

      return world
    }
  }

  world.api = api
  
  globalize({...api, ...helpers, ...modules})

  return world
}

const render = () => {
  if (world.stack[world.stack.length - 1] !== world.walker)
    world.stack = [...world.stack, world.walker]
  world.draw.background(world.background)
  w.render(world, world.walker)
}

module.exports = {create, render}
