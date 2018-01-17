var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    maxFrame = 4, //Max Frame run
    af = 0,
    df = 4, // images per seconds
    jump = false,
    keyup = 38;

var basicText;
var time = 0;
var keyPause = 80;
var tecla = null;
var pause = false;
var enemy = { width: 200, height: 200, x: 0, y: 0 };
var boom = { width: 200, height: 200, x: 0, y: 0 };
var megaman;
var run = []; //Array with images of spritesheet
var megamanTexture;

const WIDTH_SCREEN = 900;
const HEIGHT_SCREEN = 500;
const J1_X = 15; // Posición x del jugador 1 (Megaman) en % de pantalla
const GRAVEDAD = 600;
const VELOCIDAD_J1 = 300*Math.sin((-75* Math.PI)/180); // (Modificar el primer número)
var tInicial = 0;
var yInicial = 0;

//Create the render
var render = new PIXI.Application(WIDTH_SCREEN, HEIGHT_SCREEN);

//Add the canvas to the HTML document
document.body.appendChild(render.view);

//Create a container object
var stage = new PIXI.Container();

// Create texture background
var textureBackground = PIXI.Texture.fromImage('img/fondo.jpg');
var tilingSprite = new PIXI.extras.TilingSprite(
    textureBackground,
    render.screen.width=WIDTH_SCREEN,
    render.screen.height=HEIGHT_SCREEN
);

//Add background to render
render.stage.addChild(tilingSprite);

PIXI.loader
  .add("megaman", "img/MegaMan.png")
  .add("img/bs.png")
  .add('img/fondo.jpg')
  .add('img/boom1.png')
  .load(setup);

function setup(){
  //Key up pressed megaman jump
  document.addEventListener('keyup',function(event) {
    if(event.keyCode == keyup){
      jump = true;
      tInicial = new Date().getTime();
      yInicial = getYFromScreen();
    }else if(event.keyCode == keyPause){
      pause = true;
    }
  });

  if(pause){
    let miText = new PIXI.Text("PAUSE");
    tilingSprite.addChild(basicText);
    pause = false;
    render.stop();
	}else{
    timer();
    enemyCreate();
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

  // Pintamos el contador
  time++;
  tilingSprite.removeChild(textCount);
  let textCount = new PIXI.Text(time, style);
  tilingSprite.addChild(textCount);
  setTimeout("timer()",1000);

}

// GameLoop for change the frame from MegaMan
function gameLoop() {
  var f = requestAnimationFrame(gameLoop);
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
    // Add in middle of page and increase 200px by the jump
    megaman.x = getXFromScreen(J1_X);
    //megaman.y = (render.screen.height - (megaman.height * 2)) - 200;
    let t = (new Date().getTime()-tInicial)/1000;
    megaman.y = yInicial+VELOCIDAD_J1*t-(0.5)*(-GRAVEDAD)*Math.pow(t, 2);
    console.log(megaman.y);
    if(megaman.y>getYFromScreen()){
      jump = false;
      megaman.y = getYFromScreen();
    }
  } else {
    // Add in middle of page
    megaman.x = getXFromScreen(J1_X);

    megaman.y = getYFromScreen();
  }

  // Scale image and add to render
  megaman.scale.set(2,2);
  tilingSprite.addChild(megaman);
  render.render(stage);
}
