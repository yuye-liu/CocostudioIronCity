/*
var GameScenePlayLayer = ACTION ({
    CROUCH = 0;

});*/
var GameScenePlayLayer = cc.Layer.extend({
    isMouseDown:false,
    actionNum:null,
    imManArmature:null,
    armaturePosition:null,
    m_tBeginPos:null,

    ACTION_CROUCH:0,
    ACTION_RUN:1,
    ACTION_STAND_JUMP:2,
    ACTION_RUN_JUMP:3,
    ACTION_CROUCH_JUMP:4,
    ACTION_RUN_STOP:5,

    init:function () {

        this._super();
        this.setTouchEnabled(true);
//        this.setMouseEnabled(true);
        var size = cc.Director.getInstance().getWinSize();

        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_IMCrouch);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_IMCrouchJump);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_IMRun);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_IMRunJump);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_IMRunStop);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_IMStandJump);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_LaserRunAttack);
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(Json_LaserStandAttack);

        this.touchTime = 0;
        this.IMCrouch();
        this.actionNum = this.ACTION_CROUCH;
    },

    runJumpActionCallBack:function(){

        this.imManArmature.stopAllActions();
        this.imManArmature.removeFromParent(false);
        this.IMRunning();
    },

    standJumpActionCallBack:function(){

        this.imManArmature.stopAllActions();
        this.imManArmature.removeFromParent(false);
        this.IMRunningStop();
    },

    menuCloseCallback:function(){

        var splitCols = cc.MoveTo.create(1.0 ,cc.p(this.imManArmature.getPosition().x+300, this.imManArmature.getPosition().y));
        this.imManArmature.runAction(splitCols);
    },

    onTouchesBegan:function (touches, event) {
        this.m_tBeginPos = touches[0].getLocation();
    },

    onTouchesMoved:function (touches, event) {
        this.touchTime++;
   },

    onTouchesEnded:function (touches, event) {

        if(this.touchTime>30)
        {
            this.touchTime = 0;
            return;
        }

        this.touchTime = 0;

        var touchLocation = touches[0].getLocation();
        var nMoveX = touchLocation.x - this.m_tBeginPos.x;
        var nMoveY = touchLocation.y - this.m_tBeginPos.y;
//        cc.log("m_tBeginPos.x = " + this.m_tBeginPos.x);
//        cc.log("touchLocation.x = " + touchLocation.x);
//        cc.log("nMoveX = %f ,nMoveY = " + nMoveX,nMoveY);
//        cc.log("tan1 = " + Math.tan(nMoveY/nMoveX));
//        cc.log("tan2 = " + Math.abs(Math.sqrt(3)/10));
        var radian = 10;

        if(nMoveX>10 && Math.abs(Math.tan(nMoveY/nMoveX))<Math.abs(Math.sqrt(3)/radian))
        {
            if(this.actionNum == this.ACTION_RUN)
                return;
            this.imManArmature.stopAllActions();
            this.imManArmature.removeFromParent(false);
            this.IMRunning();
        }else if(nMoveX<-10 && Math.abs(Math.tan(nMoveY/nMoveX))<Math.abs(Math.sqrt(3)/radian))
        {
            if(this.actionNum == this.ACTION_RUN_STOP)
                return;

            this.imManArmature.stopAllActions();
            this.imManArmature.removeFromParent(false);
            this.IMRunningStop();
        }else if(nMoveY>10 && Math.abs(Math.tan(nMoveY/nMoveX))>Math.abs(Math.sqrt(3)/radian))
        {
            if(this.actionNum == this.ACTION_STAND_JUMP ||
               this.actionNum == this.ACTION_RUN_JUMP ||
               this.actionNum == this.ACTION_CROUCH_JUMP)
               return;

            var armatureName = this.imManArmature.getName();
            this.imManArmature.stopAllActions();
            this.imManArmature.removeFromParent(false);

            if(armatureName == "IMRun")
            {
                this.IMRunJump();
                var jumpAction = cc.JumpTo.create(0.5,cc.p(this.imManArmature.getPosition().x,this.imManArmature.getPosition().y),100,1);
                var callBack = cc.CallFunc.create(function(){this.runJumpActionCallBack()}, this);
                var action = cc.Sequence.create(jumpAction,callBack);
                this.imManArmature.runAction(action);
            }else if(armatureName == "IMRunStop")
            {
                this.IMStandJump();
                var jumpAction = cc.JumpTo.create(0.5,cc.p(this.imManArmature.getPosition().x,this.imManArmature.getPosition().y),100,1);
                var callBack = cc.CallFunc.create(function(){this.standJumpActionCallBack()},this);
                var action = cc.Sequence.create(jumpAction,callBack);
                this.imManArmature.runAction(action);
            }else if(armatureName == "IMCrouch")
            {
                this.IMCrouchJump();
                var jumpAction = cc.JumpTo.create(0.5, cc.p(this.imManArmature.getPosition().x,this.imManArmature.getPosition().y),100,1);
                var callBack = cc.CallFunc.create(function(){this.standJumpActionCallBack()}, this);
                var action = cc.Sequence.create(jumpAction,callBack);
                this.imManArmature.runAction(action);
            }
        }else if(nMoveY<-10 && Math.abs(Math.tan(nMoveY/nMoveX))>Math.abs(Math.sqrt(3)/radian))
        {
            if(this.actionNum == this.ACTION_CROUCH)
                return;
            this.imManArmature.stopAllActions();
            this.imManArmature.removeFromParent(false);
            this.IMCrouch();
        }
    },

//    onTouchesCancelled:function (touches, event) {
//        console.log("onTouchesCancelled");
//    },

    IMCrouch:function(){

        var armature = cc.Armature.create("IMCrouch");
        armature.getAnimation().play("crouch");
        armature.getAnimation().setSpeedScale(1.5);
        armature.setScale(0.6);
        armature.setAnchorPoint(cc.p(0.5,0));
        armature.setPosition(cc.p(50, 50));
        this.armaturePosition = armature.getPosition();
        this.addChild(armature);
        this.imManArmature = armature;

        this.actionNum = this.ACTION_CROUCH;
    },

  IMRunning:function(){

      var armature = cc.Armature.create("IMRun");
      armature.getAnimation().play("Running");
      armature.getAnimation().setSpeedScale(1.5);
      armature.setScale(0.6);
      armature.setAnchorPoint(cc.p(0.5,0));
      armature.setPosition(cc.p(50, 50));
      this.armaturePosition = armature.getPosition();
      this.addChild(armature);
      this.imManArmature = armature;

      this.actionNum = this.ACTION_RUN;
  },

  IMStandJump:function(){

      var armature = cc.Armature.create("IMStandJump");
      armature.getAnimation().play("StandJump");
      armature.getAnimation().setSpeedScale(1.5);
      armature.setScale(0.6);
      armature.setAnchorPoint(cc.p(0.5,0));
      armature.setPosition(cc.p(50, 50));
      this.armaturePosition = armature.getPosition();
      this.addChild(armature);
      this.imManArmature = armature;

      this.actionNum = this.ACTION_STAND_JUMP;
   },

  IMRunJump:function(){

      var armature = cc.Armature.create("IMRunJump");
      armature.getAnimation().play("RuningJump");
      armature.getAnimation().setSpeedScale(1.5);
      armature.setScale(0.6);
      armature.setAnchorPoint(cc.p(0.5,0));
      armature.setPosition(cc.p(50, 50));
      this.armaturePosition = armature.getPosition();
      this.addChild(armature);
      this.imManArmature = armature;

      this.actionNum = this.ACTION_RUN_JUMP;
   },

  IMCrouchJump:function(){

      var armature = cc.Armature.create("IMCrouchJump");
      armature.getAnimation().play("CrouchJump");
      armature.getAnimation().setSpeedScale(1.5);
      armature.setScale(0.6);
      armature.setAnchorPoint(cc.p(0.5,0));
      armature.setPosition(cc.p(50, 50));
      this.armaturePosition = armature.getPosition();
      this.addChild(armature);
      this.imManArmature = armature;

      this.actionNum = this.ACTION_CROUCH_JUMP;
   },

  IMRunningStop:function(){

      var armature = cc.Armature.create("IMRunStop");
      armature.getAnimation().play("RunningStop");
      armature.getAnimation().setSpeedScale(1.5);
      armature.setScale(0.6);
      armature.setAnchorPoint(cc.p(0.5,0));
      armature.setPosition(cc.p(50, 50));
      this.armaturePosition = armature.getPosition();
      this.addChild(armature);
      this.imManArmature = armature;

      this.actionNum = this.ACTION_RUN_STOP;
   }

});