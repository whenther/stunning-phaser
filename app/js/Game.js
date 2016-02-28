import {Phaser} from 'phaser';
import _ from 'lodash';

const STAR_COUNT = 12;
const STAR_SCORE = 10;

class Game {
  constructor () {
    this.platforms = null;
    this.player = null;
    this.cursors = null;
    this.stars = null;
    this.score = null;
    this.scoreText = null;
  }

  init () {
    this.score = 0;
  }

  create () {
    //  We're going to be using physics, so enable the Arcade Physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);
    //  A simple background for our game
    this.add.sprite(0, 0, 'sky');

  	/*
  	 * Score
  	 */
  	this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    /*
     * Platforms
     */
    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we create the ground.
    let ground = this.platforms.create(0, this.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    let ledge = this.platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = this.platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    /*
     * Player
     */
    this.player = this.add.sprite(32, this.world.height - 150, 'dude');

  	// Enable physics on player.
  	this.physics.arcade.enable(this.player);

  	//  Player physics properties. Give the little guy a slight bounce.
  	this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

  	//  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

  	this.cursors = this.input.keyboard.createCursorKeys();

  	/*
  	 * stars
  	 */
  	this.stars = this.add.group();

  	this.stars.enableBody = true;

  	//  Here we'll create 12 of them evenly spaced apart
    _.forEach(_.range(STAR_COUNT), (i) => {
      //  Create a star inside of the 'stars' group
  		let star = this.stars.create(i * 70, 0, 'star');

  		//  Let gravity do its thing
  		star.body.gravity.y = 6;

  		//  This just gives each star a slightly random bounce value
  		star.body.bounce.y = 0.7 + Math.random() * 0.2;
    });
  }

  update () {
  	//  Collide the player and the stars with the platforms
    this.physics.arcade.collide(this.player, this.platforms);
  	this.physics.arcade.collide(this.stars, this.platforms);

  	/*
  	 * Player Movement
  	 */
  	//  Reset the players velocity (movement)
  	this.player.body.velocity.x = 0;

  	if (this.cursors.left.isDown) {
      //  Move to the left
      this.player.body.velocity.x = -150;

      this.player.animations.play('left');
  	}
  	else if (this.cursors.right.isDown) {
      //  Move to the right
      this.player.body.velocity.x = 150;

      this.player.animations.play('right');
  	}
  	else {
      //  Stand still
      this.player.animations.stop();

      this.player.frame = 4;
  	}

  	//  Allow the player to jump if they are touching the ground.
  	if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -350;
  	}

  	/*
  	 * Star Collection
  	 */
    this.physics.arcade.overlap(this.player, this.stars, this._collectStar, null, this);
  }

  /* Private */
  _collectStar (player, star) {
    // Removes the star from the screen
     star.kill();

    //  Add and update the score
    this.score += STAR_SCORE;
    this.scoreText.text = 'Score: ' + this.score;

    if (this.score === STAR_SCORE * STAR_COUNT) {
      this.state.start('GameOver');
    }
  }
}

export default Game;
