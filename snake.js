





function init()
{
	canvas=document.getElementById("mycanvas");
	W=canvas.width=690;
	H=canvas.height=680;
	pen=canvas.getContext('2d');
	cs=66; //cellsize
	game_over=false;
	score=0;
	//create a food image object

	food_img=new Image();
	food_img.src="apple.png";

	food_trophy=new Image();
	food_trophy.src="trophy.png";

	food=getRandomFood();

//snake object created
	snake={ 
		init_len:5,
		color:"#004A22",
		cells:[],
		direction:'right',
		

		createSnake:function () {
			for(var i=this.init_len; i>=0; i--)
			{
				this.cells.push({x:i,y:0});
			}
		},

		drawSnake:function()
		{
			for(var i=0;i<this.init_len;i++){
				pen.fillStyle=this.color;
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
			}
		},

		updateSnake:function()
		{
			//pen.fillRect((this.cells[i].x*cs)+speed,this.cells[i].y*cs,cs-2,cs-2);

			//we have to just pop the last index of aaray and add the new position to the front and by doing this snake will move in right direcrtion.

			
			var headX=this.cells[0].x;
			var headY=this.cells[0].y;

			if(headX==food.x && headY==food.y)
			{
				food=getRandomFood();
				score++;
			}

			else{
				this.cells.pop();

			}

			

			//extract the cordinates of frint incell.
			

			var X;
			var Y;

			if(this.direction == 'right')
			{
				X=headX+1;
				Y=headY;
			}

			else if(this.direction == 'left')
			{
				X=headX-1;
				Y=headY;
			}

			else if(this.direction == 'up')
			{
				X=headX;
				Y=headY-1;
			}

			else {
				X=headX;
				Y=headY+1;
			}
			this.cells.unshift({x:X,y:Y}); 

			var last_x=Math.round(W/cs);
			var last_y=Math.round(H/cs);


			if(this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y<0 || this.cells[0].y>last_y)
				game_over=true;


			// if(food.x == X && food.y == Y)
			// {
			// 	food= getRandomFood();
			// 	score++;
			// }

			// if(X > W || X< 0 || Y > Y-H || Y <0)
			// {
			// 	game_over=true;

			// }



			// if(this.cells[0].x > W || this .cells[this.init_len-1] < 0)
			// 	{

			// 	}	
		}


	};





	snake.createSnake();

	function keypressed(e)
	{
		if(e.key == 'ArrowRight')
			snake.direction='right';

		else if(e.key == 'ArrowDown')
			snake.direction='down';

		else if(e.key == 'ArrowLeft')
			snake.direction='left';



		else
			snake.direction='up';
		//console.log(snake.direction);
	}


	document.addEventListener('keydown',keypressed);


}

	function draw(){
		//erase the old frame
		pen.clearRect(0,0,W,H);

		snake.drawSnake();
		pen.fillStyle=food.color;
		pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
		pen.drawImage(food_trophy,60,60,cs,cs);
		pen.fillText(score,90,90);
}

function update(){
	snake.updateSnake();


}

function getRandomFood()
{
	var foodX= Math.round(Math.random() * (W-cs)/cs);
	var foodY= Math.round(Math.random() * (H-cs)/cs);


	var food={
		x:foodX,
		y:foodY,
		color:"#B80012",
	}
	return food
}

function gameloop(){

	if(game_over==true)
	{
		clearInterval(f);
		alert("Game Over");

	}
	draw();
	update();

}

init();

var f=setInterval(gameloop,100);