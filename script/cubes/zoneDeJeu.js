//L'objet zoneDeJeu
//------------------
var zoneDeJeu = document.getElementById("zoneDeJeu");//le canvas

// tableau des objets à redessiner à chaque nouvelle image.
zoneDeJeu.toDraw=[];

//correspond  à la fonction sc_drawItFun de JFS
zoneDeJeu.dessineLesEltsDuJeu = function(){
	var ctx = this.getContext("2d");
	// on efface tout
	ctx.clearRect(0, 0, this.width, this.height);
	/* on itere sur tous les objets à dessiner */
	// console.log('début dessin tous');
	for(var i in this.toDraw){
		// console.log(this.toDraw[i]);
		this.toDraw[i].draw(ctx);
	}
	this.isFrameRequested = false;
};


//correspond  à la fonction sc_requestDisplayFun de JFS
zoneDeJeu.afficheLesEltsDuJeu = function(obj_all){
	if(this.isFrameRequested){return;}//évite de redessiner si ce n'est pas fini
	this.isFrameRequested = true;
	this.toDraw = obj_all[drawMe]; //tableau des objets à redessiner à chaque nouvelle image. zoneDeJeu.toDraw=[cubeBalle, cubeRaquette, tab_CubeBriques]; 
	// console.log(this.toDraw);

	window.requestAnimationFrame(this.dessineLesEltsDuJeu.bind(this))//sc_drawItFun
};


// booléen de régulation de l'affichage appelée par affiche()
zoneDeJeu.isFrameRequested = false; 

// le comportement du cube de la zone de jeu
var progZoneDeJeu = SC.actionOn(
	drawMe
	, SC.my("afficheLesEltsDuJeu")
	, undefined
	, SC.forever
);

//on met l'objet dans un cube
var cubeZoneDeJeu = SC.cube( zoneDeJeu, progZoneDeJeu);
