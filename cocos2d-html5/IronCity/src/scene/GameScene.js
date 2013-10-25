var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var moveMap = new MovedMap();
        moveMap.init();
        this.addChild(moveMap, 0);

        var playLayer = new GameScenePlayLayer();
        playLayer.init();
        this.addChild(playLayer, 0);
    }
});

