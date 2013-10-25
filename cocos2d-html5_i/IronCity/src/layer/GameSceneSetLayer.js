/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-23
 * Time: 下午2:59
 * To change this template use File | Settings | File Templates.
 */

var GameSceneSetLayer = cc.UILayer.extend({
    musicEffectStatus:0,
    musicEffectSlider:null,
    musicVolumeSlider:null,
    parentScene:null,
    init:function(effectStatus, volumn){
        if( cc.UILayer.prototype.init.call(this) ){
            this.parentScene = GameScene.getScene();
            this.parentScene.moveMap.stop();
            this.parentScene.stopAllActions();
            this.parentScene.playLayer.stopAllActions();
            this.parentScene.playLayer.setTouchEnabled(false);
            //parentScene.gameSceneMonster.MonsterAmature.pauseSchedulerAndActions();
            this.parentScene.playLayer.imManArmature.pauseSchedulerAndActions();
            this.parentScene.menuLayer.settingBtn.setTouchEnable(false);

            this.addWidget(cc.UIHelper.getInstance().createWidgetFromJsonFile(Json_GameSceneSetMenu_1));

            this.musicEffectSlider = this.getWidgetByName("musicEffect");
            this.musicVolumeSlider = this.getWidgetByName("musicVolume");
            var backGameBtn = this.getWidgetByName("backGame");
            var returnMainMenuBtn = this.getWidgetByName("returnMainMenu");

            this.musicEffectStatus = effectStatus;

            if(this.musicEffectStatus == 0){

                this.musicEffectSlider.setPercent(15);
            }else if(this.musicEffectStatus == 1){

                this.musicEffectSlider.setPercent(95);
            }
            this.musicVolumeSlider.setPercent(volumn);

            backGameBtn.addTouchEventListener(this, this.backGameBtn);
            returnMainMenuBtn.addTouchEventListener(this, this.returnMainMenuBtnFunc);
            this.musicEffectSlider.addEventListener(this, this.musicEffectSliderCallFunc);
            this.musicVolumeSlider.addEventListener(this, this.musicVolumeSliderCallFunc);
            return true;
        }

        return false;
    },
    musicEffectSliderCallFunc:function(pSender, type){
        if(type == cc.SliderEventType.PERCENTCHANGED){
            if(this.musicEffectStatus == 0){
                this.musicEffectSlider.setPercent(95);
                this.musicEffectStatus=1;
            }else if(this.musicEffectStatus == 1){

                this.musicEffectSlider.setPercent(15);
                this.musicEffectStatus=0;
            }
        }

        this.parentScene.menuLayer.musicEffect = this.musicEffectStatus;
        //set audio state.
        //AudioPlayer::sharedAudio()->setBackgroundMusicPlay(musicEffectStatus);
    },
    musicVolumeSliderCallFunc:function(pSender, type){
        var voice = 0.0;
        if(type == cc.SliderEventType.PERCENTCHANGED){
            voice = this.musicVolumeSlider.getPercent();
            if(this.musicVolumeSlider.getPercent()<8){
                this.musicVolumeSlider.setPercent(8);
                voice=0.0;
            }else if(this.musicVolumeSlider.getPercent()>95){
                this.musicVolumeSlider.setPercent(95);
                voice=100.0;
            }
        }

        this.parentScene.menuLayer.musicVolume = this.musicVolumeSlider.getPercent();
        //set audio voice.
        //AudioPlayer::sharedAudio().setVolume(voice/100);
    },
    backGameBtn:function(pSender, type){
        if(cc.TouchEventType.ENDED == type){
            this.parentScene.resumeSchedulerAndActions();
            this.parentScene.playLayer.imManArmature.resumeSchedulerAndActions();
            this.parentScene.playLayer.setTouchEnabled(true);

            var currentMovementId = this.parentScene.playLayer.imManArmature.getAnimation().getCurrentMovementID();
            cc.log("currentMovementId is %s", currentMovementId);
            if(currentMovementId.compare("") !=0 && (currentMovementId.compare("Running")==0 || currentMovementId.compare("RuningJump")==0))
                this.parentScene.moveMap.move();

            //this.parentScene.gameSceneMonster.MonsterAmature.resumeSchedulerAndActions();
            this.parentScene.menuLayer.settingBtn.setTouchEnable(true);

            //this.removeAllChildren();
            this.removeFromParent(true);
        }
    },
    returnMainMenuBtnFunc:function(pSender, type){
        var mainMenuScene =  new MainMenuScene();
        mainMenuScene.init();

        var mainMenuSceneTransition =  cc.TransitionFade.create(0.5, mainMenuScene, cc.WHITE);
        cc.Director.getInstance().replaceScene(mainMenuSceneTransition);
    }
});