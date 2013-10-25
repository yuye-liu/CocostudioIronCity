
ActionType = {
    ACTION_RUN : 0,
    ACTION_RUN_JUMP : 1,
    ACTION_STAND_JUMP : 2,
    ACTION_RUN_STOP : 3,
    ACTION_RUN_ATTACK : 4,
    ACTION_STAND_ATTACK : 5,
    ACTION_IM_DEATH : 6,
    ACTION_MONSTER_GROUND : 7,
    ACTION_MONSTER_SKY : 8,
    MONSTER_GROUND_MOVING : 9,
    MONSTER_SKY__MOVING : 10
};
var isFirstInGame = true;
var MainMenuScene = cc.Scene.extend({
    loadingCount:0,
    mainMenu:null,
    onEnter:function () {

        this._super();

        var menuLayer = cc.Layer.create();
        var size = cc.Director.getInstance().getWinSize();

        // Add backGroundPic
        var backGroundPic = cc.Sprite.create(Png_MainMenuSceneBK);
        backGroundPic.setAnchorPoint(cc.p(0,0));

        menuLayer.addChild(backGroundPic,0);

        //Add StartBtn
        var start = cc.Sprite.create(Png_StartBtn);
        var startPush = cc.Sprite.create(Png_StartBtnPush);

        var startBtn = cc.MenuItemSprite.create(start, startPush, this.startBtnCallFunc, this);

        //Add Menu
        this.mainMenu = cc.Menu.create(startBtn);
        this.mainMenu.setAnchorPoint(cc.p(0, 0));
        this.mainMenu.setPosition(cc.p(size.width/2, size.height/5));

        menuLayer.addChild(this.mainMenu,1);
        this.addChild(menuLayer);
    },
    init:function(){
        ;
    },
    dataLoaded:function(percent){
        if(!isFirstInGame)
        {
            var gameScene =  GameScene.getInstance();
            var gameSceneTransition =  cc.TransitionFade.create(0.5, gameScene, cc.WHITE);
            cc.Director.getInstance().replaceScene(gameSceneTransition);
            return;
        }

        switch (this.loadingCount)
        {
//            case ActionType.ACTION_RUN:
//            {
//                cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(Json_IMRun, this, this.dataLoaded);
//            }
//                break;
//            case ActionType.ACTION_RUN_JUMP:
//            {
//                cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(Json_IMRunJump, this, this.dataLoaded);
//            }
//                break;
//            case ActionType.ACTION_STAND_JUMP:
//            {
//                cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(Json_IMStandJump, this, this.dataLoaded);
//            }
//                break;
//            case ActionType.ACTION_RUN_STOP:
//            {
//                cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(Json_IMRunStop, this, this.dataLoaded);
//            }
//                break;
//            case ActionType.ACTION_RUN_ATTACK:
//            {
//                cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(Json_LaserRunAttack, this, this.dataLoaded);
//            }
//                break;
//            case ActionType.ACTION_STAND_ATTACK:
//            {
//                cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(Json_LaserStandAttack, this, this.dataLoaded);
//            }
//                break;
//            case ActionType.ACTION_IM_DEATH:
//            {
//                cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(Json_IMDead, this, this.dataLoaded);
//            }
//                break;
//            case ActionType.ACTION_MONSTER_GROUND:
//            {
//                cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(Json_MonsterGroundAnimation, this, this.dataLoaded);
//            }
//                break;
//            case ActionType.ACTION_MONSTER_SKY:
//            {
//                cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(Json_MonsterSkyAnimation, this, this.dataLoaded);
//            }
//                break;
//            case ActionType.MONSTER_GROUND_MOVING:
//            {
//                cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(Json_MonsterGroundMoving, this, this.dataLoaded);
//            }
//                break;
//            case ActionType.MONSTER_SKY__MOVING:
//            {
//                cc.ArmatureDataManager.getInstance().addArmatureFileInfoAsync(Json_MonsterSkyMoving, this, this.dataLoaded);
//            }
//                break;

            default:
            {
                isFirstInGame = false;
                var gameScene =  GameScene.getScene();
                //var gameSceneTransition =  cc.TransitionFade.create(0.5, gameScene, cc.WHITE);
                cc.Director.getInstance().replaceScene(gameScene);
            }
                break;
        }
        this.loadingCount++;
    },

    startBtnCallFunc:function(pSender) {
        var gameScene = new GameScene();
        gameScene.init();
        GameScene.Scene = gameScene;

        var gameSceneTransition = cc.TransitionFade.create(0.5, gameScene, cc.white());
        cc.Director.getInstance().replaceScene(gameSceneTransition);

        var  startBtn = pSender;
        startBtn.setOpacity(0);
        this.mainMenu.setEnabled(false);

        var meteor = cc.ParticleSystem.create(Plist_qwe);
        //var meteor = cc.ParticleSystemQuad.create("qwe.plist");
        meteor.setScale(0.5);
        meteor.setPosition(cc.p(240,65));
        this.addChild(meteor);

        var activity = cc.Sprite.create(Png_loadingPng);
        activity.setPosition(cc.p(240,65));
        this.addChild(activity);

        var rotateAction = cc.RotateBy.create(0.5, 180.0);
        activity.runAction(cc.RepeatForever.create(rotateAction));

        this.loadingCount = 0;
        this.dataLoaded(this.loadingCount);
    }
});

