//
//  GameSceneMenuLayer.h
//  Ironman
//
//  Created by Ken on 13-10-14.
//
//

#ifndef Ironman_GameSceneMenuLayer_h
#define Ironman_GameSceneMenuLayer_h
#include "cocos2d.h"
#include "cocos-ext.h"
#include "GameScene.h"
#include "GameSceneSetLayer.h"
USING_NS_CC;

using namespace extension;
class GameScene;
class GameSceneSetLayer;
class GameSceneMenuLayer : public UILayer
{
public:
    
    bool init(int broodBarPercent, const char *value);
    
    virtual void settingBtnCallback(CCObject *pSender, TouchEventType type);
    virtual void setBroodBarPercent(int percent);
    virtual void setDistanceScore(const char *value);
    const char* getDistanceScore();
	int musicEffect;
	int musicVolume;
    UIButton*     settingBtn;
    
protected:
    
    GameScene*    parentScene;
    UILoadingBar* broodBar;
    UILabelAtlas* distanceScore;
};

#endif
