// Manage displaying score logic
var Scoreboard = function(game) {
  Phaser.Group.call(this, game)
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);  
Scoreboard.prototype.constructor = Scoreboard;

// Get the gamescore
Scoreboard.prototype.getScore = function(){
  if(game.score === undefined){
    game.score = 0
  }
  return game.score
}

// 
// Retrieve highscore from the game or from localstorage
// 
Scoreboard.prototype.getHighScore = function(){
  highScore = parseInt(game.highScore || localStorage.getItem('moleGame.user.highScore'));

  // If we have no stored highscore anywhere it's NaN
  if(highScore !== highScore){
    game.highScore = 0;
  } else {
    game.highScore = highScore;
  }
  // Return score
  return game.highScore
}

// 
// Sets highscore based on game.score
// 
Scoreboard.prototype.setHighScore = function(){
  var highScore = this.getHighScore();
  var score = this.getScore();

  if(score > highScore){
    localStorage.setItem('moleGame.user.highScore', score);
    game.highScore = score;
  }

  return highScore;
}

// 
// Displays highscore at x, y
// 
Scoreboard.prototype.showHighScore = function(x, y, color){
  this.labelHighScore = game.add.text(310, game.height/2, this.highScoreLabelText(), { font: "30px Arial", fill: color });   
}

// 
// Highscore formatting
// 
Scoreboard.prototype.highScoreLabelText = function(){
  return "High Score: " + this.getHighScore();
}

// 
// Score formatting
// 
Scoreboard.prototype.scoreLabelText = function(){
  return "Score: " + this.getScore();
}

// 
// Displays highscore with score below at x, y
// Used during gameplay
// 
Scoreboard.prototype.showGameFormat = function(x, y){
  this.labelHighScore = game.add.text(x, y, this.highScoreLabelText(), { font: "30px Arial", fill: "#ffffff" });
  this.labelScore = game.add.text(x, y+40, this.scoreLabelText(), { font: "30px Arial", fill: "#ffffff" });   
}

// 
// Updates the labels for the game
// Used during gameplay
// 
Scoreboard.prototype.updateScoreLabels = function(){
  score = this.getScore();
  this.labelScore.text = "Score: " + score;
  if(score > game.highScore){
    this.labelHighScore.text = "High Score: " + score;
  }
}