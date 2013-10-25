//
//  Laser.cpp
//  Ironman
//
//  Created by Ken on 13-10-18.
//
//

#include "Laser.h"
#include "AudioPlayer.h"

bool Laser::init(int idx, CCPoint position, float direction)
{
    this->initWithFile("laser.png");
	this->setPosition(position);
	this->setAnchorPoint(ccp(0, 0));
	this->setRotation(direction*180/3.14159);
    
    laserAmatureBoundingBox = CCRectMake(-5, -5, 90, 10);
    
    _idx = idx;
    speed = 12;
    dir_x = cos(direction);
	dir_y = -sin(direction);
	return true;
}

void Laser::releaseLaser()
{
	//this->removeFromParentAndCleanup(true);
    ((LaserManager*) (this->getParent()))->removeLaser(_idx);
}

bool Laser::ifOutSideWall()
{
	CCSize winSize = CCDirector::sharedDirector()->getWinSize();
	float laserX = this->getPosition().x;
	float laserY = this->getPosition().y;
	
	if(laserX < 0.0f || laserX > winSize.width || laserY < 0.0f || laserY > winSize.height){
		return true;
	}
	
	return false;
}

bool Laser::intersectsRect(CCRect rect)
{
    //CCRect r1 = CCRectMake(this->getPositionX(), this->getPositionY(), laserAmatureBoundingBox.size.width, laserAmatureBoundingBox.size.height);
    CCPoint _org = this->getPosition();
    for (int i=0; i<100; i++) {
        CCPoint _p = ccpAdd(_org, ccp(dir_x*i, dir_y*i));
        if (rect.containsPoint(_p)) {
            return true;
        }
    }
    
    return false;
}

void Laser::update()
{
    if (ifOutSideWall()) {
        releaseLaser();
        return;
    }
  
    if (intersectsRect(GameScene::shareGameScene()->gameSceneMonster->MonsterAmatureBoundingBox))
	{
		 
        //add score.
        int type = GameScene::shareGameScene()->gameSceneMonster->MonsterIndex;
        if (type == MonsterSky_enum) {
            GameScene::shareGameScene()->playLayer->monsterSkyAmount ++;
            AudioPlayer::sharedAudio()->playEffect(Effect_Monster_Dead_0);
        }
        else if (type == MonsterGround_enum){
            GameScene::shareGameScene()->playLayer->monsterGroundAmount ++;
            AudioPlayer::sharedAudio()->playEffect(Effect_Monster_Dead_1);
        }
		if(!GameScene::shareGameScene()->isRectDetectedLock)
		 {
			 GameScene::shareGameScene()->isRectDetectedLock = true;
			 //delete monster.
			GameScene::shareGameScene()->gameSceneMonster->MonsterDestroyAction();
		}
        //delete self.
		releaseLaser();
        
        return;
		 
	}
    
    CCPoint pos = this->getPosition();
    pos.x += dir_x * speed;
    pos.y += dir_y * speed;
    this->setPosition(pos);
    //laserAmatureBoundingBox = CCRectMake(pos.x-5, pos.y-5, 90, 10);
}

/************************LaserManager************************/
bool LaserManager::init()
{
    topNum = 0;
    attackTime = 0;
    for (int i=0; i<LASER_NUM_MAX; i++)
        if (lasers[i] == NULL)
    //this->scheduleUpdate();
    return true;
}

void LaserManager::addLaser(CCPoint pos, float dir)
{
    if (attackTime > 0) {
        return;
    }
    int idx = getIndex();
    Laser* laser = new Laser();
    laser->init(idx, pos, dir);
    this->addChild(laser);
	
    lasers[idx] = laser;
    if (idx >= topNum) {
        topNum++;
    }
    
    attackTime = 20;
}
void LaserManager::update(float dt)
{
    if (attackTime > 0) {
        attackTime --;
    }
    for (int i=0; i<topNum; i++) {
        if (lasers[i] != NULL) {
            lasers[i]->update();
        }
    }
}
void LaserManager::removeLaser(int idx)
{
    lasers[idx]->removeFromParentAndCleanup(true);
    lasers[idx] = NULL;
}
int LaserManager::getIndex()
{
    for (int i=0; i<topNum; i++) {
        if (lasers[i] == NULL) {
            return i;
        }
    }
    
    return topNum;
}
