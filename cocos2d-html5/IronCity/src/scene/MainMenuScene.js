var MainMenuScene = cc.Scene.extend({

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
        var mainMenu = cc.Menu.create(startBtn);
        mainMenu.setAnchorPoint(cc.p(0, 0));
        mainMenu.setPosition(cc.p(size.width/2, size.height/5));

        menuLayer.addChild(mainMenu,1);
        this.addChild(menuLayer);
    },

    startBtnCallFunc:function() {

        var gameScene = new GameScene();
        gameScene.init();

        var gameSceneTransition = cc.TransitionFade.create(0.5, gameScene, cc.white());
        cc.Director.getInstance().replaceScene(gameSceneTransition);
    }
});

