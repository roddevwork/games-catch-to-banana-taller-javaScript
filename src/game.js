const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

let canvasSize
let elementSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function startGame() {
  // console.log(canvasSize, elementSize);

  game.font = elementSize + 'px Verdana'
  game.textAlign = 'end'

  for (let i = 1; i <= 10; i++) {
    game.fillText(emojis['X'], elementSize, elementSize * i)

  }
}
function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * .8
  }
  if (window.innerWidth > window.innerHeight) {
    canvasSize = window.innerHeight * .8
  }

  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)

  elementSize = canvasSize / 10

  startGame()
}