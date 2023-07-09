function _make_btn (y, text, on_complete)
{
    const { width, height } = this.sys.game.canvas;
    const btn_bg = this.add.sprite(width / 2, y, '13kbc', 'btn.png');
    btn_bg.scaleX = 5;
    btn_bg.scaleY = 3;
    const btn_text = this.add.bitmapText(width / 2, y, 'PublicPixel', text, 20)
        .setOrigin(0.5, 0.5);

    const btn_grp = this.add.group();
    btn_grp.addMultiple([btn_bg, btn_text]);

    btn_bg.setInteractive({useHandCursor: true});
    btn_bg.on('pointerup', () =>
    {
        this.tweens.add(
            {
                targets: btn_grp.getChildren(),
                scale: 0.5,
                duration: 300,
                yoyo: true,
                completeDelay: 300,
                onComplete: () =>
                {
                    const tmp = on_complete.bind(this);
                    tmp();
                }
            }
        );
    });
    return {
        reference: {
            button: btn_bg,
            text: btn_text
        }
    }
}

function _make_title()
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
}

const _is_mobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export {
    _make_btn,
    _make_title,
    _is_mobile
}