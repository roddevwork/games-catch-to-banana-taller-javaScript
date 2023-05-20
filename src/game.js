const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector("#btn-up")
const btnRight = document.querySelector("#btn-right")
const btnDown = document.querySelector("#btn-down")
const btnLeft = document.querySelector("#btn-left")

let canvasSize
let elementSize

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

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

function startGame() {
  game.font = elementSize + 'px Verdana'
  game.textAlign = 'end'

  const map = maps[0]
  const mapRows = map.trim().split("\n")
  const mapRowsColumn = mapRows.map(row => row.trim().split(""))
  // console.log(map, mapRows, mapRowsColumn);

  mapRowsColumn.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1)
      const posY = elementSize * (rowI + 1)
      game.fillText(emoji, posX, posY)
    })
  })


}

window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)
btnLeft.addEventListener('click', moveLeft)

function moveByKeys(event) {
  if (event.key === 'ArrowUp') moveUp()
  else if (event.key === 'ArrowRight') moveRight()
  else if (event.key === 'ArrowDown') moveDown()
  else if (event.key === 'ArrowLeft') moveLeft()
}

function moveUp() {
  console.log("Me quiero mover hacia arriba!");
}
function moveRight() {
  console.log("me quiero mover hacia la Derecha");
}
function moveDown() {
  console.log("me quiero mover hacia abajo");
}
function moveLeft() {
  console.log("me quiero mover hacia la Izquierda");
}
