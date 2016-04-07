var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "head.png";
humanContainer.addChild(head)
head.x=-5;
head.y=-150;

var trunk = new render.Bitmap();
trunk.source = 'trunk.png';
humanContainer.addChild(trunk)
trunk.x=13;
trunk.y=-30;

var left_arm = new render.Bitmap();
left_arm.source = 'left_arm.png';
humanContainer.addChild(left_arm)
left_arm.x=-180;
left_arm.y=50;

var right_arm = new render.Bitmap();
right_arm.source = 'right_arm.png';
humanContainer.addChild(right_arm)
right_arm.x=60;
right_arm.y=50;

var left_leg = new render.Bitmap();
left_leg.source = 'left_leg.png';
humanContainer.addChild(left_leg)
left_leg.x=65;
left_leg.y=250;

var right_leg = new render.Bitmap();
right_leg.source = 'right_leg.png';
humanContainer.addChild(right_leg)
right_leg.x=-10;
right_leg.y=250;

humanContainer.scaleX=0.5;
humanContainer.scaleY=0.5;
humanContainer.globalMatrix
humanContainer.x=200;
humanContainer.y=300;

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png','trunk.png','right_arm.png','left_arm.png','left_leg.png','right_leg.png"]);
var VX;
var VR;
class HumanBody extends Body {
    
    
    vx:number = 5;
    vr:number = 5;
    
        onTicker(duringTime: number) {
        this.x+=duringTime*this.vx;
        this.rotation +=duringTime*this.vr;
    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
var headClicked=false;
    if(localPoint.x>0 &&localPoint.x<122 && localPoint.y>0 && localPoint.y<140){
         headClicked=true;
    }
    return headClicked; 
}

var headOnClick = () => {
    //修改 HumanBody 的速度，使其反向移动
    if(headHitTest){
        if(body.vx==0){
            body.vx=VX;
            body.vr=VR;
        }else{
            body.vx*=-1;
            body.vr*=-1; 
        }
    }
}
var left_legHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
     console.log(localPoint.x);
     console.log(localPoint.y);
     var left_legClicked=false;
     if(localPoint.x>0 && localPoint.x<118 && localPoint.y>0 && localPoint.y<177){
        left_legClicked=true;
    }
    return left_legClicked;
}

var left_legOnClick = () => {
   if(left_legHitTest){
        VX=body.vx;
        VR=body.vr;
        body.vx=0;
        body.vr=0;
        body.rotation=0;
    }
}

var right_legHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    var right_legClicked=false;
    if(localPoint.x>0 && localPoint.x<82 && localPoint.y>0 && localPoint.y<170){
     right_legClicked=true;
    }
    return right_legClicked;
}

var right_legOnClick = () => {
    if(right_legHitTest){
        VX=body.vx;
        VR=body.vr;
        body.vx=0;
        body.vr=0;
        body.rotation=0;
    }
}

eventCore.register(head,headHitTest,headOnClick);
eventCore.register(left_leg,left_legHitTest,left_legOnClick);
eventCore.register(right_leg,right_legHitTest,right_legOnClick);
