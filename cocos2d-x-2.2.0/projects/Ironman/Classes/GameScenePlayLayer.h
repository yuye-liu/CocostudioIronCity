//
//  GameScenePlayLayer.h
//  Ironman
//
//  Created by Ken on 13-10-10.
//
//

#ifndef Ironman_GameScenePlayLayer_h
#define Ironman_GameScenePlayLayer_h
#include "cocos2d.h"
#include "cocos-ext.h"

USING_NS_CC;

using namespace extension;

class GameScenePlayLayer : public cocos2d::CCLayer
{
  public:
    
    bool init();
    
	void IMRunning();
    void IMRunJump();
	void IMStandJump();
	void IMRunningStop();
    void IMRunAttack(CCPoint touch);
    void IMStandAttack(CCPoint touch);
	void IMDeath();
    
   
    void setAttackEvent(cocos2d::extension::CCArmature *armature, MovementEventType movementType, const char *movementID);
	void amatureActionCallBack(cocos2d::extension::CCArmature *armature, MovementEventType movementType, const char *movementID);
    void Dead(cocos2d::extension::CCArmature *armature, MovementEventType movementType, const char *movementID);
    
 	void runJumpActionCallBack(CCNode* sender, void* data);
 	void standJumpActionCallBack(CCNode* sender, void* data);
    void menuCloseCallback(CCObject* pSender);
    
    virtual void registerWithTouchDispatcher(void);
    virtual bool ccTouchBegan(cocos2d::CCTouch *pTouch, cocos2d::CCEvent *pEvent);
    virtual void ccTouchMoved(cocos2d::CCTouch *pTouch, cocos2d::CCEvent *pEvent);
    virtual void ccTouchEnded(cocos2d::CCTouch *pTouch, cocos2d::CCEvent *pEvent);
	
	bool checkIfTouchNotInSetBtnArea(CCPoint touchPosition, CCSize setBtnSize, CCPoint setBtnPosition);

	int getMonsterGroundAmount();
	int getMonsterSkyAmount();
    
    float getAngle(CCPoint touch);
    CCPoint getPosHand(float angle);
    void changeSpeed(float t);

    float _attackDir;
    CCPoint _attackPos;
    
	int actionNum;
	bool isAttack;
	int touchTime;
    int monsterGroundAmount;
    int monsterSkyAmount;
	CCArmature *imManArmature;
	int imManArmatureBrood;
	CCPoint amaturePosition;

    CCPoint m_tBeginPos;
	CCPoint s_tCurPos;
	CCRect playerBoundingBox;
	float playerScale;
	float playerX;
	float playerY;
	enum
	{
		ACTION_RUN = 0,
		ACTION_STAND_JUMP,
        ACTION_RUN_JUMP,
		ACTION_RUN_STOP,
        ACTION_RUN_ATTACK,
        ACTION_STAND_ATTACK,
		ACTION_DEATH
	};
 
    CREATE_FUNC(GameScenePlayLayer);
};

#endif
