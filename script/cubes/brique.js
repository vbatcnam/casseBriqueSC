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

	verifSiTouched(obj_all){
		const radius = obj_all[ballHere][0].radius;
		const yBall = obj_all[ballHere][0].y;
		const xBall = obj_all[ballHere][0].x;
		
		// la balle touche le dessous de la brique
		// if( yBall-radius == this.y
			// && xBall+radius > this.x 
			// && xBall-radius < this.x+this.width
		// la balle touche le dessus de la brique
			// || yBall+radius == this.y 
			// && xBall+radius > this.x 
			// && xBall-radius < this.x+this.width
		// )
		if(xBall > this.x && xBall < this.x + this.width && yBall > this.y && yBall < this.y + this.height)//code MDN
		{
			obj_all[ballHere][0].rebondit("y");	
			if(this.force==0){
				this.alive = false;
				//la brique ne doit plus émettre
			}else{
				this.force-=1;
				this.color = this.colorise();
			}
			//maitreDuJeu doit ajouter un point
			
		}
	}
}

//================================================================
//							le cube 
//================================================================

//Événements de la brique
//----------------------
//pour que le maître du jeu sache qu'elle est toujours en vie (dessinée)
var iAmBrique = SC.evt("Je suis une brique");

//le comportement du cube qui a la brique
var progBrique = SC.par(
	SC.generate(iAmBrique, SC.my("me"), SC.forever)//parle pour signaler qu'elle est en vie
	, SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever)
	, SC.generate(drawMe, SC.my("me"), SC.forever)//se dessine
);

//les cubes de briques
var tab2d_CubeBriques = []
var nbreLigne = 5;
var nbreColonnes = 9 ; 

for(var c = 0; c < nbreColonnes; c++) {
	tab2d_CubeBriques[c] = [];
	for(var r = 0; r < nbreLigne; r++) {
		let f = 0 // force de la brique
		if(r%2 == 0){
			f = 1;
		}
		tab2d_CubeBriques[c][r] = SC.kill( verifSiTouched
			, SC.cube(
				new Brique(c,r,f), progBrique
			)
		);
	}
}
    
 
