# casseBriqueSC
break out game with SugarCubes 

Un jeu de casse brique tout simple pour nous faire découvrir et tester SugarCubes.
Pour en savoir plus sur SugarCubes : https://github.com/LordManta/SugarCubesJS

Cette branche est codée avec la librairie *syntaxeSimplifieeSC.js*
Pour en savoir plus sur cette librairie : https://github.com/cl4cnam

Le code ainsi que la doc sont en cours.

Cette branche est écrite en utilisant une librairie qui permet de coder plus facilement du SugarCubes avec JavaScript.

Avec SugarCubes je devais créer des objets JS puis des cubes SC dans lesquels je mettait mes objets JS.
Ici, on crée un objet SCCube qui s’occupe de tout.

# La librairie syntaxeSimplifieeSC
Cette syntaxe facilite l'utilisation de sugarCubes

Pour raccourcir je vais l'appeler "SCEasy"

# Ce qui change avec SCEasy.
Ce fichier contient dejà la machine donc pas la peine de la créer de nouveau dans notre programme.
````javascript
var monde = SC.machine(30);
monde.addActor = monde.addProgram;
````

*monde* m'est plus parlant que *machine* car je ne sais pas bien ce qu'on entend par machine. 

Du coup, *addActor* me parait plus intuitif : J'ajoute les acteurs de mon monde.

## création des objets
Maintenant, pour créer mes objets, j'utilise la syntaxe suivante :

````javascript
class MaClasse extends SCCube{
	constructor(p1, pn){
		super();
		this.1 = p1;
		this.n = pn;
	}
````

## Action sur les événement.
Pour appeler les fonctions de SugarCubes, j'utilise les syntaxes suivante 

````javascript
	$actionForever_descriptionAction(){} // si l'action est forever
	$on_nomEvenement[_descriptionAction](){}
	$onNo_nomEvenement[_descriptionAction](){}
	$publicConst_nomEvenement() {return valAEnvoyer} //permet de faire un SC.generate()
	$publicVar_nomEvenement() {return valAEnvoyer} //permet de faire un SC.generate()//calcule à chaque instant
````