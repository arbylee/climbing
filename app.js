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

function Level1() {};

Level1.prototype = {
  create: function(){
    this.game.add.tileSprite(0, 0, 640, 600, 'background');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = new Player(this);

    this.birds = this.game.add.group();
    for (i = 0; i < 20; i++) {
      this.birds.add(new Bird(this));
    }

    this.game.physics.arcade.enable(this.player);

    this.ledgeTwoBirdLoop = this.game.time.events.loop(this.randomSlow(), this.spawnBird, this, this.birds, LEDGE_TWO_Y);
    this.ledgeThreeBirdLoop = this.game.time.events.loop(this.randomMedium(), this.spawnBird, this, this.birds, LEDGE_THREE_Y);
    this.ledgeFourBirdLoop = this.game.time.events.loop(this.randomSlow(), this.spawnBird, this, this.birds, LEDGE_FOUR_Y);
    this.ledgeFiveBirdLoop = this.game.time.events.loop(this.randomSlow(), this.spawnBird, this, this.birds, LEDGE_FIVE_Y);
    this.ledgeSixBirdLoop = this.game.time.events.loop(this.randomMedium(), this.spawnBird, this, this.birds, LEDGE_SIX_Y);
    this.ledgeSevenBirdLoop = this.game.time.events.loop(this.randomSlow(), this.spawnBird, this, this.birds, LEDGE_SEVEN_Y);
    this.ledgeEightBirdLoop = this.game.time.events.loop(this.randomMedium(), this.spawnBird, this, this.birds, LEDGE_EIGHT_Y);
    this.ledgeNineBirdLoop = this.game.time.events.loop(this.randomMedium(), this.spawnBird, this, this.birds, LEDGE_NINE_Y);


    this.startTimer = 3;
    this.startText = this.game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2, this.startTimer, {font: "16px Arial", fill: "#FFFFFF"});
    this.startTimerLoop = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateStartTimer, this);
  },
  update: function(){
    this.game.physics.arcade.overlap(this.player, this.birds, this.playerHitsObstacle, null, this);
    if(this.player.y <= LEDGE_TEN_Y){
      this.game.state.start('level2')
    }
  },
  playerHitsObstacle: function(){
    this.game.state.start('gameOver')
  },
  spawnBird: function(birds, ledge){
    var bird = birds.getFirstDead();
    bird.reset(GAME_WIDTH+bird.body.width, ledge-bird.body.height/2)
    bird.revive();
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
  randomSlow: function(){
    return this.game.rnd.between(1300, 1800);
  },
  randomMedium: function(){
    return this.game.rnd.between(900, 1400);
  }
};

function Level2() {};

Level2.prototype = {
  create: function(){
    this.game.add.tileSprite(0, 0, 640, 600, 'background');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = new Player(this);

    this.birds = this.game.add.group();
    for (i = 0; i < 20; i++) {
      this.birds.add(new Bird(this));
    }

    this.planes = this.game.add.group();
    for (i = 0; i < 20; i++) {
      this.planes.add(new Plane(this));
    }

    this.game.physics.arcade.enable(this.player);

    this.ledgeTwoBirdLoop = this.game.time.events.loop(this.randomSlow(), this.spawnBird, this, this.birds, LEDGE_TWO_Y);
    this.ledgeThreePlaneLoop = this.game.time.events.loop(this.randomSlow(), this.spawnPlane, this, this.planes, LEDGE_THREE_Y);
    this.ledgeFourPlaneLoop = this.game.time.events.loop(this.randomMedium(), this.spawnPlane, this, this.planes, LEDGE_FOUR_Y);
    this.ledgeFiveBirdLoop = this.game.time.events.loop(this.randomMedium(), this.spawnBird, this, this.birds, LEDGE_FIVE_Y);
    this.ledgeSixPlaneLoop = this.game.time.events.loop(this.randomSlow(), this.spawnPlane, this, this.planes, LEDGE_SIX_Y);
    this.ledgeSevenBirdLoop = this.game.time.events.loop(this.randomSlow(), this.spawnBird, this, this.birds, LEDGE_SEVEN_Y);
    this.ledgeEightBirdLoop = this.game.time.events.loop(this.randomMedium(), this.spawnBird, this, this.birds, LEDGE_EIGHT_Y);
    this.ledgeNinePlaneLoop = this.game.time.events.loop(this.randomSlow(), this.spawnPlane, this, this.planes, LEDGE_NINE_Y);


    this.startTimer = 3;
    this.startText = this.game.add.text(GAME_WIDTH/2, GAME_HEIGHT/2, this.startTimer, {font: "16px Arial", fill: "#FFFFFF"});
    this.startTimerLoop = this.game.time.events.loop(Phaser.Timer.SECOND, this.updateStartTimer, this);
  },
  update: function(){
    this.game.physics.arcade.overlap(this.player, this.birds, this.playerHitsObstacle, null, this);
    if(this.player.y <= LEDGE_TEN_Y){
      this.game.state.start('youWin');
    }
  },
  playerHitsObstacle: function(){
    this.game.state.start('gameOver')
  },
  spawnBird: function(birds, ledge){
    var bird = birds.getFirstDead();
    bird.reset(GAME_WIDTH+bird.body.width, ledge-bird.body.height/2)
    bird.revive();
  },
  spawnPlane: function(planes, ledge){
    var plane = planes.getFirstDead();
    plane.reset(GAME_WIDTH+plane.body.width, ledge-plane.body.height/2)
    plane.revive();
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
  randomSlow: function(){
    return this.game.rnd.between(1300, 1800);
  },
  randomMedium: function(){
    return this.game.rnd.between(900, 1400);
  }
};


function Preloader(){};

Preloader.prototype = {
  preload: function(){
    this.game.load.image('background', 'assets/rockface_background.png')
    this.game.load.image('climber', 'assets/climber.png');
    this.game.load.image('plane', 'assets/plane.png');
    this.game.load.spritesheet('bird', 'assets/birdSprite.png', 24, 18);
  },
  create: function(){
  },
  update: function(){
    this.game.state.start('level1');
  }
}

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

function YouWin(){};

YouWin.prototype = {
  create: function(){
    this.game.add.text(250, 200, "CRUSH YOUR GOALS", {font: "16px Arial", fill: "#FFFFFF"})
  },
  update: function(){
    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      this.game.state.start('level1');
    };
  }
}

game.state.add('level1', Level1);
game.state.add('level2', Level2);
game.state.add('gameOver', GameOver);
game.state.add('preloader', Preloader);
game.state.add('youWin', YouWin);
game.state.start('preloader');
