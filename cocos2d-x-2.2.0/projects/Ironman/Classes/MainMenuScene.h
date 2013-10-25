//
//  MainMenuScene.h
//  Ironman
//
//  Created by Ken on 13-10-10.
//
//

#ifndef Ironman_MainMenuScene_h
#define Ironman_MainMenuScene_h

#include "cocos2d.h"
#include "cocos-ext.h"
USING_NS_CC;

using namespace extension;

class MainMenuScene : public cocos2d::CCScene
{
public:
    
    bool init();
    
    void startBtnCallFunc(CCObject* pSender);
private:
	 CCMenu* mainMenu;
	 int loadingCount;
	  void dataLoaded(float percent);
	  enum
	{
		ACTION_RUN = 0,
		ACTION_RUN_JUMP,
		ACTION_STAND_JUMP,
		ACTION_RUN_STOP,
		ACTION_RUN_ATTACK,
		ACTION_STAND_ATTACK,
		ACTION_IM_DEATH,
		ACTION_MONSTER_GROUND,
		ACTION_MONSTER_SKY,
		MONSTER_GROUND_MOVING,
		MONSTER_SKY__MOVING,
	};
};

#endif
