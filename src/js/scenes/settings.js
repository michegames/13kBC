import { Scene } from 'phaser';

class SettingsScene extends Scene
{
    constructor()
    {
        super('scn_settings');
    }

    create()
    {
        const { width, height } = this.sys.game.canvas;
        this.add.rectangle(width / 2, 60, width, 120, 0xffffff);

        this.add.rectangle(width / 2, 120, width, 20, 0xffad5d);
        this.add.rectangle(width / 2, 130, width, 10, 0x000000);

        
        const title = this.add.bitmapText(width / 2, 60, 'PublicPixel', 'Crazed\nQuadrupeds', 30, 1).setOrigin(0.5, 0.5);
        this.tweens.add(
            {
                targets: title,
                angle: { from: -2, to: 2 },
                duration: 500,
                yoyo: true,
                repeat: -1
            }
        );

        this.btn = this.add.sprite(width / 2, 200, '13kbc', 'btn.png');
        this.btn.scaleX = 5 ;
        this.btn.scaleY = 3;
        const btn_snd_text = (localStorage.sound_flag === '0') ? 'Sound Off' : 'Sound On';
        const btn_snd = this.add.bitmapText(width / 2, 200, 'PublicPixel', btn_snd_text, 20).setOrigin(0.5, 0.5);
        btn_snd.setInteractive();
        btn_snd.on('pointerup', () =>
        {
            this.tweens.add(
                {
                    targets: btn_snd,
                    scale: 0.5,
                    duration: 300,
                    yoyo: true,
                    completeDelay: 300,
                    onComplete: () =>
                    {
                        localStorage.sound_flag = (localStorage.sound_flag === '0') ? 1 : 0;
                        const btn_snd_text = (localStorage.sound_flag === '0') ? 'Sound Off' : 'Sound On';
                        btn_snd.text = btn_snd_text;
                    }
                }
            );
        });

        this.btn = this.add.sprite(width / 2, 275, '13kbc', 'btn.png');
        this.btn.scaleX = 5;
        this.btn.scaleY = 3;
        const btn_music_text = (localStorage.music_flag === '0') ? 'Music Off' : 'Music On';
        const btn_music = this.add.bitmapText(width / 2, 275, 'PublicPixel', btn_music_text, 20).setOrigin(0.5, 0.5);
        btn_music.setInteractive();
        btn_music.on('pointerup', () =>
        {
            this.tweens.add(
                {
                    targets: btn_music,
                    scale: 0.5,
                    duration: 300,
                    yoyo: true,
                    completeDelay: 300,
                    onComplete: () =>
                    {
                        localStorage.music_flag = (localStorage.music_flag === '0') ? 1 : 0;
                        const btn_music_text = (localStorage.music_flag === '0') ? 'Music Off' : 'Music On';
                        btn_music.text = btn_music_text;
                    }
                }
            );
        });

        this.btn = this.add.sprite(width / 2, 350, '13kbc', 'btn.png');
        this.btn.scaleX = 5;
        this.btn.scaleY = 3;
        const btn_tutorial_text = (localStorage.tutorial_done === '0') ? 'Tutorial On' : 'Tutorial Off';
        const btn_tutorial = this.add.bitmapText(width / 2, 350, 'PublicPixel', btn_tutorial_text, 20).setOrigin(0.5, 0.5);
        btn_tutorial.setInteractive();
        btn_tutorial.on('pointerup', () =>
        {
            this.tweens.add(
                {
                    targets: btn_tutorial,
                    scale: 0.5,
                    duration: 300,
                    yoyo: true,
                    completeDelay: 300,
                    onComplete: () =>
                    {
                        localStorage.tutorial_done = (localStorage.tutorial_done === '0') ? 1 : 0;
                        const btn_tutorial_text = (localStorage.tutorial_done === '0') ? 'Tutorial On' : 'Tutorial Off';
                        btn_tutorial.text = btn_tutorial_text;
                    }
                }
            );
        });

        this.btn = this.add.sprite(width / 2, 590, '13kbc', 'btn.png');
        this.btn.scaleX = 4 ;
        this.btn.scaleY = 3;
        const btn_back = this.add.bitmapText(width / 2, 590, 'PublicPixel', 'Back!', 20).setOrigin(0.5, 0.5);
        btn_back.setInteractive();
        btn_back.on('pointerup', () =>
        {
            this.tweens.add(
                {
                    targets: btn_back,
                    scale: 0.5,
                    duration: 300,
                    yoyo: true,
                    completeDelay: 300,
                    onComplete: () =>
                    {
                        this.scene.start('scn_menu');
                    }
                }
            );
        });
    }
};

export default SettingsScene;