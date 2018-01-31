var loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    maxFrame = 4, //Max Frame run
    af = 0,
    df = 4, // images per seconds
    jump = false,
    keyup = 38;

var textCount;
var time = 0;
const KEY_PAUSE = 80;
const KEY_RIGHT = 39;
const KEY_LEFT = 37;
var tecla = null;
var pause = false;

var megaman;
var run = []; //Array with images of spritesheet
var megamanTexture;


const WIDTH_SCREEN = 900;
const HEIGHT_SCREEN = 500;
const GRAVEDAD = 9.8; // Aceleración (g)
const INITIAL_SPEED_P1 = 60 * Math.sin((-75* Math.PI)/180); // Velocidad de salto vertical (Modificar SOLO el primer número)
const DEFAULT_GAME_SPEED = 0.2; // Velocidad del tiempo en el juego
const PLAYER_X = 15;
const PLAYER1_MAX_X = 15;
const PLAYER1_MIN_X = 15;

/*Variables de la parábola de salto*/
var player1_vy = INITIAL_SPEED_P1; // Velocidad inicial del personaje en el eje y
var player1_X = PLAYER_X; // Posición x del jugador 1 (Megaman) en % de pantalla
var player1_a = 0; // Aceleración adicional en la parábola de salto (Valor negativo para incrementar salto)
var tFinal; // Tiempo en el salto
var yInicial = 0; // Posición inicial
var jumpBoost = 0; // Relentiza la velocidad del tiempo en el salto (No se ha implementado)

//Create the render
var render = new PIXI.Application(WIDTH_SCREEN, HEIGHT_SCREEN);

//Add the canvas to the HTML document
document.body.appendChild(render.view);

//Create a container object
var stage = new PIXI.Container();

// Load background
loadBackgrounds();

loader
  .add("megaman", "img/MegaMan.png")
  .add("enemy01","img/enemy01.png")
  .add("img/bs.png")
  .add('img/fondo.jpg')
  .add('img/boom1.png')
  .load(setup);

function setup(){
  // Event listeners
  document.addEventListener('keydown',function(event) {
    if(event.keyCode == keyup && !jump){
      jump = true;
      tFinal = 0;
      yInicial = megaman.y-60;
      player1_a = -3;
      player1_vy = INITIAL_SPEED_P1;
    }else if(event.keyCode == KEY_RIGHT && player1_X<PLAYER1_MAX_X){
      player1_X+=1;
    }else if(event.keyCode == KEY_LEFT && player1_X>PLAYER1_MIN_X){
      player1_X-=1;
    }else if(event.keyCode == KEY_PAUSE){
      pause = true;
    }
  });
  document.addEventListener('keyup',function(event) {
    //yInicial = megaman.y;
    player1_a = 0;
    player1_vy = (megaman.y-yInicial+(0.5)*(-(GRAVEDAD+player1_a))*Math.pow(tFinal, 2))/(tFinal);
    //console.log("megaman.y "+megaman.y);
    //console.log("tFinal "+tFinal);
  });

  if(pause){
    let miText = new PIXI.Text("PAUSE");
    tilingSprite.addChild(basicText);
    pause = false;
    render.stop();
	}else{
    timer();
    addEnemy();
    addMegaMan();
    gameLoop();
  }
}

function addMegaMan() {
  megamanTexture = loader.resources["megaman"].texture;
  // Create Rectangle with image
  run.push(
      // Image run
      new PIXI.Rectangle(120,11,49,82),
      new PIXI.Rectangle(376,11,49,82),
      new PIXI.Rectangle(192,14,51,79),
      new PIXI.Rectangle(10,17,71,74),
      new PIXI.Rectangle(271,17,63,74),
      // Image jump
      new PIXI.Rectangle(10,116,73,100),
      new PIXI.Rectangle(118,116,82,100));

  // Set first rectangle
  megamanTexture.frame = run[0];
  // Create Sprite
  megaman = new Sprite(megamanTexture);
  megaman.x=render.screen.width/2;
  megaman.y=512/2;
  megaman.scale.set(2,2);
  tilingSprite.addChild(megaman);
  render.render(stage);
}

function timer() {
  // Estilo del contador
  let style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontWeight: 'bold',
      fill: ['#ffffff'],
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
  });

  time++;
  tilingSprite.removeChild(textCount);
  textCount = new PIXI.Text(time, style);
  tilingSprite.addChild(textCount);
  saveTimer(time);
  setTimeout("timer()",1000);

}

function saveTimer(pts){
  // Save the score in the localStorage
  if (localStorage.score) {
    if (pts > parseInt(localStorage.score)) {
      localStorage.score = pts;
    }
  }else{
    localStorage.score = pts;
  }
}

// GameLoop for change the frame from MegaMan
function gameLoop() {
  var f = requestAnimationFrame(gameLoop);

  moveBackground();
  enemyCreate();
  // If jump set frame 5. Else alternate first four frames
  if (jump) {
    af = 5;
  } else if (af >= maxFrame) {
    af = 0;
  } else {
    af += 1/df;
  }

  megamanTexture.frame = run[Math.floor(af)];
  tilingSprite.removeChild(megaman);
  megaman = new Sprite(megamanTexture);
  if (jump) {
    // Add in screen and calcule y
    megaman.x = getXFromScreen(player1_X);
    megaman.y = yInicial+player1_vy*tFinal-(0.5)*(-(GRAVEDAD+player1_a))*Math.pow(tFinal, 2);
    //console.log(megaman.y);
    // Se incrementa el tiempo
    tFinal+=DEFAULT_GAME_SPEED;

    if(megaman.y>getYFromScreen()){
      jump = false;
      megaman.y = getYFromScreen();
    }
  } else {
    // Add in middle of screen
    // megaman.x = getXFromScreen(player1_X);
    megaman.x += getXFromScreen(player1_X);

    megaman.y = getYFromScreen();
  }

  // Scale image and add to render
  megaman.scale.set(2,2);
  tilingSprite.addChild(megaman);
  render.render(stage);

  if (collision(megaman,enemy))
  window.location="index.html";
}
//Create the Sound noSound sprites
var sound = PIXI.Sprite.fromImage('img/Volumen.png');
sound.x = 5;
sound.y = 50;
sound.scale.set(0.1,0.1);
tilingSprite.addChild(sound);
render.render(stage);


var noSound = PIXI.Sprite.fromImage('img/NoVolumen.png');
noSound.x = 5;
noSound.y = 50;
noSound.scale.set(0.1,0.1);
tilingSprite.addChild(noSound);
render.render(stage);
noSound.visible=false;

//OnClick Sound or NoSound
noSound.interactive = true;
noSound.buttonMode = true;
noSound.on('pointerdown', onClickNoSound);


function onClickNoSound () {
    //Visible sprites
    noSound.visible=false;
    sound.visible=true;
    //Play audio
    document.getElementById("audio").muted=false;
}

sound.interactive = true;
sound.buttonMode = true;
sound.on('pointerdown', onClickSound);

function onClickSound () {
    //Visible sprites
    sound.visible=false;
    noSound.visible=true;
    //Mute the audio
    document.getElementById("audio").muted=true;
}
