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

	$on_ballSignalPosition_verifSiTouched(pArray_valEnvoyee, monde){
		const radius = pArray_valEnvoyee[0].radius;
		switch(this.nom){
			case 'murH' :
				if(pArray_valEnvoyee[0].y - radius == this.position){
					pArray_valEnvoyee[0].rebondit('y');
				};
				break;
			case 'murD' :
				if(pArray_valEnvoyee[0].x + radius == this.position){
					pArray_valEnvoyee[0].rebondit("x");
				}
				break;
			case 'murG' :
				if(pArray_valEnvoyee[0].x - radius == this.position){
					pArray_valEnvoyee[0].rebondit("x");
				};
				break;
			case 'frontiere' :
				if(pArray_valEnvoyee[0].y + radius == this.position){
					pArray_valEnvoyee[0].alive = false;
					//maitreDuJeu doit retirer une vie
					monde.generateEvent(SCEVT('missed'));
					//remmetre la balle au centre
					pArray_valEnvoyee[0].reset();
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

