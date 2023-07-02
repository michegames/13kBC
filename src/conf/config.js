import 'phaser';

const _width = 640 / (window.innerHeight/window.innerWidth);

const config =
{
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
        orientation: Phaser.Scale.Orientation.PORTRAIT,
    },
    pixelArt: true,
    backgroundColor: '#4488aa',
    scene:
    []
};

export default config;