// Custom Mole factory
MechaMole = function(game, x, y){
  Phaser.Sprite.call(this, game, x, y, 'mechaMole');
  this.alive = true;

  // Enable clicking on mecha mole
  this.inputEnabled = true;
}
MechaMole.prototype = Object.create(Phaser.Sprite.prototype);
MechaMole.prototype.constructor = MechaMole;

// Custom Mole factory
Hammer = function(game, x, y){
  Phaser.Sprite.call(this, game, x, y, 'hammer');
  this.alive = true;

  // Enable clicking on mecha mole
  this.inputEnabled = true;
}
Hammer.prototype = Object.create(Phaser.Sprite.prototype);
Hammer.prototype.constructor = Hammer;
