//png
var Png_MainMenuSceneBK     = "res/iphone/MainMenuSceneBK.png";
var Png_StartBtn             = "res/iphone/StartBtn.png";
var Png_StartBtnPush        = "res/iphone/StartBtnPush.png";
var Png_loadingPng           = "res/iphone/loading.png";
//music
var mp3_music_background    = "res/music/music_background.mp3";
//preload
var MainMenuScene_resources =
[
    {src:mp3_music_background},
    {src:Png_MainMenuSceneBK},
    {src:Png_StartBtn},
    {src:Png_StartBtnPush},
    {src:Png_loadingPng}
];
//scene: main menu.
var MainMenuScene = cc.Scene.extend
({
    mainMenu:null,      //menu layer.
    onEnter:function ()
    {
        this._super();
        // Add a Layer
        var menuLayer = cc.Layer.create();
        // Get screen size
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

        // Play music
        AudioPlayer.getInstance();
    },
    //click btn of start.
    startBtnCallFunc:function(pSender)
    {
        //preload resources and relpaceScene
        cc.LoaderScene.preload(GameScene_resources, function ()
        {
            // initial gameScene
            var gameScene = new GameScene();
            gameScene.init();
            // set gameScene transition animation
            var gameSceneTransition = cc.TransitionFade.create(0.5, gameScene, cc.white());
            cc.Director.getInstance().replaceScene(gameSceneTransition);
        }, this);
    }
});

