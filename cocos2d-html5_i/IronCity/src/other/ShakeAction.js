/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-29
 * Time: 下午1:38
 * To change this template use File | Settings | File Templates.
 */

var CCShake = cc.ActionInterval.extend({
    m_strength_x:0,
    m_strength_y:0,
    m_initial_x:0,
    m_initial_y:0,
    m_pTarget:null,
    initWithDur:function(duration, strength_x, strength_y){
        this.m_strength_x = 0;
        this.m_strength_y = 0;
        this.m_initial_x = 0;
        this.m_initial_y = 0;

        if (this.initWithDuration(duration))
        {
            this.m_strength_x = strength_x;
            this.m_strength_y = strength_y;
            return true;
        }

        return false;
    },
    startWithTarget:function(pTarget){
        //this.startWithTarget( pTarget );
        this.m_pTarget = pTarget;

        // save the initial position
        this.m_initial_x = pTarget.getPositionX();
        this.m_initial_y = pTarget.getPositionY();
    },
    stop:function(){
        if(this.m_pTarget)
        {
            this.m_pTarget.stopAllActions();
            this.m_pTarget.setPosition( cc.p( this.m_initial_x, this.m_initial_y ) );
        }
    },
    update:function(dt){
        var randx = fgRangeRand( -this.m_strength_x, this.m_strength_x )*dt;
        var randy = fgRangeRand( -this.m_strength_y, this.m_strength_y )*dt;

        // move the target to a shaked position
        this.m_pTarget.setPosition( cc.pAdd(cc.p(this.m_initial_x, this.m_initial_y), cc.p( randx, randy)));
    }
});

var fgRangeRand  = function(min, max){
    var rnd = cc.RANDOM_0_1();
    return rnd*(max-min)+min;
};

CCShake.create = function(d, strength){
    return CCShake.createWithStrength( d, strength, strength );
};

CCShake.createWithStrength = function(duration, strength_x, strength_y){
    var pRet = new CCShake();
    if (pRet)
    {
        pRet.initWithDur(duration, strength_x, strength_y);
    }
    return pRet;
};