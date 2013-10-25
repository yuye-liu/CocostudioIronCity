//
//  Laser.h
//  Ironman
//
//  Created by Ken on 13-10-18.
//
//

#ifndef Ironman_Laser_h
#define Ironman_Laser_h
#include "cocos2d.h"
#include "cocos-ext.h"
#include "GameScene.h"
USING_NS_CC;

class Laser : public CCSprite
{
private:
    int _idx;
    float dir_x;
    float dir_y;
    float speed;
public:
	
    CCRect laserAmatureBoundingBox;
	bool init(int idx, CCPoint position, float direction);
    void releaseLaser();
	bool ifOutSideWall();
    bool intersectsRect(CCRect rect);
    
    void update();
    //void draw();
};

#define LASER_NUM_MAX 100
class LaserManager : public CCLayer {
private:
    Laser* lasers[LASER_NUM_MAX];
    int topNum;
    int attackTime;
    
    int getIndex();
public:
    CREATE_FUNC(LaserManager);
    bool init();
    void update(float dt);
    
    void addLaser(CCPoint pos, float dir);
    void removeLaser(int idx);
};

#endif
