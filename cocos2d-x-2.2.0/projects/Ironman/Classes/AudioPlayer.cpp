//
//  AudioPlay.cpp
//  MyGame
//
//  Created by cocos2d on 13-10-17.
//
//

#include "AudioPlayer.h"


static AudioPlayer* _instance = NULL;
AudioPlayer* AudioPlayer::sharedAudio()
{
    if(_instance == NULL)
    {
        _instance = AudioPlayer::create();
    }
    return _instance;
}

const static char* g_ArrEffects[Effect_End] = {
    "sound_fire_1.mp3", "sound_run.wav", "sound_jump.wav",
    "sound_dead.mp3", "sound_energy_1.mp3", "sound_energy_2.mp3",
    "sound_enydead_1.mp3", "sound_enydead_2.mp3", "sound_hit_1.wav",
    "sound_hit_2.wav","sound_coin.mp3"
    };

bool AudioPlayer::init()
{
    CCLog("AudioPlayer init.");
    
    SimpleAudioEngine::sharedEngine()->preloadBackgroundMusic("music_background.mp3");
    //SimpleAudioEngine::sharedEngine()->preloadEffect("");
    //log sound num: Effect_End, should be 11
    //CCLog("effect num: %d.", Effect_End);
    for (int i=0; i<Effect_End; i++) {
        //CCLog("effect i: %d, %s.", i, g_ArrEffects[i]);
        SimpleAudioEngine::sharedEngine()->preloadEffect(g_ArrEffects[i]);
    }
    
    SimpleAudioEngine::sharedEngine()->playBackgroundMusic("music_background.mp3", true);
    
    _bEffectPlay = true;
    _bMusicPlay = true;
    
    return true;
}

void AudioPlayer::pause()
{
    
}

void AudioPlayer::resume()
{
    
}

void AudioPlayer::playEffect(int idx)
{
    //CCLog("_bEffectPlay:%d.", _bEffectPlay);
    if(_bEffectPlay)
        SimpleAudioEngine::sharedEngine()->playEffect(g_ArrEffects[idx]);
}

void AudioPlayer::setEffectPlay(bool play)
{
    _bEffectPlay = play;
}

void AudioPlayer::setBackgroundMusicPlay(bool play)
{
    _bMusicPlay = play;
    
    if (_bMusicPlay) {
        SimpleAudioEngine::sharedEngine()->stopBackgroundMusic();
    }
    else{
        SimpleAudioEngine::sharedEngine()->playBackgroundMusic("music_background.mp3", true);
    }
}

void AudioPlayer::setVolume(float volume)
{
    SimpleAudioEngine::sharedEngine()->setBackgroundMusicVolume(volume);
    SimpleAudioEngine::sharedEngine()->setEffectsVolume(volume);
}
