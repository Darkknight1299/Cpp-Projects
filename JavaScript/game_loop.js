
function init(){
	console.log("In init");
	canvas=document.getElementById("mycanvas");
	W=canvas.width=500;
	H=canvas.height=500;
	pen=canvas.getContext('2d')
	game_over=false;

	rect={
		x:20,
		y:20,
		w:40,
		h:40,
		speed:10,
	}
}

function draw(){
	//console.log("In Draw");
	pen.clearRect(0,0,W,H);
	pen.fillRect(rect.x,rect.y,rect.w,rect.h);
	pen.fillStyle= "red";
}

function update(){
	//console.log("In update");
	rect.x+=rect.speed;
	if(rect.x>W-rect.w || rect.x<0){
		rect.speed *= -1;
	}
}

function gameloop(){
	//console.log("In game loop") comment this out and comment the print statements in draw and update and check in browser console
	if(game_over==true){  //change this in browser console
		clearInterval(f);
	}

	draw();
	update();
}

init();
f = setInterval(gameloop,100);