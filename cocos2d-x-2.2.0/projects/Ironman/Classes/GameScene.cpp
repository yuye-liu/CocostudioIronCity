//
//  GameScene.cpp
//  Ironman
//
//  Created by Ken on 13-10-10.
//
//

#include "GameScene.h"
bool GameScene::init()
{
	gameSceneMapLayer = new GameSceneMapLayer();
	
	if(gameSceneMapLayer && gameSceneMapLayer->init())
	{
		gameSceneMapLayer->autorelease();
	}else{
		
		CC_SAFE_DELETE(gameSceneMapLayer);
	}

	gameSceneMapLayer->setMovedSpeed(3);
    gameSceneMapLayer->setPosition(ccp(0,0));
    this->addChild(gameSceneMapLayer, 0);

	menuLayer = new GameSceneMenuLayer();
	
	if(menuLayer && menuLayer->init(100, "0")){
		
		menuLayer->autorelease();
	}else{
		
		CC_SAFE_DELETE(menuLayer);
	}
    menuLayer->setAnchorPoint(ccp(0,1));
	menuLayer->ignoreAnchorPointForPosition(false);
	menuLayer->setPosition(ccp(VisibleRect::leftTop().x,VisibleRect::leftTop().y));
    this->addChild(menuLayer, 0);
    
    playLayer = new GameScenePlayLayer();
	
	if(playLayer && playLayer->init()){
		
		playLayer->autorelease();
	}else{
		
		CC_SAFE_DELETE(playLayer);
	}
	
    this->addChild(playLayer, 0);
    
	gameSceneMonster = new GameSceneMonster();
    gameSceneMonster->init();
    this->addChild(gameSceneMonster, 0);
    
    laser = LaserManager::create();
    laser->scheduleUpdate();
    this->addChild(laser);
	this->scheduleUpdate();
	isRectDetectedLock = false;
    return true;
}

static GameScene *_sharedGameScene = NULL;

GameScene* GameScene::shareGameScene()
{
    if (!_sharedGameScene) {
        _sharedGameScene = new GameScene();
        if (!_sharedGameScene->init())
        {
            CC_SAFE_DELETE(_sharedGameScene);
        }
    }
    return _sharedGameScene;
}
GameScene* GameScene::newGameScene()
{
     _sharedGameScene = new GameScene();
    if (!_sharedGameScene->init())
    {
		CC_SAFE_DELETE(_sharedGameScene);
    }
    
    return _sharedGameScene;
}
void GameScene::gameOver()
{
	GameSceneOverLayer* overLayer = new GameSceneOverLayer();
	
    if (!overLayer->init())
    {
		CC_SAFE_DELETE(overLayer);
    }
	
	playLayer->stopAllActions();
	playLayer->unscheduleUpdate();
	GameScene::gameSceneMapLayer->stop();
	gameSceneMonster->stopAllActions();
	gameSceneMonster->unscheduleUpdate();

	menuLayer->unscheduleUpdate();

	this->addChild(overLayer, 0);
}

void GameScene::update(float dt)
{
	CCArmature * imManArmature = playLayer->imManArmature;
	int actionNum = playLayer->actionNum;
	if(actionNum ==playLayer->ACTION_RUN)
	{
		playLayer->playerBoundingBox = CCRectMake(imManArmature->getPosition().x-imManArmature->getContentSize().width/2+46,imManArmature->getPosition().y,imManArmature->getContentSize().width-90,imManArmature->getContentSize().height-50);
	}
	else if(actionNum == playLayer->ACTION_STAND_JUMP)
	{
		playLayer->playerBoundingBox = CCRectMake(imManArmature->getPosition().x-imManArmature->getContentSize().width/2+30,imManArmature->getPosition().y,imManArmature->getContentSize().width-50,imManArmature->getContentSize().height-50);
	}
	else if(actionNum == playLayer->ACTION_RUN_JUMP)
	{
		playLayer->playerBoundingBox = CCRectMake(imManArmature->getPosition().x-imManArmature->getContentSize().width/2+33,imManArmature->getPosition().y,imManArmature->getContentSize().width-70,imManArmature->getContentSize().height-50);
	}
	else if(actionNum == playLayer->ACTION_RUN_STOP)
	{
		playLayer->playerBoundingBox = CCRectMake(imManArmature->getPosition().x-imManArmature->getContentSize().width/2+40,imManArmature->getPosition().y,imManArmature->getContentSize().width-110,imManArmature->getContentSize().height-45);
	}
	else if(actionNum == playLayer->ACTION_RUN_ATTACK)
	{
		playLayer->playerBoundingBox = CCRectMake(imManArmature->getPosition().x-imManArmature->getContentSize().width/2,imManArmature->getPosition().y,imManArmature->getContentSize().width,imManArmature->getContentSize().height);

	}
	else if(actionNum == playLayer->ACTION_STAND_ATTACK)
	{
		playLayer->playerBoundingBox = CCRectMake(imManArmature->getPosition().x-imManArmature->getContentSize().width/2,imManArmature->getPosition().y,imManArmature->getContentSize().width,imManArmature->getContentSize().height);

	}
	else if(actionNum == playLayer->ACTION_DEATH)
	{
		playLayer->playerBoundingBox = CCRectMake(imManArmature->getPosition().x-imManArmature->getContentSize().width/2,imManArmature->getPosition().y,imManArmature->getContentSize().width,imManArmature->getContentSize().height);
	}

	if(gameSceneMonster->MonsterIndex == MonsterGround_enum)
	{
		gameSceneMonster->MonsterAmatureBoundingBox = CCRectMake(gameSceneMonster->MonsterAmature->getPosition().x-gameSceneMonster->MonsterAmature->getContentSize().width/2+45,gameSceneMonster->MonsterAmature->getPosition().y+21,gameSceneMonster->MonsterAmature->getContentSize().width-90,gameSceneMonster->MonsterAmature->getContentSize().height-90);
	}
	else if(gameSceneMonster->MonsterIndex == MonsterSky_enum)
	{
		gameSceneMonster->MonsterAmatureBoundingBox = CCRectMake(gameSceneMonster->MonsterAmature->getPosition().x-gameSceneMonster->MonsterAmature->getContentSize().width/2+45,gameSceneMonster->MonsterAmature->getPosition().y+21,gameSceneMonster->MonsterAmature->getContentSize().width-90,gameSceneMonster->MonsterAmature->getContentSize().height-90);
	}

	if (playLayer->playerBoundingBox.intersectsRect(gameSceneMonster->MonsterAmatureBoundingBox))
	{
		//this->unscheduleUpdate();
		//gameSceneMonster->MonsterDestroyAction();
		playLayer->imManArmatureBrood-=1;
		if(playLayer->imManArmatureBrood<1)
		{
			GameScene::shareGameScene()->menuLayer->setBroodBarPercent(0);
			this->unscheduleUpdate();
			playLayer->IMDeath();
			return;
		}

		GameScene::shareGameScene()->menuLayer->setBroodBarPercent(playLayer->imManArmatureBrood);
	}
}
