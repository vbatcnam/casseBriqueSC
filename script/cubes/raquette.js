'use strict'
//================================================================
//							la raquette SugarCubes
//================================================================

//la raquette n'émet pas de signal (elle pourrait en émettre un)

/** je crée la classe */
/** ================= */
class Raquette extends SCCube{
	constructor() {
		super();
		this.height = 10;
		this.width = 80;
		this.y = zoneDeJeu.canvas.height - this.height;
		this.reset();
	}
	
	reset(){
		this.x = (zoneDeJeu.canvas.width - this.width)/2;
	}
	
	//doit être appelée par l'objet zoneDeJeu
	//appelle draw()
	$_draw(){
		return SC.generate(signal_drawMe, this, SC.forever);
	}
	draw(ctx){
		ctx.beginPath();
		//(xCoinSupG, yCoinSupG, width, height);
		ctx.rect(this.x, this.y, this.width, this.height); 
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();
	}
	
	//appelle bouge()
	$_bouge(){
		return  SC.action( this.bouge, SC.forever );
	}
	bouge(){
		//souris (plus tard ajouter evt tactile)
		document.addEventListener(
			"mousemove", evt=>{
				let relativeX = evt.clientX - zoneDeJeu.offsetLeft;
				
				//pour éviter que la raquette n'entre dans les murs
				let min = Math.floor(this.width/2);
				let max = zoneDeJeu.width - min;
				
				if(relativeX > min && relativeX < max) {
					this.x = relativeX - min;
				}
			},
			false);
	}
	
	$_verifSiTouched(){
		return  SC.actionOn(ball_signalPosition, this.verifSiTouched, undefined, SC.forever);
	}
	verifSiTouched(obj_all, monde){
		const radius = obj_all[ball_signalPosition][0].radius;
		const yBall = obj_all[ball_signalPosition][0].y + radius;
		const xBall = obj_all[ball_signalPosition][0].x;
		console.log(zoneDeJeu.height  );
		if(
			yBall == this.y 
			&& xBall+radius > this.x 
			&& xBall-radius < this.x+this.width
		){
			obj_all[ball_signalPosition][0].rebondit("y");
			// console.log("touché");
		}
	}
}

var raquette = new Raquette();

/**
	Par contre le kill devrait être lui même dans un repeat qui indique le nombre de point de vie... JFS (A implémenter)
*/
