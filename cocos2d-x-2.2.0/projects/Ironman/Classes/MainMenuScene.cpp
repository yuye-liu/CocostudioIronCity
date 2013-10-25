//
//  MainMenuScene.cpp
//  Ironman
//
//  Created by Ken on 13-10-10.
//
//

#include "MainMenuScene.h"
#include "GameScene.h"
#include "AudioPlayer.h"
static bool isFirstInGame = true;
bool MainMenuScene::init()
{    
    CCLayer* menuLayer = CCLayer::create();
    CCSize size = CCDirector::sharedDirector()->getWinSize();
    
    // Add backgrounbdPic
    CCSprite* backGroundPic = CCSprite::create("iphone/MainMenuSceneBK.png");
    backGroundPic->setAnchorPoint(ccp(0, 0));
    
    menuLayer->addChild(backGroundPic,0);
    
    //Add StartBtn
    CCSprite* start     = CCSprite::create("iphone/StartBtn.png");
    CCSprite* startPush = CCSprite::create("iphone/StartBtnPush.png");
    
    CCMenuItemSprite * startBtn = CCMenuItemSprite::create(start, startPush, this, menu_selector(MainMenuScene::startBtnCallFunc));
    
    //Add Menu
    mainMenu = CCMenu::create(startBtn, NULL);
    mainMenu->setAnchorPoint(ccp(0, 0));
    mainMenu->setPosition(ccp(size.width/2, size.height/5));

    menuLayer->addChild(mainMenu,1);
    this->addChild(menuLayer);

    AudioPlayer::sharedAudio();

    return true;
}

void MainMenuScene::startBtnCallFunc(CCObject* pSender)
{
	CCMenuItemSprite *  startBtn = (CCMenuItemSprite *  )pSender;
	startBtn->setOpacity(0);
	mainMenu->setEnabled(false);

	CCParticleSystem *meteor=CCParticleSystemQuad::create("qwe.plist");
	meteor->setScale(0.5);
	meteor->setPosition(ccp(240,65)); 
	this->addChild(meteor); 

	CCSprite * activity = CCSprite::create("loading.png");
	activity->setPosition(ccp(240,65));
	addChild(activity);
	
	CCRotateBy * rotateAction = CCRotateBy::create(0.5f,180.0f);
	activity->runAction(CCRepeatForever::create(rotateAction));
	
	loadingCount = 0;
	dataLoaded(loadingCount);

   
}
void MainMenuScene::dataLoaded(float percent)
{
	if(!isFirstInGame)
	{
		GameScene* gameScene =  GameScene::newGameScene();
		CCTransitionFade* gameSceneTransition =  CCTransitionFade::create(0.5, gameScene, ccWHITE);
		CCDirector::sharedDirector()->replaceScene(gameSceneTransition);
		return;
	}

	switch (loadingCount)
	{
		case ACTION_RUN:
		{
			CCArmatureDataManager::sharedArmatureDataManager()->addArmatureFileInfoAsync("iphone/IMRun.ExportJson",this, schedule_selector(MainMenuScene::dataLoaded));
		}
		break;
		case ACTION_RUN_JUMP:
		{
			CCArmatureDataManager::sharedArmatureDataManager()->addArmatureFileInfoAsync("iphone/IMRunJump.ExportJson",this, schedule_selector(MainMenuScene::dataLoaded));
		}
		break;
		case ACTION_STAND_JUMP:
		{
			CCArmatureDataManager::sharedArmatureDataManager()->addArmatureFileInfoAsync("iphone/IMStandJump.ExportJson",this, schedule_selector(MainMenuScene::dataLoaded));
		}
		break;
		case ACTION_RUN_STOP:
		{
			CCArmatureDataManager::sharedArmatureDataManager()->addArmatureFileInfoAsync("iphone/IMRunStop.ExportJson",this, schedule_selector(MainMenuScene::dataLoaded));
		}
		break;
		case ACTION_RUN_ATTACK:
		{
			CCArmatureDataManager::sharedArmatureDataManager()->addArmatureFileInfoAsync("iphone/LaserRunAttack.ExportJson",this, schedule_selector(MainMenuScene::dataLoaded));
		}
		break;
		case ACTION_STAND_ATTACK:
		{
			CCArmatureDataManager::sharedArmatureDataManager()->addArmatureFileInfoAsync("iphone/LaserStandAttack.ExportJson",this, schedule_selector(MainMenuScene::dataLoaded));
		}
		break;
		case ACTION_IM_DEATH:
		{
			CCArmatureDataManager::sharedArmatureDataManager()->addArmatureFileInfoAsync("iphone/IMDead.ExportJson",this, schedule_selector(MainMenuScene::dataLoaded));
		}
		break;
		case ACTION_MONSTER_GROUND:
		{
			CCArmatureDataManager::sharedArmatureDataManager()->addArmatureFileInfoAsync("iphone/MonsterGroundAnimation.ExportJson",this, schedule_selector(MainMenuScene::dataLoaded));
		}
		break;
		case ACTION_MONSTER_SKY:
		{
			CCArmatureDataManager::sharedArmatureDataManager()->addArmatureFileInfoAsync("iphone/MonsterSkyAnimation.ExportJson",this, schedule_selector(MainMenuScene::dataLoaded));
		}
		break;
			case MONSTER_GROUND_MOVING:
		{
			CCArmatureDataManager::sharedArmatureDataManager()->addArmatureFileInfoAsync("iphone/MonsterGroundMoving.ExportJson",this, schedule_selector(MainMenuScene::dataLoaded));
		}
		break;
			case MONSTER_SKY__MOVING:
		{
			CCArmatureDataManager::sharedArmatureDataManager()->addArmatureFileInfoAsync("iphone/MonsterSkyMoving.ExportJson",this, schedule_selector(MainMenuScene::dataLoaded));
		}
		break;
	
	default:
		{
			isFirstInGame = false;

			CCScene * newscene  = CCScene::create();
			GameScene* gameScene =  GameScene::newGameScene();
			CCTransitionFade* gameSceneTransition =  CCTransitionFade::create(0.5, gameScene, ccWHITE);
			CCDirector::sharedDirector()->replaceScene(gameSceneTransition);
		}
		break;
	}	
	loadingCount++;
	
}