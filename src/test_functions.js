const angle_diff = (first, second) => {
  const diff = Math.abs(second - first)

  return diff < 180 ? diff : 360 - diff
}

const similar_angles = (first, second, precision = 0.1) =>
  angle_diff(first, second) <= precision

const ngon = Function.tco((sides, size = 100, stop = undefined) => {
  if (sides < 3) return
  if (stop === undefined) stop = heading()
  forward(size)
  right(360/sides)
  if (similar_angles(stop, heading())) return set_heading(stop)
  ngon.recur(sides, size, stop)
})

ngon.recursion_limit = 1000

const step = radius => forward(2 * Math.PI * radius / 360)

const circle_right = radius => repeat(360, () => {step(radius), right(1)})

const circle_left = radius => circle_right(-radius)

const arc_right = (radius, angle = 90) => repeat(angle, () => {step(radius), right(1)})

const arc_left = (radius, angle = 90) => repeat(angle, () => {step(radius), left(1)})

module.exports = {ngon, circle_right, circle_left, arc_right, arc_left}