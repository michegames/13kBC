import { Scene } from 'phaser';

class GameScene extends Scene
{

    constructor()
    {
        super('game-scene');
    }

    create()
    {
        let { width, height } = this.sys.game.canvas;
        console.log(width);
        this.textbox = this.add.text
        (
            width / 2,
            height / 2,
            'Welcome to Phaser 3.6!',
            {
                color: '#FFF',
                fontFamily: 'monospace',
                fontSize: '26px'
            }
        );

        this.textbox.setOrigin(0.5, 0.5);
    }

    update(time, delta)
    {
        if (!this.textbox)
        {
            return;
        }

        this.textbox.rotation += 0.0005 * delta;
    }
};

export default GameScene;
