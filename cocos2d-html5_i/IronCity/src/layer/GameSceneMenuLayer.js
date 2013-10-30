/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-23
 * Time: 下午1:56
 * To change this template use File | Settings | File Templates.
 */

//layer: game menu.
var GameSceneMenuLayer = cc.UILayer.extend({
    parentScene:null,
    settingBtn:null,
    bloodBar:null,
    distanceScore:null,
    musicEffect:null,
    musicVolume:null,
    init:function(bloodBarPercent, value){
        if( cc.UILayer.prototype.init.call(this) ){
            this.parentScene = GameScene.getScene();
            this.addWidget( cc.UIHelper.getInstance().createWidgetFromJsonFile(Json_IronCityUI_1) );

            this.settingBtn    = this.getWidgetByName("Setting");
            this.bloodBar      = this.getWidgetByName("BloodBar");
            this.distanceScore = this.getWidgetByName("DistanceScore");

            this.settingBtn.addTouchEventListener(this, this.settingBtnCallback);
            this.setBloodBarPercent(bloodBarPercent);
            this.setDistanceScore(value);

            this.musicEffect = 0;
            this.musicVolume = 50;

            return true;
        }
        return false;
    },
    //set blood.
    setBloodBarPercent:function(percent){
        this.bloodBar.setPercent(percent);
    },
    //set distance score.
    setDistanceScore:function(value){
        this.distanceScore.setStringValue(value);
    },
    //call back function of setting button.
    settingBtnCallback:function(pSender, type){
        //if(cc.TouchEventType.BEGAN == type){
        if(cc.TouchEventType.ENDED == type){
            this.parentScene = GameScene.getScene();
            var gameSetLayer = new GameSceneSetLayer();
            gameSetLayer.init(this.musicEffect, this.musicVolume);

            gameSetLayer.setAnchorPoint(cc.p(0, 0));
            gameSetLayer.setPosition(cc.p(0, 0));

            //console.log("scene:", this.parentScene, "setLayer: ", gameSetLayer);
            this.parentScene.addChild(gameSetLayer,4);
            this.parentScene.pause();
            //console.log("click set, and goto setLayer.");
            return true;
        }
    },
    //get score of distance.
    getDistanceScore:function(){
        return this.distanceScore.getStringValue();
    }
});
