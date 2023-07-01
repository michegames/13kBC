import './css/style.css'
import config from './conf/config';
import { Game } from 'phaser';
import GameScene from './js/scenes/game_scene';
import BootScene from './js/scenes/boot';
import MenuScene from './js/scenes/menu';

config.scene.push(BootScene);
config.scene.push(MenuScene);
config.scene.push(GameScene);

new Game(config);
