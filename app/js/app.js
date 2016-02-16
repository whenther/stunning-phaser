import {Phaser} from 'phaser';
import Preloader from './Preloader';
import MainMenu from './MainMenu';
import Game from './Game';
import GameOver from './GameOver';

const game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('Preloader', Preloader);
game.state.add('MainMenu', MainMenu);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);

game.state.start('Preloader');
