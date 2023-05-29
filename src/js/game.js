//-> Variables
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
const levelNumber = document.querySelector('#level-number')
const levelGame = document.querySelector('#level-game')
const messageWin = document.querySelector('#message-win')
const btnSound = document.querySelector('#btn-sound');
const musicGame = document.querySelector('#music-game');
const audioState = document.querySelector('#audio-state');

let canvasSize
let elementSize
let level = 0
let lives = 3
let timeStart
let timePlayer
let timeInterval

const playerPosition = {
  x: undefined,
  y: undefined,
}

const giftPosition = {
  x: undefined,
  y: undefined,
}

let enemyPositions = []
let counterLevel = 1

//-> Events
window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)
window.addEventListener('keydown', moveByKeys)

btnUp.addEventListener('click', moveUp)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)
btnLeft.addEventListener('click', moveLeft)
btnResetId.addEventListener("click", resetGame)
btnPlay.addEventListener("click", showTime)
btnSound.addEventListener('click', toggleMusic)


//-> Functions

function toggleMusic() {
  if (!musicGame.paused) {
    musicGame.pause();
    audioState.innerHTML = "OFF";
  } else {
    musicGame.play();
    audioState.innerHTML = "ON";
  }
}

function fixNumber(number) {
  return Number(number.toFixed(5));
}

function setCanvasSize() {
  fixNumber(window.innerHeight)
  fixNumber(window.innerWidth)
  if (window.innerHeight > window.innerWidth) canvasSize = window.innerWidth * .7
  if (window.innerWidth > window.innerHeight) canvasSize = window.innerHeight * .7

  fixNumber(canvasSize)

  canvas.setAttribute('width', canvasSize)
  canvas.setAttribute('height', canvasSize)

  elementSize = (canvasSize / 10) - 1
  fixNumber(elementSize)
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
          playerPosition.x = fixNumber(posX)
          playerPosition.y = fixNumber(posY)
        }
      } else if (col == 'I') {
        giftPosition.x = posX
        giftPosition.y = posY
      } else if (col == 'X') {
        enemyPositions.push({
          x: fixNumber(posX),
          y: fixNumber(posY),
        })
      }

      game.fillText(emoji, posX, posY)
    })
  })

  movePlayer()
}

function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(5) == giftPosition.x.toFixed(5)
  const giftCollisionY = playerPosition.y.toFixed(5) == giftPosition.y.toFixed(5)
  const giftCollision = giftCollisionX && giftCollisionY

  if (giftCollision) levelWin()

  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(5) == playerPosition.x.toFixed(5)
    const enemyCollisionY = enemy.y.toFixed(5) == playerPosition.y.toFixed(5)
    return enemyCollisionX && enemyCollisionY
  })

  if (enemyCollision) levelFail()

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function levelWin() {
  level++
  counterLevel++
  levelNumber.innerHTML = counterLevel
  startGame()
}

function levelFail() {
  lives--

  if (lives <= 0) {
    levelNumber.innerHTML = "1"
    counterLevel = 1
    level = 0
    lives = 3
    timeStart = undefined
  }

  playerPosition.x = undefined
  playerPosition.y = undefined
  startGame()
}

function gameWin() {
  clearInterval(timeInterval)

  btnContainer.classList.add('inactive-btn-container')
  spanLives.classList.add('inactive')
  messageWin.classList.remove('inactive')
  btnSound.classList.add('inactive')
  messageWin.innerHTML = `${emojis['WIN']} You win!! ${emojis['WIN']}`

  const recordTime = localStorage.getItem('record_time')
  const auxTime = Date.now() - timeStart

  const minutes = ("0" + Math.floor(auxTime % (1000 * 60 * 60) / (1000 * 60))).slice(-2)
  const seconds = ("0" + Math.floor(auxTime % (1000 * 60) / (1000))).slice(-2)

  const playerTime = `${minutes}: ${seconds} `

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime)
      pResultPantalla.innerHTML = 'You beat the record'

    } else {
      pResultPantalla.innerHTML = "Try again to beat the record";
    }
  } else {
    localStorage.setItem('record_time', playerTime)
    pResultPantalla.innerHTML = 'Now try to beat your time!'
  }
}

function showLives() {
  const heartArray = Array(lives).fill(emojis['HEART'])
  spanLives.innerHTML = heartArray.join(' ')
}

function showTime() {
  btnPlay.classList.add('btn-inactive')
  btnContainer.classList.remove('inactive-btn-container')
  btnRest.classList.remove('btn-inactive')
  btnSound.classList.add('btn-inactive')

  if (!timeStart) {
    timeStart = Date.now()
    timeInterval = setInterval(showTime, 100)
    showRecord()
  }

  // spanTime.innerHTML = Date.now() - timeStart
  const miliSeconsTime = Date.now() - timeStart

  const minutes = ("0" + Math.floor(miliSeconsTime % (1000 * 60 * 60) / (1000 * 60))).slice(-2)
  const seconds = ("0" + Math.floor(miliSeconsTime % (1000 * 60) / (1000))).slice(-2)

  spanTime.innerHTML = `${minutes}: ${seconds} `
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
  if ((playerPosition.y - elementSize) < elementSize) {
    // console.log('out');
  } else {
    playerPosition.y -= elementSize
    showTime()
    startGame()
  }
}

function moveRight() {
  if ((playerPosition.x + elementSize) > canvasSize) {
    // console.log('out');
  } else {
    playerPosition.x += elementSize
    startGame()
  }
}

function moveDown() {
  if ((playerPosition.y + elementSize) > canvasSize) {
    // console.log('out');
  } else {
    playerPosition.y += elementSize
    startGame()
  }
}

function moveLeft() {
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



