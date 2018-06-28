class Mur
{
  constructor(p){ // ax+by+c = 0 ; u{-b,a} ; P
    this.a = p.a;
    this.b = p.b;
    this.c = p.c;
    this.zone = p.z;
    if(this.a == 0){
      this.x0 = 0;
      this.y1 = this.y0 = -this.c;
      this.x1 = 1000;
      }
    else if(this.b == 0){
      this.x1 = this.x0 = -this.c;
      this.y0 = 0;
      this.y1 = 1000;
      }
    else{
      this.x0 = 0;
      this.y0 = -this.a/this.b*this.x0-this.c/this.b;
      this.x1 = 1000;
      this.y1 = -this.a/this.b*this.x1-this.c/this.b;
      }
      var norm = Math.sqrt(this.a*this.a+this.b*this.b);
      this.bouncer = {};
      Object.defineProperty(this.bouncer, "normal"
                                , {enumerable:true
                                   , value:{x:((this.zone)?-1:1)*this.a/norm,y:((this.zone)?-1:1)*this.b/norm}
                                   , writable: false
                                   }
                                );
      Object.defineProperty(this.bouncer, "crossIt"
                                , {enumerable:false
                                   , value:this.crossIt.bind(this)
                                   , writable: false
                                   }
                                );
      Object.defineProperty(this.bouncer, "distance"
                                , {enumerable:false
                                   , value:this.distance.bind(this)
                                   , writable: false
                                   }
                                );
      Object.defineProperty(this.bouncer, "bouncing"
                                , {enumerable:false
                                   , value:this.bouncing.bind(this)
                                   , writable: false
                                   }
                                );
      this.me = this;
      this.drawer = {};
      Object.defineProperty(this.drawer, "drawSelf"
                                , {enumerable:false
                                   , value:this.draw.bind(this)
                                   , writable: false
                                   }
                                );
    this.sqrt = Math.sqrt(this.a*this.a+this.b*this.b);
    }
  crossIt(x,y,r){
    const calc = this.a*x+this.b*y+this.c;
    if(this.zone){
      if(calc < r){
        console.log("checking",calc-r);
        }
      return calc < r;
      }
    else{
      if(calc > -r){
        console.log("checking",calc+r);
        }
      return calc > -r;
      }
    }
  distance(x,y){
    return Math.abs(this.a*x+this.b*y+this.c)/this.sqrt;
    }
  bouncing(){
    this.bounceForce +=10;
    }
  verifSiTouched(obj_all){
    const ball = obj_all[ballHere][0];
    const x0 = ball.x;
    const y0 = ball.y;
    const r = ball.radius;
    if(this.crossIt(x0,y0,r)){
      console.log("bounce", this.x0);
      }
    }
  draw(ctx){
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(this.x0, this.y0);
    ctx.lineTo(this.x1, this.y1);
    ctx.lineWidth = this.bounceForce;
    this.bounceForce = (this.bounceForce > 1)?this.bounceForce-1:1;
    ctx.stroke();
    ctx.closePath();
    }
  getNormal(){
    return this.normal;
    }
}

var murH = new Mur({a:0,b:1,c:0, z:true});//y0
var murD = new Mur({a:1,b:0,c:-800, z:false});
var murG = new Mur({a:1,b:0,c:0, z:true});//x0
var murTest = new Mur({a:1,b:-1,c:-10, z:true});//x0
var murTest2 = new Mur({a:-1,b:-1,c:300, z:false});//x0
var murTest3 = new Mur({a:1,b:-2,c:-300, z:false});//x0

var frontiere = new Mur({a:0,b:1,c:-390, z:false});// mur du bas

/*
frontiere.verifSiTouched= function(obj_all, machine){
        const yBall = obj_all[ballHere][0].y;
        const radius = obj_all[ballHere][0].radius;
        if(yBall + radius == this.position){
                obj_all[ballHere][0].alive = false;
                //maitreDuJeu doit retirer une vie
                machine.generateEvent(retireVie);
                //remmetre la balle au centre
                obj_all[ballHere][0].reset();
        }
};*/

//================================================================
//                        les cubes
//================================================================

//les comportements
//-----------------
var progMurH = SC.par(
  //SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever)
  SC.generate(wallHere, SC.my("bouncer"), SC.forever)
  , SC.generate(drawMe, SC.my("drawer"), SC.forever)//se dessine
  );

var progMurD = SC.par(
  //SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever)
  SC.generate(wallHere, SC.my("bouncer"), SC.forever)
  , SC.generate(drawMe, SC.my("drawer"), SC.forever)//se dessine
  );

var progMurG = SC.par(
  //SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever)
  SC.generate(wallHere, SC.my("bouncer"), SC.forever)
  , SC.generate(drawMe, SC.my("drawer"), SC.forever)//se dessine
  );

var progFrontiere = SC.par(
  //SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever)
  SC.generate(wallHere, SC.my("bouncer"), SC.forever)
  , SC.generate(drawMe, SC.my("drawer"), SC.forever)//se dessine
  );

var progMurTest = SC.par(
  //SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever)
  SC.generate(wallHere, SC.my("bouncer"), SC.forever)
  , SC.generate(drawMe, SC.my("drawer"), SC.forever)//se dessine
  );

/*var progMurTest2 = SC.par(
  //SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever)
  SC.generate(wallHere, SC.my("bouncer"), SC.forever)
  , SC.generate(drawMe, SC.my("drawer"), SC.forever)//se dessine
  );
var progMurTest3 = SC.par(
  //SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever)
  SC.generate(wallHere, SC.my("bouncer"), SC.forever)
  , SC.generate(drawMe, SC.my("drawer"), SC.forever)//se dessine
  );*/

//les cubes
//-----------
var cubeMurH = SC.cube(murH, progMurH);
var cubeMurD = SC.cube(murD, progMurD);
var cubeMurG = SC.cube(murG, progMurG);
var cubeFrontiere = SC.cube(frontiere, progFrontiere);
var cubeMurTest = SC.cube(murTest, progMurTest);
var cubeMurTest2 = SC.cube(murTest2, progMurTest);
var cubeMurTest3 = SC.cube(murTest3, progMurTest);
