'use strict'
//================================================================
//							la brique SugarCubes
//================================================================

//Événements de la brique
//----------------------
/**
	type d'info  diffusée au monde, par n'importe quel habitant de ce monde.
	devrait s'appeler SC.titreInfoEmise("Me voici") ou SC.signalEmis("Me voici");
	pourquoi cela s’appelle événement ?
*/
//pour que le maître du jeu sache qu'elle est toujours en vie (dessinée)
var brique_signalPosition = SC.evt("Je suis une brique");// en vrais se donne lui-même et non juste l'info

// var brique_signalKillMe = SC.evt("kill me");

var brique_signalAddPoint = SC.evt("ajoute 1 point");

/** je crée la classe */
/** ================= */
class Brique extends SCCube{
	constructor(col, ligne, force) {
		super();
		this.height = 20;
		this.width = 75;
		this.margin = 10;
		this.offsetTop = 30;
		this.offsetLeft = 30;
		this.force = force;
		this.color = this.colorise(); 
		//coinSupGauche
		this.x = col * (this.width + this.margin) + this.offsetLeft;
		this.y = ligne * (this.height + this.margin)+ this.offsetTop;
		this.brique_signalKillMe = SC.evt("kill");//ajouté par Olivier
	}
	
	colorise(){
		let color = ["#0095DD", "#00FFFF"]; 
		return color[this.force];
	}
	
	$_stillAlive(){
		return SC.generate(brique_signalPosition, this, SC.forever)//parle pour signaler qu'elle est en vie
	}
	
	$_draw() {
		return SC.generate(signal_drawMe, this, SC.forever)//se dessine
	}
	
	draw(ctx){
		ctx.beginPath();
		//(xCoinSupG, yCoinSupG, width, height)
		ctx.rect(this.x, this.y, this.width, this.height);
		// ctx.strokeStyle = "rgba(0, 0, 255, 1)";
		// ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	
	$_verifSiTouched(){
		return SC.actionOn(ball_signalPosition, this.verifSiTouched, undefined, SC.forever)
	}
	//il faudra peut être mettre en paramètre le MDJ aussi...
	verifSiTouched(obj_all, monde){
		const radius = obj_all[ball_signalPosition][0].radius;
		const yBall = obj_all[ball_signalPosition][0].y;
		const dyBall = obj_all[ball_signalPosition][0].dy;
		const xBall = obj_all[ball_signalPosition][0].x;
		const dxBall = obj_all[ball_signalPosition][0].dx;
		// console.log(obj_all);
		
/** le if pas encore au point car faille pour les coins de la brique */
		
		// la balle touche dessus|dessous la brique
		if( //la balle touche le dessous de la brique
			yBall-radius <= this.y + this.height
			&& yBall-radius >= this.y + this.height - Math.abs(dyBall)
			&& xBall >= this.x 
			&& xBall <= this.x+this.width
			||//la balle touche le dessus de la brique
			yBall+radius >= this.y 
			&& yBall+radius <= this.y + Math.abs(dyBall)
			&& xBall >= this.x 
			&& xBall <= this.x+this.width){
				obj_all[ball_signalPosition][0].rebondit("y");
				this.iAmTuched(monde);
			}
			
		// la balle touche les côtés 
		if(//la balle touche le côté droit de la brique
			xBall - radius <= this.x + this.width
			&& xBall - radius >= this.x + this.width - Math.abs(dxBall)
			&& yBall >= this.y
			&& yBall <= this.height
			||//la balle touche le côté gauche de la brique
			xBall + radius >= this.x
			&& xBall + radius <= this.x + Math.abs(dxBall)
			&& yBall >= this.y
			&& yBall <= this.height){
				obj_all[ball_signalPosition][0].rebondit("x");
				this.iAmTuched(monde);
			}
		}
			
	
	iAmTuched(monde){//retirer une vie
		if(this.force == 0){
			//la brique ne doit plus émettre
			monde.generateEvent(this.brique_signalKillMe);//ajouté par Olivier
		}else{
			this.force -= 1;
			this.color = this.colorise();
		}

		//Dire au maitreDuJeu d'ajouter un point
		monde.generateEvent(brique_signalAddPoint);
	}
}

//les cubes de briques
var tab2d_briques = [];
var nbreLigne = 5;
var nbreColonnes = 9 ; 

for(var c = 0; c < nbreColonnes; c++) {
	tab2d_briques[c] = [];
	for(var r = 0; r < nbreLigne; r++) {
		let f = 0 // force de la brique
		if(r%2 == 0){
			f = 1;
		}
		
		//start and kill when ...
		tab2d_briques[c][r] = SC.cube(
			new Brique(c,r,f)
			, SC.kill( SC.my("brique_signalKillMe"), progBrique )
		);
	}
}
