const loadingText = function (progress) {
  return 'Loading: ' + progress + '%';
}

class Preloader {
  init () {
    this.loadingText = this.add.text(
      this.world.centerX,
      this.world.centerY,
      loadingText(0),
      {
        fontSize: '32px',
        fill: '#fff'
      }
    );

    this.loadingText.anchor.set(0.5);
  }

  preload () {
    this.load.path = 'assets/';
    this.load.image('sky');
    this.load.image('ground', 'platform.png');
    this.load.image('star');
    this.load.spritesheet('dude', 'dude.png', 32, 48);

    this.load.onFileComplete.add(this._fileLoaded, this);
  }

  create () {
    this.state.start('MainMenu');
  }

  /* Private */
  _fileLoaded (progress) {
    this.loadingText.text = loadingText(progress);
  }
}

export default Preloader;
