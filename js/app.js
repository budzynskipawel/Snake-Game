/*game constructor*/
function Game() {
  this.snake = new Snake(0, 0), //creates a new snake in a (0,0) position
    this.coin = new Coin, //creates a new coin
    this.score = 0,
    this.elements = [0],
    this.board = document.querySelectorAll('#board div'),
    this.scoreboard = document.querySelector('#scoreboard'),
    self = this,
    this.handler = setInterval(this.tick, 500),
    // setInterval(this.tick, 500),
    document.addEventListener("keydown", this.keyboard)
};
/*snake constructor - coordinates x, y*/
function Snake(x, y) {
  this.x = x,
    this.y = y,
    this.direction = "right"
};
/*coin constructor = random coordinates from 0 to 10*/
function Coin() {
  this.x = Math.floor(10 * Math.random()),
    this.y = Math.floor(10 * Math.random())
};

/*2 coordinates converted into one */
Game.prototype.position = function(a, b) {
  return a + 10 * b;
};

/*let's make snake and coin appear*/
Game.prototype.render = function() {
  var snakePosition = this.position(this.snake.x, this.snake.y);
  var coinPosition = this.position(this.coin.x, this.coin.y);
  self.elements[0] = snakePosition;
  console.log(self.elements);
  for(var i = 0; i < this.board.length; i++) {
    this.board[i].classList.remove('snake');
    this.board[i].dataset.head = false;
  };


  /*If the snake is not outside the board (10x10): */
  if(((self.snake.y >= 0) && (self.snake.y < 10) && (self.snake.x >= 0) && (self.snake.x < 10)) && !((self.board[self.elements[0]]).dataset.tail === true)) {
    /*then show all of his elements:*/
    self.board[self.elements[0]].dataset.head = true;

    for(var i = 0; i < self.elements.length; i++) {
      self.board[self.elements[i]].classList.add("snake");
    };

    for(var i = 1; i < self.elements.length; i++) {

      self.board[self.elements[i]].dataset.tail = true;
    }
  } else {
    document.querySelector('#board').classList.add("hide");
    document.querySelector('body').classList.add("gameover");
    document.getElementById('over').style.display = "block";
    var again = document.getElementById('again');

    again.style.display = "inline-block";
    again.style.border = "1px solid black";
    again.addEventListener("click", function onClick(e) {

      window.location.reload(true);
    })
    clearInterval(self.tick);
  };
  self.board[coinPosition].classList.add('coin');


};



Game.prototype.keyboard = function(event) {
  key = event.which;
  switch(key) {
    case 37:
      self.snake.direction = "left";

      break;
    case 38:
      self.snake.direction = "up";

      break;
    case 39:
      self.snake.direction = "right";

      break;
    case 40:
      self.snake.direction = "down";

      break;

    case 32:
      console.log("hej");
      clearInterval(self.handler);
      document.addEventListener("keydown", function start(e) {
        var key = e.which;
        if(key == 83) {
          console.log("hej ho");
          self.handler = setInterval(self.tick, 500);
          document.removeEventListener("keydown", start);
        }
      })
      break;



  }

};

Game.prototype.tick = function() {

  var snakePosition = self.position(self.snake.x, self.snake.y);
  switch(self.snake.direction) {
    case "right":
      self.snake.x++;

      self.board[self.elements[self.elements.length - 1]].dataset.tail = false;
      // self.board[self.elements[0]].dataset.head = true;
      self.elements.pop();

      self.elements.unshift(snakePosition);
      // console.log(self.elements);
      break;
    case "left":
      self.snake.x--;
      self.board[self.elements[self.elements.length - 1]].dataset.tail = false;
      self.elements.pop();
      self.elements.unshift(snakePosition);
      // console.log(self.elements);
      break;
    case "down":
      self.snake.y++;
      self.board[self.elements[self.elements.length - 1]].dataset.tail = false;
      self.elements.pop();
      self.elements.unshift(snakePosition);
      // console.log(self.elements);
      break;
    case "up":
      self.snake.y--;
      self.board[self.elements[self.elements.length - 1]].dataset.tail = false;
      self.elements.pop();
      self.elements.unshift(snakePosition);
      // console.log(self.elements);
      break;
  }

  self.render();



  var snakePosition = self.position(self.snake.x, self.snake.y);
  var coinPosition = self.position(self.coin.x, self.coin.y);

  if(snakePosition == coinPosition) {
    self.score++;
    self.elements[self.elements.length] = snakePosition;
    self.board[snakePosition].classList.remove('coin');
    self.coin = new Coin;
    self.board[self.position(self.coin.x, self.coin.y)].classList.add('coin');
    self.scoreboard.innerHTML = self.score;


  }

}

document.addEventListener("DOMContentLoaded", function() {
  new Game;
})
