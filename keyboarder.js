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
    this.tick()
  }
  tick() {
    this.update()
    this.draw()
    requestAnimationFrame(() => this.tick())
  }
  update() {
    this.player.update()
  }
  draw() {
    context.clearRect(0, 0, 500, 500)
    this.player.draw()
  }
}

class Player {
  constructor(game) {
    this.center = {
      x: screenSize.x / 2 - 10,
      y: 450
    }
    this.size = {
      x: 20,
      y: 20
    }
    this.keyboarder = new Keyboarder();
    this.game = game
  }
  draw() {
    context.fillStyle = colors.player
    context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
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
    if (this.keyboarder.isDown(Keyboarder.KEYS.S)) {
      this.game.bullets.push(new Bullet(this.center.x))
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

let game = new Game();