var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene)
    {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching:function ()
    {
        if(cc.RenderDoesnotSupport())
        {
            //show Information to user
            alert("Browser doesn't support WebGL");
            return false;
        }
        var director = cc.Director.getInstance();
        //get the real device screen size
        var screenSize = cc.EGLView.getInstance().getFrameSize();
        var resourceSize = cc.size(480, 800);
        var designSize = cc.SizeMake(480, 320);
        //initial a array for push the files' path in
        var resDirOrders = [];
        //get platform method
        var platform = cc.Application.getInstance().getTargetPlatform();
        if (platform == cc.TARGET_PLATFORM.MOBILE_BROWSER)
        {
            // add the resource's file to game for recognition
            resDirOrders.push("HD");
        }
        else if (platform == cc.TARGET_PLATFORM.PC_BROWSER)
        {
            if (screenSize.height >= 800)
            {
                resDirOrders.push("HD");
            }
        }
        //set the resources's paths for searching in game
        cc.FileUtils.getInstance().setSearchResolutionsOrder(resDirOrders);

        //auto zooming the sources to right scale
        director.setContentScaleFactor(resourceSize.width / designSize.width);
        //revising the right screen objects' position  by 5 types's resolution
        cc.EGLView.getInstance().setDesignResolutionSize(480, 320, cc.RESOLUTION_POLICY.NO_BORDER);

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        //preload resources and relpaceScene
        cc.LoaderScene.preload(g_resources, function ()
        {
            director.replaceScene(new this.startScene());
        }, this);

        return true;
    }
});
var myApp = new cocos2dApp(MainMenuScene);
