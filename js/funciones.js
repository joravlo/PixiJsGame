
/* Devuelve la posición x a partir de un porcentaje */
function getXFromScreen(percentage){
	return (percentage*render.screen.width)/100;
}
/* Devuelve la posición y */
function getYFromScreen(){
	return render.screen.height - (megaman.height * 2);
}

function getYTextureFromScreen(spriteTexture, scale){
	return render.screen.height - (spriteTexture.frame.height * scale);
}

// Devuelve un entero aleatorio entre un número inicial y el intervalo de posibles resultados
function rndIntFromInterval(num, interval){
	return Math.floor((Math.random() * interval)) + num;
}
