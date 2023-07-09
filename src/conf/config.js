import 'phaser';

const _width = 640 / (window.innerHeight/window.innerWidth);

const config =
{
    type: Phaser.AUTO,
    width: _width,
    height: 640,
    physics:
    {
        default: 'arcade',
        arcade:
        {
            debug: false,
            gravity: { y: 0 },
        }
    },
    scale:
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        orientation: Phaser.Scale.Orientation.PORTRAIT
    },
    parent: 'game',
    pixelArt: true,
    backgroundColor: '#15783c',
    scene:
    []
};

export default config;