const button = document.querySelector('button')
const canvas = document.querySelector('canvas')
const player1 = document.querySelector('#player1')
const player2 = document.querySelector('#player2')
const width = canvas.width = 500
const height = canvas.height = 300
let ctx = canvas.getContext('2d')
let player1_pts = 0
let player2_pts = 0

ctx.strokeStyle = 'black'
ctx.lineWidth = 2
ctx.strokeRect(0, 0, width, height)

class Ball {

  constructor(x, y, velx, vely) {
    this.x = x
    this.y = y
    this.velx = velx
    this.vely = vely
  }

  create() {
    ctx.beginPath();
    ctx.fillStyle = 'blue'
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI)
    ctx.fill();
  }

  hide() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = 'black'
    ctx.strokeRect(0, 0, width, height)
  }

  move() {
    if (this.x + 5 == 500 || this.x - 5 == 0) {
      this.velx *= -1
    }

    if (this.y + 5 == 300 || this.y - 5 == 0) {
      this.vely *= -1
    }

    this.x += this.velx
    this.y += this.vely
  }
}

class Paddle {

  constructor(x, y, keyleft, keyright) {
    this.x = x
    this.y = y
    this.keyleft = keyleft
    this.keyright = keyright
  }

  create() {
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x, this.y, 60, 20)
  }

  move(e) {
    document.addEventListener('keydown', (e) => {
      if (e.key == this.keyright && this.x < 440) {
        this.x += 20

      } else if (e.key == this.keyleft && this.x > 0) {
        this.x -= 20
      }
    })
  }
}

ball = new Ball(10, 10, 5, 5)
paddle1 = new Paddle(230, 250, 'ArrowLeft', 'ArrowRight')
paddle2 = new Paddle(230, 50, 'a', 's')

paddle1.create()
paddle2.create()

button.addEventListener('click', () => {
  ball.create()
  paddle1.move()
  paddle2.move()

  let moving = setInterval(() => {
    ball.hide()
    ball.move()
    ball.create()
    paddle1.create()
    paddle2.create()

    if ((ball.x >= paddle1.x && ball.x <= paddle1.x + 60) && (ball.y == 250) && ball.vely > 0) {
      ball.vely *= -1

    } else if ((ball.x >= paddle2.x && ball.x <= paddle2.x + 60) && (ball.y == 70) && ball.vely < 0) {
      ball.vely *= -1
      ball.move()

    }

    if (ball.y == 5) {
      player1_pts += 1

    } else if (ball.y == 295) {
      player2_pts += 1
    }

    player1.innerHTML = `Player 1 Points: ${player1_pts}`
    player2.innerHTML = `Player 2 Points: ${player2_pts}`

    if (player1_pts == 10) {
      alert("PLAYER 1 WINS!")
      clearInterval(moving)

    } else if (player2_pts == 10) {
      alert("PLAYER 2 WINS!")
      clearInterval(moving)
    }

  }, 50)
})
