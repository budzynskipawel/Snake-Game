function Game() {
  this.width = 10,
    this.height = 10,
    this.furry = new Furry(0, 0),
    this.coin = new Coin,
    this.score = 0,
    this.counter = 1,
    this.elements = [0],
    this.board = document.querySelectorAll('#board div'),
    this.scoreboard = document.querySelector('#scoreboard'),
    self = this,
    this.handler = setInterval(this.tick, 500),
    document.addEventListener("keydown", this.keyboard)
};

function Furry(x, y) {
  this.x = x,
    this.y = y,
    this.direction = "right"
};

function Coin() {
  this.x = Math.floor(10 * Math.random()),
    this.y = Math.floor(10 * Math.random())
};

Game.prototype.position = function(a, b) {
  return a + 10 * b;
};

Game.prototype.render = function() {

  var furryPosition = this.position(this.furry.x, this.furry.y);
  var coinPosition = this.position(this.coin.x, this.coin.y);
  self.elements[0] = furryPosition;
  console.log(self.elements);
  for(var i = 0; i < this.board.length; i++) {
    this.board[i].classList.remove('furry');

  };

  if((self.furry.y >= 0) && (self.furry.y < 10) && (self.furry.x >= 0) && (self.furry.x < 10)) {
    // self.board[furryPosition].classList.add("furry");
    for(var i = 0; i < self.elements.length; i++) {
      self.board[self.elements[i]].classList.add("furry");
      self.board[self.elements[i]].dataset.head = false;
    };
    for(var i = 1; i < self.elements.length; i++) {
      self.board[self.elements[i]].dataset.snake = "yes";
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
    clearInterval(self.handler);
  };
  self.board[coinPosition].classList.add('coin');


};



Game.prototype.keyboard = function(event) {
  key = event.which;
  switch(key) {
    case 37:
      self.furry.direction = "left";

      break;
    case 38:
      self.furry.direction = "up";

      break;
    case 39:
      self.furry.direction = "right";

      break;
    case 40:
      self.furry.direction = "down";

      break;


  }

};

Game.prototype.tick = function() {

  var furryPosition = self.position(self.furry.x, self.furry.y)
  switch(self.furry.direction) {
    case "right":
      self.furry.x++;
      self.board[self.elements[self.elements.length - 1]].dataset.snake = "no";

      self.elements.pop();

      self.elements.unshift(furryPosition);
      self.board[self.elements[0]].dataset.head = true;
      console.log(self.elements);
      break;
    case "left":
      self.furry.x--;
      self.board[self.elements[self.elements.length - 1]].dataset.snake = "no";
      self.elements.pop();
      self.elements.unshift(furryPosition);
      self.board[self.elements[0]].dataset.head = true;
      console.log(self.elements);
      break;
    case "down":
      self.furry.y++;
      self.board[self.elements[self.elements.length - 1]].dataset.snake = "no";
      self.elements.pop();
      self.elements.unshift(furryPosition);
      self.board[self.elements[0]].dataset.head = true;
      console.log(self.elements);
      break;
    case "up":
      self.furry.y--;
      self.board[self.elements[self.elements.length - 1]].dataset.snake = "no";
      self.elements.pop();
      self.elements.unshift(furryPosition);
      self.board[self.elements[0]].dataset.head = true;
      console.log(self.elements);
      break;
  }
  self.render();

  var furryPosition = self.position(self.furry.x, self.furry.y);
  var coinPosition = self.position(self.coin.x, self.coin.y);

  if(furryPosition == coinPosition) {
    self.score++;
    self.counter++;
    self.elements[self.elements.length] = furryPosition;

    // console.log(self.elements);
    self.board[furryPosition].classList.remove('coin');
    self.coin = new Coin;
    self.board[self.position(self.coin.x, self.coin.y)].classList.add('coin');
    self.scoreboard.innerHTML = self.score;


  }

}

document.addEventListener("DOMContentLoaded", function() {
  new Game;
})
