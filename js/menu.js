
//Create the render
var render = new PIXI.Application(800, 600);
document.body.appendChild(render.view);

//Create all the sprites
var bg = PIXI.Sprite.fromImage('img/FondoMenu.jpg');
bg.width = render.screen.width;
bg.height = render.screen.height;
render.stage.addChild(bg);

var megaManTitle = PIXI.Sprite.fromImage('img/Titulo.png');
megaManTitle.x = (render.screen.width / 2);
megaManTitle.y = 0;
megaManTitle.anchor.set(0.5, 0,5);
render.stage.addChild(megaManTitle);

var ready = PIXI.Sprite.fromImage('img/Iniciar.png');
ready.x = (render.screen.width / 2);
ready.y = 300;
ready.anchor.set(0.5, 0,5);
render.stage.addChild(ready);

var record = PIXI.Sprite.fromImage('img/Record.png');
record.x = (render.screen.width / 2);
record.y = 400;
record.anchor.set(0.5, 0,5);
render.stage.addChild(record);

var score = localStorage.score;
let style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontWeight: 'bold',
    fill: ['#ffffff'],
    strokeThickness: 5,
    dropShadowColor: '#000000',
});
var txtScore = new PIXI.Text(score, style);
txtScore.x = (render.screen.width / 2) - 25;
txtScore.y = 440;
record.anchor.set(0.5, 0,5);
render.stage.addChild(txtScore);

// Ready onclick
ready.interactive = true;
ready.buttonMode = true;
ready.on('pointerdown', onClickReady);
function onClickReady () {
    window.location="game.html";
}
//Record onclick
record.interactive = true;
record.buttonMode = true;
record.on('pointerdown', onClickRecord);

function onClickRecord () {

}

//Create the Sound noSound sprites
var sound = PIXI.Sprite.fromImage('img/Volumen.png');
sound.x = 20;
sound.y = 5;
sound.scale.set(0.1,0.1);
render.stage.addChild(sound);


var noSound = PIXI.Sprite.fromImage('img/NoVolumen.png');
noSound.x = 20;
noSound.y = 5;
noSound.scale.set(0.1,0.1);
render.stage.addChild(noSound);
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
