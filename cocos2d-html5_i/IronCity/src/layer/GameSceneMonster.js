/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-23
 * Time: 下午3:46
 * To change this template use File | Settings | File Templates.
 */
MonsterType = {
    MonsterGround_enum: 0,
    MonsterSky_enum: 1
};  //monster type.

//layer: monster scene.
var GameSceneMonster = cc.Layer.extend({
    MonsterAmature:null,
    MonsterAmatureBoundingBox:null,
    MonsterIndex:null,
    VisibleSize:null,
    VisiblePosition:null,
    lastAction:null,
    init:function(){
        //add cocostudio json file to widget.
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_MonsterGroundMoving);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_MonsterSkyMoving);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_MonsterGroundAnimation);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_MonsterSkyAnimation);
        var r = this.random(0, 1);
        switch (r)
        {
            case 0:
            {
                var pos = cc.p(VisibleRect.leftBottom().x+VisibleRect.getVisibleRect().size.width,
                    VisibleRect.rightBottom().y+50)
                this.MonsterGroundMoving(pos);
            }
                break;
            case 1:
            {
                var height = (this.random(VisibleRect.leftBottom().y, VisibleRect.rightBottom().y+100));
                var aPosition = cc.p(VisibleRect.getVisibleRect().size.width-200,height);
                this.MonsterSkyMoving(aPosition);
            }
                break;
            default:
                break;
        }

        this.lastAction = null;

        return true;
    },
    //moving of monster on ground.
    MonsterGroundMoving:function(position){
        var pGameScene = GameScene.getScene();
        var armature = null;
        armature = cc.Armature.create("MonsterGroundMoving");
        armature.getAnimation().playByIndex(0);
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(0.6);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(position);
        this.addChild(armature);
        this.MonsterAmature = armature;
        this.MonsterIndex = MonsterType.MonsterGround_enum;
        var movePoint = cc.p(pGameScene.playLayer.imManArmature.getPosition().x-90,
            pGameScene.playLayer.imManArmature.getPosition().y);
        var jumpAction = cc.JumpTo.create(3.0, movePoint, 50, 3);
        var m_grossini = cc.EaseIn.create(jumpAction, 3.0);
        var callBack = cc.CallFunc.create(this.JumpActionCallBack, this);
        var  action = cc.Sequence.create(m_grossini, callBack);
        this.MonsterAmature.runAction(action);
        this.lastAction = action;
    },
    //moving of monster in sky.
    MonsterSkyMoving:function(position){
        var pGameScene = GameScene.getScene();
        var armature = null;
        armature = cc.Armature.create("MonsterSkyMoving");
        armature.getAnimation().playByIndex(0);
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(0.6);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(position);
        this.addChild(armature);
        this.MonsterAmature = armature;
        this.MonsterIndex = MonsterType.MonsterSky_enum;
        var movePoint = cc.p(GameScene.getScene().playLayer.imManArmature.getPositionX()-this.MonsterAmature.getPositionX(),
            GameScene.getScene().playLayer.imManArmature.getPositionY()-this.MonsterAmature.getPositionY());

        var sx = this.MonsterAmature.getPosition().x;
        var sy = this.MonsterAmature.getPosition().y;
        var ex =movePoint.x+50;
        var ey =movePoint.y+150;
        var bezier = [];
        bezier[0] = this.MonsterAmature.getPosition();
        bezier[1] = cc.p(sx+(ex-sx)*0.3-100, sy+(ey-sy)*0.5+150);
        bezier[2] = movePoint;
        var bezierAction = cc.BezierBy.create(3.0,bezier);
        var m_grossini = cc.EaseIn.create(bezierAction, 1.5);
        var callBack = cc.CallFunc.create(this.JumpActionCallBack, this, 0xbebabeba);
        var  seq = cc.Sequence.create(m_grossini,m_grossini.reverse(),callBack);
        this.MonsterAmature.runAction(seq);
    },
    //dead of monster on ground.
    MonsterGroundDestroyAction:function(position){
        var armature = null;
        armature = cc.Armature.create("MonsterGroundAnimation");
        armature.getAnimation().playByIndex(0);
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(0.6);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(position);
        this.addChild(armature);
        this.MonsterAmature = armature;
        this.MonsterAmature.getAnimation().setMovementEventCallFunc(this.DestroyActionActionEnded, this);
    },
    //dead of monster in sky.
    MonsterSkyDestroyAction:function(position){
        var armature = null;
        armature = cc.Armature.create("MonsterSkyAnimation");
        armature.getAnimation().playByIndex(0);
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(0.6);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(position);
        this.addChild(armature);
        this.MonsterAmature = armature;
        this.MonsterAmature.getAnimation().setMovementEventCallFunc(this.DestroyActionActionEnded, this);
    },
    //destroy action of monster.
    MonsterDestroyAction:function(){
        this.MonsterAmature.stopAllActions();
        this.MonsterAmature.removeAllChildren(false);

        switch (this.MonsterIndex)
        {
            case MonsterType.MonsterGround_enum:
            {
                this.MonsterGroundDestroyAction(this.MonsterAmature.getPosition());
            }
                break;
            case MonsterType.MonsterSky_enum:
            {
                this.MonsterSkyDestroyAction(this.MonsterAmature.getPosition());
            }
                break;
            default:
                break;
        }
    },
    //get a random number.
    random:function(start, end){
        //console.log("random", start, end);
        var i = cc.RANDOM_0_1()*(end-start+1)+start;
        return i | 0;
    },
    //callback function of jump atcion.
    JumpActionCallBack:function(sender, data){
        var pGameScene = GameScene.getScene();
        switch (this.MonsterIndex)
        {
            case MonsterType.MonsterGround_enum:
            {
                console.log("MonsterGround_enum");
                this.MonsterDestroyAction();
            }
                break;
            case MonsterType.MonsterSky_enum:
            {
                console.log("MonsterSky_enum");
                var randomNumX = this.random(0, 1);
                var randomNumY = this.random(0, 1);
                if(0==randomNumY)
                {
                    randomNumY = this.random(50, 150);
                }
                else
                {
                    randomNumY = this.random(-150, -300);
                }
                if(0==randomNumY)
                {
                    randomNumY = this.random(50, 150);
                }
                else
                {
                    randomNumY = this.random(-150, -300);
                }

                var movePoint = cc.p(
                    GameScene.getScene().playLayer.imManArmature.getPosition().x-this.MonsterAmature.getPositionX(),
                    GameScene.getScene().playLayer.imManArmature.getPosition().y-this.MonsterAmature.getPositionY());
                //movePoint = cc.p(-200.000000, 42.000000);
                var sx = this.MonsterAmature.getPosition().x;
                var sy = this.MonsterAmature.getPosition().y;
                var ex =movePoint.x+50;
                var ey =movePoint.y+150;

//                var bezier = {};
//                bezier.controlPoint_1 = this.MonsterAmature.getPosition();
//                bezier.controlPoint_2 = cc.p(sx+(ex-sx)*0.5+randomNumX, sy+(ey-sy)*0.5+randomNumY);
//                bezier.endPosition = movePoint;
                var bezier = [];
                bezier[0] = this.MonsterAmature.getPosition();
                bezier[1] = cc.p(sx+(ex-sx)*0.5+randomNumX, sy+(ey-sy)*0.5+randomNumY);
                bezier[2] = movePoint;
                //console.log("bezier pos: ", bezier);
                var bezierAction = cc.BezierBy.create(3.0, bezier);
                var m_grossini = cc.EaseIn.create(bezierAction, 1.5);
                var callBack = cc.CallFunc.create(this.JumpActionCallBack, this);
                var  seq = cc.Sequence.create(bezierAction, bezierAction.reverse(), callBack);
                this.MonsterAmature.runAction(seq);
                this.lastAction = seq;
            }
                break;
            default:
                break;
        }
    },
    //callback of monster's Frame animation.
    DestroyActionActionEnded:function(armature, movementType, movementID){
        if (movementType == CC_MovementEventType_COMPLETE || movementType == CC_MovementEventType_LOOP_COMPLETE)
        {
            //this.schedule( cc.scheduleCallbackForTarget(this, this.DelayInit, 0.0, 0, 0.0) );
            //this.schedule(cc.schedule_selector(this.DelayInit), 0.0, 0, 0.0);
            this.DelayInit(0.3);
        }
    },
    DelayInit:function(f){
        this.init();
        GameScene.getScene().isRectDetectedLock = false;
    },
    pause:function(){
        console.log("monster pause.");
        this.unscheduleUpdate();
        console.log("monster pause end.");
    },
    play:function(){
        console.log("monster play.");
        this.scheduleUpdate();
        console.log("monster play end.");
    }
});