const tap = require('tap')
const vector = require('../src/vector')

// test creation
tap.test("A vector module", t => {

  t.test("Creates vectors properly", t => {
    t.same(vector.create(0, 0), {x: 0, y: 0}, "Creates origin vector")
    t.same(vector.create(350, -4.23), {x: 350, y: -4.23}, "Creates vector with numbers")
    t.end()
  })
  
  t.test("Adds vectors appropriately", t => {
    let v1 = vector.create(100, 100)
    let v2 = vector.create(50, -50)
    t.same(vector.add(v1, v2), vector.create(150, 50), "Correctly adds vectors")
    t.end()
  })

  t.test("Calculates headings in radians", t => {
    let v1 = vector.create(100, 100)
    let v2 = vector.create(50, -50)
    let v3 = vector.create(Math.cos(Math.PI / 6), Math.sin(Math.PI / 6))
    t.is(vector.heading(v1), vector.round(Math.PI / 4), "Correctly calculates heading in first quandrant")
    t.is(vector.heading(v2), vector.round(Math.PI / -4), "Correctly calculates heading in fourth quadrant")
    t.is(vector.heading(v3), vector.round(Math.PI / 6))
    t.end()
  })

  t.test("Converts from radians to degrees", t => {
    t.is(vector.to_degrees(Math.PI / 2), 90, "Correctly calculates pi / 2 as 90")
    t.is(vector.to_degrees(Math.PI), 180, "Correctly calculates pi as 180")
    t.is(vector.to_degrees(Math.PI/3), 60, "Correctly calculates pi / 3 as 60")
    t.end()
  })

  t.test("Converts from degrees to radians", t => {
    t.is(vector.to_radians(90), vector.round(Math.PI / 2), "Correctly calculates 90 as pi/2")
    t.is(vector.to_radians(180), vector.round(Math.PI), "Correctly calculates 180 as pi")
    t.is(vector.to_radians(300), vector.round(2 * Math.PI - (Math.PI / 3)), "Correctly calculates 300 as 2pi - pi/3")
    t.end()
  })

  t.test("Scales vectors properly", t => {
    let v = vector.create(3, 4)
    let v1 = vector.from_heading(0.3566)
    t.same(vector.scale(1, v), v)
    t.same(vector.scale(10, v), vector.create(30, 40))
    t.same(vector.scale(3.2, v), vector.create(9.6, 12.8))
    t.is(vector.magnitude(v1), 1)
    t.is(vector.magnitude(vector.scale(1.6, v1)), 1.6)
    t.end()
  })

  t.test("Rotates vectors properly", t => {
    let v1 = vector.create(1, 1)
    let thirty_degrees = Math.PI / 6
    let x = Math.cos(thirty_degrees)
    let y = Math.sin(thirty_degrees)
    let v2 = vector.create(x, y)
    let v3 = vector.create(y, x)
    t.same(vector.rotate(Math.PI / 2, v1), vector.create(-1, 1))
    t.same(vector.rotate(0, v1), v1)
    t.same(vector.rotate(thirty_degrees, v2), v3)
    t.end()
  })

  t.test("Creates unit vectors from headings", t => {
    t.same(vector.from_heading(Math.PI), {x: -1, y: 0})
    t.same(vector.from_heading(Math.PI / 2), {x: 0, y: 1})
    t.same(vector.from_heading(Math.PI / 3), 
      vector.create(Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)))
    t.same(vector.from_heading(1.5 * Math.PI), {x: 0, y: -1})
    t.is(vector.magnitude(vector.from_heading(13.331)), 1)
    t.end()
  })
  
  t.end()
})

