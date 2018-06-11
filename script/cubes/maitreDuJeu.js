class MaitreDuJeu {
	constructor(){
		this.lives = 3;
		this.score = 0;
	}
	
	drawScore() {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Score : "+this.score, 8, 20);
	}
	
	drawLives() {
		ctx.font = "16px Arial";
		ctx.fillStyle = "#0095DD";
		ctx.fillText("Lives : "+this.lives, canvas.width-65, 20);
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
	SC.generate(SC.my("drawScore"), SC.forever)
	, SC.generate(SC.my("drawLives"), SC.forever)
	, SC.actionOn(iAmBrique, SC.nothing(), SC.my("afficheFin"), SC.forever)
);

//le cube
// var cubeMaitreDuJeu = SC.cube(new MaitreDuJeu(), progMaitreDuJeu);
var cubeMaitreDuJeu = SC.cube(new MaitreDuJeu(), SC.nothing());


