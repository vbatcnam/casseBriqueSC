'use strict'

//================================================================
//							la maître du jeu SugarCubes
//================================================================

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
	
	$publicConst_drawMe() {return this}
	
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

	$on_touched_addPoint(){
		this.score += 1;
	}
	
	$on_missed_retireVie(pArray_valEnv, monde){
		if(this.lives == 0){
			this.$onNo_briqueExiste_afficheFin(pArray_valEnv, monde, "Perdu !");
		}
		else{
			this.lives -= 1;
			// console.log("vie : " + this.lives);
		}
	}

	$onNo_briqueExiste_afficheFin(pObjAll_or_pArray_valEnv, monde, message = "Bravo !"){
		alert(message);
		monde.generateEvent(this['kill_$onNo_briqueExiste_afficheFin']);
		monde.generateEvent(SCEVT('briqueExiste'));// pour éviter le 2e bravo (Voir avec JFS comment faire pour éviter cela)
		this.reset();
	}
}

//le cube 
var maitreDuJeu = new MaitreDuJeu();
