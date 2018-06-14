class MaitreDuJeu {
	constructor(){
		this.lives = 3;
		this.score = 0;
	}
	
	drawScore(ctx) {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score : "+this.score, 8, 20);
	}
	
	drawLives(ctx) {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Lives : "+this.lives, canvas.width-65, 20);
	}

	addPoint(){
		this.score += 1;
	}
	
	retireVie(){
		if(this.lives == 0){
			alert("Perdu !");
		}
		else{
			this.lives-=1;
		}
	}

	afficheFin(){
		alert("Bravo !")
	}
}

//================================================================
//							le cube 
//================================================================
/*
	le comportement du cube qui a le maître du jeu : il gère le score et les vies et dit quand la partie est finie
	quand il n'y a plus de vie la partie est finie et perdue
	quand il n'y a plus de brique la partie est finie et gagnée
*/ 

var progMaitreDuJeu = SC.par(
	SC.action(SC.my("drawScore"), SC.forever)
	, SC.action(SC.my("drawLives"), SC.forever)
	, SC.seq(
		SC.pause(2)
		, SC.par(
			SC.actionOn(briqueHere, SC.nothing()
				, SC.my("afficheFin"), SC.forever)
				//ne marche pas
			// , SC.actionOn(addPoint, SC.my("addPoint")
				// , undefined, SC.forever)
			// , SC.actionOn(retireVie, SC.my("retireVie")
				// , undefined, SC.forever)
		)
	)
);

//le cube 

/*genere TypeError: a is not a function[En savoir plus]
SugarCubes.js:3886:11 21 fois*/
var cubeMaitreDuJeu = SC.cube(new MaitreDuJeu(), progMaitreDuJeu);

//en attendant
// var cubeMaitreDuJeu = SC.cube(new MaitreDuJeu(), SC.nothing());

//console.log(cubeMaitreDuJeu);
