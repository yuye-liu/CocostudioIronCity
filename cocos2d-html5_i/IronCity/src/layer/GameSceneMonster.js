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
};

var GameSceneMonster = cc.Layer.extend({
    MonsterAmature:null,
    MonsterAmatureBoundingBox:null,
    MonsterIndex:null,
    VisibleSize:null,
    VisiblePosition:null,
    init:function(){
        //console.log("monster init");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_MonsterGroundMoving);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_MonsterSkyMoving);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_MonsterGroundAnimation);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_MonsterSkyAnimation);
        var r = this.random(0, 1);
        //console.log("VisibleRect: ", VisibleRect.left());
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

        return true;
    },
    MonsterGroundMoving:function(position){
        //console.log("MonsterGroundMoving", position);
        var pGameScene = GameScene.getScene();
        //console.log(pGameScene, pGameScene.playLayer);
        var armature = null;
        armature = cc.Armature.create("MonsterGroundMoving");
        armature.getAnimation().playByIndex(0);
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(1.0);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(position);
        this.addChild(armature);
        this.MonsterAmature = armature;
        this.MonsterIndex = MonsterType.MonsterGround_enum;
        var movePoint = cc.p(pGameScene.playLayer.imManArmature.getPosition().x-100,
            pGameScene.playLayer.imManArmature.getPosition().y);
        var jumpAction = cc.JumpTo.create(3.0, movePoint, 50, 3);
        var callBack = cc.CallFunc.create(this.JumpActionCallBack, this);
        var  action = cc.Sequence.create(jumpAction, callBack);
        this.MonsterAmature.runAction(action);
    },
    MonsterSkyMoving:function(position){
        //console.log("MonsterSkyMoving", position);
        var pGameScene = GameScene.getScene();
        var armature = null;
        armature = cc.Armature.create("MonsterSkyMoving");
        armature.getAnimation().playByIndex(0);
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(1.0);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(position);
        this.addChild(armature);
        this.MonsterAmature = armature;
        this.MonsterIndex = MonsterType.MonsterSky_enum;
        var movePoint = cc.p(pGameScene.playLayer.imManArmature.getPosition().x-100,
            pGameScene.playLayer.imManArmature.getPosition().y);
        var jumpAction = cc.JumpTo.create(3.0,movePoint,0,1);
        //console.log("add action");
        var callBack = cc.CallFunc.create(this.JumpActionCallBack, this);
        var  action = cc.Sequence.create(jumpAction, callBack);
        this.MonsterAmature.runAction(action);
        //console.log("run action.");
    },
    MonsterGroundDestroyAction:function(position){
        //console.log("MonsterGroundDestroyAction", position);
        var armature = null;
        armature = cc.Armature.create("MonsterGroundAnimation");
        armature.getAnimation().playByIndex(0);
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(1.0);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(position);
        this.addChild(armature);
        this.MonsterAmature = armature;
        //console.log("ground destory will callback.");
        this.MonsterAmature.getAnimation().setMovementEventCallFunc(this.DestroyActionActionEnded, this);
    },
    MonsterSkyDestroyAction:function(position){
        //console.log("MonsterSkyDestroyAction", position);
        var armature = null;
        armature = cc.Armature.create("MonsterSkyAnimation");
        armature.getAnimation().playByIndex(0);
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(1.0);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(position);
        this.addChild(armature);
        this.MonsterAmature = armature;
        //console.log("sky destory will callback.");
        this.MonsterAmature.getAnimation().setMovementEventCallFunc(this.DestroyActionActionEnded, this);
    },
    MonsterDestroyAction:function(){
        //console.log("MonsterDestroyAction");
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
    random:function(start, end){
        //console.log("random", start, end);
        var i = cc.RANDOM_0_1()*(end-start+1)+start;
        return i | 0;
    },
    JumpActionCallBack:function(sender, data){
        //console.log("JumpActionCallBack", sender, data, "MonsterIndex: ", this.MonsterIndex);
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
                console.log("bezier pos: ", bezier);
                var bezierAction = cc.BezierBy.create(3.0, bezier);
                var m_grossini = cc.EaseIn.create(bezierAction, 1.5);
                var callBack = cc.CallFunc.create(this.JumpActionCallBack, this);
                var  seq = cc.Sequence.create(m_grossini, m_grossini.reverse(), callBack);
                this.MonsterAmature.runAction(seq);
            }
                break;
            default:
                break;
        }
    },
//    draw:function(){
//        CCRect playerBoundingBoxCopy = GameScene::shareGameScene()->playLayer->playerBoundingBox;
//        float playerBoundingBoxX = playerBoundingBoxCopy.origin.x;
//        float playerBoundingBoxY = playerBoundingBoxCopy.origin.y;
//        float playerBoundingBoxWidth = playerBoundingBoxCopy.size.width;
//        float playerBoundingBoxHeight = playerBoundingBoxCopy.size.height;
//        CCPoint point1 = CCPointMake(playerBoundingBoxX,playerBoundingBoxY);
//        CCPoint point2 = CCPointMake(playerBoundingBoxX+playerBoundingBoxWidth,playerBoundingBoxY);
//        CCPoint point3 = CCPointMake(playerBoundingBoxX+playerBoundingBoxWidth,playerBoundingBoxY+playerBoundingBoxHeight);
//        CCPoint point4 = CCPointMake(playerBoundingBoxX,playerBoundingBoxY+playerBoundingBoxHeight);
//
//        //ª≠“ª∏ˆ∂‡±ﬂ–Œ
//        ccDrawColor4B(255, 255, 0, 255);
//        glLineWidth(1);
//        CCPoint vertices1[] = { point1, point2, point3, point4};
//        ccDrawPoly( vertices1, 4, true// «∑Ò∑‚±’
//        );
//
//        float MonsterAmatureBoundingBoxX = MonsterAmatureBoundingBox.origin.x;
//        float MonsterAmatureBoundingBoxY = MonsterAmatureBoundingBox.origin.y;
//        float MonsterAmatureBoundingBoxWidth = MonsterAmatureBoundingBox.size.width;
//        float MonsterAmatureBoundingBoxHeight = MonsterAmatureBoundingBox.size.height;
//
//        CCPoint point5 = CCPointMake(MonsterAmatureBoundingBoxX,MonsterAmatureBoundingBoxY);
//        CCPoint point6 = CCPointMake(MonsterAmatureBoundingBoxX+MonsterAmatureBoundingBoxWidth,MonsterAmatureBoundingBoxY);
//        CCPoint point7 = CCPointMake(MonsterAmatureBoundingBoxX+MonsterAmatureBoundingBoxWidth,MonsterAmatureBoundingBoxY+MonsterAmatureBoundingBoxHeight);
//        CCPoint point8 = CCPointMake(MonsterAmatureBoundingBoxX,MonsterAmatureBoundingBoxY+MonsterAmatureBoundingBoxHeight);
//
//        CCPoint vertices2[] = { point5, point6, point7, point8};
//        ccDrawPoly( vertices2, 4, true// «∑Ò∑‚±’
//        );
//    },
    DestroyActionActionEnded:function(armature, movementType, movementID){
        //console.log("DestroyActionActionEnded.");
        if (movementType == CC_MovementEventType_COMPLETE || movementType == CC_MovementEventType_LOOP_COMPLETE)
        {
            //this.schedule( cc.scheduleCallbackForTarget(this, this.DelayInit, 0.0, 0, 0.0) );
            //this.schedule(cc.schedule_selector(this.DelayInit), 0.0, 0, 0.0);
            this.DelayInit(0.3);
        }
    },
    DelayInit:function(f){
        //console.log("DelayInit.");
        this.init();
        GameScene.getScene().isRectDetectedLock = false;
    }
});