class Mur {
	constructor(position){
		this.position = position;
	}
}
// création des objets
var width = zoneDeJeu.width;
var height = zoneDeJeu.height;

var murH = new Mur(0);//y0
var murD = new Mur(width);
var murG = new Mur(0);//x0

var frontiere = new Mur(height);// mur du bas

murH.verifSiTouched= function(obj_all){
	// console.log(obj_all);
	const yBall = obj_all[ballHere][0].y;
	const radius = obj_all[ballHere][0].radius;
	if(yBall - radius == this.position){
		obj_all[ballHere][0].rebondit("y");
	}
};

murD.verifSiTouched= function(obj_all){
	const xBall = obj_all[ballHere][0].x;
	const radius = obj_all[ballHere][0].radius;
	if(xBall + radius == this.position){
		obj_all[ballHere][0].rebondit("x");
	}
};

murG.verifSiTouched= function(obj_all){
	const xBall = obj_all[ballHere][0].x;
	const radius = obj_all[ballHere][0].radius;
	if(xBall - radius == this.position){
		obj_all[ballHere][0].rebondit("x");
	}
};

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
};

//================================================================
//			les cubes
//================================================================

//les comportements
//-----------------
var progMurH = SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever);

var progMurD = SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever);

var progMurG = SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever);

var progFrontiere = SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever);

//les cubes
//-----------
var cubeMurH = SC.cube(murH, progMurH);
var cubeMurD = SC.cube(murD, progMurD);
var cubeMurG = SC.cube(murG, progMurG);
var cubeFrontiere = SC.cube(frontiere, progFrontiere);
