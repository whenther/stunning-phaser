class MainMenu {
  constructor () {

  }

  init () {

  }

  create () {
    //  A simple background for our game
    this.add.sprite(0, 0, 'sky');

    // Click-to-start message
    let message = this.add.text(
      this.world.centerX,
      this.world.centerY,
      'stunning-phaser: click to start',
      {
        fontSize: '32px',
        fill: '#fff'
      }
    );
    message.anchor.set(0.5)

    // Click to start.
    this.input.onDown.addOnce(this._start, this);
  }


  /* Private */
  _start () {
    this.state.start('Game');
  }
}

export default MainMenu;
