/*
var GameScenePlayLayer = ACTION ({
    CROUCH = 0;

});*/

//layer: player layer.
var GameScenePlayLayer = cc.Layer.extend({
    isMouseDown:false,
    actionNum:null,
    imManArmature:null,
    armaturePosition:null,
    isAttack:false,
    _attackPos:null,
    _attackDir:null,

    monsterGroundAmount:0,
    monsterSkyAmount:0,
    touchTime:0,
    imManArmatureBrood:0,
    m_tBeginPos:null,
    s_tCurPos:null,
    playerBoundingBox:null,
    playerScale:0,
    playerX:0,
    playerY:0,

    ACTION_CROUCH:0,
    ACTION_RUN:1,
    ACTION_STAND_JUMP:2,
    ACTION_RUN_JUMP:3,
    ACTION_CROUCH_JUMP:4,
    ACTION_RUN_STOP:5,
    ACTION_DEATH:6,

    //init function.
    init:function () {
        this._super();
        this.setTouchEnabled(true);
        //this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
        var size = cc.Director.getInstance().getWinSize();

        //add cocostudio json file to widget.
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_IMRun);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_IMRunJump);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_IMRunStop);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_IMStandJump);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_LaserRunAttack);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_LaserStandAttack);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_IMDead);

        this.playerX = 50.0;
        this.playerY = 70.0;
        this.playerScale = 0.6;
        this.imManArmatureBrood = 100;

        this.monsterGroundAmount = 0;
        this.monsterSkyAmount = 0;

        this.touchTime = 0;
        this.isAttack = false;
        this._attackPos = cc.p(0,0);
        this._attackDir = 0.0;
        this.IMRunningStop();
        this.actionNum = this.ACTION_RUN_STOP;
    },
    //callback function of runjump action.
    runJumpActionCallBack:function(sender, data){
        //console.log("runJumpActionCallBack.");
        this.imManArmature.stopAllActions();
        this.imManArmature.removeFromParent(false);
        if(0xbebabebb == data)
        {
            this.IMRunning();
        }
        else
        {
            this.IMRunningStop();
        }
    },
    //callback function of standjump action.
    standJumpActionCallBack:function(){
        //console.log("standJumpActionCallBack.");
        this.imManArmature.stopAllActions();
        this.imManArmature.removeFromParent(false);
        this.IMRunningStop();
    },
    //register touch dispatcher.
    registerWithTouchDispatcher:function(){
        cc.registerTargetedDelegate(0, false, this);
    },
    //callback function of menu close button.
    menuCloseCallback:function(){
        var splitCols = cc.MoveTo.create(1.0 ,cc.p(this.imManArmature.getPosition().x+300, this.imManArmature.getPosition().y));
        this.imManArmature.runAction(splitCols);
    },
    //change IronMan's speed.
    changeSpeed:function(t){
        this.imManArmature.getAnimation().setSpeedScale(2.0);
        GameScene.getScene().moveMap.setMovedSpeed(3);
    },
    //on touch began.
    onTouchBegan:function (touches, event) {
        this.m_tBeginPos = touches.getLocation();

        return true;
    },
    //on touch moved.
    onTouchMoved:function (touches, event) {
        this.touchTime++;
    },
    //on touch ended.
    onTouchEnded:function (touches, event) {
        if(this.isAttack){
            return;
        }
        if(this.touchTime>30)
        {
            this.touchTime = 0;
            return;
        }

        var touchLocation  = touches.getLocation();
        var setBtnLocation = GameScene.getScene().menuLayer.settingBtn.getPosition();
        var setBtnSize = GameScene.getScene().menuLayer.settingBtn.getSize();

        if(this.touchTime<6 && this.checkIfTouchNotInSetBtnArea(touchLocation,setBtnSize, setBtnLocation))
        {
            if(this.actionNum != this.ACTION_RUN && this.actionNum != this.ACTION_RUN_STOP)
            {
                return;
            }
            this.isAttack = true;
            this.imManArmature.stopAllActions();
            this.imManArmature.removeFromParent(false);
            if(this.actionNum == this.ACTION_RUN)
            {
                this.IMRunAttack(touchLocation);
            }
            else if(this.actionNum == this.ACTION_RUN_STOP)
            {
                this.IMStandAttack(touchLocation);
            }

            this.touchTime = 0;
            return;
        }

        var touchLocation = touches.getLocation();
        var nMoveX = touchLocation.x - this.m_tBeginPos.x;
        var nMoveY = touchLocation.y - this.m_tBeginPos.y;
        var radian = 10;

        if(nMoveX>10 && Math.abs(Math.tan(nMoveY/nMoveX))<Math.abs(Math.sqrt(3)/radian))
        {
            if(this.actionNum == this.ACTION_RUN)
            {
                if(GameScene.getScene().moveMap.getMoveSpeed()!=6)
                {
                    GameScene.getScene().moveMap.setMovedSpeed(6);
                    this.imManArmature.getAnimation().setSpeedScale(3.0);
                    this.schedule(this.changeSpeed,0.5, 0, 0.0);
                    return;
                }
            }
            this.imManArmature.stopAllActions();
            this.imManArmature.removeFromParent(false);
            this.IMRunning();
        }

        if(nMoveX<-10 && Math.abs(Math.tan(nMoveY/nMoveX))<Math.abs(Math.sqrt(3)/radian))
        {
            if(this.actionNum == this.ACTION_RUN_STOP)
                return;

            this.imManArmature.stopAllActions();
            this.imManArmature.removeFromParent(false);
            this.IMRunningStop();
        }

        this.touchTime = 0;

        if(nMoveY>10 && Math.abs(Math.tan(nMoveY/nMoveX))>Math.abs(Math.sqrt(3)/radian))
        {
            if(this.actionNum == this.ACTION_STAND_JUMP || this.actionNum == this.ACTION_RUN_JUMP)
                return;

            var armatureName = this.imManArmature.getName();
            this.imManArmature.stopAllActions();
            this.imManArmature.removeFromParent(false);

            if(armatureName == "IMRun")
            {
                this.IMRunJump();
                var jumpAction = cc.JumpTo.create(0.5,cc.p(this.imManArmature.getPosition().x,this.imManArmature.getPosition().y),100,1);
                var callBack;
                if(nMoveX<0)
                {
                    callBack = cc.CallFunc.create(this.runJumpActionCallBack, this, 0xbebabeba);
                }
                else
                {
                    callBack = cc.CallFunc.create(this.runJumpActionCallBack, this, 0xbebabebb);
                }
                var action = cc.Sequence.create(jumpAction,callBack);
                this.imManArmature.runAction(action);
            }

            if(armatureName == "IMRunStop")
            {
                this.IMStandJump();
                var jumpAction = cc.JumpTo.create(0.5,cc.p(this.imManArmature.getPositionX(),this.imManArmature.getPositionY()),200,1);
                var callBack = cc.CallFunc.create(this.standJumpActionCallBack, this, 0xbebabeba);
                var action = cc.Sequence.create(jumpAction,callBack);
                this.imManArmature.runAction(action);
            }
        }
    },
    //on touch cancelled.
//    onTouchesCancelled:function (touches, event) {
//        console.log("onTouchesCancelled");
//    },


    //Running animation.
    IMRunning:function(){
        //console.log("IMRunning.");
        var armature = cc.Armature.create("IMRun");
        armature.getAnimation().play("Running");
        armature.getAnimation().setSpeedScale(2.0);
        armature.setScale(this.playerScale);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(cc.p(this.playerX+30, this.playerY));
        this.armaturePosition = armature.getPosition();
        this.addChild(armature);
        this.imManArmature = armature;

        this.actionNum = this.ACTION_RUN;
        if(GameScene.getScene() && GameScene.getScene().moveMap)
            GameScene.getScene().moveMap.move();
    },

    //Run jump animation.
    IMRunJump:function(){
        //console.log("IMRunJump.");
        var armature = cc.Armature.create("IMRunJump");
        armature.getAnimation().play("RuningJump");
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(this.playerScale);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(cc.p(this.playerX+20, this.playerY));
        this.armaturePosition = armature.getPosition();
        this.addChild(armature);
        this.imManArmature = armature;
        this.actionNum = this.ACTION_RUN_JUMP;
        GameScene.getScene().moveMap.setMovedSpeed(6);
        armature.getAnimation().setMovementEventCallFunc(this.amatureActionCallBack, this);
    },

    //Stand jump animation.
    IMStandJump:function(){
        //console.log("IMStandJump.");
        var armature = cc.Armature.create("IMStandJump");
        armature.getAnimation().play("StandJump");
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(this.playerScale);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(cc.p(this.playerX+20, this.playerY));
        this.armaturePosition = armature.getPosition();
        this.addChild(armature);
        this.imManArmature = armature;
        this.actionNum = this.ACTION_STAND_JUMP;
        if(GameScene.getScene() && GameScene.getScene().moveMap)
            GameScene.getScene().moveMap.stop();
    },

    //Running stop animation.
    IMRunningStop:function(){
        //console.log("IMRunningStop.");
        var armature = cc.Armature.create("IMRunStop");
        armature.getAnimation().play("RunningStop");
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(this.playerScale);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(cc.p(this.playerX+50, this.playerY));
        this.armaturePosition = armature.getPosition();
        this.addChild(armature);
        this.imManArmature = armature;

        this.actionNum = this.ACTION_RUN_STOP;
        if(GameScene.getScene() && GameScene.getScene().moveMap)
            GameScene.getScene().moveMap.stop();
    },
    //Running attack animation.
    IMRunAttack:function(touch){
        //console.log("IMRunAttack.");
        var angle = this.getAngle(touch);
        var posHand = this.getPosHand(angle);

        var armature = cc.Armature.create("LaserRunAttack");
        armature.getAnimation().play("RunningAttack");
        armature.getAnimation().setSpeedScale(2.0);
        armature.setScale(this.playerScale);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(cc.p(this.playerX+40, this.playerY));
        this.armaturePosition = armature.getPosition();
        this.addChild(armature);
        this.imManArmature = armature;
        //console.log("IMRunAttack end.");
        armature.getAnimation().setMovementEventCallFunc(this.setAttackEvent, this);

        this._attackPos = posHand;
        this._attackDir = angle;
    },
    //Stand attack animation.
    IMStandAttack:function(touch){
        //console.log("IMStandAttack.");
        var posHand = this.getPosHand(0.1);
        this._attackPos = posHand;
        var angle = this.getAngle(touch);

        var armature = cc.Armature.create("LaserStandAttack");
        armature.getAnimation().play("StandAttack");
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(this.playerScale);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(cc.p(this.playerX, this.playerY));
        this.armaturePosition = armature.getPosition();
        this.addChild(armature);
        this.imManArmature = armature;
        armature.getAnimation().setMovementEventCallFunc(this.setAttackEvent, this);

        this._attackDir = angle;
        //console.log("IMStandAttack end.");
    },
    //death animation.
    IMDeath:function(){
        //console.log("IMDeath.");
        this.setTouchEnabled(false);
        this.imManArmature.removeFromParent(true);
        var armature = null;
        armature = cc.Armature.create("IMDead");
        armature.getAnimation().playByIndex(0.0, 1.0, 1.0,0.0, 1.0);
        armature.getAnimation().setSpeedScale(1.0);
        armature.setScale(this.playerScale);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(cc.p(100, this.playerY));
        this.armaturePosition = armature.getPosition();
        this.addChild(armature);
        this.imManArmature = armature;
        this.actionNum = this.ACTION_DEATH;
        armature.getAnimation().setMovementEventCallFunc(this.Dead, this);
    },
    //CallBack of running jump animation.
    amatureActionCallBack:function(armature, movementType, armature){
        if (movementType == CC_MovementEventType_COMPLETE || movementType == CC_MovementEventType_LOOP_COMPLETE)
        {
            switch (this.actionNum)
            {
                case this.ACTION_RUN_JUMP:
                {
                    GameScene.getScene().moveMap.setMovedSpeed(3);
                }
                    break;
                default:
                    break;
            }
        }
    },
    //get an angle
    getAngle:function(touch){
        var posOrg = cc.p(135, 132);
        if(touch.x <= posOrg.x)
            return -1.57;   //up max->90 degree„Ä?
        if (touch.y == posOrg.y) {
            if (touch.x > posOrg.x) {
                return 0;
            }
        }

        var tan = (touch.y - posOrg.y)/(touch.x - posOrg.x);
        if (tan < -6) {
            tan = -6;    //down max->45 degree„Ä?
        }
        var angle = Math.atan(tan);
        return -angle;
    },
    //get IronMan's hand position.
    getPosHand:function(angle){
        var posH = cc.p(141, 141);
        return posH;
    },
    //callback function of attack animation.
    setAttackEvent:function(armature, movementType, movementID){
        //console.log("setAttackEvent, movementType:", movementType, "movementID: ", movementID, "armature: ", armature);
        if (movementType == CC_MovementEventType_COMPLETE || movementType == CC_MovementEventType_LOOP_COMPLETE)
        {
            //play audio and launch laser.
            AudioPlayer.getInstance().playEffect(g_ArrEffects.Effect_Attack_0);
            GameScene.getScene().laser.addLaser(this._attackPos, this._attackDir);
            this.isAttack = false;
            this.imManArmature.stopAllActions();
            this.imManArmature.removeFromParent(false);
            if(this.actionNum == this.ACTION_RUN)
            {
                this.IMRunning();
            }
            else if(this.actionNum == this.ACTION_RUN_STOP)
            {
                this.IMRunningStop();
            }
        }
    },
    //callback function of dead animation.
    Dead:function(armature, movementType, movementID){
        //console.log("Dead");
        if (movementType == CC_MovementEventType_COMPLETE || movementType == CC_MovementEventType_LOOP_COMPLETE)
        {
            if(GameScene.getScene())
                GameScene.getScene().gameOver();
        }
    },
    //chech area of not in set button.
    checkIfTouchNotInSetBtnArea:function(touchPosition, setBtnSize, setBtnPosition){
        //console.log("checkIfTouchNotInSetBtnArea.");
        return true;
    },
    //get Amount of monster on ground.
    getMonsterGroundAmount:function(){
        //console.log("getMonsterGroundAmount.");
        return this.monsterGroundAmount;
    },
    //get Amount of monster in sky.
    getMonsterSkyAmount:function(){
        //console.log("getMonsterSkyAmount.");
        return this.monsterSkyAmount;
    },
    //add Amount of monster on ground.
    addMonsterGroundAmount:function(){
        this.monsterGroundAmount ++;
    },
    //add Amount of monster in sky.
    addMonsterSkyAmount:function(){
        this.monsterSkyAmount ++;
    }

});
