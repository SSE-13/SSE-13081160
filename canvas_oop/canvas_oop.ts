/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {
      font = "20px Arial"; 
      color = '#000000';
       filltext = 'HelloWorld'; 

      render(context: CanvasRenderingContext2D) { 
          context.font = this.font; 
          context.fillStyle = this.color; 
          context.fillText(this.filltext, 0, 20); 
    } 

}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


var rect = new Rect();
rect.width = 200;
rect.height = 100;
rect.color = '#00FF00'


var rect2 = new Rect();
rect2.width = 200;
rect2.height = 95;
rect2.x = 418;
rect2.y = 418;
rect2.color = '#00FF00';



var text = new TextField(); 
text.x = 468; 
text.y = 448; 
text.font = "20px Arial"; 
text.color = '#FFFFFF'; 
text.filltext = '分数：13081160'; 

var text2 = new TextField(); 
text2.x = 468; 
text2.y = 469; 
text2.font = "20px Arial"; 
text2.color = '#FFFFFF'; 
text2.filltext = '操作：66666666'; 

var bitmap = new Bitmap();
bitmap.source = 'beijing.jpg';

var bitmap2 = new Bitmap();
bitmap2.source = 'pai.jpg';
bitmap2.x=925;
bitmap2.y=419;

var bitmap3 = new Bitmap();
bitmap3.source = 'tankuang.jpg';
bitmap3.x=409;
bitmap3.y=258;

//渲染队列
var renderQueue = [rect,text,bitmap,bitmap2,bitmap3,rect2,text,text2];
//资源加载列表
var imageList = ['beijing.jpg','pai.jpg','tankuang.jpg'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


