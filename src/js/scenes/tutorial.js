import { Scene } from 'phaser';
import { _make_btn_raw } from '../lib/helpers';

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

class TutorialScene extends Scene
{

    constructor()
    {
        super('scn_tuts');
        this.start_point_y = 36;
        this.make_btn_raw = _make_btn_raw.bind(this);
    }

    create()
    {
        this.click_count = 0;
        this.state = STATE.PAUSE;
        const { width, height } = this.sys.game.canvas;
        const center_x = width / 2;
        const center_y = height / 2;

        const cur_bg = this.create_bg();

        this.play_btn_ref = this.make_btn_raw(
        {
            x: center_x + 100,
            y: 30,
            text: 'PLAY',
            on_complete: () =>
            {
                this.scene.start('scn_menu');
            },
            scale_x: 2,
            scale_y: 1.5,
            text_size: 20
        }).reference.group;

        // here not in constructor
        this.is_clicking = false;

        this.create_pg();
        
        // sounds and music
        this.snd_music = this.sound.add('music', {loop:true});
        this.snd_coin = this.sound.add('coin');
        this.snd_hit = this.sound.add('hit');
        this.play_fx = Boolean(localStorage.sound_flag === '1');
        this.play_bg_music = Boolean(localStorage.music_flag === '1');

        if(this.play_bg_music)
        {
            this.snd_music.play();
        }

        // make skip tutorial hidden
        this.play_btn_ref.setVisible(false)

        const tut_msg = 'In this game the\n player controls\n a caveman who\n moves up and down\n the screen\n automatically\n\
            \nBy clicking on the\n screen our caveman\n changes direction.'

        this.tut_btn_ref = this.make_btn_raw(
        {
            x: center_x,
            y: center_y,
            text: tut_msg,
            on_complete: () =>
            {
                this.tut_btn_ref.setVisible(false);
                this.player.setVelocityY(-200);
                this.state = STATE.PLAY;
            },
            scale_x: 6,
            scale_y: 20,
            text_size: 15
        }).reference.group;
    }

    update(time, delta)
    {
        if (this.state === STATE.PLAY)
        {
            if (!this.input.activePointer.isDown && this.is_clicking == true)
            {
                this.reverse(false);
                this.click_count++;
                this.is_clicking = false;
            } else if (this.input.activePointer.isDown && this.is_clicking == false)
            {
                this.is_clicking = true;
            }
            if(this.click_count === 6)
            {
                this.click_count = 10;
                this.second_part_of_tuts();
            }
        }
    }

    second_part_of_tuts()
    {
        const { width, height } = this.sys.game.canvas;
        const center_x = width / 2;
        const center_y = height / 2;

        this.state = STATE.PAUSE;
        this.player.setVelocityY(0);
        this.player.setY(height - 70);
        this.player.anims.play(this.cur_animation_walk_up, true);
        const tut_msg = 'The aim of the\n game is to avoid\n the crazed quadrupeds\n that enter from\n the sides\n of the screen\n\nGood luck!';

        this.tut_btn_ref = this.make_btn_raw(
        {
            x: center_x,
            y: center_y,
            text: tut_msg,
            on_complete: () =>
            {
                this.tut_btn_ref.setVisible(false);
                this.player.setVelocityY(-200);
                this.state = STATE.PLAY;
                localStorage.tutorial_done = 1;
                this.scene.start('scn_game');
            },
            scale_x: 6,
            scale_y: 20,
            text_size: 15
        }).reference.group;
    }

    create_bg()
    {
        const { width, height } = this.sys.game.canvas;

        const cur_bg = 'bg.png';

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

        this.cur_player = 'cavegirl';
        this.cur_animation_walk_up = `${this.cur_player}_walk_u`;
        this.cur_animation_walk_down = `${this.cur_player}_walk_d`;

        this.player = this.physics.add.sprite(width / 2, height - 70, this.cur_player, 1);

        this.player.scale = 3;
        //this.player.setVelocityY(-200);
        this.player.body.setSize(10, 10);
        this.player.body.setBounceY(1);

        this.physics.add.collider(this.player, this.top_plat, this.plat_collision_reverse, null, this);
        this.physics.add.collider(this.player, this.bottom_plat, this.plat_collision_reverse, null, this);

        this.player.anims.play(this.cur_animation_walk_up, true);
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

export default TutorialScene;
