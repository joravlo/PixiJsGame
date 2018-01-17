
function enemyCreate(){

  let enemy = PIXI.Sprite.fromImage('img/bs.png');

  // Posicionamos el elemento
  enemy.x = render.screen.width + enemy.width;
  enemy.y = render.screen.height - enemy.height;
  // Lo añadimos al canvas
  tilingSprite.addChild(enemy);

  // Funcion en bucle
  render.ticker.add(function() {

      // Velocidad movimiento de los elemetos
      tilingSprite.tilePosition.x -= 1;
      tilingSprite2.tilePosition.x -= 2;
      tilingSprite3.tilePosition.x -= 1.5;
      enemy.x -= 2;
      // Movemos el elemento a una posición aleatoria entre los 900 y 1200px
      if (enemy.x < -enemy.width)
      enemy.x = Math.round((Math.random() * 1200)) + render.screen.width;

  });
}

// Creamos el efecto de la colisión con un tiempo de espera de 1s
function boomCreate(){
  boom = PIXI.Sprite.fromImage('img/boom1.png');
  tilingSprite.addChild(boom);
  render.stop();
}

// Eliminamos el elemento colisión
function boomDestroy(){
  tilingSprite.removeChild(boom);
}
