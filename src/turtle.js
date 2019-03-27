const v = require('./vector')
const l = require('./lambda')
const triangle = require('./directional-triangle')

// api functions & object
const forward = (state, amount) => {
  const {heading} = state
  let {position} = state

  position = v.add(position, v.scale(amount, v.from_compass(heading)))

  return {...state, position, heading}
}

const back = (state, amount) => forward(state, amount * -1)

const right = (state, amount) => {
  let {heading} = state

  heading = (360 + (heading + (amount % 360))) % 360

  return {...state, heading}
}

const left = (state, amount) => right(state, amount * -1)

const set_position = (state, position) => ({...state, position})

const set_heading = (state, heading) => ({...state, heading})

const show = state => ({...state, show: true})

const hide = state => ({...state, show: false})

const api = {forward, back, right, left, set_position, set_heading, show, hide}

// default initial position
const init = () => ({
  position: v.create(0, 0),
  heading: 0,
  show: true
})

// module functions
const create = (options) => ({...init(), ...options})

const update = (state, [command, arg] = []) => command in api ? api[command](state, arg) : state

const render = (world, state) => {
  const {heading, position, show} = state

  if (!show) return state

  const tri = triangle.create({position, heading: v.to_radians(heading - 90)})
  triangle.render(world, tri)

  return state
}

module.exports = {update, render, create, api}
