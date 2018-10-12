//le moteur qui exécute les programmes
//-------------------------------------
var moteur = SC.machine(30);// toutes les 30 millisecondes il y a une macro étape (ou instant)

//On ajoute les cubes au moteur
//-------------------------------------
monde.addActor(cubeBalle);
monde.addActor(cubeRaquette);
for(let tab_CubeBriques of tab2d_CubeBriques){
	for(let prog of tab_CubeBriques){
		monde.addActor(prog);
	}
}
monde.addActor(cubeMaitreDuJeu);
monde.addActor(cubeZoneDeJeu);

//les murs du cadre
monde.addActor(cubeMurH);
monde.addActor(cubeMurD);
monde.addActor(cubeMurG);

monde.addActor(cubeFrontiere);
