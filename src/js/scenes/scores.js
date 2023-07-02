import { Scene } from 'phaser';

class ScoreScene extends Scene
{
    constructor()
    {
        super('scn_scores');
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

        this.add.rectangle(width / 2, 340, width, 420, 0xffffff);

        const scores = localStorage.getItem('scores');
        if(scores !== null)
        {
            const tmp = JSON.parse(scores);
            for(let i=0; i<tmp.length; i++)
            {
                const msg = `${tmp[i].when} => ${tmp[i].val}`;
                this.add.bitmapText(width / 2, 160+(i*40), 'PublicPixel', msg, 15).setOrigin(0.5, 0.5);
            }
        }

        this.btn = this.add.sprite(width / 2, 590, '13kbc', 'btn.png');
        this.btn.scaleX = 5;
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

export default ScoreScene;