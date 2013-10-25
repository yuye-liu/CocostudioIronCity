/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-24
 * Time: 下午6:08
 * To change this template use File | Settings | File Templates.
 */

var g_ArrEffects = {
    Effect_Attack_0:mp3_sound_fire_1,
    Effect_Run:mp3_sound_run,
    Effect_Jump:mp3_sound_jump,
    Effect_Dead_0:mp3_sound_dead,
    Effect_Monster_0:mp3_sound_energy_1,
    Effect_Monster_1:mp3_sound_energy_2,
    Effect_Monster_Dead_0:mp3_sound_enydead_1,
    Effect_Monster_Dead_1:mp3_sound_enydead_2,
    Effect_Hit_0:mp3_sound_hit_1,
    Effect_Hit_1:mp3_sound_hit_2,
    Effect_Coin:mp3_sound_coin
};

var AudioPlayer = cc.Class.extend({
    _bEffectPlay:true,
    _bMusicPlay:true,
    _audio:null,
    init:function(){
        console.log("AudioPlayer init.");
        console.log("g_ArrEffects: ", g_ArrEffects);
        this._audio = cc.AudioEngine.getInstance();
        console.log("audioEngine: ", this._audio, "map3_music_background: ", mp3_music_background);
        this._audio.preloadMusic(mp3_music_background);
        //SimpleAudioEngine::sharedEngine()->preloadEffect("");
        for(var obj in g_ArrEffects){
            //console.log("idx:", obj, g_ArrEffects[obj]);
            this._audio.preloadEffect(g_ArrEffects[obj]);
        };

        this._audio.playMusic(mp3_music_background, true);

        this._bEffectPlay = true;
        this._bMusicPlay = true;

        return true;
    },
    pause:function(){
        ;
    },
    resume:function(){
        ;
    },
    playEffect:function(idx){
        if(this._bEffectPlay)
            this._audio.playEffect(idx);
    },
    setEffectPlay:function(play){
        this._bEffectPlay = play;
    },
    setBackgroundMusicPlay:function(play){
        this._bMusicPlay = play;

        if (this._bMusicPlay) {
            this._audio.stopBackgroundMusic();
        }
        else{
            this._audio.playBackgroundMusic(mp3_music_background, true);
        }
    },
    setVolume:function(volume){
        this._audio.setBackgroundMusicVolume(volume);
        this._audio.setEffectsVolume(volume);
    }
});

AudioPlayer._instance = null;
AudioPlayer.getInstance = function(){
    if(this._instance == null){
        this._instance = new AudioPlayer();
        this._instance.init();
    }
    return this._instance;
};
