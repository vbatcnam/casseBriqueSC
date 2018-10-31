'use strict';
//les événements 
//-------------------------------------
// on place ici les déclarations d'événements partagées par plusieurs objets.

//	SC.evt("ce qui sera affiché lors du débug");
var signalDrawMe = SC.evt("dessine-moi");//globale car diffusion broadcast (parle à tout le monde) Tous les objets disent cette phrase
var MDJSignalRetireVie = SC.evt("retire 1 vie");

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
/* retiiré en attendant de maitriser les import JS6
ncludeScript('script/cubes/balle.js');
includeScript('script/cubes/raquette.js');
includeScript('script/cubes/brique.js');
includeScript('script/cubes/maitreDuJeu.js');
includeScript('script/cubes/zoneDeJeu.js');
includeScript('script/cubes/murs.js');
includeScript('script/collision.js');
includeScript('script/moteur.js');
*/
