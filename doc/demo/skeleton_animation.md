Weex Skeleton Animation Demo
============================

## snapshot
![weex demo](http://gtms04.alicdn.com/tps/i4/TB1XnwPMXXXXXXbXVXXBMpHLVXX-624-1106.gif)


## weex code
``` html
<template>
    <div class="stage" style="width:{{stage.width}};height:{{stage.height}}" onclick="stop">
     <text style="font-size:24;">frame:{{frame}}</text>
      <div repeat="{{list}}" append="tree">
        <div class="anim" style="width:{{width}};height:{{height}};transform:{{transform}};transform-origin:{{transformOrigin}};opacity:{{alpha}};">
          <image class="animImage" style="left:-{{imageX}};top:-{{imageY}};width:{{imageWidth}};height: {{imageHeight}}" src="{{imageURL}}"></image>
        </div>
      </div>
    </div>
</template>
<style>
    .stage{
        position: relative;
        transform: scale(1.5);
        transform-origin: 0% 0%;
    }
    .anim{
        position: absolute;
        left: 0px;
        top:0px;
        overflow: hidden;
    }

    .animImage{
        position:absolute;
        left:0;
        top:0;
    }
</style>
<script>
var animData = {};  //  please access   for whole sourcecode.
module.exports = {
  data:{
    animData:animData,
    frame:0,
    stage:{
        width:0,
        height:0
    },
    list: []
  },
  methods: {
    stop:function(){
        this._isStop = !this._isStop;
    },
    anim: function () {
        var self = this;
        var animData = self.animData;
        var layers = animData.layers;
        var texture = animData.texture;

        self.stage.width = animData.stage.width;
        self.stage.height = animData.stage.height;

        layers.forEach(function(layer, index){
            self.list.unshift({
                index:index,
                width:0,
                height:0,
                transform:'',
                imageX:0,
                imageY:0,
                alpha:1,
                transformOrigin:'0 0',
                imageWidth:animData.image.width,
                imageHeight:animData.image.height,
                imageURL:animData.image.url
            });
        });

        var totalFrame = 0;
        var frame = 0;
        var parseData = function(){
            layers.forEach(function(layer){
                var frames = layer.frames;
                var realFrames = layer.realFrames = [];
                var preFrame;
                frames.forEach(function(frame){
                    if(preFrame){
                        var duration = preFrame.duration;
                        if(duration > 1){
                            for(var i = 1;i < duration;i ++){
                                if(preFrame.tween){
                                    var f = {
                                        elem:{},
                                        image:preFrame.image
                                    };
                                    var delta = i/duration;
                                    var preElem = preFrame.elem;
                                    var elem = frame.elem;

                                    if(elem && preElem){
                                        for(var p in preElem){
                                            var v = preElem[p] + (elem[p] - preElem[p]) * delta;
                                            f.elem[p] = v;
                                        }
                                    }
                                    realFrames.push(f);
                                }
                                else{
                                    realFrames.push(preFrame);
                                }
                            }
                        }
                    }
                    realFrames.push(frame);
                    preFrame = frame;
                });
                totalFrame = Math.max(realFrames.length, totalFrame);
            });
        };

        parseData();

        var render = function(num){
            self.frame = num;
            self.list.forEach(function(item){
                var layer = layers[item.index];
                var frames = layer.realFrames;
                var frame = frames[num];
                if(frame){
                    var image = texture[frame.image];
                    var data = frame.elem;
                    if(image && data){
                        item.imageX = image.x;
                        item.imageY = image.y;
                        item.width = image.w;
                        item.height = image.h;

                        if(data.alpha <= 0){
                            item.alpha = 0;
                            return;
                        }

                        item.transformOrigin = data.originX + "px " + data.originY + "px";
                        item.alpha = data.alpha * 0.01;

                        item.transform = ''
                            + "translate(" + (data.x - data.originX) + "px," + (data.y - data.originY) + "px) "
                            + "rotate(" + data.rotation + "deg) "
                            + "scale(" + data.scaleX + "," + data.scaleY + ")"
                    }
                    else{
                        item.alpha = 0;
                    }
                }
                else{
                    item.alpha = 0;
                }
            });
        };

        var duration = 1000/animData.stage.fps;
        var loop = function(){
            if(!self._isStop){
                render(frame);
                frame ++;
                if(frame >= totalFrame){
                    frame = 0;
                }
            }
            setTimeout(function(){
                loop();
                self._app.refreshData(self);
            }, duration);
        };

        frame = 0;
        render(frame);
        loop();
    },
    ready: function () {
        var self = this;
        self.anim();
    }
  }
};
</script>
```


