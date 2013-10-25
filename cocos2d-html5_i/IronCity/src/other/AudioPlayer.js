/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-24
 * Time: 下午6:08
 * To change this template use File | Settings | File Templates.
 */

var g_ArrEffects = {
    Effect_Attack_0:"sound_fire_1.mp3",
    Effect_Run:"sound_run.wav",
    Effect_Jump:"sound_jump.wav",
    Effect_Dead_0:"sound_dead.mp3",
    Effect_Monster_0:"sound_energy_1.mp3",
    Effect_Monster_1:"sound_energy_2.mp3",
    Effect_Monster_Dead_0:"sound_enydead_1.mp3",
    Effect_Monster_Dead_1:"sound_enydead_2.mp3",
    Effect_Hit_0:"sound_hit_1.wav",
    Effect_Hit_1:"sound_hit_2.wav",
    Effect_Coin:"sound_coin.mp3"
};

var AudioPlayer = cc.Class.extend({
    _bEffectPlay:true,
    _bMusicPlay:true,
    init:function(){
        console.log("AudioPlayer init.");
        console.log("g_ArrEffects: ", g_ArrEffects[0]);
        var audioEngine = cc.AudioEngine.getInstance();
        audioEngine.preloadBackgroundMusic(map3_music_background);
        //SimpleAudioEngine::sharedEngine()->preloadEffect("");
        for(var obj in g_ArrEffects){
            //console.log("idx:", obj, g_ArrEffects[obj]);
            audioEngine.preloadEffect(g_ArrEffects[obj]);
        };

        audioEngine.playBackgroundMusic("music_background.mp3", true);

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
    playEffect:function(){
        ;
    },
    setEffectPlay:function(){
        ;
    },
    setBackgroundMusicPlay:function(){
        ;
    },
    setVolume:function(){
        ;
    }
});

AudioPlayer._instance = null
AudioPlayer.getInstance = function(){
    if(this._instance == null){
        this._instance = new AudioPlayer();
        this._instance.init();
    }
    return this._instance;
}
