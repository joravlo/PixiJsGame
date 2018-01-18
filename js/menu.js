var app = new PIXI.Application(800, 600);
document.body.appendChild(app.view);

var bg = PIXI.Sprite.fromImage('img/FondoMenu.jpg');
bg.width = app.screen.width;
bg.height = app.screen.height;
app.stage.addChild(bg);

var megaManTitle = PIXI.Sprite.fromImage('img/Titulo.png');
megaManTitle.x = (app.screen.width / 2);
megaManTitle.y = 0;
megaManTitle.anchor.set(0.5, 0,5);
app.stage.addChild(megaManTitle);

var ready = PIXI.Sprite.fromImage('img/Iniciar.png');
ready.x = (app.screen.width / 2);
ready.y = 300;
ready.anchor.set(0.5, 0,5);
app.stage.addChild(ready);

var record = PIXI.Sprite.fromImage('img/Record.png');
record.x = (app.screen.width / 2);
record.y = 400;
record.anchor.set(0.5, 0,5);
app.stage.addChild(record);


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
txtScore.x = (app.screen.width / 2) - 25;
txtScore.y = 440;
record.anchor.set(0.5, 0,5);
app.stage.addChild(txtScore);

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
    console.log("Record");
}
