var GAME_WIDTH = 640;
var GAME_HEIGHT = 600;
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '')


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



function Level1() {};

Level1.prototype = {
  preload: function(){
    this.game.load.image('background', 'assets/rockface_background.png')
    this.game.load.image('climber', 'assets/climber.png');
  },
  create: function(){
    this.game.add.tileSprite(0, 0, 640, 600, 'background');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = new Player(this);
    this.game.physics.arcade.enable(this.player);
  },
  update: function(){
  }
};

game.state.add('level1', Level1);
game.state.start('level1');
