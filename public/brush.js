var ball;
var garden;
var output;

var maxX;
var maxY;

var draw = false;

var tilting = false;

//only one of these should be true at a time 
//because there is only one div they both write to
var debugOrientation = true;
var debugAcceleration = false;

function brush_init(){
  output = document.getElementById("output");

  document.getElementById("buttons").style.display = 'none';
  document.getElementById("brush_ui").style.display = 'block';

  document.getElementById("brush_ui").addEventListener("mousedown", enable_draw);
  document.getElementById("brush_ui").addEventListener("mouseup", disable_draw);
  document.getElementById("brush_ui").addEventListener("touchstart", enable_draw);
  document.getElementById("brush_ui").addEventListener("touchend", disable_draw);

  window.addEventListener('deviceorientation', handleOrientation);
  window.addEventListener('devicemotion', handleMotion);

  connectToRoom(1);
}


function enable_draw(){
  draw = true;
}
function disable_draw(){
  draw = false
  room.send({state:'stop'});
}

function handleMotion(event) {
  if(!draw) return;

  var x = event.accelerationIncludingGravity.x;
  var y = event.accelerationIncludingGravity.y;
  var z = event.accelerationIncludingGravity.z;

  if(debugAcceleration){
    document.getElementById.innerHTML  = "accelX : " + x + "<br/>";
    output.innerHTML += "accelY : " + y + "<br/>";
    output.innerHTML += "accelZ: " + z + "<br/>";
  }

  //room.send({accelX:x,accelY:y,accelZ:z});
}

function handleOrientation(event) {

  var x = event.alpha; // In degree in the range [0,360]
  var y = event.beta;  // In degree in the range [-180,180]
  var z = event.gamma; // In degree in the range [-90,90]

  if(debugOrientation){
    output.innerHTML  = "alpha : " + z + "<br/>";
    output.innerHTML += "beta : " + y + "<br/>";
    output.innerHTML += "gamma: " + x + "<br/>";
  }

  //clamping the angles to certain values to make controlling the brush
  //through tilts more conventient to the user, ie they dont have to
  //bend the phone too extremely, just tilt slightly
  if(z<60){ z = 60 - z}
  else if(z>300){ z = z - 300}
  else{ z = -1 }

  if (x >  60) { x =  60};
  if (x < -60) { x = -60};

  if (y >  45) { y =  45};
  if (y < -45) { y = -45};

  //adding max abs value so there are no negative coordinates
  x += 60;
  y += 45;

  //turning the values into percentages so they can be drawn on any canvas
  xOut = x/120;
  yOut = y/90;
  zOut = z/60;
  if(draw) room.send({state:'draw', x:xOut, y:yOut});
}

function handleDraw(event){
  if(event.touches && event.touches.length == 1) {
    var touch = event.touches[0];
    var x = touch.clientX;
    var y = touch.clientY;

    x = (x - garden.offsetLeft)/canvas.offsetWidth;
    y = (y - garden.offsetTop)/canvas.offsetHeight;

    drawDot(x, y, .5, "rgb("+main_player.color+")");
    room.send({state:'draw', x:x, y:y, z:.5, alpha:null, beta:null, gamma:null});
  }
  event.preventDefault();
}