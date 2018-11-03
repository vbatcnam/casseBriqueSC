'use strict'
//================================================================
//							la balle SugarCubes
//================================================================

/** je crée la classe */
/** ================= */
class Balle extends SCCube{
	constructor() {
		super();
		this.radius = 10; //rayon
		this.reset();//place la balle au centre
	}
	
	reset() {
		this.x = zoneDeJeu.largeur/2;
		this.y = zoneDeJeu.hauteur-30;
		this.dx = 2;
		this.dy = -2
	}
	
	//la balle génère un signal pour que la zone de jeu la dessine
	$publicConst_drawMe() {return this}
	
	//Dessine la balle
	draw(ctx){
		// console.log('début dessin balle');
		ctx.beginPath();
		// console.log(this.x, this.y, this.radius, 0, Math.PI*2);
		//(xCentre, yCentre, rayon, angleDépart, angleFin, sensAntiHoraire);
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
	
	//genère à chaque instant sa position
	$publicConst_ballSignalPosition() {return this}
	
	//déplacement de la balle
	$actionForever_bouge(){
		this.x += this.dx;
		this.y += this.dy;
		// console.log(this.x, this.y);
	}
	
	rebondit(axe){
		this['d'+ axe] = -this['d'+ axe];
	}
}

/** je crée le cube */
/** ================= */
var balle = new Balle();
