//
//  GameSceneOverLayer.h
//  Ironman
//
//  Created by Ken on 13-10-15.
//
//

#ifndef Ironman_GameSceneOverLayer_h
#define Ironman_GameSceneOverLayer_h
#include "cocos2d.h"
#include "cocos-ext.h"
#include "GameScene.h"
USING_NS_CC;

using namespace extension;

class GameScene;
class GameSceneOverLayer : public UILayer
{
    
public:
    
    bool init();
    
protected:
    
	GameScene* parentScene;
    UILabelAtlas* finalScore;
    void calculateFinalScore(int monsterSkyAmountValue, int monsterGroundAmountValue, const char* distanceScoreValue);
	virtual void playAgainBtnCallback(CCObject *pSender, TouchEventType type);
	
};


#endif
