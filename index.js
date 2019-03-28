const recur = require('./src/better-recursion')
recur.init()

const p5 = require('p5')

const World = require('./src/world')

let sketch = p => {

  const world = World.create(p)
  window.world = world

  p.setup = () => {
    p.createCanvas(world.size.x, world.size.y)
  }

  p.draw = () => {
    World.render()
  }

}

let myp5 = new p5(sketch)

console.clear()
console.log('Hello, world! I am turtle, make me draw.')
