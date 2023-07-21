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
        const center_x = width / 2;
        const center_y = height / 2;
        this.add.text(width/2, 60, 'Crazed\n Quadrupedes', { font: '30px monospace', fill: '#fff', align: 'center' }).setOrigin(0.5);
        this.loadLabel = this.add.text(width/2, center_y - 70, 'loading\n0%', { font: '25px monospace', fill: '#fff', align: 'center' });
        this.loadLabel.setOrigin(0.5, 0.5);


        this.add.rectangle(center_x, center_y, width-20, 60, 0x000000);

        this.progressbar = this.add.rectangle(20, center_y, 0, 40, 0xffffff);

        this.load.atlas('13kbc', 'obj/texture.png', 'obj/texture.json');
        this.load.bitmapFont('PublicPixel', 'obj/publicpixelg.png', 'obj/publicpixelg.xml');
        this.load.audio('hit', 'obj/hit.wav');
        this.load.audio('coin', 'obj/coin.wav');
        this.load.audio('music', ['obj/music96k.ogg', 'obj/music96k.mp3']);

        this.load.on('progress', this.progress, this);
        this.load.on(Phaser.Loader.Events.COMPLETE, () => this._create_gfx());
    }

    progress(value)
    {
        const { width, height } = this.sys.game.canvas;
        // Update loading progress
        let percentage = Math.round(value * 100) + '%';
        this.loadLabel.setText('loading\n' + percentage);
        this.progressbar.width = (width-40) * value;
    }

    _create_gfx()
    {
        this.load_enemies();
        this.loads_pg();
        // Start the menu scene
        this.load_defaults();
        this.scene.start('scn_menu');
    }

    load_defaults()
    {
        if(window.STORAGE.get('tutorial_done') === null)
        {
            window.STORAGE.set('tutorial_done', '0');
        }
        if(window.STORAGE.get('sound_flag') === null)
        {
            window.STORAGE.set('sound_flag', '0');
        }
        if(window.STORAGE.get('music_flag') === null)
        {
            window.STORAGE.set('music_flag', '0');
        }
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
        const players = ['cavegirl', 'cavegirl2', 'caveman', 'caveman2', 'boy'];
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
                frames: this.anims.generateFrameNumbers(_name, {frames:[0,4,8,12]}),
                repeat: -1
            });
            this.anims.create({
                key: _anim_u,
                frameRate: 5,
                frames: this.anims.generateFrameNumbers(_name, {frames:[1, 5, 9, 13]}),
                repeat: -1
            });
        }
    }

};

export default BootScene;