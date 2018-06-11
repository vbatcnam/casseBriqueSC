'use strict';
//les événements 
//-------------------------------------

//	SC.evt("ce qui sera affiché lors du débug");
var drawMe = SC.evt("dessine-moi");//globale car diffusion broadcast (parle à tout le monde) Tous les objets disent cette phrase

//les fonction pour inclure les autres scripts
function ajouteFinBody(elt){
	document.body.appendChild(elt);
}

function includeScript(ps_url) {
	const lElt_script = document.createElement('script');
	lElt_script.src = ps_url;
	ajouteFinBody(lElt_script);
}

//les includes
includeScript('script/cubes/balle.js');
includeScript('script/cubes/raquette.js');
includeScript('script/cubes/brique.js');
includeScript('script/cubes/maitreDuJeu.js');
includeScript('script/cubes/zoneDeJeu.js');
includeScript('script/cubes/murs.js');
includeScript('script/moteur.js');