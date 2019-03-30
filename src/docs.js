const Color = {}
Color.name = 'Color'

const Vector = {}
Vector.name = 'Vector'

const Any = {}
Any.name = 'Any'

const Record = {}
Record.name = 'Record'


const Turtle = Symbol('Category: turtle')

const forward = {
  name: 'forward',
  shortcut: 'fd',
  arguments: [{distance: Number}],
  description: 'Moves the turtle forward by the amount passed as the argument.',
  example: 'forward(100)',
  category: 'turtle'
}

const back = {
  name: 'back',
  shortcut: 'bk',
  arguments: [{distance: Number}],
  description: 'Moves the turtle backward by the amount passed as the argument.',
  example: 'back(50)',
  category: 'turtle'
}

const left = {
  name: 'left',
  shortcut: 'bk',
  arguments: [{degrees: Number}],
  description: 'Rotates the turtle left by the number of degrees passed as the argument.',
  example: 'left(90)',
  category: 'turtle'
}

const right = {
  name: 'right',
  shortcut: 'rt',
  arguments: [{degrees: Number}],
  description: 'Rotates the turtle right by the number of degrees passed as the argument.',
  example: 'right(60)',
  category: 'turtle'
}

const circle_left = {
  name: 'circle_left',
  shortcut: 'cl',
  arguments: [{radius: Number}],
  description: 'Tells the turtle to walk in a circle, turning to the left, with the radius passed as the argument.',
  example: 'circle_left(100)',
  category: 'turtle'
}

const circle_right = {
  name: 'circle_right',
  shortcut: 'cr',
  arguments: [{radius: Number}],
  description: 'Tells the turtle to walk in a circle, turning to the right, with the radius passed as the argument.',
  example: 'circle_right(85)',
  category: 'turtle'
}

const arc_left = {
  name: 'arc_left',
  shortcut: 'al',
  arguments: [{radius: Number}, {optional: {degrees: Number, default_value: 90}}],
  description: `Tells the turtle to walk along an arc, turning to the left, with the radius passed as the first argument.
  The optional second argument determines the number of degrees the arc describes. The default is 90---a quarter circle.`,
  example: 

}

const arc_right = {
  name: 'arc_right',
  shortcut: 'ar',
  arguments: [{radius: Number}, {optional: {degrees: Number, default_value: 90}}],
  description: `Tells the turtle to walk along an arc, turning to the right, with the radius passed as the first argument.
  The optional second argument determines the number of degrees the arc describes. The default is 90---a quarter circle.`
}

const home = {
  name: 'home',
  arguments: [],
  description: 'Sends the turtle to its starting (home) position. It does not change the state of the pen.',
  category: 'turtle'
}

const pen_up = {
  name: 'pen_up',
  shortut: 'pu',
  arguments: [],
  description: 'Lifts the "pen" off the "paper." After calling this the turtle will not draw along its path until pen_down is called.',
  category: 'turtle'
}

const pen_down = {
  name: 'pen_down',
  shorcut: 'pd',
  arguments: [],
  description: 'Puts the "pen" on the "paper." After calling this the turtle will draw along its path until pen_up is called.',
  category: 'turtle'
}

const show = {
  name: 'show',
  arguments: [],
  description: 'Shows the turtle. The turtle will be visible until hide is called',
  category: 'turtle'
}

const hide = {
  name: 'hide',
  arguments: [],
  description: `Hides the turtle. The turtle will be hidden until show is called.
  The turtle will continue to move and draw normally while it is hidden.`,
  category: 'turtle'
}

const set_position = {
  name: 'set_position',
  arguments: [{position: Vector}],
  description: 'Sets the position of the turlte to the (x, y) coordinates specified by the vector passed as the argument.',
  category: 'turtle'
}

const set_heading = {
  name: 'set_heading',
  arguments: [{heading: Number}],
  description: `Sets the heading of the turtle to the number passed in as the argument.
  The heading corresponds to the compass reading on a map, with 0 being straight up.`
}

const color = {
  name: 'color',
  arguments: [Color],
  description: 'Sets the color of the path the turtle draws.',
  category: 'turtle'
}

const turtle_functions = {
  forward, back, left, right,
  circle_left, circle_right, arc_left, arc_right, 
  home, pen_up, pen_down, show, hide, set_position, set_heading, color
}

const Drawing = Symbol('Category: drawing')

const erase = {
  name: 'erase',
  arguments: [],
  description: 'Erases the contents of the drawing.',
  category: 'drawing'
}

const clear_screen = {
  name: 'clear_screen',
  shortcut: 'cs',
  arguments: [],
  description: 'Clears the screen and sets the turtle in its home location. Equivalent to home + erase.',
  category: 'drawing'
}

const background = {
  name: 'background',
  shortcut: 'bg',
  arguments: [Color],
  description: 'Sets the background color for the drawing.',
  category: 'drawing'
}

const undo = {
  name: 'undo',
  arguments: [{optional: {steps: Number, default_value: 1}}],
  description: `Undoes the last set of instructions delivered to the turtle.
  The optional argument how many sets of instructions to undo. The default is 1.`,
  category: 'drawing'
}

const redo = {
  name: 'redo',
  arguments: [{optional: {steps: Number, default_value: 1}}],
  description: `Re-does any undone instructions delivered to the turtle. 
  Giving new instructions to the turtle clears the redo cache.
  The optional argument how many sets of instructions to undo. The default is 1.`,
  category: 'drawing'
}

const drawing_functions = {erase, clear_screen, background, undo, redo}

const Information = Symbol('Category: information')

const print = {
  name: 'print',
  arguments: [{to_print: Any}],
  description: 'Prints whatever argument you give it to the console.',
  cagetory: 'information'
}

const heading = {
  name: 'heading',
  arguments: [],
  returns: Number,
  description: 'Returns current heading of the turtle, in degrees.',
  category: 'information'
}

const position = {
  name: 'position',
  arguments: [],
  returns: Vector,
  description: 'Returns the current position of the turtle, as a vector.',
  category: 'information'
}

const state = {
  name: 'state',
  arguments: [],
  returns: Record,
  description: 'Returns the current state of the turtle, as a record.',
  category: 'information'
}

const report = {
  name: 'report',
  arguments: [],
  description: 'Prints the current state of the turtle to the console.',
  category: 'information'
}

const information_functions = {print, heading, position, state, report}

const Control = Symbol('Category: control')

const repeat = {
  name: 'repeat',
  arguments: [{times: Number}, {to_repeat: Function}],
  description: `Repeats the function passed as the second argument the number of times passed in the first argument.
  Passes the number of the repetion (starting at 0) to the function as the single argument.`,
  example: `square = () => { 
  repeat(4, () => { 
    forward(100)
    right(90) 
  })
}`,
  category: 'control'
}

const loop = {
  name: 'loop',
  arguments: [{times: Number}, {to_loop: Function}, {optional: {first_value: Any}}],
  returns: Any,
  description: `Repeats the function passed as the second argument the number of times passed in the first argument.
  Passes the output of one iteration to the following iteration. 
  A third, optional, argument specifies the value that is passed to the first iteration.`,
  category: 'control'
}

const control_functions = {repeat, loop}

const All = Symbol('Category: everything')

const all_functions = {
  ...turtle_functions, 
  ...drawing_functions, 
  ...information_functions,
  ...control_functions
}

const categories = {
  [Turtle]: 'Turtle', 
  [Drawing]: 'Drawing', 
  [Information]: 'Information', 
  [Control]: 'Control',
  [All]: 'All'
}

const category_lists = {
  [Turtle]: turtle_functions,
  [Drawing]: drawing_functions,
  [Information]: information_functions,
  [Control]: control_functions,
  [All]: all_functions
}

const format_optional_argument = arg => {
  let {optional} = arg
  let {default_value, ...info} = optional
  let [label] = Object.keys(info)
  let [type] = Object.values(info)

  return `[Optional ${label}: ${type.name}${default_value === undefined ? '' : '; default: ' + default_value}]`
}

const format_argument = arg => {
  let [label] = Object.keys(arg)
  let [type] = Object.values(arg)

  if (label === 'optional') return format_optional_argument(arg)

  return `${label}: ${type.name}`
}

const display = doc => {
  console.log(`%cName: %c${doc.name}`, 
    'color: gray; size: large', 
    'color: black; font-weight: bold; size: large')
  console.log(`%cArguments:
%c${doc.arguments.length ? doc.arguments.map(format_argument).join(', ') : 'none'}`, 'color: gray', 'color: black; font-weight: bold;')
  if (doc.returns) console.log(`%cReturns: %c${doc.returns.name}`, 'color: gray', 'color: black; font-weight: bold')
  console.log(`%cDescription: %c${doc.description}`, 'color: gray', 'color: black')
  if (doc.example) console.log(`%cExample:
%c${doc.example}`, 'color: gray', 'color: black')
  console.log(`%cCategory: %c${doc.category}`, 'color: gray', 'color:black; font-weight: bold')
}

const help_assoc = Object.keys(all_functions)
  .map(fn => [window[fn], all_functions[fn]])

const help_map = new Map(help_assoc)

const list = (category = All) => {
  if (!category in categories) {
    console.warn(`I do not have a category ${category}.`)
    return
  }

  functions = category_lists[category]

  console.log(`%cCategory: %c${categories[category]}`, 'color: gray', 'color: black; font-weight: bold')
  console.log(Object.keys(category_lists[category]).join(', '))
  console.log('For more information on any of these functions, call help() on the function.')
}

const help = fn => {
  if (fn === undefined) {
    console.warn(`To use help, call help on a function or category. 
    Below is a list of all categories and functions for which I have help entries.`)
    console.log(`%c***Categories:`, 'color: gray')
    console.log(`%cTurtle, Drawing, Information, Control`, 'color: black')
    console.log('....................................')
    console.log('%c***Functions:', 'color: gray')
    list()
    return
  }
  if (fn in categories) {
    list(fn)
    return
  }
  if (!help_map.has(fn)) {
    console.warn(`I do not have a help entry for ${fn.name || fn.toString()}.`)
    return
  }

  const doc = help_map.get(fn)

  display(doc)
}

Object.defineProperty(help, 'toString', {value: 
  () => `help is a function and must be called in order to provide help.
  Try typing "help()".`
})

module.exports = {help, list, All, Turtle, Information, Drawing, Control}