/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-24
 * Time: 下午3:06
 * To change this template use File | Settings | File Templates.
 */

var Laser = cc.Sprite.extend({
    _idx:0,
    dir_x:0,
    dir_y:0,
    speed:0,
    init:function(idx, pos, direction){
        this.initWithFile(Png_laser);
        this.setPosition(pos);
        this.setAnchorPoint(cc.p(0, 0));
        this.setRotation(direction*180/3.14159);

        this._idx = idx;
        this.speed = 12;
        this.dir_x = Math.cos(direction);
        this.dir_y = -Math.sin(direction);
    },
    releaseLaser:function(){
        (this.getParent()).removeLaser(this._idx);
    },
    ifOutSideWall:function(){
        var winSize = cc.Director.getInstance().getWinSize();
        if(winSize.width < 480)
            winSize.width = 480;
        if(winSize.height < 320)
            winSize.height = 320;
        var laserX = this.getPositionX();
        var laserY = this.getPositionY();

        if(laserX < 0.0 || laserX > winSize.width || laserY < 0.0 || laserY > winSize.height){
            return true;
        }

        return false;
    },
    inRect:function(rect){
        var _org = this.getPosition();
        for (var i=0; i<100; i++) {
            var _p = cc.pAdd(_org, cc.p(this.dir_x*i, this.dir_y*i));
            if (cc.rectContainsPoint(rect, _p)) {
                return true;
            }
        }
        return false;
    },
    update:function(){
        if (this.ifOutSideWall()) {
            this.releaseLaser();
            return;
        }
        if (this.inRect(GameScene.getScene().gameSceneMonster.MonsterAmatureBoundingBox))
        {
            //add score.
            var type = GameScene.getScene().gameSceneMonster.MonsterIndex;
            if (type == MonsterType.MonsterSky_enum) {
                GameScene.getScene().playLayer.addMonsterSkyAmount();
                //AudioPlayer::sharedAudio()->playEffect(Effect_Monster_Dead_0);
            }
            else if (type == MonsterType.MonsterGround_enum){
                GameScene.getScene().playLayer.addMonsterGroundAmount();
                //AudioPlayer::sharedAudio()->playEffect(Effect_Monster_Dead_1);
            }
            if(!GameScene.getScene().isRectDetectedLock)
            {
                GameScene.getScene().isRectDetectedLock = true;
                //delete monster.
                GameScene.getScene().gameSceneMonster.MonsterDestroyAction();
            }
            //delete self.
            this.releaseLaser();

            return;
        }

        var pos = this.getPosition();
        pos.x += this.dir_x * this.speed;
        pos.y += this.dir_y * this.speed;
        this.setPosition(pos);
    }
});
var LaserManager = cc.Layer.extend({
    lasers:null,
    topNum:0,
    attackTime:0,
    init:function(){
        this.topNum = 0;
        this.attackTime = 0;
        this.lasers = [];
        //this->scheduleUpdate();
        return true;
    },
    getIndex:function(){
        for (var i=0; i<this.topNum; i++) {
            if (this.lasers[i] == null) {
                return i;
            }
        }

        return this.topNum;
    },
    update:function(dt){
        if (this.attackTime > 0) {
            this.attackTime --;
        }
        for (var i=0; i<this.topNum; i++) {
            if (this.lasers[i] != null) {
                this.lasers[i].update();
            }
        }
    },
    addLaser:function(pos, dir){
        if (this.attackTime > 0) {
            return;
        }
        var idx = this.getIndex();
        var laser = new Laser();
        laser.init(idx, pos, dir);
        this.addChild(laser);

        this.lasers[idx] = laser;
        if (idx >= this.topNum) {
            this.topNum++;
        }

        this.attackTime = 20;
    },
    removeLaser:function(idx){
        this.lasers[idx].removeFromParent(true);
        this.lasers[idx] = null;
    }
});