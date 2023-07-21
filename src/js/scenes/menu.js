import { Scene } from 'phaser';
import { _make_btn_menu, _make_title } from '../lib/helpers';

class MenuScene extends Scene
{
    constructor()
    {
        super('scn_menu');
        this.make_btn = _make_btn_menu.bind(this);
        this.make_title = _make_title.bind(this);
        window.$S = this;
    }

    _make_logo()
    {
        const { width, height } = this.sys.game.canvas;
        const logo = this.add.sprite(width / 2, height - 100, '13kbc', 'logo_cow.png');
        this.tweens.add(
            {
                targets: logo,
                scale: 0.5,
                duration: 700,
                yoyo: true,
                completeDelay: 300,
                repeat: -1
            }
        );
    }

    create()
    {
        this.cameras.main.fadeIn(600, 0, 0, 0);
        const buttons =
        [
            {
                title: 'Start Game',
                y: 200,
                on_complete: function()
                {
                    this.sound.unlock();
                    if(localStorage.getItem('tutorial_done') === '0')
                    {
                        this.scene.start('scn_tuts');
                    }
                    else
                    {
                        this.scene.start('scn_select');
                    }
                }
            },
            {
                title: 'Top Scores',
                y: 275,
                on_complete: function()
                {
                    this.scene.start('scn_scores');
                }
            },
            {
                title: 'Settings',
                y: 350,
                on_complete: function()
                {
                    this.scene.start('scn_settings');
                }
            },
            {
                title: 'Quit',
                y: 425,
                on_complete: function()
                {
                    try
                    {
                        navigator.app.exitApp();
                    }
                    catch (error)
                    {
                        console.error(error);
                        window.close();
                    }
                }
            },
        ];
        
        this.make_title();
        buttons.forEach(item =>
        {
            this.make_btn(item.y, item.title, item.on_complete);
        });

        this._make_logo();
    }
};

export default MenuScene;