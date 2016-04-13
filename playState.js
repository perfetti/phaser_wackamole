// Main play state
var playState = {
  // Game duration: 10 Seconds
  levelDuration: Phaser.Timer.SECOND*100,

  create: function() { 
    // Change the background color of the game to 
    game.stage.backgroundColor = '#009955';

    //
    // this.game.canvas.style.cursor = "none";
    this.hammer = new Hammer(game, game.width, game.height);
    this.hammer.animations.add('swing');
    window.hammer = this.hammer;

    // Add moles group
    this.moles = game.add.group(); 

    // Init scores
    game.score = 0;
    scoreboard.showGameFormat(20, 25);

    // Hammer
    

    // Set audio
    this.hitSound = game.add.audio('hit');
    this.gameOverSound = game.add.audio('gameOver');

    // Create a custom timer
    levelTimer = game.time.create();
    // Create a delayed event 1m and 30s from now
    timerEvent = levelTimer.add(this.levelDuration, this.gameOver, this);
    // Start the timer
    levelTimer.start();

    // add Moles
    this.molePositions = [];
    this.addGridOfMoles(5, 4);
    this.setRandomDurationTimer();
    this.timerLabel = game.add.text(game.width - 200, 25, this.formatTime(Math.round((timerEvent.delay - levelTimer.ms) / 1000)), { font: "30px Arial", fill: "#ffffff" });
  },

  render: function() { 
    // Let's display the time left
    if (levelTimer.running) {
      this.timerLabel.text = "Time: " + this.formatTime(Math.round((timerEvent.delay - levelTimer.ms) / 1000));
    }
  },

  update: function() {
    this.hammer.x = game.input.mousePointer.x;
    this.hammer.y = game.input.mousePointer.y;
  },

  endTimer: function() {
      // Stop the timer when the delayed event triggers
      levelTimer.stop();
  },

  // Ends the propagation of moles
  endMoleTimer: function(){
    if(!this.moleTimer){
      return
    }
    this.moleTimer.timer.remove(this.moleTimer);
    this.moleTimer = null;
  },

  setMoleTimer: function(interval, callback){
    this.moleTimer = game.time.events.loop(newInterval, callback, this);
  },

  formatTime: function(s) {
      // Convert seconds (s) to a nicely formatted and padded time string
      var minutes = "0" + Math.floor(s / 60);
      var seconds = "0" + (s - minutes * 60);
      return minutes.substr(-2) + ":" + seconds.substr(-2);   
  },

  // Restart the game
  restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('menu');
  },

  // 
  // randomly resets the timer interval everytime it's called
  // 
  setRandomDurationTimer: function(){
    this.endMoleTimer();

    // Random new interval
    newInterval = Math.random() * 2000;
    
    // Make a mole appear
    this.animateRandomGridMole()

    // Repeat this after newInterval
    this.setMoleTimer(newInterval, this.setRandomDurationTimer);
  },

  // Consistent timing for mole propagation
  setStandardTimer: function(time, callback){
    window.molePositions = this.molePositions;

    this.setMoleTimer(time, callback)
  },

  animateRandomGridMole: function(){
    // Grab a mole
    var moleIndex = game.rnd.integerInRange(0, this.molePositions.length-1);
    var molePosition = this.molePositions[moleIndex];

    // Randomize the speed at which the mole pops up
    var frameRate = game.rnd.integerInRange(5, 12);

    // Place mole
    mole = this.addMole(molePosition[0], molePosition[1]);
    
    // Animate mole with random frameRate
    mole.animations.play('grow', frameRate, false, true);
  },

  addRandomMoles: function() {
    // Get random location
    x = Math.random() * (game.world.width - 100)
    y = Math.random() * (game.world.height - 100)
    
    // Add mole to location mole
    mole = this.addMole(x, y);
    
    // Start animation
    // Moles die after animation is over
    mole.animations.play('grow', 6, false, true);
  },

  addGridOfMoles: function(width, height){
    this.moleGrid = []

    for(var i = 0; i < height; i++){
      this.moleGrid[i] = this.addRowOfMoles(width, i);
    }

    this.moles.forEach(function(currMole, indx){
      currMole.animations.play('grow', 6, false, true);
    });
  },

  addRowOfMoles: function(numberOfMoles, rowNumber) {
    var arr = [];
    var paddingX = (game.world.width - 300) / numberOfMoles
    var paddingY = 100

    //Populate array
    for (var i = 0; i < numberOfMoles; i++) {
        var x = (paddingX * i) + 150
        var y = paddingY * rowNumber + 100
        this.molePositions.push([x,y]);
    }

    return arr  
  },

  addMole: function(x, y) {
    // Create a mole at the position x and y
    var mole = new MechaMole(game, x, y);

    // Add mole to group
    this.moles.add(mole);

    // Add click callback and be able to find sprite
    mole.events.onInputDown.add(this.moleWhacked, {sprite: mole, context: this});
    
    // Add animations
    mole.animations.add('grow');

    return mole
  },

  gameOver: function() {
    // Set high score
    scoreboard.setHighScore();

    // End mole propagation
    this.endMoleTimer()

    // End game sound and stage
    this.gameOverSound.play()
    game.state.start('gameOver')
  },

  // When you hit a mole
  moleWhacked: function(){
    // Do nothing id it's alive.
    if(this.sprite.alive == false){
      return;
    }
    // Destroy the sprite
    this.sprite.alive = false;
    this.sprite.destroy();

    // Add to score
    game.score += 1;
    scoreboard.updateScoreLabels();
  },

};
