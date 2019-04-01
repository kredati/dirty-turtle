const Types = require('./types.js')
const {conform} = Types

const step = radius => forward(2 * Math.PI * radius / 360)

const circle_right = radius => {
  radius = conform(Number, radius, 
    `You must tell the turtle how big of a circle to walk along by giving it a number.
    You gave it a ${typeof radius}.
    You told it to walk in a circle with a radius of ${radius}.`)

  repeat(360, () => {step(radius), right(1)})
}

const circle_left = radius => {
  radius = conform(Number, radius, 
    `You must tell the turtle how big of a circle to walk along by giving it a number.
    You gave it a(n) ${typeof radius}.
    You told it to walk in a circle with a radius of ${radius}.`)

  circle_right(-radius)
} 

const arc_right = (radius, angle = 90) => {
  radius = conform(Number, radius, 
    `You must tell the turtle the radius of the arc to walk along by giving it a number.
    You gave it a(n) ${typeof radius}.
    You told it to walk in a circle with a radius of ${radius}.`)
  
  angle = conform(Number, angle,
    `You must tell the turtle how many degrees of the circle to walk along by giving it a number.
    You gave it a(n) ${typeof angle}.
    You told it to walk ${angle} degrees around the circle.`)

  repeat(angle, () => { step(radius); right(1) })
} 

const arc_left = (radius, angle = 90) => {
  radius = conform(Number, radius, 
    `You must tell the turtle the radius of the arc to walk along by giving it a number.
    You gave it a(n) ${typeof radius}.
    You told it to walk in a circle with a radius of ${radius}.`)
  
  angle = conform(Number, angle,
    `You must tell the turtle how many degrees of the circle to walk along by giving it a number.
    You gave it a(n) ${typeof angle}.
    You told it to walk ${angle} degrees around the circle.`)

  repeat(angle, () => { step(radius); left(1) })
}

const silly_star = (angle, size = 100) => {
  forward(size)
  right(angle)
  cond(heading() === 0,
    () => {},
    () => { silly_star(angle, size) }
  )
}

const ngon = (sides, size = 100) => {
  repeat(sides, () => { forward(size); right(360/sides) })
}

module.exports = {circle_right, circle_left, arc_right, arc_left, cl: circle_left, cr: circle_right, al: arc_left, ar: arc_right, silly_star, ngon}