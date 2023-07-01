import { Scene } from 'phaser';

class BootScene extends Scene
{
    constructor()
    {
        super('scn_boot');
    }

    preload()
    {
        const { width, height } = this.sys.game.canvas;
        this.loadLabel = this.add.text(width/2, height/2, 'loading\n0%', { font: '30px Arial', fill: '#fff', align: 'center' });
        this.loadLabel.setOrigin(0.5, 0.5);

        this.load.atlas('13kbc', '../../obj/13kbc.png', '../../obj/13kbc.json');
        this.load.bitmapFont('PublicPixel', '../../obj/publicpixel.png', '../../obj/publicpixel.xml');

        this.load.on('progress', this.progress, this);
    }

    progress(value)
    {
        // Update loading progress
        let percentage = Math.round(value * 100) + '%';
        this.loadLabel.setText('loading\n' + percentage);
    }

    create()
    {
        this.load_enemies();
        this.loads_pg();
        // Start the menu scene
        this.scene.start('scn_menu');
    }

    load_enemies()
    {
        const enemies = ['pig1', 'pig2', 'pig3', 'horse', 'cow']
        const x_size =
        {
            pig1: 16,
            pig2: 16,
            pig3: 16,
            horse: 23,
            cow: 24
        };
        for(let i=0; i<enemies.length; i++)
        {
            const _name = enemies[i];
            const _frame = `${_name}.png`;
            const _anim =  `${_name}_walk`;
            this.textures.addSpriteSheetFromAtlas(_name, { frameHeight: 16, frameWidth: x_size[_name], atlas: '13kbc', frame: _frame });
            this.anims.create({
                key: _anim,
                frameRate: 5,
                frames: this.anims.generateFrameNumbers(_name, {frames:[0, 1]}),
                repeat: -1
            });
        }
    }

    loads_pg()
    {
        const { width, height } = this.sys.game.canvas;
        const players = ['cavegirl', 'cavegirl2', 'caveman', 'caveman2'];
        for(let i=0; i<players.length; i++)
        {
            const _name = players[i];
            const _frame = `${_name}.png`;
            const _anim_d =  `${_name}_walk_d`;
            const _anim_u =  `${_name}_walk_u`;
            this.textures.addSpriteSheetFromAtlas(_name, { frameHeight: 16, frameWidth: 16, atlas: '13kbc', frame: _frame });

            this.anims.create({
                key: _anim_d,
                frameRate: 5,
                frames: this.anims.generateFrameNumbers(_name, {frames:[0,2,4,6]}),
                repeat: -1
            });
            this.anims.create({
                key: _anim_u,
                frameRate: 5,
                frames: this.anims.generateFrameNumbers('player', {frames:[1, 3, 5, 7]}),
                repeat: -1
            });
        }
    }

};

export default BootScene;