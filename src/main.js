import './css/style.css'
import config from './conf/config';
import { Game } from 'phaser';
import GameScene from './js/scenes/game_scene';

config.scene.push(GameScene);

new Game(config);
