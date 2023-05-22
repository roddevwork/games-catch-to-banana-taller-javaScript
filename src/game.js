const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector("#btn-up")
const btnRight = document.querySelector("#btn-right")
const btnDown = document.querySelector("#btn-down")
const btnLeft = document.querySelector("#btn-left")
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record')
const pResultPantalla = document.querySelector('#result')
const btnResetId = document.querySelector('#reset-game');
const btnPlay = document.querySelector('#play-btn');
const btnContainer = document.querySelector('.btn-container');
const btnRest = document.querySelector('.reset-btn');

let canvasSize
let elementSize
let level = 0
let lives = 3
let timeStart
let timePlayer
let timeInterval

const playerPosition = {
  x: undefined,
  y: undefined
}

const giftPosition = {
  x: undefined,
  y: undefined
}

let enemyPositions = []

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
window.addEventListener('keydown', moveByKeys)

btnUp.addEventListener('click', moveUp)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)
btnLeft.addEventListener('click', moveLeft)
btnResetId.addEventListener("click", resetGame)
btnPlay.addEventListener("click", showTime)

//---> Functions
function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) canvasSize = window.innerWidth * .8
  if (window.innerWidth > window.innerHeight) canvasSize = window.innerHeight * .8

  fixNumber(canvasSize)

  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)

  elementSize = (canvasSize / 10) - 1
  game.font = elementSize + 'px Verdana'
  game.textAlign = "end"

  playerPosition.x = undefined
  playerPosition.y = undefined

  startGame()
}

function startGame() {
  const map = maps[level]

  if (!map) {
    gameWin()
    return;
  }

  const mapRows = map.trim().split("\n")
  const mapRowsColumn = mapRows.map(row => row.trim().split(""))
  // console.log(map, mapRows, mapRowsColumn);

  showLives()

  enemyPositions = []
  game.clearRect(0, 0, canvasSize, canvasSize)
  mapRowsColumn.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1)
      const posY = elementSize * (rowI + 1)

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX
          playerPosition.y = posY
          // console.log(playerPosition);
        }
      } else if (col == 'I') {
        giftPosition.x = posX
        giftPosition.y = posY
      } else if (col == 'X') {
        enemyPositions.push({
          x: posX,
          y: posY
        })
      }

      game.fillText(emoji, posX, posY)
    })
  })

  movePLayer()
}

function fixNumber(number) {
  return Number(number.toFixed(2));
}

function movePLayer() {
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3)
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
  const giftCollision = giftCollisionX && giftCollisionY

  if (giftCollision) levelWin()

  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3)
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3)
    return enemyCollisionX && enemyCollisionY
  })

  if (enemyCollision) levelFail()

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function levelWin() {
  // console.log("subiste de nivel");
  level++
  startGame()
}

function levelFail() {
  lives--
  // console.log(lives);

  if (lives <= 0) {
    level = 0
    lives = 3
    timeStart = undefined
  }

  playerPosition.x = undefined
  playerPosition.y = undefined
  startGame()
}

function gameWin() {
  // console.log("terminaste el juego");
  clearInterval(timeINterval)

  const recordTime = localStorage.getItem('record_time')
  const playerTime = Date.now() - timeStart

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime)
      pResultPantalla.innerHTML = 'Superaste el Record'
    } else {
      pResultPantalla.innerHTML = "No superaste el record";
    }
  } else {
    localStorage.setItem('record_time', playerTime)
    pResultPantalla.innerHTML = 'Ahora trata de superar tu tiempo!'
  }
  // console.log("recordTime:", recordTime);
  // console.log("playerTime:", playerTime);
}

function showLives() {
  const heartArray = Array(lives).fill(emojis['HEART'])
  spanLives.innerHTML = heartArray.join(' ')
}

function showTime() {
  btnPlay.classList.add('btn-inactive')
  btnContainer.classList.remove('inactive-btn-container')
  btnRest.classList.remove('btn-inactive')

  if (!timeStart) {
    timeStart = Date.now()
    timeINterval = setInterval(showTime, 100)
    showRecord()
  }

  spanTime.innerHTML = Date.now() - timeStart
}

function showRecord() {
  spanRecord.innerHTML = localStorage.getItem('record_time')
}

function resetGame() {
  location.reload();
}

function moveByKeys(event) {
  if (event.key === 'ArrowUp') moveUp()
  else if (event.key === 'ArrowRight') moveRight()
  else if (event.key === 'ArrowDown') moveDown()
  else if (event.key === 'ArrowLeft') moveLeft()
}

function moveUp() {
  // console.log("Me quiero mover hacia arriba!");
  if ((playerPosition.y - elementSize) < elementSize) {
    // console.log('out');
  } else {
    playerPosition.y -= elementSize
    startGame()
  }
}

function moveRight() {
  // console.log("me quiero mover hacia la Derecha");
  if ((playerPosition.x + elementSize) > canvasSize) {
    // console.log('out');
  } else {
    playerPosition.x += elementSize
    startGame()
  }
}

function moveDown() {
  // console.log("me quiero mover hacia abajo");
  if ((playerPosition.y + elementSize) > canvasSize) {
    // console.log('out');
  } else {
    playerPosition.y += elementSize
    startGame()
  }
}

function moveLeft() {
  // console.log("me quiero mover hacia la Izquierda");
  if ((playerPosition.x - elementSize) < elementSize) {
    // console.log('out');
  } else {
    playerPosition.x -= elementSize
    startGame()
  }
  const giftPosition = {
    x: undefined,
    y: undefined
  }
}
