var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var playLayer = new GameScenePlayLayer();
        playLayer.init();
        this.addChild(playLayer, 0);

    }
});

