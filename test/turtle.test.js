const tap = require('tap')
const turtle = require('../src/turtle')

tap.test("A turtle module", t => {

  t.test("Creates turtles", t => {
    t.same(turtle.create(), {position: {x: 0, y: 0}, heading: 0, show: true}, 
      "Correctly creates defaults with no options")
    t.same(turtle.create({heading: 270}), {position: {x: 0, y: 0}, heading: 270, show: true})
    t.same(turtle.create({position: {x: 300, y: 250}}), {position: {x: 300, y: 250}, heading: 0, show: true})
    t.end()
  })

  t.test("Updates turtles", t => {

    let me = turtle.create()

    t.test("with no commands returns exact object", t => {
      t.is(turtle.update(me), me)
      t.end()
    })

    t.test("with garbage commands returns exact object", t => {
      t.is(turtle.update(me, ["foo", "bar", 14]), me)
      t.end()
    })

    t.test("with correct commands returns a different object", t => {
      t.isNot(turtle.update(me, ['forward', 100]), me, "forward 100")
      t.isNot(turtle.update(me, ['right', 90]), me, "right 90")
      t.end()
    })

    t.test("by rotating the turtle", t => {
      t.is(turtle.update(me, ['right', 90]).heading, 90, "right 90")
      t.is(turtle.update(me, ['left', 90]).heading, 270, "left 90")
      t.is(turtle.update(me, ['left', 720]).heading, 0, "left 720")
      t.end()
    })

    t.test("by moving the turtle forward", t => {
      t.is(me.heading, 0, "Turtle heading should be 0 (north)")
      t.same(turtle.update(me, ['forward', 100]).position, {x: 0, y: -100}, "forward 100")
      t.end()
    })

    t.test("by moving the turtle around", t => {
      let foo = turtle.create({position: {x: 100, y: 100}})
      foo = turtle.update(foo, ["right", 90], "right 90")
      t.is(foo.heading, 90)
      foo = turtle.update(foo, ["forward", 100], "forward 100")
      t.same(foo.position, {x: 200, y: 100})
      foo = turtle.update(foo, ["left", 270], "left 270")
      t.is(foo.heading, 180)
      foo = turtle.update(foo, ["back", 50], "back 50")
      t.same(foo.position, {x: 200, y: 50})
      t.end()
    })

    t.end()

  })

  t.end()

})