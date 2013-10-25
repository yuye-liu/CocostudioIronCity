#ifndef __SHAKE_H__  
#define __SHAKE_H__  
  
#include "cocos2d.h"  
USING_NS_CC;  
  
class CCShake : public cocos2d::CCActionInterval  
{  
public:  
    CCShake();  
  
    //下面给出了两个创建该抖动动作实例的类方法：  
      
    //①参数指定动作执行时间和抖动范围（x和y相同）  
    // Create the action with a time and a strength (same in x and y)  
    static CCShake *create(float d, float strength );  
      
    //②参数指定动作执行时间和x，y抖动范围  
    // Create the action with a time and strengths (different in x and y)  
    static CCShake *createWithStrength(float d, float strength_x, float strength_y );  
      
    bool initWithDuration(float d, float strength_x, float strength_y );  
  
protected:  
  
    void startWithTarget(cocos2d::CCNode *pTarget);  
    void update(float time);  
    void stop(void);  
  
    CCPoint m_StartPosition;  
  
    // Strength of the action  
    float m_strength_x, m_strength_y;  
};  
  
#endif //__SHAKE_H__  