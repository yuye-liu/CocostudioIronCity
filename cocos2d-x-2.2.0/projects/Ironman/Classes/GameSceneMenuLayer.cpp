//
//  GameSceneMenuLayer.cpp
//  Ironman
//
//  Created by Ken on 13-10-14.
//
//

#include "GameSceneMenuLayer.h"

bool GameSceneMenuLayer::init(int broodBarPercent,const char *value)
{
    if(UILayer::init()){
        
        parentScene = GameScene::shareGameScene();
        this->addWidget(dynamic_cast<Layout*>(CCUIHELPER->createWidgetFromJsonFile("iphone/IronCityUI_1.json")));
        
        settingBtn    = dynamic_cast<UIButton*>(this->getWidgetByName("Setting"));
        broodBar      = dynamic_cast<UILoadingBar*>(this->getWidgetByName("BroodBar"));
        distanceScore = dynamic_cast<UILabelAtlas*>(this->getWidgetByName("DistanceScore"));
		/*
		settingBtn->setAnchorPoint(ccp(0,1));
		broodBar->setAnchorPoint(ccp(0,1));
		distanceScore->setAnchorPoint(ccp(0,1));

		settingBtn->setPosition(ccp(
		::rightTop().x+settingBtn->getPosition().x,VisibleRect::rightTop().y-settingBtn->getPosition().y-150));
		broodBar->setPosition(ccp(VisibleRect::rightTop().x+broodBar->getPosition().x,VisibleRect::rightTop().y-broodBar->getPosition().y-150));
		distanceScore->setPosition(ccp(VisibleRect::rightTop().x+distanceScore->getPosition().x,VisibleRect::rightTop().y-distanceScore->getPosition().y-150));
		*/
        settingBtn->addTouchEventListener(this, toucheventselector(GameSceneMenuLayer::settingBtnCallback));
        this->setBroodBarPercent(broodBarPercent);
        this->setDistanceScore(value);
		
		musicEffect = 0;
		musicVolume = 50;
        
        return true;
    }
    return false;
}

void GameSceneMenuLayer::settingBtnCallback(CCObject *pSender, TouchEventType type)
{
	if(TOUCH_EVENT_BEGAN == type){
		
		GameSceneSetLayer* gameSetLayer = new GameSceneSetLayer();
		if(gameSetLayer && gameSetLayer->init(musicEffect, musicVolume)){
			
			gameSetLayer->autorelease();
		}else{
			
			CC_SAFE_DELETE(gameSetLayer);
		}
		
		gameSetLayer->setAnchorPoint(ccp(0, 0));
		gameSetLayer->setPosition(ccp(0,0));
		
		parentScene->addChild(gameSetLayer,4);
	}
	
}

void GameSceneMenuLayer::setBroodBarPercent(int percent)
{
    broodBar->setPercent(percent);
}

void GameSceneMenuLayer::setDistanceScore(const char *value)
{
    distanceScore->setStringValue(value);
}

const char* GameSceneMenuLayer::getDistanceScore()
{
    return distanceScore->getStringValue();
}