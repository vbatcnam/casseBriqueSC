'use strict'
//================================================================
//							la zone de jeu SugarCubes
//================================================================

//la zone de jeu n'émet pas de signal

/** je crée la classe */
/** ================= */
class ZoneDeJeu extends SCCube{
	constructor() {
		super();
		this.canvas = document.getElementById("zoneDeJeu");//le canvas
		this.hauteur = this.canvas.height;
		this.largeur = this.canvas.width;
		this.offsetLeft = this.canvas.offsetLeft;
		this.tab_toDraw=[]; // tableau des objets à redessiner à chaque nouvelle image.
		// booléen de régulation de l'affichage appelée par affiche()
		this.isFrameRequested = false; //donné par JFS
	}
	/**
		les méthodes de la classe
	*/
	//correspond  à la fonction sc_drawItFun de JFS
	dessineLesEltsDuJeu(){
		var ctx = this.canvas.getContext("2d");// getContext est une fonctionPrédefinie du canvas
		// on efface tout
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		/* on itere sur tous les objets à dessiner */
		// console.log('début dessin tous');
		for(var i in this.tab_toDraw){
			// console.log(this.tab_toDraw[i]);
			this.tab_toDraw[i].draw(ctx);
		}
		this.isFrameRequested = false;//donné par JFS
	}

	//Activée par "signal_drawMe" émis par les objets
	$_afficheLesEltsDuJeu(){
		return SC.actionOn(signal_drawMe
			, this.afficheLesEltsDuJeu.bind(this)
			, undefined
			, SC.forever 
		);
	}
	//correspond  à la fonction sc_requestDisplayFun de JFS
	afficheLesEltsDuJeu(obj_all){
		if(this.isFrameRequested){return;}//évite de redessiner si ce n'est pas fini
		this.isFrameRequested = true;
		this.tab_toDraw = obj_all[signal_drawMe]; //tableau des objets à redessiner à chaque nouvelle image. zoneDeJeu.tab_toDraw=[cubeBalle, cubeRaquette, tab_CubeBriques]; 
		// console.log(this.tab_toDraw);

		window.requestAnimationFrame(this.dessineLesEltsDuJeu.bind(this))//sc_drawItFun
	}
}

//on met l'objet dans un cube
var zoneDeJeu = new ZoneDeJeu();
