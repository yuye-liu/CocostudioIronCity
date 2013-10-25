/**
 * Created by test on 13-9-29.
 */
var Test = cc.Layer.extend({
    init:function () {
        this._super();
        return true;
    }
});

var TestScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

/*
        var animFrames = [];
        var str = "";
        for (var i = 1; i < 4; i++) {
           // str = "explosion_" + (i < 10 ? ("0" + i) : i) + ".png";
            str = "shanDian" + i + ".png";
            var frame =cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.create(animFrames, 0.04);
        cc.AnimationCache.getInstance().addAnimation(animation, "Explosion");
        //运行动画
        var animation = cc.AnimationCache.getInstance().getAnimation("Explosion");
        this.runAction(cc.Sequence.create(
            cc.Animate.create(animation)
        ));

*/
/*
//var texture = cc.TextureCache.sharedTextureCache().addImage("Resources/dragon_animation.png");//将图片资源存入缓存，以减少内存
        var texture =cc.TextureCache.sharedTextureCache().addImage("res/shanDian1.png");//将图片资源存入缓存，以减少内存
//manually add frames to the frame cache手动添加边框帧缓存

//在加载的图片对象上，定位一个方位及宽高，就可以创建一个精灵帧
        var frame0 = cc.SpriteFrame.create(texture, cc.RectMake(104, 0, 64,110));
        var frame1 = cc.SpriteFrame.create(texture, cc.RectMake(231, 0, 64,110));
*/
        //var y=cc.RANDOM_0_1() * s.height;
        var sprite = cc.Sprite.create("res/shanDian1.png");//创建一个精灵帧
        sprite.setPosition(cc.p(155, 100));
        this.addChild(sprite);

        var animFrames = [];//将所有帧存入一个数组
        for (var i = 1; i < 4; i++) {
            str = "res/shanDian" + i + ".png";
            var texture =cc.TextureCache.getInstance().addImage(str);//将图片资源存入缓存，以减少内存
            var frame =cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.createWithAnimationFrames(animFrames, 0.2);//将所有的动画帧，以间隔0.2秒速度播放
        //var animate = cc.Animate.create(animation,false);


        /*
        this.yuman=cc.Sprite.create("res/wangbadan.png");
        this.yuman.setPosition(cc.p(350/2,247/2));
        this.addChild(this.yuman);

        var actionMov = cc.MoveTo.create(1.0,cc.PointMake(300,247));
       this.yuman.runAction(actionMov);

        var actionRotation = cc.RotateTo.create(1.0,720);
        this.yuman.runAction(actionRotation);
*/

        /*
        var size = cc.Director.getInstance().getWinSize();

        var layer = cc.LayerColor.create(cc.c4(255, 255, 255, 255));
        this.addChild(layer, -1);
*/
        /*
        this.sprite=cc.Sprite.create("res/baidu.png");
        this.sprite.setPosition(cc.p(270/2,129/2));
        this.addChild(this.sprite,-2);
*/
/*
        this.sprite=cc.Sprite.create("res/cat.png");
        this.sprite.setPosition(cc.p(265,190));
        this.addChild(this.sprite,1);




        var actionMov = cc.MoveTo.create(3.0,cc.PointMake(400,200));
        var actionRotation = cc.RotateTo.create(3.0,180);
        this.sprite.runAction(cc.Sequence.create(actionMov, actionRotation),
            cc.CallFunc.create(this.animationCallBack, this));

*/

        /*
        //无限旋转
        var actionBy1 = cc.RotateBy.create(1, 360);
        var actionBy2 = cc.RotateBy.create(1, -360);
        var sequence =  cc.Sequence.create(actionBy1, actionBy2);
        this.sprite.runAction(cc.RepeatForever.create(sequence));
*/


        /*
                var actionJump = cc.JumpTo.create(3,cc.PointMake(600,200),60,5);//.create(3.0,cc.PointMake(400,200));
                this.sprite.runAction(actionJump);
        */
        /*
         var actionMov = cc.MoveTo.create(3.0,cc.PointMake(400,200));
         //this.sprite.runAction(actionMov);

         var actionRotation = cc.RotateTo.create(3.0,180);
         //this.sprite.runAction(actionRotation);
         this.sprite.runAction(cc.Sequence.create(actionMov, actionRotation));
         /*
         var times = 2.0;
         var action2 = cc.OrbitCamera.create(times * 2, 1, 0, 360, 720, 0, 0);
         this.sprite.runAction(action2);
         */
    },
    animationCallBack:function ()
    {
        this.removeFromParent();
        this.label.setString("animation Finished!");
    }
});
