class Raquette {
	constructor() {
		this.height = 10;
		this.width = 80;
		this.x = (zoneDeJeu.width - this.width)/2;// au centre
		this.y = zoneDeJeu.height - this.height;
		this.me = this;
	}
	
	draw(ctx){
		ctx.beginPath();
		//(xCoinSupG, yCoinSupG, width, height);
		ctx.rect(this.x, this.y, this.width, this.height); 
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();
	}
	
	bouge(){
		//souris (plus tard souris et tactile)
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
	
	verifSiTouched(obj_all, machine){
		const radius = obj_all[ballHere][0].radius;
		const yBall = obj_all[ballHere][0].y + radius;
		const xBall = obj_all[ballHere][0].x;
		if(
			yBall == this.y 
			&& xBall+radius > this.x 
			&& xBall-radius < this.x+this.width
		){
			obj_all[ballHere][0].rebondit("y");
			// console.log("touché");
		}
	}
}

//================================================================
//							le cube 
//================================================================

//le comportement du cube qui a la raquette
var progRaquette = SC.par(
	SC.actionOn(ballHere, SC.my("verifSiTouched"), undefined, SC.forever)
	, SC.action( SC.my("bouge"), SC.forever )//se déplace
	, SC.generate(drawMe, SC.my("me"), SC.forever)
);

//le cube
var cubeRaquette = SC.cube(new Raquette(), progRaquette);

//Par contre le kill devrait être lui même dans un repeat qui indique le nombre de point de vie... JFS (A implémenter)