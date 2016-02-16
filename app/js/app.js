import {Phaser} from 'phaser';
import MainMenu from './MainMenu';
import Game from './Game';
import GameOver from './GameOver';

const game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('Game', Game, true);
