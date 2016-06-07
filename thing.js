var canvas = document.getElementById("thing");
var ctx = canvas.getContext("2d");

var timer = setInterval(update, 1/100);
var dick = new Image();
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

var testDot = new Dot(100, 10, "#84AB50", Math.floor(canvas.width*Math.random()), Math.floor(canvas.height*Math.random())); 

function update() {
	var testDotMovement = calculateMovement(testDot);
	testDot.x += testDotMovement[0];
	testDot.y -= testDotMovement[1];

	if(distance(testDot.x, testDot.y, testDot.movingToX, testDot.movingToY) <= 1){
		testDot.movingToX = Math.floor(canvas.width*Math.random());
		testDot.movingToY = Math.floor(canvas.height*Math.random());
	}

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
		ctx.drawImage(currentDot.img, currentDot.x, currentDot.y);
		currentDot.img.src = './dick.png';
		var difference = distance(currentDot.x, currentDot.y, testDot.x, testDot.y);
		if(difference < 100) {
			ctx.beginPath();
			ctx.moveTo(testDot.x, testDot.y);
			ctx.lineTo(currentDot.x, currentDot.y);
			ctx.stroke();
		}
	}
	ctx.fillStyle = testDot.colour;
	ctx.fillRect(testDot.x, testDot.y, 30, 30);
}

function distance(dot1X, dot1Y, dot2X, dot2Y){
	//Pythagorean theorem to find difference between dot[i] and testDot
	return Math.sqrt( Math.pow(( dot1X - dot2X ), 2) + Math.pow( ( dot1Y - dot2Y ), 2)); 
}

function calculateMovement(dot) {
	angle = Math.atan2(dot.y - dot.movingToY, dot.x - dot.movingToX) * (180/Math.PI);
	angle = angle * (Math.PI/180);
	return [(Math.sin(angle-1.5))*0.3, (Math.cos(angle-1.5))*0.3]
}


