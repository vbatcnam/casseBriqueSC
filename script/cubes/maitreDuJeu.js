'use strict'

//================================================================
//							la maître du jeu SugarCubes
//================================================================
/**
	type d'info  diffusée au monde, par n'importe quel habitant de ce monde.
*/
var maitreDuJeu_signalFinDePArtie = SC.evt("FIN");// en vrais se donne lui-même et non juste l'info

/** je crée la classe */
/** ================= */
class MaitreDuJeu extends SCCube{
	constructor() {
		super();
		this.me = this;
		this.reset();
	}
	
	reset(){
		this.lives = 3;
		this.score = 0;
	}
	
	//appelle draw()
	$_draw(){
		return SC.action(this.draw, SC.forever);
		//SC.generate(drawMe, this, SC.forever)
		// return SC.action(SC.my("draw"), SC.forever);
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
		ctx.fillText("Lives : "+this.lives, zoneDeJeu.width-65, 20);
	}

	$_addPoint(){
		// return SC.actionOn(addPoint, SC.my("addPoint")
				// , undefined, SC.forever)
		return SC.actionOn(addPoint, this.addPoint
				, undefined, SC.forever);
	}
	addPoint(){
		this.score += 1;
		// console.log("score : " + this.score);
	}
	
	$_retireVie(){
		// return SC.actionOn(retireVie, SC.my("retireVie"), undefined, SC.forever)
		return SC.actionOn(retireVie, this.retireVie, undefined, SC.forever);
	}
	retireVie(obj_all, machine){
		if(this.lives == 0){
			this.afficheFin(obj_all, machine, "Perdu !");
		}
		else{
			this.lives -= 1;
			// console.log("vie : " + this.lives);
		}
	}

	$_afficheFin(){
		// return SC.actionOn(briqueHere, SC.NO_ACTION, SC.my("afficheFin"), SC.forever)
		return SC.kill( jeuFini, 
				SC.actionOn(briqueHere, SC.NO_ACTION, this.afficheFin, SC.forever)
			);
	}
	afficheFin(obj_all, machine, message = "Bravo !"){
		alert(message);
		machine.generateEvent(jeuFini);
		this.reset();
	}
}

//le cube 
var maitreDuJeu = new MaitreDuJeu();
