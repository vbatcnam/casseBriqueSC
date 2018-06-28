class Balle {
  constructor() {
    this.radius = 10; //rayon
    this.reset();//place la balle au centre
    this.drawSelf = {drawSelf:this.draw.bind(this)};
    this.me = this;
    }
  
  reset(){
    this.x = zoneDeJeu.width/2;
    this.y = zoneDeJeu.height-30;
    this.dx = 2;
    this.dy = -2
    }
  
  //doit être appelée par l'objet zoneDeJeu
  draw(ctx){
    // console.log('début dessin balle');
    ctx.beginPath();
    //(xCentre, yCentre, rayon, angleDépart, angleFin, sensAntiHoraire);
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    }
  checkBounceOnWalls(vals){
    var walls = vals[wallHere];
    var collide = false;
    // On va traiter la contrainte de colision comme le calcul d'un point fixe
    // On va chercher le mur que l'on a le plus traversé et appliquer la
    // contrainte pour se mur... Puis recommencer jusqu'à ce qu'il n'y ait plus
    // de murs traversés ...
    // L'hypothèse est que cette résolution termine...
    // L'intégration de la contrainte ce fait en inversant le vecteur vitesse
    // instantané par rapport à la normale du mur.
    do{
      collide = false;
      var findMax = 0;
      var index = -1;
      for(var i in walls){ // On cherche le mur le plus traversé (distance
                           // de pénétration max du projectile)
        if(walls[i].crossIt(this.x, this.y, this.radius)){ //est-ce que le mur est traversé ?
          var d = Math.abs(walls[i].distance(this.x, this.y)-this.radius);
          if(d > findMax){
            findMax = d;
            index = i;
            console.log("found wall", i, "d", d);
            }
          }
        }
      if(index < 0){
        continue;
        }
      collide = true;
      walls[index].bouncing();
      var bouncer = walls[index].normal;
      var scal = bouncer.x*this.dx+bouncer.y*this.dy;
      this.dx -= 2*scal* bouncer.x;
      this.dy -= 2*scal* bouncer.y;
      this.x -= 2*findMax* bouncer.x;
      this.y -= 2*findMax* bouncer.y;
      findMax = 0;
      index = -1;
      }
    while(collide);
    }
  bouge(){
    // le déplacement est fonction de la vitesse : comportement inertiel...
          this.x += this.dx;
          this.y += this.dy;
          // console.log(this.x, this.y);
  }
  
  rebondit(axe){
    // pour les rebonds. ça marche à peu pres tant que le déplacement n'excède pas 1 pixel...
    // sinon il faudra aussi corriger la position de la balle.
          this['d'+ axe] = -this['d'+ axe];
  }
}

//================================================================
//                                                        le cube 
//================================================================

//l’événement de la balle
var ballHere = SC.evt("Je suis la balle");

//le comportement du cube qui a la balle
var progBalle = SC.par(
        SC.generate(ballHere, SC.my("me"), SC.forever)//parle pour signaler sa position
        , SC.action( SC.my("bouge"), SC.forever )//se déplace
        , SC.actionOn( wallHere, SC.my("checkBounceOnWalls"), undefined, SC.forever )//se déplace
        /* on rajoute en parallèle le fait de se dessiner dans le canvas à chaque instant */
        , SC.generate(drawMe, SC.my("drawSelf"), SC.forever)//se dessine
);

//le cube
var cubeBalle = SC.cube(new Balle(), progBalle);
