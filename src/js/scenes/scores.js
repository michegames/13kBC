import { Scene } from 'phaser';
import { _make_btn, _make_title } from '../lib/helpers';

class ScoreScene extends Scene
{
    constructor()
    {
        super('scn_scores');
        this.make_btn = _make_btn.bind(this);
        this.make_title = _make_title.bind(this);
    }

    create()
    {
        const { width, height } = this.sys.game.canvas;
        this.make_title();

        this.add.rectangle(width / 2, 340, width, 420, 0xffffff);

        const scores = window.STORAGE.get('scores');
        if(scores !== null)
        {
            const tmp = JSON.parse(scores);
            for(let i=0; i<tmp.length; i++)
            {
                const msg = `${tmp[i].when} => ${tmp[i].val}`;
                this.add.bitmapText(width / 2, 160+(i*40), 'PublicPixel', msg, 15).setOrigin(0.5, 0.5);
            }
        }

        this.make_btn(590, 'Back!', function()
        {
            this.scene.start('scn_menu');
        });

    }

};

export default ScoreScene;