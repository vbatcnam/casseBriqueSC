'use strict'
//================================================================
//							le mur SugarCubes
//================================================================

//le mur n'émet pas de signal (elle pourrait en émettre un)

/** je crée la classe */
/** ================= */
class Mur extends SCCube{
	constructor(position, nom){
		super();
		this.position = position;
		this.nom = nom;
	}
	
	$_verifSiTouched()
	{
		return SC.actionOn(SCEVT('ballSignalPosition'), SC.my("verifSiTouched"), undefined, SC.forever);
	}

	//$on_ballSignalPosition_verifSiTouched(pArray_valEnvoyee, monde){}
	verifSiTouched(obj_all, monde){
		const radius = obj_all[SCEVT('ballSignalPosition')][0].radius;
		switch(this.nom){
			case 'murH' :
				if(obj_all[SCEVT('ballSignalPosition')][0].y - radius == this.position){
					obj_all[SCEVT('ballSignalPosition')][0].rebondit(y);
				};
				break;
			case 'murD' :
				if(obj_all[SCEVT('ballSignalPosition')][0].x + radius == this.position){
					obj_all[SCEVT('ballSignalPosition')][0].rebondit("x");
				}
				break;
			case 'murG' :
				if(obj_all[SCEVT('ballSignalPosition')][0].x - radius == this.position){
					obj_all[SCEVT('ballSignalPosition')][0].rebondit("x");
				};
				break;
			case 'frontiere' :
				if(obj_all[SCEVT('ballSignalPosition')][0].y + radius == this.position){
					obj_all[SCEVT('ballSignalPosition')][0].alive = false;
					//maitreDuJeu doit retirer une vie
					monde.generateEvent(maitreDuJeu_signalRetireVie);
					//remmetre la balle au centre
					obj_all[SCEVT('ballSignalPosition')][0].reset();
				}
				break;
		}
	}

}

// création des cubes
var murH = new Mur(0,'murH');//y0
var murD = new Mur(zoneDeJeu.largeur,'murD');
var murG = new Mur(0,'murG');//x0
var frontiere = new Mur(zoneDeJeu.hauteur,'frontiere');// mur du bas


// murH.verifSiTouched= function(obj_all){
	// // console.log(obj_all);
	// const yBall = obj_all[SCEVT('ballSignalPosition')][0].y;
	// const radius = obj_all[SCEVT('ballSignalPosition')][0].radius;
	// if(yBall - radius == this.position){
		// obj_all[SCEVT('ballSignalPosition')][0].rebondit("y");
	// }
// };

// murD.verifSiTouched= function(obj_all){
	// const xBall = obj_all[SCEVT('ballSignalPosition')][0].x;
	// const radius = obj_all[SCEVT('ballSignalPosition')][0].radius;
	// if(xBall + radius == this.position){
		// obj_all[SCEVT('ballSignalPosition')][0].rebondit("x");
	// }
// };

// murG.verifSiTouched= function(obj_all){
	// const xBall = obj_all[SCEVT('ballSignalPosition')][0].x;
	// const radius = obj_all[SCEVT('ballSignalPosition')][0].radius;
	// if(xBall - radius == this.position){
		// obj_all[SCEVT('ballSignalPosition')][0].rebondit("x");
	// }
// };

// frontiere.verifSiTouched= function(obj_all, monde){
	// const yBall = obj_all[SCEVT('ballSignalPosition')][0].y;
	// const radius = obj_all[SCEVT('ballSignalPosition')][0].radius;
	// if(yBall + radius == this.position){
		// obj_all[SCEVT('ballSignalPosition')][0].alive = false;
		// //maitreDuJeu doit retirer une vie
		// monde.generateEvent(maitreDuJeu_signalRetireVie);
		// //remmetre la balle au centre
		// obj_all[SCEVT('ballSignalPosition')][0].reset();
	// }
// };

