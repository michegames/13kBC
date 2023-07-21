import './css/style.css'
import config from './conf/config';
import { Game } from 'phaser';
import GameScene from './js/scenes/game_scene';
import BootScene from './js/scenes/boot';
import MenuScene from './js/scenes/menu';
import ScoreScene from './js/scenes/scores';
import SettingsScene from './js/scenes/settings';
import TutorialScene from './js/scenes/tutorial';
import SelectScene from './js/scenes/select_char';
import { _is_mobile } from './js/lib/helpers';

config.scene.push(BootScene);
config.scene.push(MenuScene);
config.scene.push(GameScene);
config.scene.push(ScoreScene);
config.scene.push(SettingsScene);
config.scene.push(TutorialScene);
config.scene.push(SelectScene);

function start_cb()
{
    console.log('staring callback');
}

if (_is_mobile())
{
    // check if start landascape
    if (window.innerWidth > window.innerHeight)
    {
        document.getElementById('game').style.display = "none";
        document.getElementById('rotate').style.display = "block";
        window.onresize = function ()
        {
            if (window.innerWidth < window.innerHeight)
            {
                window.location.reload();
            }
        }
    }
    else
    {
        // portarit
        window.$G = new Game(config);
        start_cb()
        window.onresize = function ()
        {
            if (window.innerWidth > window.innerHeight)
            {
                window.$G.pause();
                document.getElementById('game').style.display = "none";
                document.getElementById('rotate').style.display = "block";
            }
            else
            {
                document.getElementById('game').style.display = "block";
                document.getElementById('rotate').style.display = "none";
                setTimeout(() =>
                {
                    window.$G.resume();
                }, 100);
            }
        }
    }
}
else
{
    window.$G = new Game(config);
    start_cb();
}