import { Scene } from 'phaser';

class SelectScene extends Scene
{
    constructor()
    {
        super('scn_select');
    }

    preload()
    {
    }

    _create_selectable_pg(x,y, sprite)
    {
        const tmp = this.add.sprite(x, y, '13kbc', `${sprite}.png`);
        tmp.anims.play(`${sprite}_walk_d`, true);
        tmp.scale = 5;
        return tmp;
    }

    _create_button_for_pg(pg, sprite, others)
    {
        const { width, height } = this.sys.game.canvas;
        const center_x = width / 2;
        const center_y = height / 2;

        pg.setInteractive({ useHandCursor: true });
        pg.on('pointerup', () =>
        {
            others.forEach(element =>
            {
                element.visible = false;
            });
            this.tweens.add(
                {
                    x: center_x,
                    y: center_y,
                    targets: pg,
                    scale: 10,
                    duration: 1000,
                    completeDelay: 500,
                    onComplete: () =>
                    {
                        console.log("oncpm");
                        this.scene.start('scn_game', {pg:sprite});
                    }
                }
            );
        });
    }

    init(config)
    {
        console.log('config is => ' + JSON.stringify(config));
        this.unlocked = config.unlocked;
    }

    create()
    {
        const { width, height } = this.sys.game.canvas;
        const center_x = width / 2;
        const center_y = height / 2;

        this.add.text(width/2, 70, 'Crazed\n Quadrupedes', { font: '30px monospace', fill: '#fff', align: 'center' }).setOrigin(0.5);

        const select = this.add.text(width/2, height-100, 'Select\n your character', { font: '30px monospace', fill: '#fff', align: 'center' }).setOrigin(0.5);

        const offset = (this.unlocked === true) ? 100 : 70;

        const p1 = this._create_selectable_pg(center_x -offset, center_y -offset, 'cavegirl');
        const p2 = this._create_selectable_pg(center_x +offset, center_y -offset, 'cavegirl2');
        const p3 = this._create_selectable_pg(center_x -offset, center_y +offset, 'caveman');
        const p4 = this._create_selectable_pg(center_x +offset, center_y +offset, 'caveman2');


        if(this.unlocked === true)
        {
            const p5 = this._create_selectable_pg(center_x, center_y, 'boy');
            this._create_button_for_pg(p5, 'boy', [p1,p2,p3,p4, select]);
            this._create_button_for_pg(p1, 'cavegirl', [p2,p3,p4,p5, select]);
            this._create_button_for_pg(p2, 'cavegirl2', [p1,p3,p4,p5, select]);
            this._create_button_for_pg(p3, 'caveman', [p1,p2,p4,p5, select]);
            this._create_button_for_pg(p4, 'caveman2', [p1,p2,p3,p5, select]);
        }
        else
        {
            this._create_button_for_pg(p1, 'cavegirl', [p2,p3,p4, select]);
            this._create_button_for_pg(p2, 'cavegirl2', [p1,p3,p4, select]);
            this._create_button_for_pg(p3, 'caveman', [p1,p2,p4, select]);
            this._create_button_for_pg(p4, 'caveman2', [p1,p2,p3, select]);
        }

    }

};

export default SelectScene;