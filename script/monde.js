//le moteur qui exécute les programmes
//-------------------------------------
var moteur = SC.machine(30);// toutes les 30 millisecondes il y a une macro étape (ou instant)

//On ajoute les cubes au moteur
//-------------------------------------
monde.addProgram(cubeBalle);
monde.addProgram(cubeRaquette);
for(let tab_CubeBriques of tab2d_CubeBriques){
	for(let prog of tab_CubeBriques){
		monde.addProgram(prog);
	}
}
monde.addProgram(cubeMaitreDuJeu);
monde.addProgram(cubeZoneDeJeu);

//les murs du cadre
monde.addProgram(cubeMurH);
monde.addProgram(cubeMurD);
monde.addProgram(cubeMurG);

monde.addProgram(cubeFrontiere);

//console.log(monde);