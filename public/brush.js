var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

function brush_init(){
 	$("#buttons").hide();
	$("#brush_ui").show();
  connectToRoom(1);

	ball   = document.querySelector('.ball');
	garden = document.querySelector('.garden');
	output = document.querySelector('.output');
	maxX = $(garden).width();
	maxY = $(garden).height();
}

function handleOrientation(event) {
  var x = event.gamma; // In degree in the range [-90,90]
  var y = event.beta;  // In degree in the range [-180,180]

  output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x >  90) { x =  90};
  if (x < -90) { x = -90};

  // To make computation easier we shift the range of 
  // x and y to [0,180]
  x += 90;
  y += 90;

  xOut = x/180;
  yOut = y/180;
  zOut = 10;
  room.send({x:xOut, y:yOut, z:zOut, alpha:event.alpha, beta:event.beta, gamma:event.gamma});


  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  ball.style.left  = (maxX*x/180 - 10) + "px";
  ball.style.top = (maxY*y/180 - 10) + "px";
}
