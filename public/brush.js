var ball   = document.querySelector('.ball');
var garden = document.querySelector('.garden');
var output = document.querySelector('.output');

var maxX = garden.clientWidth  - ball.clientWidth;
var maxY = garden.clientHeight - ball.clientHeight;

//only one of these should be true at a time 
//because there is only one div they both write to
var debugOrientation = false;
var debugAcceleration = true;

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

function handleMotion(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;

    if(debugAcceleration){
      output.innerHTML  = "accelX : " + x + "<br/>";
      output.innerHTML += "accelY : " + y + "<br/>";
      output.innerHTML += "accelZ: " + z + "<br/>";
    }

    room.send({accelX:x,accelY:y,accelZ:z});
}

function handleOrientation(event) {
  var x = event.gamma; // In degree in the range [-90,90]
  var y = event.beta;  // In degree in the range [-180,180]
  var z = event.alpha; // In degree in the range [0,360]

  if(debugOrientation){
    output.innerHTML  = "alpha : " + z + "<br/>";
    output.innerHTML += "beta : " + x + "<br/>";
    output.innerHTML += "gamma: " + y + "<br/>";
  }

  //Since the threshold for alpha is forward on load
  //some math needs to be done to cleanly control size with alpha
  if(z<90){ z = 90 - z}
  else if(z>270){ z = z - 270}
  else{ z = -1 }

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
  zOut = z/90;
  room.send({x:xOut, y:yOut, z:zOut, alpha:event.alpha, beta:event.beta, gamma:event.gamma});


  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  ball.style.left  = (maxX*x/180 - 10) + "px";
  ball.style.top = (maxY*y/180 - 10) + "px";
  ball.style.width = (3+zOut*37) + "px";
  ball.style.height = (3+zOut*37) + "px";
}
