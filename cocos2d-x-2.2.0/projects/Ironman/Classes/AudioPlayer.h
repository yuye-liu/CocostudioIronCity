//
//  AudioPlay.h
//  MyGame
//
//  Created by cocos2d on 13-10-17.
//
//

#ifndef __MyGame__AudioPlay__
#define __MyGame__AudioPlay__

#include <iostream>
#include "SimpleAudioEngine.h"
#include "cocos2d.h"

USING_NS_CC;
using namespace CocosDenshion;

enum AudioEffect{
    Effect_Attack_0,
    Effect_Run,
    Effect_Jump,
    Effect_Dead_0,
    Effect_Monster_0,
    Effect_Monster_1,
    Effect_Monster_Dead_0,
    Effect_Monster_Dead_1,
    Effect_Hit_0,
    Effect_Hit_1,
    Effect_Coin,
    Effect_End
};

class AudioPlayer : public CCObject{
private:
    bool _bEffectPlay;
    bool _bMusicPlay;
    
    void pause();
    void resume();  //will used?
    CREATE_FUNC(AudioPlayer);
public:
    bool init();
    
    static AudioPlayer* sharedAudio();
    void playEffect(int idx);
    void setEffectPlay(bool play);
    void setBackgroundMusicPlay(bool play);
    void setVolume(float volume);
};

#endif /* defined(__MyGame__AudioPlay__) */
