/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-23
 * Time: 下午3:36
 * To change this template use File | Settings | File Templates.
 */

var GameSceneOverLayer = cc.UILayer.extend({
    finalScore:null,
    parentScene:null,
    init:function(){
        if( cc.UILayer.prototype.init.call(this) ){
            this.parentScene = GameScene.getScene();
            this.addWidget(cc.UIHelper.getInstance().createWidgetFromJsonFile(Json_GameSceneOverLayer_1));

            var playAgainBtn        = this.getWidgetByName("playAgain");
            var monsterGroundAmount = this.getWidgetByName("monsterGroundLabel");
            var monsterSkyAmount    = this.getWidgetByName("monsterSkyLabel");
            var distanceScore      = this.getWidgetByName("distanceScore");
            this.finalScore = this.getWidgetByName("finalScore");

            playAgainBtn.setTouchEnabled(true);
            playAgainBtn.addTouchEventListener(this, this.playAgainBtnCallback);
            console.log("playAgainBtn: ", playAgainBtn);

            var monsterGroundCount= this.parentScene.playLayer.getMonsterGroundAmount();
            monsterGroundAmount.setText(monsterGroundCount);

            var monsterSkyCount= this.parentScene.playLayer.getMonsterSkyAmount();
            monsterSkyAmount.setText(monsterSkyCount);

            distanceScore.setStringValue(this.parentScene.menuLayer.getDistanceScore());
            this.calculateFinalScore(monsterGroundCount*88 , monsterSkyCount*66 , this.parentScene.menuLayer.getDistanceScore());

            //this.setTouchEnabled(true);
            //this.setTouchMode(cc.TouchMode);
            return true;
        }
        return false;
    },
//    onTouchBegan:function(touch){
//        console.log("touch", touch);
//    },
//    onTouchesBegan:function(touch){
//        console.log("touches", touch);
//    },
    calculateFinalScore:function(monsterSkyAmountValue, monsterGroundAmountValue, distanceScoreValue){
        var distanceScore = 0;
        distanceScore = distanceScoreValue;

        var score = monsterSkyAmountValue + monsterGroundAmountValue + distanceScore * 3;
        this.finalScore.setStringValue(score);
    },
    playAgainBtnCallback:function(pSender, type){
        console.log("playAgainBtnCallback: ", pSender, type);
        if(cc.TouchEventType.BEGAN == type){
            var againScene = new GameScene();
            againScene.init();
            var playAgainTransition =  cc.TransitionFade.create(0.5, againScene, cc.WHITE);
            cc.Director.getInstance().replaceScene(playAgainTransition);
        }
    }
});