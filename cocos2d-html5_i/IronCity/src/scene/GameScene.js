//scene: game scene.
var GameScene = cc.Scene.extend({
    moveMap:null,
    playerLayer:null,
    menuLayer:null,
    gameSceneMonster:null,
    isRectDetectedLock:false,
    laser:null,
    onEnter:function () {
        this._super();

        //map
        this.moveMap = new MovedMap();
        this.moveMap.init();
        this.moveMap.setMovedSpeed(3);
        this.addChild(this.moveMap, 0);

        //menu
        this.menuLayer = new GameSceneMenuLayer();
        this.menuLayer.init(100, "0");
        this.menuLayer.setAnchorPoint(cc.p(0, 0));
        this.menuLayer.setPosition(cc.p(0, 0));
        this.menuLayer.setScale(0.5);
        this.addChild(this.menuLayer, 0);

        //player
        this.playLayer = new GameScenePlayLayer();
        this.playLayer.init();
        this.addChild(this.playLayer, 0);

        //monster
        this.gameSceneMonster = new GameSceneMonster();
        this.gameSceneMonster.init();
        this.addChild(this.gameSceneMonster, 0);

        //laser
        this.laser = new LaserManager();
        this.laser.init();
        this.laser.scheduleUpdate();
        this.addChild(this.laser);

        //
        this.scheduleUpdate();

        //
        this.isRectDetectedLock = false;

        //this.scheduleUpdate();
        console.log("GameScene enter.111");
    },
    init:function(){
        GameScene.Scene = this;
        console.log("GameScene init.222");
    },
    //when game over.
    gameOver:function(){
        console.log("gameOver.");
        var overLayer = new GameSceneOverLayer();

        if (!overLayer.init())
        {
            overLayer = null;
            return;
        }

        this.playLayer.stopAllActions();
        this.playLayer.unscheduleUpdate();
        this.moveMap.stop();
        this.gameSceneMonster.stopAllActions();
        this.gameSceneMonster.unscheduleUpdate();

        //this.gameSceneMonster.unscheduleUpdate();

        this.menuLayer.unscheduleUpdate();

        this.addChild(overLayer, 10);
    },
    pause:function(){
        console.log("will pause.");
        this.gameSceneMonster.pause();
        console.log("will pause end.");
    },
    play:function(){
        console.log("game continue.");
        this.gameSceneMonster.play();
    },
    //tick: update all action of per-node in per-frame.
    update:function(dt){
        //console.log("update.");
        var imManArmature = this.playLayer.imManArmature;
        var actionNum = this.playLayer.actionNum;
        if(actionNum == this.playLayer.ACTION_RUN)
        {
            this.playLayer.playerBoundingBox = cc.rect(imManArmature.getPosition().x-imManArmature.getContentSize().width/2+46,
                imManArmature.getPosition().y,imManArmature.getContentSize().width-90,imManArmature.getContentSize().height-50);
        }
        else if(actionNum == this.playLayer.ACTION_STAND_JUMP)
        {
            this.playLayer.playerBoundingBox = cc.rect(imManArmature.getPosition().x-imManArmature.getContentSize().width/2+30,
                imManArmature.getPosition().y,imManArmature.getContentSize().width-50,imManArmature.getContentSize().height-50);
        }
        else if(actionNum == this.playLayer.ACTION_RUN_JUMP)
        {
            this.playLayer.playerBoundingBox = cc.rect(imManArmature.getPosition().x-imManArmature.getContentSize().width/2+33,
                imManArmature.getPosition().y,imManArmature.getContentSize().width-70,imManArmature.getContentSize().height-50);
        }
        else if(actionNum == this.playLayer.ACTION_RUN_STOP)
        {
            this.playLayer.playerBoundingBox = cc.rect(imManArmature.getPosition().x-imManArmature.getContentSize().width/2+40,
                imManArmature.getPosition().y,imManArmature.getContentSize().width-110,imManArmature.getContentSize().height-45);
        }
        else if(actionNum == this.playLayer.ACTION_RUN_ATTACK)
        {
            this.playLayer.playerBoundingBox = cc.rect(imManArmature.getPosition().x-imManArmature.getContentSize().width/2,
                imManArmature.getPosition().y,imManArmature.getContentSize().width,imManArmature.getContentSize().height);

        }
        else if(actionNum == this.playLayer.ACTION_STAND_ATTACK)
        {
            this.playLayer.playerBoundingBox = cc.rect(imManArmature.getPosition().x-imManArmature.getContentSize().width/2,
                imManArmature.getPosition().y,imManArmature.getContentSize().width,imManArmature.getContentSize().height);

        }
        else if(actionNum == this.playLayer.ACTION_DEATH)
        {
            this.playLayer.playerBoundingBox = cc.rect(imManArmature.getPosition().x-imManArmature.getContentSize().width/2,
                imManArmature.getPosition().y,imManArmature.getContentSize().width,imManArmature.getContentSize().height);
        }

        if(this.gameSceneMonster.MonsterIndex == MonsterType.MonsterGround_enum)
        {
            this.gameSceneMonster.MonsterAmatureBoundingBox = cc.rect(this.gameSceneMonster.MonsterAmature.getPosition().x-
                this.gameSceneMonster.MonsterAmature.getContentSize().width/2+45,this.gameSceneMonster.MonsterAmature.getPosition().y+21,
                this.gameSceneMonster.MonsterAmature.getContentSize().width-90,this.gameSceneMonster.MonsterAmature.getContentSize().height-90);
        }
        else if(this.gameSceneMonster.MonsterIndex == MonsterType.MonsterSky_enum)
        {
            this.gameSceneMonster.MonsterAmatureBoundingBox = cc.rect(this.gameSceneMonster.MonsterAmature.getPosition().x-
                this.gameSceneMonster.MonsterAmature.getContentSize().width/2+45,this.gameSceneMonster.MonsterAmature.getPosition().y+21,
                this.gameSceneMonster.MonsterAmature.getContentSize().width-90,this.gameSceneMonster.MonsterAmature.getContentSize().height-90);
        }

        if (cc.rectIntersectsRect(this.playLayer.playerBoundingBox, this.gameSceneMonster.MonsterAmatureBoundingBox))
        {
            //this.unscheduleUpdate();
            //gameSceneMonster.MonsterDestroyAction();

            var shark = CCShake.create(0.3, 10);
            this.playLayer.runAction(shark);
            this.playLayer.imManArmatureBrood-=1;
            if(this.playLayer.imManArmatureBrood<1)
            {
                GameScene.getScene().menuLayer.setBloodBarPercent(0);
                this.unscheduleUpdate();
                this.playLayer.IMDeath();
                return;
            }

            GameScene.getScene().menuLayer.setBloodBarPercent(this.playLayer.imManArmatureBrood);
        }
    }
});

GameScene.Scene = null;
GameScene.getScene = function(){
    return this.Scene;
}
