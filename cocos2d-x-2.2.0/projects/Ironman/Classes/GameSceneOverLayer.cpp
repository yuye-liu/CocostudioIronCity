//
//  GameSceneOverLayer.cpp
//  Ironman
//
//  Created by Ken on 13-10-15.
//
//

#include "GameSceneOverLayer.h"
#include "stdlib.h"

bool GameSceneOverLayer::init()
{
    if(UILayer::init()){
        
		parentScene = GameScene::shareGameScene();
        this->addWidget(dynamic_cast<Layout*>(CCUIHELPER->createWidgetFromJsonFile("iphone/GameSceneOverLayer_1.json")));
        
        UIButton*    playAgainBtn        = dynamic_cast<UIButton*>(this->getWidgetByName("playAgain"));
		UILabel* monsterGroundAmount = dynamic_cast<UILabel*>(this->getWidgetByName("monsterGroundLabel"));
        UILabel* monsterSkyAmount    = dynamic_cast<UILabel*>(this->getWidgetByName("monsterSkyLabel"));
        UILabelAtlas* distanceScore      = dynamic_cast<UILabelAtlas*>(this->getWidgetByName("distanceScore"));
        finalScore = dynamic_cast<UILabelAtlas*>(this->getWidgetByName("finalScore"));
        
        playAgainBtn->addTouchEventListener(this, toucheventselector(GameSceneOverLayer::playAgainBtnCallback));

		int monsterGroundCount= parentScene->playLayer->getMonsterGroundAmount();
		ostringstream oss1;
        oss1<<monsterGroundCount;
	    string str1 = oss1.str();
	    const char * charStr1= str1.c_str();
        monsterGroundAmount->setText(charStr1);

		int monsterSkyCount= parentScene->playLayer->getMonsterSkyAmount();
		ostringstream oss2;
        oss2<<monsterSkyCount;
	    string str2= oss2.str();
	    const char * charStr2= str2.c_str();
        monsterSkyAmount->setText(charStr2);

        distanceScore->setStringValue(parentScene->menuLayer->getDistanceScore());
		this->calculateFinalScore(monsterGroundCount*88 , monsterSkyCount*66 , parentScene->menuLayer->getDistanceScore());
	
        return true;
    }
	
    return false;
}

void GameSceneOverLayer::calculateFinalScore(int monsterSkyAmountValue,int monsterGroundAmountValue, const char* distanceScoreValue)
{
	int distanceScore = 0;
	distanceScore = atoi(distanceScoreValue);
	
    int score = monsterSkyAmountValue + monsterGroundAmountValue + distanceScore * 3;
	
	ostringstream oss;
	oss<<score;
	string str= oss.str();
	const char * charStr2= str.c_str();
    
    finalScore->setStringValue(charStr2);
}

void GameSceneOverLayer::playAgainBtnCallback(CCObject *pSender, TouchEventType type)
{
	if(TOUCH_EVENT_BEGAN == type){
		
	    GameScene* againScene = GameScene::newGameScene();
        CCTransitionFade* playAgainTransition =  CCTransitionFade::create(0.5, againScene, ccWHITE);
        CCDirector::sharedDirector()->replaceScene(playAgainTransition);
	}
}
