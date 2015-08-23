var GAME_WIDTH = 640;
var GAME_HEIGHT = 900;
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '')

var PLAYER_SPRITE_WIDTH = 32;
var PLAYER_SPRITE_HEIGHT = 60;

var LEDGE_ONE_Y = GAME_HEIGHT - PLAYER_SPRITE_HEIGHT/2;
var LEDGE_TWO_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT;
var LEDGE_THREE_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 2;
var LEDGE_FOUR_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 3;
var LEDGE_FIVE_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 4;
var LEDGE_SIX_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 5;
var LEDGE_SEVEN_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 6;
var LEDGE_EIGHT_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 7;
var LEDGE_NINE_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 8;
var LEDGE_TEN_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 9;
var LEDGE_ELEVEN_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 10;
var LEDGE_TWELVE_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 11;
var LEDGE_THIRTEEN_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 12;
var LEDGE_FOURTEEN_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 13;
var LEDGE_FIFTEEN_Y = GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2) - PLAYER_SPRITE_HEIGHT * 14;

var LEDGE_MAP = {
  "1": LEDGE_ONE_Y,
  "2": LEDGE_TWO_Y,
  "3": LEDGE_THREE_Y,
  "4": LEDGE_FOUR_Y,
  "5": LEDGE_FIVE_Y,
  "6": LEDGE_SIX_Y,
  "7": LEDGE_SEVEN_Y,
  "8": LEDGE_EIGHT_Y,
  "9": LEDGE_NINE_Y,
  "10": LEDGE_TEN_Y,
  "11": LEDGE_ELEVEN_Y,
  "12": LEDGE_TWELVE_Y,
  "13": LEDGE_THIRTEEN_Y,
  "14": LEDGE_FOURTEEN_Y,
  "15": LEDGE_FIFTEEN_Y
}

var LEVEL_ONE_PARAMS = {
  '2': 'birds',
  '3': 'birds',
  '4': 'birds',
  '6': 'birds',
  '7': 'birds',
  '8': 'birds',
  '9': 'birds',
  '11': 'birds',
  '12': 'birds',
  '13': 'birds',
  '14': 'birds'
}

var LEVEL_TWO_PARAMS = {
  '2': 'birds',
  '3': 'planes',
  '4': 'planes',
  '6': 'planes',
  '7': 'birds',
  '8': 'birds',
  '10': 'planes',
  '11': 'planes',
  '13': 'planes',
  '14': 'planes'
}

var LEVEL_THREE_PARAMS = {
  '2': 'planes',
  '3': 'planes',
  '5': 'birds',
  '6': 'planes',
  '7': 'birds',
  '8': 'planes',
  '9': 'planes',
  '10': 'planes',
  '11': 'birds',
  '13': 'planes',
  '14': 'planes',
}

var LEVEL_FOUR_PARAMS = {
  '2': 'planes',
  '3': 'meteors',
  '4': 'meteors',
  '5': 'planes',
  '7': 'planes',
  '8': 'birds',
  '9': 'meteors',
  '10': 'meteors',
  '12': 'meteors',
  '13': 'planes',
  '14': 'meteors'
}

var LEVEL_PARAMS = [
  LEVEL_ONE_PARAMS,
  LEVEL_TWO_PARAMS,
  LEVEL_THREE_PARAMS,
  LEVEL_FOUR_PARAMS
]

function Player(state){
  this.game = state.game;
  Phaser.Sprite.call(this, this.game, GAME_WIDTH/2-PLAYER_SPRITE_WIDTH/2, GAME_HEIGHT - (PLAYER_SPRITE_HEIGHT/2), 'climber');
  this.verticalMoveSpeed = 60;
  this.horizontalMoveSpeed = 32;
  this.anchor.setTo(0.5, 0.5);
  this.game.add.existing(this);
  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.cursors = this.game.input.keyboard.createCursorKeys();

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
}

Player.prototype.setupControls = function(){
  this.cursors.left.onDown.add(this.moveLeft, this);
  this.cursors.right.onDown.add(this.moveRight, this);
  this.cursors.up.onDown.add(this.moveUp, this);
  this.cursors.down.onDown.add(this.moveDown, this);

  gameSectionWidth = GAME_WIDTH/3;
  gameSectionHeight = GAME_HEIGHT/3;

  this.game.input.onDown.add(function() {
    if (this.game.input.y < gameSectionHeight){
      this.moveUp();
    } else if(this.game.input.y > gameSectionHeight*2) {
      this.moveDown();
    } else if(this.game.input.y > gameSectionHeight &&
        this.game.input.y < gameSectionHeight*2 &&
        this.game.input.x > gameSectionWidth*2) {

      this.moveRight();
    } else if(this.game.input.y > gameSectionHeight &&
        this.game.input.y < gameSectionHeight*2 &&
        this.game.input.x < gameSectionHeight) {

      this.moveLeft();
    };
  }, this);
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
  Phaser.Sprite.call(this, this.game, 0, 0, 'bird');
  this.exists = false;
  this.alive = false;
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

function Plane(state){
  this.game = state.game;
  Phaser.Sprite.call(this, this.game, 0, 0, 'plane');
  this.exists = false;
  this.alive = false;
  this.anchor.setTo(0.5, 0.5);
  this.game.add.existing(this);
  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = false;
  this.moveSpeed = 450;
};

Plane.prototype = Object.create(Phaser.Sprite.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.update = function(){
  if(this.body.x < -this.body.width){
    this.kill();
  }
}

Plane.prototype.revive = function(){
  this.body.velocity.x = -this.moveSpeed;
}

function Meteor(state){
  this.game = state.game;
  Phaser.Sprite.call(this, this.game, 0, 0, 'meteor');
  this.exists = false;
  this.alive = false;
  this.anchor.setTo(0.5, 0);
  this.game.add.existing(this);
  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = false;
  this.moveSpeed = 650;
};

Meteor.prototype = Object.create(Phaser.Sprite.prototype);
Meteor.prototype.constructor = Meteor;

Meteor.prototype.update = function(){
  if(this.body.x < -this.body.width){
    this.kill();
  }
}

Meteor.prototype.revive = function(){
  this.body.velocity.x = -this.moveSpeed;
}

function Level() {
};

Level.prototype = {
  init: function(levelParams, levelNumber){
    this.levelParams = levelParams;
    this.levelNumber = levelNumber;
  },
  create: function(){
    this.backgroundSprite = this.game.add.sprite(0, 0, 'background');
    this.backgroundSprite.width = GAME_WIDTH;
    this.backgroundSprite.height = GAME_HEIGHT;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.scale.pageAlignHorizontally = true;

    this.player = new Player(this);

    this.birds = this.game.add.group();
    for (i = 0; i < 20; i++) {
      this.birds.add(new Bird(this));
    }
    this.planes = this.game.add.group();
    for (i = 0; i < 20; i++) {
      this.planes.add(new Plane(this));
    }
    this.meteors = this.game.add.group();
    for (i = 0; i < 20; i++) {
      this.meteors.add(new Meteor(this));
    }

    this.obstacleMap = {
      'birds': this.birds,
      'planes': this.planes,
      'meteors': this.meteors
    }

    this.game.physics.arcade.enable(this.player);
    foo = this.obstacleMap

    for (var ledgeNumber in this.levelParams) {
      if (this.levelParams.hasOwnProperty(ledgeNumber)) {
        this.game.time.events.loop(this.game.rnd.between(1100, 2200),
                                   this.spawnObstacle,
                                   this,
                                   this.obstacleMap[this.levelParams[ledgeNumber]],
                                   LEDGE_MAP[ledgeNumber]);
      }
    }

    this.startTimer = 3;
    this.startText = this.game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2, this.startTimer, {font: "32px Arial", fill: "#FFFFFF"});
    this.startTimerLoop = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateStartTimer, this);

    this.backgroundMusic = this.game.add.audio('doopa');
    this.backgroundMusic.volume = 0.6;
    this.toggleBackgroundMusic(true);

    this.game.input.maxPointers = 1;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setResizeCallback(function () {
        this.game.scale.setResizeCallback(this.resize, this);
    }, this);
  },
  update: function(){
    for (var obstacleType in this.obstacleMap) {
      if (this.obstacleMap.hasOwnProperty(obstacleType)) {
        this.game.physics.arcade.overlap(this.player, this.obstacleMap[obstacleType], this.playerHitsObstacle, null, this);
      }
    }
    if(this.player.y <= LEDGE_FIFTEEN_Y){
      var nextLevelNumber = this.levelNumber + 1;
      if(nextLevelNumber >= LEVEL_PARAMS.length){
        this.toggleBackgroundMusic(false);
        this.game.state.start('youWin');
      } else {
        this.toggleBackgroundMusic(false);
        this.game.state.start('level', true, false, LEVEL_PARAMS[nextLevelNumber], nextLevelNumber)
      }
    }
  },
  playerHitsObstacle: function(){
    this.toggleBackgroundMusic(false);
    this.game.state.start('gameOver')
  },
  spawnObstacle: function(obstacles, ledge){
    var obstacle = obstacles.getFirstDead();
    obstacle.reset(GAME_WIDTH+obstacle.body.width, ledge-obstacle.body.height/2)
    obstacle.revive();
  },
  updateStartTimer: function(){
    this.startTimer -= 1;
    this.startText.text = this.startTimer;
    if(this.startTimer <= 0){
      this.game.time.events.remove(this.startTimerLoop);
      this.player.setupControls();
      this.startText.kill();
    }
  },
  toggleBackgroundMusic: function(toggle){
    if(toggle){
      this.backgroundMusic.loop = true;
      this.backgroundMusic.play();
    } else {
      this.backgroundMusic.loop = false;
      this.backgroundMusic.stop();
    }
  }
};

function Preloader(){};

Preloader.prototype = {
  preload: function(){
    this.game.load.image('background', 'assets/mountainBackground.png')
    this.game.load.image('climber', 'assets/climber.png');
    this.game.load.image('plane', 'assets/plane.png');
    this.game.load.image('meteor', 'assets/meteor.png');
    this.game.load.audio('doopa', 'assets/doopadoopa.m4a');
    this.game.load.spritesheet('bird', 'assets/birdSprite.png', 24, 18);
  },
  create: function(){
  },
  update: function(){
    this.game.state.start('level', true, false, LEVEL_PARAMS[0], 0);
  }
}

function GameOver(){};

GameOver.prototype = {
  create: function(){
    this.game.add.text(170, 200, "YOU LOSE. TRY HARDER NEXT TIME", {font: "16px Arial", fill: "#FFFFFF"})
    this.game.input.onDown.add(this.restartGame);
  },
  update: function(){
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.restartGame();
    };
  },
  restartGame: function(){
    this.game.state.start('level', true, false, LEVEL_PARAMS[0], 0);
  }
}

function YouWin(){};

YouWin.prototype = {
  create: function(){
    this.game.add.text(250, 200, "CRUSH YOUR GOALS", {font: "16px Arial", fill: "#FFFFFF"})
    this.game.input.onDown.add(this.restartGame);
  },
  update: function(){
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.restartGame();
    };
  },
  restartGame: function(){
    this.game.state.start('level', true, false, LEVEL_PARAMS[0], 0);
  }
}

game.state.add('level', Level);
game.state.add('gameOver', GameOver);
game.state.add('preloader', Preloader);
game.state.add('youWin', YouWin);
game.state.start('preloader');
