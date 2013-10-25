/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-23
 * Time: 下午1:56
 * To change this template use File | Settings | File Templates.
 */

var GameSceneMenuLayer = cc.UILayer.extend({
    parentScene:null,
    settingBtn:null,
    broodBar:null,
    distanceScore:null,
    musicEffect:null,
    musicVolume:null,
    init:function(broodBarPercent, value){
        if( cc.UILayer.prototype.init.call(this) ){
            this.parentScene = GameScene.getScene();
            this.addWidget( cc.UIHelper.getInstance().createWidgetFromJsonFile(Json_IronCityUI_1) );

            this.settingBtn    = this.getWidgetByName("Setting");
            this.broodBar      = this.getWidgetByName("BroodBar");
            this.distanceScore = this.getWidgetByName("DistanceScore");

            this.settingBtn.addTouchEventListener(this, this.settingBtnCallback);
            this.setBroodBarPercent(broodBarPercent);
            this.setDistanceScore(value);

            this.musicEffect = 0;
            this.musicVolume = 50;

            return true;
        }
        return false;
    },
    setBroodBarPercent:function(percent){
        this.broodBar.setPercent(percent);
    },
    setDistanceScore:function(value){
        this.distanceScore.setStringValue(value);
    },
    settingBtnCallback:function(pSender, type){
        if(cc.TouchEventType.BEGAN == type){
            this.parentScene = GameScene.getScene();
            var gameSetLayer = new GameSceneSetLayer();
            gameSetLayer.init(this.musicEffect, this.musicVolume);

            gameSetLayer.setAnchorPoint(cc.p(0, 0));
            gameSetLayer.setPosition(cc.p(0, 0));

            console.log("scene:", this.parentScene, "setLayer: ", gameSetLayer);
            this.parentScene.addChild(gameSetLayer,4);
            console.log("click begin, and goto setLayer.");
            return true;
        }
    },
    getDistanceScore:function(){
        return this.distanceScore.getStringValue();
    }
});