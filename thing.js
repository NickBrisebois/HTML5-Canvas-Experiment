var canvas = document.getElementById("thing");
var ctx = canvas.getContext("2d");

var timer = setInterval(update, 1/100);
var toDraw = [];
var dots = [];

function Dot(x, y, colour, movementEquationX, movementEquationY){
	this.x = x;
	this.y = y;
	this.colour = colour;
	this.img = new Image();
	this.movingToX = Math.floor(canvas.width*Math.random());
	this.movingToY = Math.floor(canvas.height*Math.random());
}

for(var i=0; i<100; i++){
	dots[i] = new Dot(Math.random()*canvas.width, Math.random()*canvas.height, "#000", 3, 3);
}

function update() {
	
	for(var i=0; i<dots.length; i++){
		if(distance(dots[i].x, dots[i].y, dots[i].movingToX, dots[i].movingToY) <= 1){
			dots[i].movingToX = Math.floor(canvas.width*Math.random());
			dots[i].movingToY = Math.floor(canvas.height*Math.random());
		}else{
			var dotMovement = calculateMovement(dots[i]);
			dots[i].x += dotMovement[0];
			dots[i].y -= dotMovement[1];
		}
	}
	draw();
}


function draw(){
	canvas.width = canvas.width;
	for(var i=0; i<dots.length; i++){
		var currentDot = dots[i];
		ctx.beginPath();
		ctx.arc(currentDot.x, currentDot.y, 2, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.stroke();
		for(var ii=0; ii<dots.length; ii++){
			var difference = distance(currentDot.x, currentDot.y, dots[ii].x, dots[ii].y);
			if(difference < 100) {
				ctx.beginPath();
				ctx.moveTo(dots[ii].x, dots[ii].y);
				ctx.lineTo(currentDot.x, currentDot.y);
				ctx.stroke();
			}
		}
	}
}


function distance(dot1X, dot1Y, dot2X, dot2Y){
	//Pythagorean theorem to find distance between the given dots
	return Math.sqrt( Math.pow(( dot1X - dot2X ), 2) + Math.pow( ( dot1Y - dot2Y ), 2)); 
}


function calculateMovement(dot) {
	angle = Math.atan2(dot.y - dot.movingToY, dot.x - dot.movingToX) * (180/Math.PI);
	angle = angle * (Math.PI/180);
	return [(Math.sin(angle-1.5))*0.3, (Math.cos(angle-1.5))*0.3]
}


