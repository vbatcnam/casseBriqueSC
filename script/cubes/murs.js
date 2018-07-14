class Mur
{
  constructor(p){ // équation cartésienne : ax+by+c = 0 ;
                  // un vecteur directeur u{-b/Math.sqrt(b*b+a*a)
		  //                        , a/Math.sqrt(b*b+a*a)};
    this.a = p.a;
    this.b = p.b;
    this.c = p.c;
    this.zone = p.z; // Un mur sépare le plan en 2 zones une zone libre
                     // et une zone interdite. zone permet de choisir quel
		     // est le demi plan libre et le demi plan interdit.
/*
 * On traite ensuite le cas particulier des droites parallèles aux axes du plan.
 *  - a=0 indique une droite verticale où y est contant.
 *  - b=0 indique une droite horizontale où x est constant.
 */
    if(this.a == 0){
      this.x0 = 0;
      this.x1 = 1000;
      this.y1 = this.y0 = -this.c;
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
      this.drawer = {};
      Object.defineProperty(this.drawer, "drawSelf"
                                , {enumerable:false
                                   , value:this.draw.bind(this)
                                   , writable: false
                                   }
                                );
    this.sqrt = norm;
    this.debugDrawing = [];
    }
  crossIt(x,y,r,dx,dy){
    const calc = this.a*x+this.b*y+this.c;
    if(this.distance(x,y) < 50){
      this.debugDrawing.push({x:x,y:y,dx:dx,dy:dy,r:r});
      }
    if(this.zone){
      return calc < r;
      }
    else{
      return calc > -r;
      }
    }
  distance(x,y){
    return Math.abs(this.a*x+this.b*y+this.c)/this.sqrt;
    }
  bouncing(){
    this.bounceForce +=10;
    }
/*  verifSiTouched(obj_all){
    const ball = obj_all[ballHere][0];
    const x0 = ball.x;
    const y0 = ball.y;
    const r = ball.radius;
    if(this.crossIt(x0,y0,r)){
      console.log("bounce", this.x0);
      }
    }*/
  draw(ctx){
    for(var data in this.debugDrawing){
      const d = this.debugDrawing[data];
      ctx.beginPath();
      ctx.strokeStyle = '#777777';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1;
      ctx.moveTo(d.x+400*d.dx, d.y+400*d.dy);
      ctx.lineTo(d.x-400*d.dx, d.y-400*d.dy);
      ctx.stroke();
      // d.x+t*d.dx et d.y+t*d.dy tel que sur la ligne =>
      // this.a*(d.x+t*d.dx)+this.b*(d.y+t*d.dy)+this.c =0
      // this.a*d.x +this.a*t*d.dx +this.b*d.y +this.b*t*d.dy = -this.c
      // t*(this.a*d.dx+this.b*d.dy) = -this.c -this.a*d.x -this.b*d.y
      // t = (-this.c-this.a*d.x-this.b*d.y)/(this.a*d.dx+this.b*d.dy)
      ctx.closePath();
      ctx.beginPath();
      ctx.strokeStyle = '#FF0000';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1;
      const t = (d.r-this.c-this.a*d.x-this.b*d.y)/(this.a*d.dx+this.b*d.dy);
      const cx = d.x+t*d.dx; 
      const cy = d.y+t*d.dy; 
      ctx.moveTo(cx+this.bouncer.normal.x*400,cy+this.bouncer.normal.y*400);
      ctx.lineTo(cx-this.bouncer.normal.x*400,cy-this.bouncer.normal.y*400);
      ctx.stroke();
      ctx.closePath();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 1;
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x+20*d.dx, d.y+20*d.dy);
      ctx.stroke();
      ctx.closePath();
      }
    this.debugDrawing = [];
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
