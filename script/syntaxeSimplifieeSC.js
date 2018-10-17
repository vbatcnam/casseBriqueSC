'use strict'
/** 
	syntaxe simplifiée de sugarCubes.js 
*/
SC.titreInfoEmise = SC.evt;

//Fabrique un événement par char (
const g_AllSCevents = {}
function SCEVT(ps_nom) {
	if(g_AllSCevents[ps_nom] === undefined) {
		g_AllSCevents[ps_nom] = SC.evt(ps_nom)
	}
	return g_AllSCevents[ps_nom]
}

//permet de créer un cube en même temps que l'objet.
class SCCube extends SC.cube().constructor {
	constructor() {
		super(null, null)
		this.o = this
		
		const lArray_methodes = Object.getOwnPropertyNames(this.__proto__)
		
		const lArray_prog = []
		for(let ls_nomMeth of lArray_methodes) {
			if(ls_nomMeth.substring(0,1) == '$') {
				if(ls_nomMeth.substring(0,15) == '$actionForever_') {
					// lArray_prog.push(SC.repeat( SC.forever, ...this[ls_nomMeth]() ))
					lArray_prog.push( SC.action(this[ls_nomMeth].bind(this), SC.forever) )
					// console.log(ls_nomMeth)
				}else if(ls_nomMeth.substring(0,7) == '$repeat'){
					const ln_nbFois = parseInt(ls_nomMeth.match(/\d+/g)[0])
					lArray_prog.push(SC.repeat( ln_nbFois, ...this[ls_nomMeth]() ))
				}else if(ls_nomMeth.substring(1,2) == '_') {
					lArray_prog.push( this[ls_nomMeth]() )
				}
			}
		}
		
		// console.log(this.constructor.name)
		this.p = SC.kill(SCEVT('kill_' + this.constructor.name), SC.par(...lArray_prog));
	}
}

var monde = SC.machine(30);
monde.addActor = monde.addProgram;