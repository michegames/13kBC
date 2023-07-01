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

        const title = this.add.bitmapText(width / 2, 50, 'PublicPixel', '13k BC', 40).setOrigin(0.5, 0.5);
        this.tweens.add(
            {
                targets: title,
                angle: { from: -2, to: 2 },
                duration: 500,
                yoyo: true,
                repeat: -1
            }
        )
        const btn_start = this.add.bitmapText(width / 2, 200, 'PublicPixel', 'Start Game', 20).setOrigin(0.5, 0.5);
        this.add.bitmapText(width / 2, 300, 'PublicPixel', 'Best Scores', 20).setOrigin(0.5, 0.5);
        this.add.bitmapText(width / 2, 400, 'PublicPixel', 'Tutorial', 20).setOrigin(0.5, 0.5);
        this.add.bitmapText(width / 2, 500, 'PublicPixel', 'Quit', 20).setOrigin(0.5, 0.5);

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