const {cos, sin, atan2, hypot} = Math

const round = (x, precision = 5) => Number(x.toFixed(precision))

const to_degrees = radians => round(radians * 180 / Math.PI)

const to_radians = degrees => round(degrees / 180 * Math.PI)

const create = (x, y) => ({x: round(x), y: round(y)})

const add = (v1, v2) => create(v1.x + v2.x, v1.y + v2.y)

const from_heading = heading => create(cos(heading), sin(heading))

const from_degrees = degrees => from_heading(to_radians(degrees))

const from_compass = compass => from_degrees(compass - 90)

const scale = (scalar, {x, y}) => create(scalar * x, scalar * y)

const rotate = (angle, {x, y}) => create(x * cos(angle) - y * sin(angle), x * sin(angle) + y * cos(angle))

const heading = ({x, y}) => round(atan2(y, x))

const magnitude = ({x, y}) => round(hypot(x, y))

const equal = (v1, v2) => v1.x === v2.x && v1.y === v2.y

module.exports = {
  create, 
  add, 
  heading, 
  to_degrees, 
  to_radians, 
  magnitude, 
  from_heading, 
  from_degrees,
  from_compass,
  scale, 
  rotate,
  round,
  equal
}