var GAME_WIDTH = 640;
var GAME_HEIGHT = 600;
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '')

var LEDGE_ONE_Y = 570;
var LEDGE_TWO_Y = 510;
var LEDGE_THREE_Y = 450;
var LEDGE_FOUR_Y = 390;
var LEDGE_FIVE_Y = 330;
var LEDGE_SIX_Y = 270;
var LEDGE_SEVEN_Y = 210;
var LEDGE_EIGHT_Y = 150;
var LEDGE_NINE_Y = 90;
var LEDGE_TEN_Y = 30;

function Player(state){
  this.game = state.game;
  Phaser.Sprite.call(this, this.game, 304, 570, 'climber');
  this.verticalMoveSpeed = 60;
  this.horizontalMoveSpeed = 32;
  this.anchor.setTo(0.5, 0.5);
  this.game.add.existing(this);
  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.cursors = this.game.input.keyboard.createCursorKeys();

  this.cursors.left.onDown.add(this.moveLeft, this);
  this.cursors.right.onDown.add(this.moveRight, this);
  this.cursors.up.onDown.add(this.moveUp, this);
  this.cursors.down.onDown.add(this.moveDown, this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
}


Player.prototype.moveLeft = function(){
  if(this.x > 0){
    this.x -= this.horizontalMoveSpeed;
  }
}

Player.prototype.moveRight = function(){
  if(this.x < GAME_WIDTH-this.body.width) {
    this.x += this.horizontalMoveSpeed;
  }
}

Player.prototype.moveUp = function(){
  if(this.y >= this.verticalMoveSpeed) {
    this.y -= this.verticalMoveSpeed;
  }
}

Player.prototype.moveDown = function(){
  if(this.y < GAME_HEIGHT-this.body.height) {
    this.y += this.verticalMoveSpeed;
  }
}

function Bird(state){
  this.game = state.game;
  Phaser.Sprite.call(this, this.game, 100, 100, 'bird');
  this.exists = false;
  this.anchor.setTo(0.5, 0.5);
  this.game.add.existing(this);
  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = false;
  this.moveSpeed = 350;

  this.animations.add('flap', [0, 1], 6, true);
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function(){
  if(this.body.x < -this.body.width){
    this.kill();
  }
}

Bird.prototype.revive = function(){
  this.body.velocity.x = -this.moveSpeed;
  this.animations.play('flap')
}

function Level1() {};

Level1.prototype = {
  preload: function(){
    this.game.load.image('background', 'assets/rockface_background.png')
    this.game.load.image('climber', 'assets/climber.png');
    this.game.load.spritesheet('bird', 'assets/birdSprite.png', 24, 18);
  },
  create: function(){
    this.game.add.tileSprite(0, 0, 640, 600, 'background');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = new Player(this);
    this.bird = new Bird(this);
    this.game.physics.arcade.enable(this.player);
  },
  update: function(){
    if(!this.bird.exists){
      this.bird.reset(GAME_WIDTH+this.bird.body.width, LEDGE_TWO_Y-(this.bird.body.height / 2));
      this.bird.revive();
    }
    this.game.physics.arcade.overlap(this.player, this.bird, this.playerHitsObstacle, null, this);
  },
  playerHitsObstacle: function(){
    this.game.state.start('gameOver')
  }
};

function GameOver(){};

GameOver.prototype = {
  create: function(){
    this.game.add.text(170, 200, "YOU LOSE. TRY HARDER NEXT TIME", {font: "16px Arial", fill: "#FFFFFF"})
  },
  update: function(){
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.game.state.start('level1');
    };
  }
}

game.state.add('level1', Level1);
game.state.add('gameOver', GameOver);
game.state.start('level1');
