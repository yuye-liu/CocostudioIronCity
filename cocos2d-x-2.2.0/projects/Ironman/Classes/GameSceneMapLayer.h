//
//  GameSceneMapLayer.h
//  Ironman
//
//  Created by cocos2d on 13-10-16.
//
//

#ifndef __Ironman__GameSceneMapLayer__
#define __Ironman__GameSceneMapLayer__

#include <iostream>
#include "cocos2d.h"

USING_NS_CC;
using namespace std;

class TiledMap : public CCLayer{
private:
    CCArray* _objects;
public:
    CREATE_FUNC(TiledMap);
    bool initMap(int index, int mapIdx);
    CCArray* getObjects();
};

class MapGet : public CCLayer {
private:
    float _length;
    bool _bInMap;
    CCArray* _objects;
    bool bCanAddMap;
    bool hasNextMap;
    int _mapIdx;
public:
    CREATE_FUNC(MapGet);
    //bool init();
    bool initMap(int mapIdx);
    float getW();
    void update();
    CCArray* getObjects();
    bool isInMap();
    void setInMap(bool b);
};

class GameSceneMapLayer : public CCLayer {
private:
    float _curW;
    int _lastIdx;
    MapGet* _maps[2];
    void update(float dt);
    
    bool bMove;
    float _distance;
public:
    CREATE_FUNC(GameSceneMapLayer);
    bool init();
    void getObjects();
    void refreshMap();
    void addNextMap();
    
    void stop();
    void move();
    float getDistance();
    void setMovedSpeed(float speed);
    
    int getRandN(int n);
	static int g_map_move_speed;   //map move speed.
};


#endif /* defined(__Ironman__GameSceneMapLayer__) */
