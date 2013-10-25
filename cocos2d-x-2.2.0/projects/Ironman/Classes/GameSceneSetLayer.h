//
//  GameSceneSetLayer.h
//  Ironman
//
//  Created by Ken on 13-10-17.
//
//

#ifndef Ironman_GameSceneSetLayer_h
#define Ironman_GameSceneSetLayer_h
#include "cocos2d.h"
#include "cocos-ext.h"
#include "GameScene.h"
#include "MainMenuScene.h"
USING_NS_CC;

using namespace extension;

class GameScene;
class MainMenuScene;
class GameSceneSetLayer : public UILayer
{
public:
	bool init(int effectStatus, int volumn);
	
protected:
	
	int musicEffectStatus;
    UISlider* musicEffectSlider;
    UISlider* musicVolumeSlider;
	
	void musicEffectSliderCallFunc(CCObject *pSender, SliderEventType type);
	void musicVolumeSliderCallFunc(CCObject *pSender, SliderEventType type);
	void backGameBtn(CCObject *pSender, TouchEventType type);
	void returnMainMenuBtnFunc(CCObject *pSender, TouchEventType type);
};

#endif
