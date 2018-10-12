'use strict'
//================================================================
//							la zone de jeu SugarCubes
//================================================================

/** je crée la classe */
/** ================= */
class ZoneDeJeu extends SCCube{
	constructor() {
		super();
		this.canvas = document.getElementById("zoneDeJeu");//le canvas
		this.canvas.toDraw=[]; // tableau des objets à redessiner à chaque nouvelle image.
		//correspond  à la fonction sc_drawItFun de JFS
		this.canvas.dessineLesEltsDuJeu = function(){
			var ctx = this.canvas.getContext("2d");
			// on efface tout
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			/* on itere sur tous les objets à dessiner */
			// console.log('début dessin tous');
			for(var i in this.canvas.toDraw){
				// console.log(this.toDraw[i]);
				this.canvas.toDraw[i].draw(ctx);
			}
			this.canvas.isFrameRequested = false;
		};

		$_afficheLesEltsDuJeu(){
			return SC.actionOn(drawMe
				, this.canvas.("afficheLesEltsDuJeu")
				, undefined
				, SC.forever 
			);
		}
		//correspond  à la fonction sc_requestDisplayFun de JFS
		this.canvas.afficheLesEltsDuJeu = function(obj_all){
			if(this.canvas.isFrameRequested){return;}//évite de redessiner si ce n'est pas fini
			this.canvas.isFrameRequested = true;
			this.canvas.toDraw = obj_all[drawMe]; //tableau des objets à redessiner à chaque nouvelle image. zoneDeJeu.toDraw=[cubeBalle, cubeRaquette, tab_CubeBriques]; 
			// console.log(this.toDraw);

			window.requestAnimationFrame(this.canvas.dessineLesEltsDuJeu.bind(this.canvas))//sc_drawItFun
		};
		
		// booléen de régulation de l'affichage appelée par affiche()
		this.canva.isFrameRequested = false; 
	}

}

//on met l'objet dans un cube
var zoneDeJeu = new ZoneDeJeu();
