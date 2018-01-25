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

function collision(m, e) {

  let col, combinedHalfWidths, combinedHalfHeights, vx, vy;
  col = false;

  // center points of sprite
  m.centerX = m.x + m.width / 2; m.centerY = m.y + m.height / 2;
  e.centerX = e.x + e.width / 2; e.centerY = e.y + e.height / 2;

  // center points, widths and heights of sprits
  m.halfWidth = m.width / 2; m.halfHeight = m.height / 2;
  e.halfWidth = e.width / 2; e.halfHeight = e.height / 2;

  // distance between the sprites
  vx = m.centerX - e.centerX;
  vy = m.centerY - e.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths  = m.halfWidth + e.halfWidth;
  combinedHalfHeights = m.halfHeight + e.halfHeight;


  if (Math.abs(vx) < combinedHalfWidths) {
    if (Math.abs(vy) < combinedHalfHeights) col = true;
    else col = false;
  } else { col = false; }

  return col;
}
