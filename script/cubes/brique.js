class Brique {
	constructor(col, ligne, force) {
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
		this.alive = true;
		this.me = this;
		this.killMe = SC.evt("kill");//ajouté par Olivier
	}
	
	colorise(){
		let color = ["#0095DD", "#00FFFF"]; 
		return color[this.force];
	}
	
	draw(ctx){
		if(this.alive){
			ctx.beginPath();
			//(xCoinSupG, yCoinSupG, width, height)
			ctx.rect(this.x, this.y, this.width, this.height);
			// ctx.strokeStyle = "rgba(0, 0, 255, 1)";
			// ctx.stroke();
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
		}
	}
	
	givePosition(){
		return {x: this.x, y: this.y, height: this.height , width: this.width};
	}

	//il faudra peut être mettre en paramètre le MDJ aussi...
	verifSiTouched(obj_all, machine){
		const radius = obj_all[ballHere][0].radius;
		const yBall = obj_all[ballHere][0].y;
		const dyBall = obj_all[ballHere][0].dy;
		const xBall = obj_all[ballHere][0].x;
		const dxBall = obj_all[ballHere][0].dx;
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
				obj_all[ballHere][0].rebondit("y");
				this.iAmTuched(machine);
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
				obj_all[ballHere][0].rebondit("x");
				this.iAmTuched(machine);
			}
		}
			
	
	iAmTuched(machine){//retirer une vie
		if(this.force == 0){
			this.alive = false;//peut être inutile
			//la brique ne doit plus émettre
			machine.generateEvent(this.killMe);//ajouté par Olivier
		}else{
			this.force -= 1;
			this.color = this.colorise();
		}

		//Dire au maitreDuJeu d'ajouter un point
		machine.generateEvent(addPoint);
	}
}

//================================================================
//				le cube 
//================================================================

//Événements de la brique
//----------------------
//pour que le maître du jeu sache qu'elle est toujours en vie (dessinée)
var briqueHere = SC.evt("Je suis une brique et je suis ici");
var killMe = SC.evt("kill me");
var addPoint = SC.evt("ajoute 1 point");

//le comportement du cube qui a la brique
var progBrique = SC.par(
	SC.generate(briqueHere, SC.my("me"), SC.forever)//parle pour signaler qu'elle est en vie
	, SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever)
	, SC.generate(drawMe, SC.my("me"), SC.forever)//se dessine
);

//les cubes de briques
var tab2d_CubeBriques = [];
var nbreLigne = 5;
var nbreColonnes = 9 ; 

for(var c = 0; c < nbreColonnes; c++) {
	tab2d_CubeBriques[c] = [];
	for(var r = 0; r < nbreLigne; r++) {
		let f = 0 // force de la brique
		if(r%2 == 0){
			f = 1;
		}
		
		//start and kill when ...
	    tab2d_CubeBriques[c][r] = SC.cube(
		new Brique(c,r,f), SC.kill(SC.my("killMe"),progBrique
	    ));
	}
}
