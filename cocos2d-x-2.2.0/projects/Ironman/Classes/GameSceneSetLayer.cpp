//
//  GameSceneSetLayer.cpp
//  Ironman
//
//  Created by Ken on 13-10-17.
//
//

#include "GameSceneSetLayer.h"
#include "AudioPlayer.h"

bool GameSceneSetLayer::init(int effectStatus, int volumn)
{
	if(UILayer::init()){
		
		GameScene* parentScene = GameScene::shareGameScene();
		parentScene->gameSceneMapLayer->stop();
		parentScene->stopAllActions();
		parentScene->playLayer->stopAllActions();
		parentScene->playLayer->setTouchEnabled(false);
		parentScene->gameSceneMonster->MonsterAmature->pauseSchedulerAndActions();
		parentScene->playLayer->imManArmature->pauseSchedulerAndActions();
		parentScene->menuLayer->settingBtn->setTouchEnable(false);
		
		this->addWidget(dynamic_cast<Layout*>(CCUIHELPER->createWidgetFromJsonFile("GameSceneSetMenu_1.json")));
		
		musicEffectSlider = dynamic_cast<UISlider*>(this->getWidgetByName("musicEffect"));
		musicVolumeSlider = dynamic_cast<UISlider*>(this->getWidgetByName("musicVolume"));
		UIButton* backGameBtn = dynamic_cast<UIButton*>(this->getWidgetByName("backGame"));
		UIButton* returnMainMenuBtn = dynamic_cast<UIButton*>(this->getWidgetByName("returnMainMenu"));
		
		musicEffectStatus = effectStatus;
		
		if(musicEffectStatus == 0){
			
			musicEffectSlider->setPercent(15);
		}else if(musicEffectStatus == 1){
			
			musicEffectSlider->setPercent(95);
		}
		musicVolumeSlider->setPercent(volumn);
		
		backGameBtn->addTouchEventListener(this, toucheventselector(GameSceneSetLayer::backGameBtn));
		returnMainMenuBtn->addTouchEventListener(this, toucheventselector(GameSceneSetLayer::returnMainMenuBtnFunc));
		musicEffectSlider->addEventListener(this, sliderpercentchangedselector(GameSceneSetLayer::musicEffectSliderCallFunc));
		musicVolumeSlider->addEventListener(this, sliderpercentchangedselector(GameSceneSetLayer::musicVolumeSliderCallFunc));
		
		return true;
	}
	
	return false;
}

void GameSceneSetLayer::musicEffectSliderCallFunc(cocos2d::CCObject *pSender, SliderEventType type)
{
	if(type == SLIDER_PERCENTCHANGED){
		
		if(musicEffectStatus == 0){
			
			musicEffectSlider->setPercent(95);
			musicEffectStatus=1;
		}else if(musicEffectStatus == 1){
			
			musicEffectSlider->setPercent(15);
			musicEffectStatus=0;
		}
	}
	
	GameScene::shareGameScene()->menuLayer->musicEffect = musicEffectStatus;
    //set effect state.
    CCLog("musicEffectStatus:%d.", musicEffectStatus);
    if (musicEffectStatus == 1) {
        AudioPlayer::sharedAudio()->setEffectPlay(false);
    }
    else{
        AudioPlayer::sharedAudio()->setEffectPlay(true);
    }
}

void GameSceneSetLayer::musicVolumeSliderCallFunc(cocos2d::CCObject *pSender, SliderEventType type)
{
    float voice = 0.0f;
	if(type == SLIDER_PERCENTCHANGED){
		voice = musicVolumeSlider->getPercent();
		if(musicVolumeSlider->getPercent()<8){
			musicVolumeSlider->setPercent(8);
            voice=0.0f;
		}else if(musicVolumeSlider->getPercent()>95){
			musicVolumeSlider->setPercent(95);
            voice=100.0f;
		}
	}
	
	GameScene::shareGameScene()->menuLayer->musicVolume = musicVolumeSlider->getPercent();
    //set audio voice.
    AudioPlayer::sharedAudio()->setVolume(voice/100);
}

void GameSceneSetLayer::backGameBtn(cocos2d::CCObject *pSender, TouchEventType type)
{
	if(TOUCH_EVENT_ENDED == type){
		
		GameScene* parentScene = GameScene::shareGameScene();
		parentScene->resumeSchedulerAndActions();
	    parentScene->playLayer->imManArmature->resumeSchedulerAndActions();
		parentScene->playLayer->setTouchEnabled(true);
		
		std::string currentMovementId = parentScene->playLayer->imManArmature->getAnimation()->getCurrentMovementID();
		CCLog("currentMovementId is %s", currentMovementId.c_str());
		if(currentMovementId.compare("") !=0 && (currentMovementId.compare("Running")==0 || currentMovementId.compare("RuningJump")==0))
			parentScene->gameSceneMapLayer->move();
		
		
		parentScene->gameSceneMonster->MonsterAmature->resumeSchedulerAndActions();
		parentScene->menuLayer->settingBtn->setTouchEnable(true);
		
	    this->removeAllChildren();
	    this->removeFromParentAndCleanup(true);
	}
}

void GameSceneSetLayer::returnMainMenuBtnFunc(cocos2d::CCObject *pSender, TouchEventType type)
{
	MainMenuScene* mainMenuScene =  new MainMenuScene();
	mainMenuScene->init();
	
	CCTransitionFade* mainMenuSceneTransition =  CCTransitionFade::create(0.5, mainMenuScene, ccWHITE);
	CCDirector::sharedDirector()->replaceScene(mainMenuSceneTransition);
}