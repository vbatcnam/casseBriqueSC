//On ajoute les cubes au monde
//-------------------------------------
monde.addActor(zoneDeJeu);

//les murs du cadre
monde.addActor(murH);
monde.addActor(murD);
monde.addActor(murG);
monde.addActor(frontiere);//bas de l'ecran

monde.addActor(balle);
monde.addActor(raquette);

monde.addActor(maitreDuJeu);

//Ajout des briques
for(let tab_ActorBriques of tab2d_briques){
	for(let brique of tab_ActorBriques){
		monde.addActor(brique);
	}
}
