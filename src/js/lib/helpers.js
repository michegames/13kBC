function _make_btn_menu(y, text, on_complete)
{
    const { width, height } = this.sys.game.canvas;
    const make_btn_raw = _make_btn_raw.bind(this);
    const _on_complete = on_complete.bind(this);
    const new_complete = () =>
    {
        this.cameras.main.fadeOut(800, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () =>
        {
            _on_complete();
        });
    }
    return make_btn_raw(
    {
        x: width / 2,
        y: y,
        text: text,
        on_complete: new_complete,
        scale_x: 5,
        scale_y: 3,
        text_size: 20,
        yoyo: true,
        duration: 300,
        delay: 300
    });
}

function _make_btn(y, text, on_complete)
{
    const { width, height } = this.sys.game.canvas;
    const make_btn_raw = _make_btn_raw.bind(this);
    return make_btn_raw(
    {
        x: width / 2,
        y: y,
        text: text,
        on_complete: on_complete,
        scale_x: 5,
        scale_y: 3,
        text_size: 20,
        yoyo: true,
        duration: 300,
        delay: 300
    });
}

function _make_btn_raw(obj)
{
    const x = obj.x;
    const y = obj.y;
    const text = obj.text;
    const on_complete = obj.on_complete;
    const scale_x = obj.scale_x;
    const scale_y = obj.scale_y;
    const text_size = obj.text_size;
    const yoyo = obj.yoyo || false;
    const duration = obj.duration || 300;
    const delay = obj.delay || 0;

    const btn_bg = this.add.sprite(x, y, '13kbc', 'btn.png');
    btn_bg.scaleX = scale_x;
    btn_bg.scaleY = scale_y;
    const btn_text = this.add.bitmapText(x, y, 'PublicPixel', text, text_size, 1)
        .setOrigin(0.5, 0.5);

    const btn_grp = this.add.group();
    btn_grp.addMultiple([btn_bg, btn_text]);

    btn_bg.setInteractive({ useHandCursor: true });
    btn_bg.on('pointerup', () =>
    {
        this.tweens.add(
            {
                targets: btn_grp.getChildren(),
                scale: 0.5,
                duration: duration,
                yoyo: yoyo,
                completeDelay: delay,
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
            text: btn_text,
            group: btn_grp
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

export
{
    _make_btn_menu,
    _make_btn,
    _make_title,
    _is_mobile,
    _make_btn_raw
}