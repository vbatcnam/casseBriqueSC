class Balle {
	constructor() {
		this.x = zoneDeJeu.width/2;
		this.y = zoneDeJeu.height-30;
		this.radius = 10; //rayon
		this.dx = 2;
		this.dy = -2
		this.alive = true;//meurt si elle touche la frontière
		this.me = this;//l'objet balle dans une propriété (pour SC)
		this.bouge();
	}
	
	//doit être appelée par l'objet zoneDeJeu
	draw(ctx){
		// console.log('début dessin balle');
        ctx.beginPath();
		//(xCentre, yCentre, rayon, angleDépart, angleFin, sensAntiHoraire);
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
	}
	
	bouge(){
		this.x += this.dx;
		this.y += this.dy;
		// console.log(this.x, this.y);
	}
	
	rebondit(axe){
		this['d'+ axe] = -this['d'+ axe];
		// //Si la balle passe sous la raquette, elle meurt
		// if(this.y < raquette.y){
			// this.alive = false;
		// }
	}
}

//================================================================
//							le cube 
//================================================================

//l’événement de la balle
var ballHere = SC.evt("Je suis la balle");

//le comportement du cube qui a la balle
var progBalle = SC.par(
	SC.generate(ballHere, SC.my("me"), SC.forever)//parle pour signaler sa position
	, SC.action( SC.my("bouge"), SC.forever )//se déplace
	/* on rajoute en parallèle le fait de se dessiner dans le canvas à chaque instant */
	, SC.generate(drawMe, SC.my("me"), SC.forever)//se dessine
);

//le cube
var cubeBalle = SC.cube(new Balle(), progBalle);
