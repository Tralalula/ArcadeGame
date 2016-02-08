var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 400;
var CANVAS_NUM_ROWS = 6;
var CANVAS_NUM_COLS = 5;
var CANVAS_BRICK_HORIZONTAL_SIZE = (CANVAS_WIDTH / (CANVAS_NUM_COLS - 1));
var CANVAS_BRICK_VERTICAL_SIZE = (CANVAS_HEIGHT / (CANVAS_NUM_ROWS - 1));

var PLAYER_SPRITE = "images/char-boy.png";
var PLAYER_START_X_LOCATION = 200;
var PLAYER_START_Y_LOCATION = 400;
var PLAYER_MOVE_LEFT = -CANVAS_BRICK_HORIZONTAL_SIZE;
var PLAYER_MOVE_UP = -CANVAS_BRICK_VERTICAL_SIZE;
var PLAYER_MOVE_RIGHT = CANVAS_BRICK_HORIZONTAL_SIZE;
var PLAYER_MOVE_DOWN = CANVAS_BRICK_VERTICAL_SIZE;

var ENEMY_SPRITE = "images/enemy-bug.png";
var ENEMY_START_X_LOCATION = -100;
var ENEMY_START_Y_LOCATION_TOP = 50;
var ENEMY_START_Y_LOCATION_BOTTOM = 210;
var ENEMY_MIN_SPEED = 100;
var ENEMY_MAX_SPEED = 400;

var NUM_ENEMIES_TO_SPAWN = 10;

var KEYCODE_LEFT = "left";
var KEYCODE_UP = "up";
var KEYCODE_RIGHT = "right";
var KEYCODE_DOWN = "down";


function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

// Enemies our player must avoid
var Enemy = function (x) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = ENEMY_SPRITE;
  this.x = x;
  this.y = randomNumberBetween(ENEMY_START_Y_LOCATION_TOP, ENEMY_START_Y_LOCATION_BOTTOM);
  this.speed = randomNumberBetween(ENEMY_MIN_SPEED, ENEMY_MAX_SPEED);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  this.checkPlayerCollision();
  this.checkForRespawn();
};

Enemy.prototype.checkPlayerCollision = function () {
  if ((this.x >= (player.x - (CANVAS_BRICK_HORIZONTAL_SIZE / 2))) &&
      (this.x <= (player.x + (CANVAS_BRICK_HORIZONTAL_SIZE / 2))) &&
      (this.y >= (player.y - (CANVAS_BRICK_VERTICAL_SIZE / 2))) &&
      (this.y <= (player.y + (CANVAS_BRICK_VERTICAL_SIZE / 2)))) {
    player.y = PLAYER_START_Y_LOCATION;
  }
};

Enemy.prototype.checkForRespawn = function () {
  if (this.x > (CANVAS_WIDTH + CANVAS_BRICK_HORIZONTAL_SIZE)) {
    this.x = ENEMY_START_X_LOCATION;
    this.y = randomNumberBetween(ENEMY_START_Y_LOCATION_TOP, ENEMY_START_Y_LOCATION_BOTTOM);
    this.speed = randomNumberBetween(ENEMY_MIN_SPEED, ENEMY_MAX_SPEED);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
  this.sprite = PLAYER_SPRITE;
  this.x = PLAYER_START_X_LOCATION;
  this.y = PLAYER_START_Y_LOCATION;
};

Player.prototype.update = function (dt) {
  this.checkWallCollision();
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyCode) {
  if (keyCode === KEYCODE_LEFT) this.x += PLAYER_MOVE_LEFT;
  if (keyCode === KEYCODE_UP) this.y += PLAYER_MOVE_UP;
  if (keyCode === KEYCODE_RIGHT) this.x += PLAYER_MOVE_RIGHT;
  if (keyCode === KEYCODE_DOWN) this.y += PLAYER_MOVE_DOWN;
};

Player.prototype.checkWallCollision = function () {
  if (this.x > CANVAS_WIDTH) this.x = CANVAS_WIDTH;
  if (this.x < 0) this.x = 0;
  if (this.y > CANVAS_HEIGHT) this.y = CANVAS_HEIGHT;
  if (this.y < 0) this.y = 0;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
for (var i = 0; i < NUM_ENEMIES_TO_SPAWN; i++) {
  allEnemies.push(new Enemy(ENEMY_START_X_LOCATION - ((i + 1) * CANVAS_BRICK_HORIZONTAL_SIZE)));
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: KEYCODE_LEFT,
    38: KEYCODE_UP,
    39: KEYCODE_RIGHT,
    40: KEYCODE_DOWN
  };

  player.handleInput(allowedKeys[e.keyCode]);
});