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
    }

    update(time, delta)
    {
        if(this.state === STATE.PLAY)
        {
            if (!this.input.activePointer.isDown && this.isClicking == true)
            {
                this.reverse(false);
                this.isClicking = false;
            } else if (this.input.activePointer.isDown && this.isClicking == false)
            {
                this.isClicking = true;
            }
            if(this.physics.overlap(this.player, this.enemies))
            {
                this.ending();
            }
            this.clean();
        }
    }

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
        const players = ['cavegirl', 'cavegirl2', 'caveman', 'caveman2'];
        
        this.cur_player = players[Phaser.Math.Between(0, players.length - 1)];
        this.cur_animation_walk_up = `${this.cur_player}_walk_u`;
        this.cur_animation_walk_down = `${this.cur_player}_walk_d`;

        this.player = this.physics.add.sprite(width / 2, height - 70, this.cur_player, 1);

        this.player.scale = 3;
        this.player.setVelocityY(-200);
        this.player.body.setSize(10,10);
        this.player.body.setBounceY(1);

        this.physics.add.collider(this.player, this.top_plat, this.plat_collision_reverse, null, this);
        this.physics.add.collider(this.player, this.bottom_plat, this.plat_collision_reverse, null, this);

        this.player.anims.play(this.cur_animation_walk_up, true);
    }

    add_enemy()
    {
        const { width, height } = this.sys.game.canvas;
        const center_x = width / 2;

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
            enemy = this.enemies.create(center_x-230, y, enemy_texture);
            enemy.scale = 3;
            enemy.flipX = true;
            enemy.anims.play(enemy_anim);
            enemy.body.velocity.x = vel;
        }
        if(from_right)
        {
            enemy = this.enemies.create(center_x+230, y, enemy_texture);
            enemy.scale = 3;
            enemy.anims.play(enemy_anim);
            enemy.body.velocity.x = -vel;
        }
    }

    clean()
    {
        const { width, height } = this.sys.game.canvas;
        const center_x = width / 2;

        const arr = this.enemies.getChildren();
        for(let x=arr.length-1; x>=0; x--)
        {
            if((arr[x].x > center_x + 250) || (arr[x].x < center_x - 250))
            {
                arr[x].destroy();
            }
        }
    }

    enemies_clean_all()
    {
        const arr = this.enemies.getChildren();
        for(let x=arr.length-1; x>=0; x--)
        {
            try
            {
                arr[x].destroy();
            }
            catch (error)
            {
                console.error(error);
            }
        }
    }

    ending()
    {
        this.time.removeAllEvents();
        this.state === STATE.GAMEOVER;
        this.player.setVelocityY(0);
        this.player.anims.stop();
        this.enemies_clean_all();
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
    }

    plat_collision_reverse()
    {
        if(this.player.body.velocity.y > 0)
        {
            this.player.y += 20;
            this.player.setVelocityY(200);

            this.player.anims.play(this.cur_animation_walk_down, true);
        }
        else
        {
            this.player.y -= 20;
            this.player.setVelocityY(-200);
            this.player.anims.play(this.cur_animation_walk_up, true);
        }
    }

    reverse()
    {
        this.player.setVelocityY(-this.player.body.velocity.y);
        this.player.anims.play((this.player.body.velocity.y > 0) ?
            this.cur_animation_walk_down :
            this.cur_animation_walk_up,
        true);
    }
};

export default GameScene;
