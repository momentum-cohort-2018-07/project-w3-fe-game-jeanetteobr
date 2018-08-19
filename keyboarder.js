const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')
const screenSize = {
  x: canvas.width,
  y: canvas.height,
}

const colors = {
  player: "#000000"
}

class Game {
  constructor() {
    this.player = new Player(this);
  }
  draw() {
    context.fillRect(250, 450, 20, 20)
    this.player.draw()
  }
  tick() {
    this.update()
    this.draw()
    requestAnimationFrame(() => this.tick())
  }

  update() {
    this.player.update()
  }
}

class Player {
  constructor(game) {
    this.center = {
      x: screenSize.x / 2 - 10,
      y: 450
    }
    this.playerSize = {
      x: 20,
      y: 20
    }
    this.game = game
  }
  draw() {
    this.game.context.fillStyle = colors.player
    this.game.context.fillRect(this.center.x, this.center.y, this.playerSize.x, this.playerSize.y)
  }
  update() {
    if (this.keyboarder.isDown(Keyboarder.KEYS.LEFT)) {
      this.center.x -= 2
      if (this.center.x <= 0) this.center.x = 0
    }
    if (this.keyboarder.isDown(Keyboarder.KEYS.RIGHT)) {
      this.center.x += 2
      if (this.center.x >= 480) this.center.x = 480
    }
  }
}

class Keyboarder {
  constructor() {
    this.keyState = {}

    window.addEventListener('keydown', function (e) {
      this.keyState[e.keyCode] = true
    }.bind(this))

    window.addEventListener('keyup', function (e) {
      this.keyState[e.keyCode] = false
    }.bind(this))
  }

  isDown(keyCode) {
    return this.keyState[keyCode] === true
  }

  on(keyCode, callback) {
    window.addEventListener('keydown', function (e) {
      if (e.keyCode === keyCode) {
        callback()
      }
    })
  }
}

Keyboarder.KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  S: 83
}

