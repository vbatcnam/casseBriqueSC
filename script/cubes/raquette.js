class Raquette {
	constructor() {
		this.height = 10;
		this.width = 75;
		this.x = (zoneDeJeu.width - this.width)/2;
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
				if(relativeX > 0 && relativeX < zoneDeJeu.width) {
					this.x = relativeX - this.width/2;
				}
			},
			false);
	}
	
	verifSiTouched(obj_all){
		const radius = obj_all[ballHere][0].radius;
		const yBall = obj_all[ballHere][0].y + radius;
		const xBall = obj_all[ballHere][0].x;
		if(
			yBall == this.y 
			&& xBall+radius > this.x 
			&& xBall-radius < this.x+this.width
		){
			obj_all[ballHere][0].rebondit("y");
			console.log("touché");
		}
		else{
			//maitreDuJeu doit retirer une vie
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