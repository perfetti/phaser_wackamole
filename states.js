// Boot state of game
var bootState = {
  create: function(){
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Loading state
    game.state.start('load')
  }
}

// Load state
var loadState = {
  preload: function(){
    // Sprites
    game.load.spritesheet('mechaMole', 'assets/mechaMoleSheet50px.png', 62, 50, 20);
    game.load.spritesheet('hammer', 'assets/hammerswing.png', 30, 34, 4)

    // Audio
    game.load.audio('hit', 'assets/hit.wav');
    game.load.audio('gameOver', 'assets/gameOver.wav');
  },

  create: function(){
    game.state.start('menu')
  }
}

// Times Up screen
var gameOver = {
  create: function(){
    game.stage.backgroundColor = '#009955';
    var titleLabel = game.add.text(225, 80, 'TIMES UP', {font: '50px arial', fill: '#ffffff'})
    var startLabel = game.add.text(260, 200, 'Click HERE to start Over', {font: '25px arial', fill: '#ffffff'})
    var startButton = game.add.button(260, 200, null, this.start, this, null, null, null);

    scoreboard.showHighScore(310, game.height/2, "#000");

  },
  start: function(){
      game.state.start('menu');
  },
}

//Menu State
var menuState = {
  create: function(){
    game.stage.backgroundColor = '#009955';
    var titleLabel = game.add.text(225, 80, 'Whack a mole', {font: '50px arial', fill: '#ffffff'})
    var startLabel = game.add.text(260, 200, 'Click HERE to start', {font: '25px arial', fill: '#ffffff'})
    var startButton = game.add.button(260, 200, null, this.start, this, null, null, null);
    startButton.width = 225;
    startButton.height = 25;

    scoreboard.showHighScore(310, game.height/2, "#000");
  },

  start: function(){
      game.state.start('play');
  },
}