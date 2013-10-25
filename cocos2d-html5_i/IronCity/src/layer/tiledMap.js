/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-14
 * Time: 上午10:45
 * To change this template use File | Settings | File Templates.
 */
var arrMap0 = [s_bg_1, s_bg_2, s_bg_3];
var arrMap1 = [s_bg_10, s_bg_11, s_bg_12];
var arrMap2 = [s_bg_20, s_bg_21, s_bg_22];
var arrBgs = [arrMap1, arrMap0, arrMap2];

var TiledMap = cc.Layer.extend({    //load one tiledmap.
    objects:null,
    init:function(arr, index){
        //add tiled
        var bg_index = index;
        if(!bg_index) bg_index = getRandN(3);
        if(bg_index < 0 ) bg_index = 0;
        if(bg_index > arrBgs.length) bg_index = arrBgs.length - 1;
        //console.log("index", index);
        var map = cc.TMXTiledMap.create(arr[index]);
        //var map = cc.TMXTiledMap.create(s_bg_10);
        this.addChild(map);
        this.index = bg_index;

        this.objects = map.getObjectGroups();
        //console.log(arr[index]);
        //if(this.objects[0])
        //    console.log("this.objects: ", this.objects[0]._objects);
    },
    getObjects:function(){
        return this.objects;
    },
    update:function(){
        var pos_x = this.getPositionX();

        if(pos_x >= -g_w){
            pos_x -= g_map_move_speed;
            this.setPositionX(pos_x);
        }
        else{
            this.getParent().refreshMap();
        }
    }
});

var MIN_WIN_SIZE_W =  480;
var mapGet = cc.Layer.extend({  //load one group tiledmap.
    _length:null,
    _bInMap:null,
    _bCanAddMap:null,
    _hasNextMap:null,
    _mapIdx:null,
    objects:null,
    init:function(index){
        if(!index) index = 0;
        //console.log(arrBgs[index]);
        this.objects = [];
        for(var i=arrBgs[index].length-1; i>=0; i--){
            var tilemap = new TiledMap();
            tilemap.init(arrBgs[index], i);
            tilemap.setPositionX(i*g_w);
            this.addChild(tilemap);

            this.objects.push(tilemap.getObjects());
        }

        this._length = arrMap0.length * g_w;
        if(this._length < MIN_WIN_SIZE_W) this._length = MIN_WIN_SIZE_W;
        this._mapIdx = index;
        this._bInMap = true;
        this._bCanAddMap = false;
        this._hasNextMap = false;

        return true;
    },
    getObjects:function(){
        return this.objects;
    },
    getW:function(){    //get this's width.
        return this._length;
    },
    isInMap:function(){
        return this._bInMap;
    },
    update:function(){
        if(!this._bInMap){
            return;
        }
        var p_x = this.getPositionX();
        if(p_x <= -this._length){
            this._bInMap = false;
            this.getParent().refreshMap();
            return;
        }
        if(p_x <= -g_w/2 && p_x >= -g_w*2){
            this._bCanAddMap = true;
        }
        if(this._bCanAddMap && !this._hasNextMap){
            this.getParent().addNextMap();
            this._bCanAddMap = false;
            this._hasNextMap = true;
        }
        p_x -= g_map_move_speed;
        if(this._bInMap && p_x >= -this._length - g_map_move_speed){
            this.setPositionX(p_x);
        }
    }
});

var g_w = 480;      //default screen width.
var g_map_move_speed = 3;   //map move speed.
var g_count = 0;    //for count

var MovedMap = cc.Layer.extend({    //move map for game.
    arrMaps:null,   //curmap is arrMaps[0].
    _curW:null,
    bMove:null,
    _distance:null,
    init:function(){
        //add colorlayer
        var colorLy = cc.LayerColor.create(cc.c4b(43,49,62,0));
        //colorLy.setContentSize(cc.rect(480, 320));
        this.addChild(colorLy);

        this.objects = [];
        var map0 = new mapGet();
        map0.init(1);
        this._curW = map0.getW();
        this.addChild(map0);

        this.lastIdx = 1;
        this.arrMaps = [];
        this.arrMaps[0] = map0;
        this.bMove = false;
        this._distance = 0.0;

        this.scheduleUpdate();
        //this.setTouchEnabled(true);
        //this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
    },
    setMovedSpeed:function(speed){
        g_map_move_speed = speed;
    },
    getMoveSpeed:function(){
        return g_map_move_speed;
    },
    addNextMap:function(){
        var idx = getRandN(2);
        if( idx == this.lastIdx ){
            idx = 2;
        }
        var map_n = new mapGet();
        map_n.init(idx);
        map_n.setPositionX(this._curW + this.arrMaps[0].getPositionX());
        this.addChild(map_n);
        this._curW = map_n.getW();
        this.arrMaps.push(map_n);
        this.lastIdx = idx;

        //console.log("add nextmap, this.arrMaps.length", this.arrMaps.length);
    },
    refreshMap:function(){
        //console.log("---refresh map.");
        this.arrMaps[0].removeFromParent(true);
        //this.removeChild(this.arrMaps[0]);
        //for(var i=0; i<2; i++){
        //    this.arrMaps[i] = this.arrMaps[i+1];
        //}
        this.arrMaps[0] = this.arrMaps[1];
        this.arrMaps.pop();
    },
    getObjects:function(){  //get current map's objects.
        return this.arrMaps[0].getObjects();
    },
    update:function(dt){
        if(!this.bMove)
        {
            return;
        }
        for(var i=0; i<this.arrMaps.length; i++){
            if( this.arrMaps[i] != null && this.arrMaps[i].isInMap())
                this.arrMaps[i].update();
        }

        this._distance += g_map_move_speed;
        if(GameScene.getScene() && GameScene.getScene().menuLayer)
            GameScene.getScene().menuLayer.setDistanceScore(this._distance);
    },
    stop:function(){
        if(!this.bMove)
            return;
        this.bMove = false;
    },
    move:function(){
        if(this.bMove)
            return;
        this.bMove = true;
    },
    getDistance:function(){
        return this._distance;
    }
});

//get random number 0~n
var getRandN = function(num){
    var aNum = cc.RANDOM_0_1() * num | 0;
    return aNum;
}