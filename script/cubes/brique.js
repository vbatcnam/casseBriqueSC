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
var briqueSignalPosition = SC.evt("Je suis une brique");// en vrais se donne lui-même et non juste l'info

var briqueSignalAddPoint = SC.evt("ajoute 1 point");

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
		return SC.generate(briqueSignalPosition, this, SC.forever)//parle pour signaler qu'elle est en vie
	}
	
	//la brique génère un signal pour que la zone de jeu la dessine 
	$_draw() {
		return SC.generate(SCEVT('drawMe'), this, SC.forever)//se dessine
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
	
	//il faudra peut être mettre en paramètre le MDJ aussi...
	$on_ballSignalPosition_verifSiTouched(pArray_valEnvoyee, monde){
		const radius = pArray_valEnvoyee[0].radius;
		const yBall = pArray_valEnvoyee[0].y;
		const dyBall = pArray_valEnvoyee[0].dy;
		const xBall = pArray_valEnvoyee[0].x;
		const dxBall = pArray_valEnvoyee[0].dx;
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
				pArray_valEnvoyee[0].rebondit("y");
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
				pArray_valEnvoyee[0].rebondit("x");
				this.iAmTuched(monde);
			}
		}
			
	
	iAmTuched(monde){//retirer une vie
		if(this.force == 0){
			//la brique ne doit plus émettre
			monde.generateEvent(this.evtKillInstance);//ajouté par Olivier
		}else{
			this.force -= 1;
			this.color = this.colorise();
		}

		//Dire au maitreDuJeu d'ajouter un point
		monde.generateEvent(briqueSignalAddPoint);
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
		tab2d_briques[c][r] = new Brique(c,r,f);
	}
}
