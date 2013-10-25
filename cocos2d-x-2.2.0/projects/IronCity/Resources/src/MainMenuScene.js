
var MainMenu = cc.Layer.extend({
    init:function () {
        var selfPointer = this;

        this._super();

        var size = cc.Director.getInstance().getWinSize();

        this.helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
        this.helloLabel.setPosition(cc.p(size.width >> 1, this.helloLabel.getContentSize().height>>1));
        this.addChild(this.helloLabel, 5);
/*
        var gameScene = new GameScene();
        gameScene.init();
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.0, gameScene));
*/
        return true;
    }
});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenu();
        layer.init();
        this.addChild(layer);

    }
});

