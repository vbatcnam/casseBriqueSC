'use strict'
//================================================================
//							le mur SugarCubes
//================================================================

//le mur n'émet pas de signal (elle pourrait en émettre un)

/** je crée la classe */
/** ================= */
class Mur extends SCCube{
	constructor(position){
		super();
		this.position = position;
	}
	
	$_verifSiTouched()
	{
		return SC.actionOn(SCEVT('ballSignalPosition'), SC.my("verifSiTouched"), undefined, SC.forever);
	}
	
	//verifSiTouched(obj_all, ){}
	//$on_ballSignalPosition_verifSiTouched(pArray_valEnvoyee, monde){}
}

// création des cubes
var murH = new Mur(0);//y0
var murD = new Mur(zoneDeJeu.largeur);
var murG = new Mur(0);//x0
var frontiere = new Mur(zoneDeJeu.hauteur);// mur du bas

//faire une seule fonction
//	$on_ballSignalPosition_verifSiTouched(pArray_valEnvoyee, monde){

	// verifSiTouched
	// rebondit(axe)

// }

// rebondit(axe){}

murH.verifSiTouched= function(obj_all){
	// console.log(obj_all);
	const yBall = obj_all[SCEVT('ballSignalPosition')][0].y;
	const radius = obj_all[SCEVT('ballSignalPosition')][0].radius;
	if(yBall - radius == this.position){
		obj_all[SCEVT('ballSignalPosition')][0].rebondit("y");
	}
};

murD.verifSiTouched= function(obj_all){
	const xBall = obj_all[SCEVT('ballSignalPosition')][0].x;
	const radius = obj_all[SCEVT('ballSignalPosition')][0].radius;
	if(xBall + radius == this.position){
		obj_all[SCEVT('ballSignalPosition')][0].rebondit("x");
	}
};

murG.verifSiTouched= function(obj_all){
	const xBall = obj_all[SCEVT('ballSignalPosition')][0].x;
	const radius = obj_all[SCEVT('ballSignalPosition')][0].radius;
	if(xBall - radius == this.position){
		obj_all[SCEVT('ballSignalPosition')][0].rebondit("x");
	}
};

frontiere.verifSiTouched= function(obj_all, monde){
	const yBall = obj_all[SCEVT('ballSignalPosition')][0].y;
	const radius = obj_all[SCEVT('ballSignalPosition')][0].radius;
	if(yBall + radius == this.position){
		obj_all[SCEVT('ballSignalPosition')][0].alive = false;
		//maitreDuJeu doit retirer une vie
		monde.generateEvent(maitreDuJeu_signalRetireVie);
		//remmetre la balle au centre
		obj_all[SCEVT('ballSignalPosition')][0].reset();
	}
};

