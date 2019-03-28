const t = require('./turtle')
const p = require('./path')
const v = require('./vector')

const create = (world) => {
  const turtle = t.create({position: v.scale(0.5, world.size)})
  const path = p.api.add_point(p.create(), turtle.position)

  return {turtle, path}
}

const forward = ({turtle, path}, distance) => {
  turtle = t.api.forward(turtle, distance)
  path = p.api.add_point(path, turtle.position)

  return {turtle, path}
}

const back = ({turtle, path}, distance) => {
  turtle = t.api.back(turtle, distance)
  path = p.api.add_point(path, turtle.position)

  return {turtle, path}
}

const left = ({turtle, path}, amount) => {
  turtle = t.api.left(turtle, amount)

  return {turtle, path}
}

const right = ({turtle, path}, amount) => {
  turtle = t.api.right(turtle, amount)

  return {turtle, path}
}

const color = ({turtle, path}, new_color) => {
  path = p.api.set_color(path, new_color)

  return {turtle, path}
}

const show = ({turtle, path}) => {
  turtle = t.api.show(turtle)

  return {turtle, path}
}

const hide = ({turtle, path}) => {
  turtle = t.api.hide(turtle)

  return {turtle, path}
}

const pen_up = ({turtle, path}) => {
  path = p.api.pen_up(path)

  return {turtle, path}
}

const pen_down = ({turtle, path}) => {
  path = p.api.pen_down(path)
  path = p.api.add_point(path, turtle.position)

  return {turtle, path}
}

const home = ({turtle, path}) => {
  turtle = t.api.home(turtle)

  return {turtle, path}
}

const erase = ({turtle}) => {
  path = p.api.add_point(p.create(), turtle.position)

  return {turtle, path}
}

const clearscreen = (walker) => home(erase(walker))

const api = {forward, back, left, right, color, show, hide, pen_up, pen_down, home, erase, clearscreen}

const update = (walker, [action, value]) => action in api ? api[action](value) : walker

const render = (world, {turtle, path}) => {
  t.render(world, turtle)
  p.render(world, path)
}

module.exports = {create, api, update, render}