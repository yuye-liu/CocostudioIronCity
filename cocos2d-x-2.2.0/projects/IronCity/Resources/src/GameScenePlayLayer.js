/*
var GameScenePlayLayer = ACTION ({
    CROUCH = 0;

});*/
var GameScenePlayLayer = cc.Layer.extend({
    isMouseDown:false,
    armature:null,
    ACTION_CROUCH:0,
    ACTION_RUN:1,
    ACTION_STAND_JUMP:2,
    ACTION_RUN_JUMP:3,
    ACTION_CROUCH_JUMP:4,
    ACTION_RUN_STOP:5,
    init:function () {
        var selfPointer = this;

        this._super();

        var size = cc.Director.getInstance().getWinSize();

        this.helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
        this.helloLabel.setPosition(cc.p(size.width >> 1, this.helloLabel.getContentSize().height>>1));
        this.addChild(this.helloLabel, 5);
        this.setTouchEnabled(true);


        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/IMCrouch.ExportJson");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/IMRun.ExportJson");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/IMRunJump.ExportJson");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/IMStandJump.ExportJson");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/IMCrouchJump.ExportJson");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/IMRunStop.ExportJson");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/LaserRunAttack.ExportJson");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("res/LaserStandAttack.ExportJson");


        this.touchTime = 0;
        this.IMCrouch();
        this.actionNum = ACTION_CROUCH;

/*
        var armature = cc.Armature.create("IMRun");
        armature.getAnimation().play("Running");
        armature.setScale(1.0);
        armature.setAnchorPoint(cc.p(0.5, 0.5));
        armature.setPosition(cc.p(100, size.height / 2));
        this.addChild(armature);
*/

        return true;
    },
    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
                //this.circle.setPosition(cc.p(touches[0].getLocation().x, touches[0].getLocation().y));
            }
        }
    },
    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    },

    IMCrouch:function(){
    armature = cocos2d::extension::CCArmature::create("IMCrouch");
    armature.getAnimation().play("crouch");
    armature.getAnimation().setSpeedScale(1.5);
    armature.setScale(0.6);
    armature.setAnchorPoint(cc.p(0.5,0));
    armature.setPosition(cc.p(50, 50));
    amaturePosition = armature.getPosition();
    addChild(armature);
      
    actionNum = ACTION_CROUCH;
    },

  IMRunning:function(){
    armature = CCArmature::create("IMRun");
    armature.getAnimation().play("Running");
    armature.getAnimation().setSpeedScale(1.5);
    armature.setScale(0.6);
    armature.setAnchorPoint(cc.p(0.5,0));
    armature.setPosition(cc.p(50, 50));
    amaturePosition = armature.getPosition();
    addChild(armature);
      
    actionNum = ACTION_RUN;
},

  IMStandJump:function(){
    armature = CCArmature::create("IMStandJump");
    armature.getAnimation().play("StandJump");
    armature.getAnimation().setSpeedScale(1.5);
    armature.setScale(0.6);
    armature.setAnchorPoint(cc.p(0.5,0));
    armature.setPosition(cc.p(50, 50));
    amaturePosition = armature.getPosition();
    addChild(armature);
      
    actionNum = ACTION_STAND_JUMP;
},

  IMRunJump:function(){
    armature = CCArmature::create("IMRunJump");
    armature.getAnimation().play("RuningJump");
    armature.getAnimation().setSpeedScale(1.5);
    armature.setScale(0.6);
    armature.setAnchorPoint(cc.p(0.5,0));
    armature.setPosition(cc.p(50, 50));
    amaturePosition = armature.getPosition();
    addChild(armature);
      
    actionNum = ACTION_RUN_JUMP;
},

  IMCrouchJump:function(){

    
    armature = CCArmature::create("IMCrouchJump");
    armature.getAnimation().play("CrouchJump");
    armature.getAnimation().setSpeedScale(1.5);
    armature.setScale(0.6);
    armature.setAnchorPoint(cc.p(0.5,0));
    armature.setPosition(cc.p(50, 50));
    amaturePosition = armature.getPosition();
    addChild(armature);
      
    actionNum = ACTION_CROUCH_JUMP;
},

  IMRunningStop:function(){
    armature = CCArmature::create("IMRunStop");
    armature.getAnimation().play("RunningStop");
    armature.getAnimation().setSpeedScale(1.5);
    armature.setScale(0.6);
    armature.setAnchorPoint(cc.p(0.5,0));
    armature.setPosition(cc.p(50, 50));
    amaturePosition = armature.getPosition();
    addChild(armature);
      
    actionNum = ACTION_RUN_STOP;
}

});


