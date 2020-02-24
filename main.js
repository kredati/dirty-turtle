import * as recur from './src/better-recursion.js'
import * as World from './src/world.js'

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