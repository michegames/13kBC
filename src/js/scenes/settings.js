import { Scene } from 'phaser';
import { _make_btn, _make_title } from '../lib/helpers';

class SettingsScene extends Scene
{
    constructor()
    {
        super('scn_settings');
        this.make_btn = _make_btn.bind(this);
        this.make_title = _make_title.bind(this);
    }

    create()
    {
        this.make_title();

        const btn_snd_ref = this.make_btn(200,
            (window.STORAGE.get('sound_flag') === '0') ? 'Sound Off' : 'Sound On',
            function()
            {
                try
                {
                    window.STORAGE.set('sound_flag', window.STORAGE.get('sound_flag') === '0' ? '1' : '0');
                    const btn_snd_text = (window.STORAGE.get('sound_flag') === '0') ? 'Sound Off' : 'Sound On';
                    btn_snd_ref.reference.text.text = btn_snd_text;
                }
                catch(err)
                {
                    console.log(err);
                }
            }
        );

        const btn_music = this.make_btn(275,
            (window.STORAGE.get('music_flag') === '0') ? 'Music Off' : 'Music On',
            function()
            {
                try
                {
                    window.STORAGE.set('music_flag', window.STORAGE.get('music_flag') === '0' ? '1' : '0');
                    const btn_music_text = (window.STORAGE.get('music_flag') === '0') ? 'Music Off' : 'Music On';
                    btn_music.reference.text.text = btn_music_text;
                }
                catch(err)
                {
                    console.log(err);
                }
            }
        );

        const btn_tutorial = this.make_btn(350,
            (window.STORAGE.get('tutorial_done') === '0') ? 'Tutorial On' : 'Tutorial Off',
            function()
            {
                try
                {
                    window.STORAGE.set('tutorial_done', (window.STORAGE.get('tutorial_done') === '0') ? '1' : '0');
                    const btn_tutorial_text = (window.STORAGE.get('tutorial_done') === '0') ? 'Tutorial On' : 'Tutorial Off';
                    btn_tutorial.reference.text.text = btn_tutorial_text;
                }
                catch(err)
                {
                    console.log(err);
                }
            }
        );

        this.make_btn(590, 'Back!', function()
        {
            this.scene.start('scn_menu');
        });

    }
};

export default SettingsScene;