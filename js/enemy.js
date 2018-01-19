var enemy;
var runEnemy = []; //Array with images of spritesheet
var enemyTexture;
var afEnemy = 0;
const ENEMY_SPEED = 3;
const ENMEY_SCALE = 1.5;

function addEnemy() {
  enemyTexture = loader.resources["enemy01"].texture;

  runEnemy.push(
    new PIXI.Rectangle(5,14,41,48),
    new PIXI.Rectangle(48,11,41,51),
    new PIXI.Rectangle(137,7,42,55),
    new PIXI.Rectangle(92,0,41,62));

    enemyTexture.frame = runEnemy[0];
    enemy = new Sprite(enemyTexture);
    enemy.scale.set(ENMEY_SCALE,ENMEY_SCALE);
    enemy.x = render.screen.width + enemyTexture.frame.width;
    enemy.y = getYTextureFromScreen(enemyTexture, ENMEY_SCALE);
    enemy.scale.set(ENMEY_SCALE,ENMEY_SCALE);
    tilingSprite.addChild(enemy);
    render.render(stage);
}

function enemyCreate(){

  if (afEnemy >= maxFrame) {
    afEnemy = 0;
  } else {
    afEnemy += 1/df;
  }

let enemyX = enemy.x;
enemyTexture.frame = runEnemy[Math.floor(afEnemy)];
tilingSprite.removeChild(enemy);
enemy = new Sprite(enemyTexture);
enemy.x = enemyX - ENEMY_SPEED;
enemy.y = getYTextureFromScreen(enemyTexture, ENMEY_SCALE);

//If enemy disappears of screen set random width
if (enemy.x < -enemyTexture.frame.height)
enemy.x = Math.round((Math.random() * 1200)) + render.screen.width;

enemy.scale.set(ENMEY_SCALE,ENMEY_SCALE);
tilingSprite.addChild(enemy);
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

function moveBackground() {
  // Velocidad movimiento de los elemetos
  tilingSprite.tilePosition.x -= 1;
  tilingSprite2.tilePosition.x -= 2;
  tilingSprite3.tilePosition.x -= 1.5;
}
