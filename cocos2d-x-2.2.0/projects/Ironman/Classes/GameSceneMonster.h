//
//  GameSceneMonster.h
//  Ironman
//
//  Created by Ken on 13-10-10.
//
//

#ifndef Ironman_GameSceneMonster_h
#define Ironman_GameSceneMonster_h
#include "cocos2d.h"
#include "cocos-ext.h"

USING_NS_CC;

using namespace extension;
enum
{
	MonsterGround_enum = 0,
	MonsterSky_enum,
};
class GameSceneMonster : public cocos2d::CCLayer
{
public:
    bool init();

	void MonsterGroundMoving(CCPoint position);
	void MonsterSkyMoving(CCPoint position);
	void MonsterGroundDestroyAction(CCPoint position);
	void MonsterSkyDestroyAction(CCPoint position);
	void MonsterDestroyAction();
	int random(int start, int end);
	void JumpActionCallBack(CCNode* sender, void* data);
	//void draw();

	void DestroyActionActionEnded(cocos2d::extension::CCArmature *armature, MovementEventType movementType, const char *movementID);
	void DelayInit(float t);

	CCArmature * MonsterAmature;
	CCRect MonsterAmatureBoundingBox;
	int MonsterIndex;
	bool isDestroied;
	int timeCount;

    CREATE_FUNC(GameSceneMonster);
};

#endif
