class MaitreDuJeu {
        constructor(){
      this.drawSelf = {drawSelf:this.draw.bind(this)};
                this.me = this;
                this.reset();
        }
        
        reset(){
                this.lives = 3;
                this.score = 0;
        }
        
        draw(ctx){
                this.drawScore(ctx);
                this.drawLives(ctx);
        }
        
        drawScore(ctx) {
                ctx.font = "16px Arial";
                ctx.fillStyle = "#0095DD";
                ctx.fillText("Score : "+this.score, 8, 20);
        }
        
        drawLives(ctx) {
                ctx.font = "16px Arial";
                ctx.fillStyle = "#0095DD";
                ctx.fillText("Lives : "+this.lives, zoneDeJeu.width-65, 20);
        }

        addPoint(){
                this.score += 1;
                // console.log("score : " + this.score);
        }
        
        retireVie(obj_all, machine){
                if(this.lives == 0){
                        this.afficheFin(obj_all, machine, "Perdu !");
                }
                else{
                        this.lives -= 1;
                        // console.log("vie : " + this.lives);
                }
        }

        afficheFin(obj_all, machine, message = "Bravo !"){
                alert(message);
                machine.generateEvent(jeuFini);
                this.reset();
        }
}

//================================================================
//                                                        le cube 
//================================================================
/*
        le comportement du cube qui a le maître du jeu : il gère le score et les vies et dit quand la partie est finie
        quand il n'y a plus de vie la partie est finie et perdue
        quand il n'y a plus de brique la partie est finie et gagnée
*/ 

var jeuFini = SC.evt("FIN");

var progMaitreDuJeu = SC.par(
        SC.generate(drawMe, SC.my("drawSelf"), SC.forever)
        , SC.seq(
                SC.pause()
                , SC.par(
                        SC.kill( jeuFini,
                                SC.actionOn(briqueHere, SC.NO_ACTION, SC.my("afficheFin"), SC.forever)
                        )
                        , SC.actionOn(addPoint, SC.my("addPoint")
                                , undefined, SC.forever)
                        , SC.actionOn(retireVie, SC.my("retireVie")
                                , undefined, SC.forever)
                )
        )
);

//le cube 
var cubeMaitreDuJeu = SC.cube(new MaitreDuJeu(), progMaitreDuJeu);
