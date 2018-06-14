//le moteur qui exécute les programmes
//-------------------------------------
var moteur = SC.machine(30);// toutes les 30 millisecondes il y a une macro étape (ou instant)

//On ajoute les cubes au moteur
//-------------------------------------
moteur.addProgram(cubeBalle);
moteur.addProgram(cubeRaquette);
for(let tab_CubeBriques of tab2d_CubeBriques){
	for(let prog of tab_CubeBriques){
		moteur.addProgram(prog);
	}
}
moteur.addProgram(cubeMaitreDuJeu);
moteur.addProgram(cubeZoneDeJeu);

//les murs du cadre
moteur.addProgram(cubeMurH);
moteur.addProgram(cubeMurD);
moteur.addProgram(cubeMurG);

moteur.addProgram(cubeFrontiere);

//console.log(moteur);