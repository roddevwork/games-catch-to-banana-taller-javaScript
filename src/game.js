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

  const map = maps[0]
  const mapRows = map.trim().split("\n")
  const mapRowsColumn = mapRows.map(row => row.trim().split(""))
  console.log(map, mapRows, mapRowsColumn);

  mapRowsColumn.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1)
      const posY = elementSize * (rowI + 1)
      game.fillText(emoji, posX, posY)
    })
  })

  // for (let xRow = 1; xRow <= 10; xRow++) {
  //   for (let YColumn = 1; YColumn <= 10; YColumn++) {
  //     game.fillText(emojis[mapRowsColumn[xRow - 1][YColumn - 1]], elementSize * YColumn, elementSize * xRow)
  //   }
  // }
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