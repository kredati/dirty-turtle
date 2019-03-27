const p5 = require('p5')

const vector = require('./src/vector')
const turtle = require('./src/turtle')

console.log('Hello, world!')

window.world = {}

let sketch = p => {

  const world = {
    size: vector.create(800, 600),
    background: [0, 0, 0, 255],
    turtle: turtle.create(),
    draw: p
  }

  window.world = world

  p.setup = () => {
    console.log('Setting up!')
    p.createCanvas(world.size.x, world.size.y)
    world.turtle = turtle.create({position: vector.scale(0.5, world.size)})
  }

  p.draw = () => {
    p.background(world.background)

    turtle.render(world, world.turtle)
  }

}

let myp5 = new p5(sketch)
console.clear()