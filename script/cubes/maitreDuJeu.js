'use strict'

//================================================================
//							la maître du jeu SugarCubes
//================================================================
/**
	type d'info  diffusée au monde, par n'importe quel habitant de ce monde.
*/
var maitreDuJeu_signalFinDePartie = SC.evt("FIN");// en vrais se donne lui-même et non juste l'info

/** je crée la classe */
/** ================= */
class MaitreDuJeu extends SCCube{
	constructor() {
		super();
		this.reset();//initialisation du score et des vies
	}
	
	reset(){
		this.lives = 3;
		this.score = 0;
	}
	
	$_signalDraw(){
		return SC.generate(signal_drawMe, this, SC.forever)
	}
	draw(ctx){
		this.drawScore(ctx);
		this.drawLives(ctx);
	}
	
	drawScore(ctx) {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score : "+this.score, 8, 20);
	}
	
	drawLives(ctx) {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Lives : "+this.lives, zoneDeJeu.largeur-65, 20);
	}

	$_addPoint(){
		return SC.actionOn(brique_signalAddPoint, this.addPoint.bind(this)
				, undefined, SC.forever);
	}
	addPoint(){
		this.score += 1;
	}
	
	$_retireVie(){
		return SC.actionOn(maitreDuJeu_signalRetireVie, this.retireVie.bind(this), undefined, SC.forever);
	}
	retireVie(obj_all, monde){
		if(this.lives == 0){
			this.afficheFin(obj_all, monde, "Perdu !");
		}
		else{
			this.lives -= 1;
			// console.log("vie : " + this.lives);
		}
	}

	$_afficheFin(){
		return SC.kill( maitreDuJeu_signalFinDePartie, 
				SC.actionOn(brique_signalPosition, SC.NO_ACTION, this.afficheFin, SC.forever)
			);
	}
	afficheFin(obj_all, monde, message = "Bravo !"){
		alert(message);
		monde.generateEvent(maitreDuJeu_signalFinDePartie);
		this.reset();
	}
}

//le cube 
var maitreDuJeu = new MaitreDuJeu();
