'use strict'

//================================================================
//							la maître du jeu SugarCubes
//================================================================
/**
	type d'info  diffusée au monde, par n'importe quel habitant de ce monde.
*/
var MDJSignalFinDePartie = SC.evt("FIN");// en vrais se donne lui-même et non juste l'info

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
		return SC.generate(signalDrawMe, this, SC.forever)
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
		return SC.actionOn(briqueSignalAddPoint, this.addPoint.bind(this)
				, undefined, SC.forever);
	}
	addPoint(){
		this.score += 1;
	}
	
	$on_missed_retireVie(pArray_valEnv, monde){
		if(this.lives == 0){
			this.afficheFin(pArray_valEnv, monde, "Perdu !");
		}
		else{
			this.lives -= 1;
			// console.log("vie : " + this.lives);
		}
	}

	$_afficheFin(){
		return SC.kill( MDJSignalFinDePartie, 
				SC.actionOn(briqueSignalPosition, SC.NO_ACTION, this.afficheFin, SC.forever)
			);
	}
	afficheFin(pObjAll_or_pArray_valEnv, monde, message = "Bravo !"){
		alert(message);
		monde.generateEvent(MDJSignalFinDePartie);
		this.reset();
	}
}

//le cube 
var maitreDuJeu = new MaitreDuJeu();
