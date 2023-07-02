import { Scene } from 'phaser';

class MenuScene extends Scene
{
    constructor()
    {
        super('scn_menu');
    }

    create()
    {
        const { width, height } = this.sys.game.canvas;

        /*this.btn = this.add.sprite(width / 2, 75, '13kbc', 'btn.png');
        this.btn.scaleX = 30;
        this.btn.scaleY = 8;*/

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
        this.btn.scaleX = 5;
        this.btn.scaleY = 3;
        const btn_start = this.add.bitmapText(width / 2, 200, 'PublicPixel', 'Start Game', 20).setOrigin(0.5, 0.5);

        this.btn = this.add.sprite(width / 2, 275, '13kbc', 'btn.png');
        this.btn.scaleX = 5;
        this.btn.scaleY = 3;
        const btn_score = this.add.bitmapText(width / 2, 275, 'PublicPixel', 'Best Scores', 20).setOrigin(0.5, 0.5);

        this.btn = this.add.sprite(width / 2, 350, '13kbc', 'btn.png');
        this.btn.scaleX = 5;
        this.btn.scaleY = 3;
        const btn_set = this.add.bitmapText(width / 2, 350, 'PublicPixel', 'Settings', 20).setOrigin(0.5, 0.5);
        
        this.btn = this.add.sprite(width / 2, 425, '13kbc', 'btn.png');
        this.btn.scaleX = 5;
        this.btn.scaleY = 3;
        const btn_quit = this.add.bitmapText(width / 2, 425, 'PublicPixel', 'Quit', 20).setOrigin(0.5, 0.5);


        const logo = this.add.sprite(width / 2, height - 100, '13kbc', 'logo.png');

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
        

        btn_start.setInteractive();
        btn_start.on('pointerup', () =>
        {
            this.tweens.add(
                {
                    targets: btn_start,
                    scale: 0.5,
                    duration: 300,
                    yoyo: true,
                    completeDelay: 300,
                    onComplete: () =>
                    {
                        this.sound.unlock();
                        this.scene.start('scn_game');
                    }
                }
            );
        });

        btn_score.setInteractive();
        btn_score.on('pointerup', () =>
        {
            this.tweens.add(
                {
                    targets: btn_score,
                    scale: 0.5,
                    duration: 300,
                    yoyo: true,
                    completeDelay: 300,
                    onComplete: () =>
                    {
                        this.scene.start('scn_scores');
                    }
                }
            );
        });

        btn_set.setInteractive();
        btn_set.on('pointerup', () =>
        {
            this.tweens.add(
                {
                    targets: btn_set,
                    scale: 0.5,
                    duration: 300,
                    yoyo: true,
                    completeDelay: 300,
                    onComplete: () =>
                    {
                        this.scene.start('scn_settings');
                    }
                }
            );
        });
        
        btn_quit.setInteractive();
        btn_quit.on('pointerup', () =>
        {
            this.tweens.add(
                {
                    targets: btn_quit,
                    scale: 0.5,
                    duration: 300,
                    yoyo: true,
                    completeDelay: 300,
                    onComplete: () =>
                    {
                        window.close();
                    }
                }
            );
        });
    }
};

export default MenuScene;