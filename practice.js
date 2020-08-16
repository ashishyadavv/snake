




// pen.fillRect(20,20,40,40)

function init(){
	
	canvas= document.getElementById("mycanvas");
	pen=canvas.getContext('2d');	

	W=canvas.width=500;
	H=canvas.height=500;
	game_over=false;
	



	rect={
	x:20,
	y:20,
	w:40,
	h:40,
	speed:20,
}
}

function draw()
{
	pen.clearRect(0,0,W,H);
	pen.fillRect(rect.x , rect.y , rect.w , rect.h);
	pen.fillStyle="red";
	/*pen.fillRect(rect.x-50 , rect.y-50 , rect.w , rect.h);
	pen.fillStyle="blue";*/
}


function update()
{
	rect.x +=rect.speed;
	if(rect.x > W-rect.w || rect.x <0){
		rect.speed *= -1;
	} 



}

function gameloop(){
	draw();
	update();
	if(game_over==true)
		clearInterval(f);

}
init();
var f=setInterval(gameloop,100)
