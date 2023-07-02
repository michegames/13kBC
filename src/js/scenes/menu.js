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

        const title = this.add.bitmapText(width / 2, 75, 'PublicPixel', 'Crazed\nQuadrupeds', 30, 1).setOrigin(0.5, 0.5);
        this.tweens.add(
            {
                targets: title,
                angle: { from: -2, to: 2 },
                duration: 500,
                yoyo: true,
                repeat: -1
            }
        )
        
        this.btn = this.add.sprite(width / 2, 200, '13kbc', 'btn.png');
        this.btn.scaleX = 4 ;
        this.btn.scaleY = 3;
        const btn_start = this.add.bitmapText(width / 2, 200, 'PublicPixel', 'Start Game', 20).setOrigin(0.5, 0.5).setTint(0x15783c);

        this.btn = this.add.sprite(width / 2, 275, '13kbc', 'btn.png');
        this.btn.scaleX = 4;
        this.btn.scaleY = 3;
        const btn_score = this.add.bitmapText(width / 2, 275, 'PublicPixel', 'Best Scores', 20).setOrigin(0.5, 0.5).setTint(0x15783c);

        this.btn = this.add.sprite(width / 2, 350, '13kbc', 'btn.png');
        this.btn.scaleX = 4;
        this.btn.scaleY = 3;
        const btn_set = this.add.bitmapText(width / 2, 350, 'PublicPixel', 'Settings', 20).setOrigin(0.5, 0.5).setTint(0x15783c);
        
        this.btn = this.add.sprite(width / 2, 425, '13kbc', 'btn.png');
        this.btn.scaleX = 4;
        this.btn.scaleY = 3;
        const btn_quit = this.add.bitmapText(width / 2, 425, 'PublicPixel', 'Quit', 20).setOrigin(0.5, 0.5).setTint(0x15783c);


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
        btn_start.on('pointerover', () =>
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
                        this.scene.start('scn_game');
                    }
                }
            );
        });
        //this.text.setTint(0xffffff);
    }
};

export default MenuScene;