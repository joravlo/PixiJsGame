
var textureBackground, textureBackground2, textureBackground3;
var tilingSprite, tilingSprite1, tilingSprite2;

/*Load background images*/
function loadBackgrounds(){
	// Create texture background
	 textureBackground = PIXI.Texture.fromImage('img/fondo.jpg');
	 tilingSprite = new PIXI.extras.TilingSprite(
	    textureBackground,
	    render.screen.width=WIDTH_SCREEN,
	    render.screen.height=HEIGHT_SCREEN
	);
	 textureBackground2 = PIXI.Texture.fromImage('img/fondoLargo_capa1.png');
	 tilingSprite2 = new PIXI.extras.TilingSprite(
	    textureBackground2,
	    render.screen.width=WIDTH_SCREEN,
	    render.screen.height=HEIGHT_SCREEN
	);
	 textureBackground3 = PIXI.Texture.fromImage('img/fondoLargo_capa2.png');
	 tilingSprite3 = new PIXI.extras.TilingSprite(
	    textureBackground3,
	    render.screen.width=WIDTH_SCREEN,
	    render.screen.height=HEIGHT_SCREEN
	);

	//Add background to render
	render.stage.addChild(tilingSprite);
	tilingSprite.addChild(tilingSprite3);
	tilingSprite.addChild(tilingSprite2);
}

/*Move background images*/
function moveBackground() {
  // Velocidad movimiento de los elemetos
  tilingSprite.tilePosition.x -= 1;
  tilingSprite2.tilePosition.x -= 2;
  tilingSprite3.tilePosition.x -= 1.5;
}
