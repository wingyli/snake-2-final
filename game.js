// setup canvas
let canvas = document.getElementById('display')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
let ctx = canvas.getContext('2d')

// variables
let gridSize = 40
let gridWidth = Math.floor(canvas.width / gridSize)
let gridHeight = Math.floor(canvas.height / gridSize) // <- 50

// primitives get passed by value 
// e.g. numbers, booleans
let o = 1 
let t = o // => t = 1
o = 2
console.log("o", o)
console.log("t", t)

// objects get passed by reference
// e.g. arrays [1, 2, 3], objects {a:1, b:2}
let k = [1, 2, 3, 4]
let l = k
k.push(5)
console.log("k", k)
console.log("l", l)

// strings get passed by reference but are immutable in JavaScript
// e.g. s = "abcdef", you cannot do s[2] = 'x';
let x = "hello"
let y = x
x[2] = "x"
console.log("x", x)
console.log("y", y)
function test() {
  if (1 < 2) {
    var reset = true
    console.log(reset)
  }
  var reset = 123 // same reset from L37

}

let initial_snake = [
  {x: 6, y: 3},
  {x: 5, y: 3},
  {x: 4, y: 3},
  {x: 3, y: 3},
  {x: 2, y: 3},
]
let snake;
let initial_direction = 'right'
let direction;
let initial_apple = {x: 7, y: 3}
let apple;
function randomApple() {
  apple = {
    x: Math.floor(Math.random() * gridWidth)),
    y: Math.floor(Math.random() * gridHeight),
  }
}
function resetGame() {
  snake = []
  for (let i = 0; i < initial_snake.length; i++) {
    let body = initial_snake[i]
    let newBody = {x: body.x, y: body.y}
    snake.push(newBody)
  }
  direction = initial_direction
  apple = initial_apple
}


// implement drawSnake
function drawSnake() {
  let head = snake[0]
  drawHead(head.x, head.y)

  for (let i = 1; i < snake.length; i++) {
    let body = snake[i]
    drawSquare(body.x, body.y)
  }
}

// draw helpers
function erase() {
  ctx.fillStyle = '#000044'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}
function drawSquare(x, y) {
  ctx.fillStyle = 'green'
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize)
}
function drawHead(x, y) {
  ctx.fillStyle = 'darkgreen'
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize)
}
function drawCircle(x, y) {
  ctx.fillStyle = 'red'
  ctx.beginPath()
  ctx.arc((x + 0.5) * gridSize, (y + 0.5) * gridSize, gridSize / 2, 0, 2 * Math.PI)
  ctx.fill()
}

// handle user input
window.addEventListener('keydown', (event) => {
  console.log(event.code)
  if (event.code === 'ArrowRight') {
    direction = 'right'
  }
  if (event.code === 'ArrowLeft') {
    direction = 'left'
  }
  if (event.code === 'ArrowUp') {
    direction = 'up'
  }
  if (event.code === 'ArrowDown') {
    direction = 'down'
  }
})

function loop() {
  let head = snake[0]

  // handle direction change
  if (direction === 'right') {
    let newHead = {x: head.x + 1, y: head.y}
    snake.unshift(newHead)
  }
  if (direction === 'left') {
    let newHead = {x: head.x - 1, y: head.y}
    snake.unshift(newHead)
  }
  if (direction === 'up') {
    let newHead = {x: head.x, y: head.y - 1}
    snake.unshift(newHead)
  }
  if (direction === 'down') {
    let newHead = {x: head.x, y: head.y + 1}
    snake.unshift(newHead)
  }

  // todo update head to newHead
  head = snake[0]

  // todo check if the snake ate the apple
  if (head.x === apple.x && head.y === apple.y) {
    randomApple()
  } else {
    snake.pop()
  }

  // todo check if out of bounds
  

  // todo check if the snake is touching itself
  

  erase()
  drawSnake()
  drawCircle(apple.x, apple.y)
}
setInterval(loop, 100)

// Discussion:
// - How can we check if the snake ate the apple?
//   - check the position of the head and fruit to see if they're equal
//   - compare the x and y value of head and fruit
// - How can we grow the snake after eating fruit?
//   - if snake ate apple, re-add the "tail" since we are always removing
//   - the tail right now
//   - or if snake ate apple, don't remove tail
// - How to respawn fruit at random location?
//   - use Math.random()
// - How can we check if the snake went out of bounds?
//   - make a boundary point of x and y values
//   - whenever snake exceeds those values, it is considered oob
// - How can we check if snake is colliding with itself?
//   - check for overlap between head and any of the body grids, then reset
//   - for loop













