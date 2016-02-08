var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 400;

var PLAYER_START_X_LOCATION = 200;
var PLAYER_START_Y_LOCATION = 400;
var PLAYER_MOVE_LEFT = -100;
var PLAYER_MOVE_UP = -100;
var PLAYER_MOVE_RIGHT = 100;
var PLAYER_MOVE_DOWN = 100;

var ENEMY_START_X_LOCATION = -100;
var ENEMY_START_Y_LOCATION_TOP = 50;
var ENEMY_START_Y_LOCATION_BOTTOM = 210;

var KEYCODE_LEFT = "left";
var KEYCODE_UP = "up";
var KEYCODE_RIGHT = "right";
var KEYCODE_DOWN = "down";


// Enemies our player must avoid
var Enemy = function () {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = 0;
  this.y = Math.floor(Math.random() * ((ENEMY_START_Y_LOCATION_BOTTOM - ENEMY_START_Y_LOCATION_TOP) + 1)) + ENEMY_START_Y_LOCATION_TOP;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
  this.sprite = 'images/char-boy.png';
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
allEnemies = [new Enemy()];

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
