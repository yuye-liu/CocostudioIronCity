/**
 * Created with JetBrains WebStorm.
 * User: cocos
 * Date: 13-10-24
 * Time: 下午2:10
 * To change this template use File | Settings | File Templates.
 */
/*VisibleRect*/
var s_visibleRect = cc.RectZero();

var VisibleRect = {
    left:function () {
        this.lazyInit();
        return cc.p(s_visibleRect.origin.x, s_visibleRect.origin.y+s_visibleRect.size.height/2);
    },
    right:function () {
        this.lazyInit();
        return cc.p(s_visibleRect.origin.x+s_visibleRect.size.width, s_visibleRect.origin.y+s_visibleRect.size.height/2);
    },
    top:function () {
        this.lazyInit();
        return cc.p(s_visibleRect.origin.x+s_visibleRect.size.width/2, s_visibleRect.origin.y+s_visibleRect.size.height);
    },
    bottom:function () {
        this.lazyInit();
        return cc.p(s_visibleRect.origin.x+s_visibleRect.size.width/2, s_visibleRect.origin.y);
    },
    center:function () {
        this.lazyInit();
        return cc.p(s_visibleRect.origin.x+s_visibleRect.size.width/2, s_visibleRect.origin.y+s_visibleRect.size.height/2);
    },
    leftTop:function () {
        this.lazyInit();
        return cc.p(s_visibleRect.origin.x, s_visibleRect.origin.y+s_visibleRect.size.height);
    },
    rightTop:function () {
        this.lazyInit();
        return cc.p(s_visibleRect.origin.x+s_visibleRect.size.width, s_visibleRect.origin.y+s_visibleRect.size.height);
    },
    rect:function () {
        this.lazyInit();
        return s_visibleRect;
    },
    leftBottom:function () {
        this.lazyInit();
        return s_visibleRect.origin;
    },
    rightBottom:function () {
        this.lazyInit();
        return cc.p(s_visibleRect.origin.x+s_visibleRect.size.width, s_visibleRect.origin.y);
    },
    getVisibleRect:function(){
        this.lazyInit();
        return cc.rect(s_visibleRect.origin.x, s_visibleRect.origin.y, s_visibleRect.size.width, s_visibleRect.size.height);
    },
    lazyInit:function(){
        //console.log("s_visibleRect.size:", s_visibleRect.size, s_visibleRect);
        if (s_visibleRect.size.width == 0.0 && s_visibleRect.size.height == 0.0)
        {
            s_visibleRect.origin = cc.p(0, 0);
            s_visibleRect.size = cc.Director.getInstance().getWinSize();
            //console.log("s_visibleRect: ", s_visibleRect);
        }
    }
};
//var screenWidth = VisibleRect.rect().width;
//var screenHeight = VisibleRect.rect().height;