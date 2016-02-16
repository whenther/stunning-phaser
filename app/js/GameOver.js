class GameOver {
  constructor () {

  }

  init () {

  }

  create () {
    // Click-to-start message
    let message = this.add.text(
      this.world.centerX,
      this.world.centerY,
      'Game Over. Click to play again.',
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

export default GameOver;
