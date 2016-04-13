// Initialize Phaser, and create a 400px by 490px game
var WIDTH   = 800
var HEIGHT  = 600
var game        = new Phaser.Game(WIDTH, HEIGHT);
var scoreboard  = new Scoreboard(game);

// Adding game states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('gameOver', gameOver);

// Add boot state and run
game.state.start('boot');