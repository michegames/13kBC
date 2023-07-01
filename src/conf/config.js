import { AUTO } from 'phaser';

const view = 'VERTICAL'
let MODE = view === 'HORIZONTAL' ? 'V' : 'H';
const LARGE = 1024;
const SMALL = 576;

let H,V;

// vertical, y is large

if(MODE === 'H')
{
    const ratio = window.innerHeight/window.innerWidth;
    H = SMALL;
    V = SMALL *ratio;
}
else if(MODE === 'V')
{
    const ratio = window.innerWidth/window.innerHeight;
    H = LARGE;
    console.log(ratio);
    V = LARGE / ratio;
}
else
{
    console.log('UNSUPPORTED');
}

console.log("H => " + H);
console.log("V => " + V);

const config =
{
    type: AUTO,
    width: H,
    height: V,
    physics:
    {
        default: 'arcade',
        arcade:
        {
            gravity: { y: 0 },
        }
    },
    scale:
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene:
    []
};

export default config;