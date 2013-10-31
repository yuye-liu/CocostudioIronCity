/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-14
 * Time: 上午10:45
 * To change this template use File | Settings | File Templates.
 */
var arrMap0 = [s_bg_1, s_bg_2, s_bg_3];     //map 1.
var arrMap1 = [s_bg_10, s_bg_11, s_bg_12];  //map 2.
var arrMap2 = [s_bg_20, s_bg_21, s_bg_22];  //map 3.
var arrBgs = [arrMap1, arrMap0, arrMap2];   //map array.

//one tiledmap.
var TiledMap = cc.Node.extend({    //load one tiledmap.
    //init function.
    init:function(arr, index){
        //add tiled
        var bg_index = index;
        if(!bg_index) bg_index = getRandN(3);
        if(bg_index < 0 ) bg_index = 0;
        if(bg_index > arrBgs.length) bg_index = arrBgs.length - 1;

        var map = cc.TMXTiledMap.create(arr[index]);
        this.addChild(map);
        this.index = bg_index;
    },
    //tick self.
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
//one group tiled map.
var mapGet = cc.Node.extend({  //load one group tiledmap.
    _length:null,   //width of this.
    _bInMap:null,   //mark of is in map.
    _bCanAddMap:null,   //mark of is can add map.
    _hasNextMap:null,   //mark of already has next map.
    _mapIdx:null,   //index of map.
    init:function(index){
        if(!index) index = 0;
        this.objects = [];
        for(var i=arrBgs[index].length-1; i>=0; i--){
            var tilemap = new TiledMap();
            tilemap.init(arrBgs[index], i);
            tilemap.setPositionX(i*g_w);
            this.addChild(tilemap);
        }

        this._length = arrMap0.length * g_w;
        if(this._length < MIN_WIN_SIZE_W) this._length = MIN_WIN_SIZE_W;
        this._mapIdx = index;
        this._bInMap = true;
        this._bCanAddMap = false;
        this._hasNextMap = false;

        return true;
    },
    //get width of map.
    getW:function(){    //get this's width.
        return this._length;
    },
    //get status of this.
    isInMap:function(){
        return this._bInMap;
    },
    //tick map.
    update:function(){
        //if isn't in map return.
        if(!this._bInMap){
            return;
        }
        var p_x = this.getPositionX();
        //if out of size of window.
        if(p_x <= -this._length){
            this._bInMap = false;   //set _bInMap false.
            this.getParent().refreshMap();  //refresh map and return.
            return;
        }
        if(p_x <= -g_w/2 && p_x >= -g_w*2){
            this._bCanAddMap = true;    //set _bCanAddMap true.
        }
        if(this._bCanAddMap && !this._hasNextMap){  //add map if reach two condition.
            this.getParent().addNextMap();  //add map.
            this._bCanAddMap = false;   //set _bCanAddMap false.
            this._hasNextMap = true;    //set _hasNextMap true.
        }
        p_x -= g_map_move_speed;
        //move.
        if(this._bInMap && p_x >= -this._length - g_map_move_speed){
            this.setPositionX(p_x);
        }
    }
});

var g_w = 480;      //default screen width.
var g_map_move_speed = 3;   //map move speed.
var g_count = 0;    //for count
//whole map and map manager.
var MovedMap = cc.Node.extend({    //move map for game.
    arrMaps:null,   //curmap is arrMaps[0].
    _curW:null,     //current width of map.
    bMove:null,     //mark of map move.
    _distance:null, //distance of map move.
    //init function.
    init:function(){
        //add colorlayer, set a default color of background.
        var colorLy = cc.LayerColor.create(cc.c4b(43,49,62,0));
        //colorLy.setContentSize(cc.rect(480, 320));
        this.addChild(colorLy);

        //the first map.
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
    },
    //set move speed.
    setMovedSpeed:function(speed){
        g_map_move_speed = speed;
    },
    //get move speed.
    getMoveSpeed:function(){
        return g_map_move_speed;
    },
    //add next map.
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
    },
    //refresh map: delete map isn't in screen.
    refreshMap:function(){
        this.arrMaps[0].removeFromParent(true);
        this.arrMaps[0] = this.arrMaps[1];
        this.arrMaps.pop();
    },
    //tick map.
    update:function(dt){
        //if is not move, return.
        if(!this.bMove)
        {
            return;
        }
        //tick all child map.
        for(var i=0; i<this.arrMaps.length; i++){
            if( this.arrMaps[i] != null && this.arrMaps[i].isInMap())
                this.arrMaps[i].update();
        }

        this._distance += g_map_move_speed; //calculate distance.
        if(GameScene.getScene() && GameScene.getScene().menuLayer)
            GameScene.getScene().menuLayer.setDistanceScore(this._distance);
    },
    //stop move the map.
    stop:function(){
        if(!this.bMove)
            return;
        this.bMove = false;
    },
    //move the map.
    move:function(){
        if(this.bMove)
            return;
        this.bMove = true;
    },
    //get distance of map move.
    getDistance:function(){
        return this._distance;
    }
});

//get random number 0~n
var getRandN = function(num){
    var aNum = cc.RANDOM_0_1() * num | 0;
    return aNum;
}