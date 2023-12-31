import { Scene } from 'phaser';

const STATE =
{
    PLAY: Symbol('PLAY'),
    PAUSE: Symbol('PAUSE'),
    GAMEOVER: Symbol('GAMEOVER')
};
Object.freeze(STATE);

const POSITION =
{
    TOP: Symbol('TOP'),
    BOTTOM: Symbol('BOTTOM')
};
Object.freeze(STATE);

class GameScene extends Scene
{

    constructor()
    {
        super('scn_game');
        this.start_point_y = 36;
    }

    init(config)
    {
        console.log('config is => ' + JSON.stringify(config));
        this.selected_pg = config.pg;
    }

    create()
    {
        this.state = STATE.PLAY;
        const { width, height } = this.sys.game.canvas;
        const center_x = width / 2;
        const center_y = height / 2;

        // here not in constructor
        this.is_clicking = false;
        this.fruit_position = POSITION.TOP;
        this.score = 0;

        const cur_bg = this.create_bg();
        this.create_pg();
        this.enemies = this.physics.add.group();
        this.physics.add.collider(this.enemies, this.enemies, function (a, b)
        {
            a.flipX = a.body.velocity.x > 0;
            b.flipX = b.body.velocity.x > 0;

        });
        if(this.state === STATE.PLAY)
        {
            this.time.addEvent(
            {
                delay: 1500,
                callback: () => this.add_enemy(),
                loop: true
            });
        }
        this.create_fruit();

        const lbl_bg = this.add.sprite(center_x-100, 20, '13kbc', 'btn.png');
        lbl_bg.scaleX = 1;
        lbl_bg.scaleY = 1.5;

        this.lbl_score = this.add.bitmapText(center_x-100, 20, 'PublicPixel', '0', 15);
        this.lbl_score.setOrigin(0.5, 0.5);
        
        // sounds and music
        this.snd_music = this.sound.add('music', {loop:true});
        this.snd_coin = this.sound.add('coin');
        this.snd_hit = this.sound.add('hit');
        this.play_fx = Boolean(window.STORAGE.get('sound_flag') === '1');
        this.play_bg_music = Boolean(window.STORAGE.get('music_flag') === '1');

        if(this.play_bg_music)
        {
            this.snd_music.play();
        }
    }

    update(time, delta)
    {
        if (this.state === STATE.PLAY)
        {
            if (!this.input.activePointer.isDown && this.is_clicking == true)
            {
                this.reverse(false);
                this.is_clicking = false;
            } else if (this.input.activePointer.isDown && this.is_clicking == false)
            {
                this.is_clicking = true;
            }
            if (this.physics.overlap(this.player, this.enemies))
            {
                if(this.play_fx) this.snd_hit.play();
                this.ending();
            }
            if (this.physics.overlap(this.player, this.fruit))
            {
                if(this.play_fx) this.snd_coin.play();
                this.fruit.destroy();
                if (this.state === STATE.PLAY) this.score += 5; // dont increase score on tut!
                this.fruit_position = (this.fruit_position === POSITION.TOP) ? POSITION.BOTTOM : POSITION.TOP;
                this.create_fruit();
                this.lbl_score.text = `${this.score}`;
            }
            this.clean();
        }
    }

    create_bg()
    {
        const { width, height } = this.sys.game.canvas;
        const bgs = ['bg.png', 'bg2.png', 'bg3.png'];
        const rnd = Phaser.Math.Between(0, bgs.length - 1);
        const cur_bg = bgs[rnd];

        const image = this.add.tileSprite(width / 2, height / 2, 440, 640, '13kbc', cur_bg);

        const top_plat = this.add.sprite(width / 2, this.start_point_y, '13kbc', 'base.png');
        top_plat.scale = 3;

        const bottom_plat = this.add.sprite(width / 2, height - this.start_point_y, '13kbc', 'base.png');
        bottom_plat.scale = 3;

        this.top_plat = this.physics.add.staticSprite(width / 2, 8, null);
        this.top_plat.setSize(100, 16);
        this.top_plat.setVisible(false);

        this.bottom_plat = this.physics.add.staticSprite(width / 2, height - 8, null);
        this.bottom_plat.setSize(100, 16);
        this.bottom_plat.setVisible(false);

        return cur_bg;
    }

    create_pg()
    {
        const { width, height } = this.sys.game.canvas;
        const players = ['cavegirl', 'cavegirl2', 'caveman', 'caveman2'];

        //this.cur_player = players[Phaser.Math.Between(0, players.length - 1)];
        this.cur_player = this.selected_pg;
        this.cur_animation_walk_up = `${this.cur_player}_walk_u`;
        this.cur_animation_walk_down = `${this.cur_player}_walk_d`;

        this.player = this.physics.add.sprite(width / 2, height - 70, this.cur_player, 1);

        this.player.scale = 3;
        this.player.setVelocityY(-200);
        this.player.body.setSize(10, 10);
        this.player.body.setBounceY(1);

        this.physics.add.collider(this.player, this.top_plat, this.plat_collision_reverse, null, this);
        this.physics.add.collider(this.player, this.bottom_plat, this.plat_collision_reverse, null, this);

        this.player.anims.play(this.cur_animation_walk_up, true);
    }

    create_fruit()
    {
        const { width, height } = this.sys.game.canvas;
        // all frutis referene not sure if i use all now
        const all_fruits = ['Beaf', 'Fish', 'FortuneCookie', 'Onigiri', 'Shrimp', 'Sushi', 'Sushi2',
            'Yakitori', 'Octopus', 'TeaLeaf', 'Noodle', 'Calamari', 'Honey', 'SeedLargeWhite', 'Seed1',
            'Seed2', 'SeedBig1', 'SeedBig2', 'SeedBig3', 'SeedLarge', 'Seed3', 'Nut', 'Nut2'
        ];
        const fruits = ['Seed2', 'SeedBig2', 'SeedBig3', 'Seed3', 'Nut', 'Nut2', 'Yakitori'];

        const fruit_texture = `${fruits[Phaser.Math.Between(0, fruits.length - 1)]}.png`;

        const y = (this.fruit_position === POSITION.TOP) ? this.start_point_y : height - this.start_point_y;

        this.fruit = this.physics.add.sprite(width / 2, y, '13kbc', fruit_texture);

        if ((fruit_texture === 'Nut.png') || (fruit_texture === 'Nut2.png'))
        {
            this.fruit.scale = 2;
        }
        else
        {
            this.fruit.scale = 3;
        }
    }

    add_enemy()
    {
        console.log("A");
        if(
            (this.enemies.getChildren().length >= 3) &&
            (this.score <= 30)
        )
        {
            console.log("B");
            return -1;
        }
        else if(
            (this.enemies.getChildren().length >= 4) &&
            (this.score <= 50)
        )
        {
            console.log("C");
            return -1;
        }
        console.log("DZ");
        const { width, height } = this.sys.game.canvas;
        const center_x = width / 2;

        const enemies = ['pig1', 'pig2', 'pig3', 'horse', 'cow']
        const enemy_texture = enemies[Phaser.Math.Between(0, enemies.length - 1)];
        const enemy_anim = `${enemy_texture}_walk`;

        let _y_line = (this.score >= 30) ? Phaser.Math.Between(0, 16) : Phaser.Math.Between(2, 14);

        while(!this.is_in_enemies_y(_y_line))
        {
            _y_line = (this.score >= 30) ? Phaser.Math.Between(0, 16) : Phaser.Math.Between(2, 14);
        }


        const y = 100 + (_y_line * 25);

        const from_right = Phaser.Math.Between(0, 1);
        const from_left = (from_right === 1) ? 0 : 1;

        const vel = Phaser.Math.Between(5, 15) * 10;

        let enemy = null;

        const is_widhter = (width >= 440)

        if (from_left)
        {
            if (is_widhter)
            {
                enemy = this.enemies.create(center_x - 230, y, enemy_texture);
            }
            else
            {
                enemy = this.enemies.create(-10, y, enemy_texture);
            }
            enemy.scale = 3;
            enemy.flipX = true;
            enemy.anims.play(enemy_anim);
            enemy.body.velocity.x = vel;
        }
        if (from_right)
        {
            if (is_widhter)
            {
                enemy = this.enemies.create(center_x + 230, y, enemy_texture);
            }
            else
            {
                enemy = this.enemies.create(width + 10, y, enemy_texture);
            }
            enemy.scale = 3;
            enemy.anims.play(enemy_anim);
            enemy.body.velocity.x = -vel;
        }
        enemy.body.setBounceX(1);
        enemy._y_line = _y_line;
    }

    clean()
    {
        const { width, height } = this.sys.game.canvas;
        const center_x = width / 2;

        const arr = this.enemies.getChildren();
        for (let x = arr.length - 1; x >= 0; x--)
        {
            if ((arr[x].x > center_x + 250) || (arr[x].x < center_x - 250))
            {
                arr[x].destroy();
            }
        }
    }

    enemies_clean_all()
    {
        const arr = this.enemies.getChildren();
        for (let x = arr.length - 1; x >= 0; x--)
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

    is_in_enemies_y(num)
    {
        const tmp = this.enemies_get_y_lines();
        if(tmp.indexOf(num) > -1) return false;
        return true;
    }

    enemies_get_y_lines()
    {
        let tmp = [];
        const arr = this.enemies.getChildren();
        for (let x = arr.length - 1; x >= 0; x--)
        {
            tmp.push(arr[x]._y_line);
        }
        return tmp;
    }

    ending()
    {
        function take_best(array)
        {
            // Ordina l'array in ordine decrescente
            let arrayOrdinato = array.sort(function (a, b)
            {
                return b.val - a.val;
            });

            // Prendi i primi 10 valori dall'array ordinato
            let massimi10 = arrayOrdinato.slice(0, 10);
            return massimi10;
        }


        this.state = STATE.GAMEOVER;
        this.time.removeAllEvents();
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
                    const _time = new Date();
                    const _time_string = `${_time.toLocaleDateString()}\n${_time.toLocaleTimeString()}`;
                    let score_table = window.STORAGE.get('scores');
                    if (score_table === null)
                    {
                        score_table = [
                        {
                            val: this.score,
                            when: _time_string,
                            raw_time: _time
                        }];
                    }
                    else
                    {
                        score_table = JSON.parse(score_table);
                        score_table.push(
                        {
                            val: this.score,
                            when: _time_string,
                            raw_time: _time
                        });
                        score_table = take_best(score_table);
                    }
                    window.STORAGE.set('scores', JSON.stringify(score_table));
                    this.snd_music.stop();
                    this.scene.start('scn_menu');
                }
            }
        );
    }

    plat_collision_reverse()
    {
        if (this.state === STATE.GAMEOVER) return -1;
        if (this.player.body.velocity.y > 0)
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
        if (this.state === STATE.GAMEOVER) return -1;
        this.player.setVelocityY(-this.player.body.velocity.y);
        this.player.anims.play((this.player.body.velocity.y > 0) ?
            this.cur_animation_walk_down :
            this.cur_animation_walk_up,
            true);
    }

};

export default GameScene;
