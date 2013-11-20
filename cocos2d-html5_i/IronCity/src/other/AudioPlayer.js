//music
var mp3_sound_dead         = "res/music/sound_dead.mp3";
var mp3_sound_energy_1     = "res/music/sound_energy_1.mp3";
var mp3_sound_energy_2     = "res/music/sound_energy_2.mp3";
var mp3_sound_enydead_1    = "res/music/sound_enydead_1.mp3";
var mp3_sound_enydead_2    = "res/music/sound_enydead_2.mp3";
var mp3_sound_fire_1       = "res/music/sound_fire_1.mp3";
var mp3_sound_hit_1        = "res/music/sound_hit_1.wav";
var mp3_sound_hit_2        = "res/music/sound_hit_2.wav";
var mp3_sound_jump         = "res/music/sound_jump.wav";
var mp3_sound_run          = "res/music/sound_run.wav";
//all effects of audio.
var g_ArrEffects =
{
    Effect_Attack_0:mp3_sound_fire_1,
    Effect_Run:mp3_sound_run,
    Effect_Jump:mp3_sound_jump,
    Effect_Dead_0:mp3_sound_dead,
    Effect_Monster_0:mp3_sound_energy_1,
    Effect_Monster_1:mp3_sound_energy_2,
    Effect_Monster_Dead_0:mp3_sound_enydead_1,
    Effect_Monster_Dead_1:mp3_sound_enydead_2,
    Effect_Hit_0:mp3_sound_hit_1,
    Effect_Hit_1:mp3_sound_hit_2
};
//audio manager.
var AudioPlayer = cc.Class.extend
({
    _bEffectPlay:true,  //mark of effect play.
    _bMusicPlay:true,   //mark of music play.
    _audio:null,        //
    init:function()
    {
        this._audio = cc.AudioEngine.getInstance();
        this._audio.playMusic(mp3_music_background, true);    //play background music.

        this._bEffectPlay = true;
        this._bMusicPlay = true;

        return true;
    },
    pause:function()
    {
        ;
    },
    resume:function()
    {
        ;
    },
    //play effect by index.
    playEffect:function(idx)
    {
        if(this._bEffectPlay)
            this._audio.playEffect(idx);
    },
    //set effect is play.
    setEffectPlay:function(play)
    {
        this._bEffectPlay = play;
    },
    //set music is play.
    setBackgroundMusicPlay:function(play)
    {
        this._bMusicPlay = play;

        if (this._bMusicPlay)
        {
            this._audio.pauseMusic();
        }
        else
        {
            this._audio.resumeMusic();
        }
    },
    //set volume.
    setVolume:function(volume)
    {
        this._audio.setEffectsVolume(volume);
        this._audio.setMusicVolume(volume);
    }
});

AudioPlayer._instance = null;
//instance of AudioPlayer.
AudioPlayer.getInstance = function()
{
    if(this._instance == null){
        this._instance = new AudioPlayer();
        this._instance.init();
    }
    return this._instance;
};
