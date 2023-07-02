import { Scene } from 'phaser';

const STATE =
{
    PLAY: Symbol("red"),
    PAUSE: Symbol("blue"),
    GAMEOVER: Symbol("green")
};
Object.freeze(STATE);

class GameScene extends Scene
{

    constructor()
    {
        super('scn_game');
        this.start_point_y = 36;
        this.isClicking = false;
        this.state = STATE.PLAY;
    }

    create()
    {
        this.create_bg();
        this.create_pg();
        this.enemies = this.physics.add.group();
        this.time.addEvent(
        {
            delay: 1500,
            callback: () => this.add_enemy(),
            loop: true
        });
        window.$T = this.time;
    }

    update(time, delta)
    {
        if(this.state === STATE.PLAY)
        {
            if (!this.input.activePointer.isDown && this.isClicking == true)
            {
                this.reverse();
                this.isClicking = false;
            } else if (this.input.activePointer.isDown && this.isClicking == false)
            {
                this.isClicking = true;
            }
            if(this.physics.overlap(this.player, this.enemies))
            {
                this.ending();
            }
        }
        this.clean();
    }

    /* custom fns */
    create_bg()
    {
        const { width, height } = this.sys.game.canvas;
        const bgs = ['bg.png', 'bg2.png', 'bg3.png'];
        const rnd = Phaser.Math.Between(0, bgs.length - 1);
        const image = this.add.tileSprite(width / 2, height / 2, 440, 640, '13kbc', bgs[rnd]);
        const top_plat = this.add.sprite(width / 2, this.start_point_y, '13kbc', 'base.png');
        top_plat.scale = 3;

        const bottom_plat = this.add.sprite(width / 2, height - this.start_point_y, '13kbc', 'base.png');
        bottom_plat.scale = 3;

        this.top_plat = this.physics.add.staticSprite(width / 2, 8, null);
        this.top_plat.setSize(100, 16);
        this.top_plat.setVisible(false);

        this.bottom_plat = this.physics.add.staticSprite(width / 2, height-8, null);
        this.bottom_plat.setSize(100, 16);
        this.bottom_plat.setVisible(false);

    }

    create_pg()
    {
        const { width, height } = this.sys.game.canvas;
        const players = ['cavegirl.png', 'cavegirl2.png', 'caveman.png', 'caveman2.png'];
        const player_sprite = players[Phaser.Math.Between(0, players.length - 1)];
        const t = this.textures.addSpriteSheetFromAtlas('player', { frameHeight: 16, frameWidth: 16, atlas: '13kbc', frame: player_sprite });
        this.anims.create({
            key: "walk_d",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('player', {frames:[0,2,4,6]}),
            repeat: -1
        });
        this.anims.create({
            key: "walk_u",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('player', {frames:[1, 3, 5, 7]}),
            repeat: -1
        });

        this.player = this.physics.add.sprite(width / 2, height - 70, 'player', 1);
        this.player.scale = 3;
        this.player.setVelocityY(-200);
        this.player.body.setSize(10,10);

        this.physics.add.overlap(this.player, this.top_plat, this.reverse, null, this);
        this.physics.add.overlap(this.player, this.bottom_plat, this.reverse, null, this);

        //this.physics.add.overlap(this.player, this.enemies, this.ending, null, this);

        this.player.anims.play('walk_u', true);
        window.$P = this.player;
    }

    add_enemy()
    {
        const { width, height } = this.sys.game.canvas;

        const enemies = ['pig1', 'pig2', 'pig3', 'horse', 'cow']
        const enemy_texture = enemies[Phaser.Math.Between(0, enemies.length-1)];
        const enemy_anim = `${enemy_texture}_walk`;
        const y = Phaser.Math.Between(10, 55) * 10;

        const from_right = Phaser.Math.Between(0, 1);
        const from_left = (from_right === 1) ? 0 : 1;

        const vel = Phaser.Math.Between(5, 15) * 10;

        let enemy = null;
        if(from_left)
        {
            enemy = this.enemies.create(-10, y, enemy_texture);
            enemy.scale = 3;
            enemy.flipX = true;
            enemy.anims.play(enemy_anim);
            enemy.body.velocity.x = vel;
        }
        if(from_right)
        {
            enemy = this.enemies.create(width+10, y, enemy_texture);
            enemy.scale = 3;
            enemy.anims.play(enemy_anim);
            enemy.body.velocity.x = -vel;
        }
    }

    clean()
    {
        const { width, height } = this.sys.game.canvas;
        const arr = this.enemies.getChildren();
        for(let x=arr.length-1; x>=0; x--)
        {
            if(arr[x].x > width+24) arr[x].destroy();
        }
    }

    ending()
    {
        this.time.removeAllEvents();
        this.state === STATE.GAMEOVER;
        this.player.setVelocityY(0);
        this.player.anims.stop();

        this.tweens.add(
            {
                targets: this.player,
                scale: 5,
                duration: 1000,
                yoyo: true,
                completeDelay: 500,
                angle: 360,
                onComplete: () =>
                {
                    this.scene.start('scn_menu');
                }
            }
        );
        //this.scene.start('scn_menu');
    }

    reverse()
    {
        this.player.setVelocityY(-this.player.body.velocity.y);
        if(this.player.body.velocity.y > 0) this.player.anims.play('walk_d', true);
        if(this.player.body.velocity.y < 0) this.player.anims.play('walk_u', true);
    }
};

export default GameScene;
