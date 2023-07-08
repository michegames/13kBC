import './css/style.css'
import config from './conf/config';
import { Game } from 'phaser';
import GameScene from './js/scenes/game_scene';
import BootScene from './js/scenes/boot';
import MenuScene from './js/scenes/menu';
import ScoreScene from './js/scenes/scores';
import SettingsScene from './js/scenes/settings';
import Phaser from 'phaser';

window.$P = Phaser;

config.scene.push(BootScene);
config.scene.push(MenuScene);
config.scene.push(GameScene);
config.scene.push(ScoreScene);
config.scene.push(SettingsScene);

new Game(config);
