var ball;
var garden;
var output;

var maxX;
var maxY;

var tilting = false;

//only one of these should be true at a time 
//because there is only one div they both write to
var debugOrientation = false;
var debugAcceleration = false;

function resizeGarden(){
  maxX = garden.offsetWidth;
  maxY = garden.offsetHeight;

  //subtract 10 from each for the border of the garden
  ctx.canvas.width  = maxX;
  ctx.canvas.height = maxY;

  canvas_width = canvas.offsetWidth;
  canvas_height = canvas.offsetHeight;
  console.log(room);
  if(room) room.send({state:'tilt', device_width:maxX, device_height:maxY});
}

function brush_init(){
  $("#buttons").hide();
  $("#brush_ui").show();
  ball   = document.querySelector('#ball');
  garden = document.querySelector('#garden');
  output = document.querySelector('#output');

  garden_canvas_init();
  resizeGarden();
  window.addEventListener("resize", resizeGarden);

  connectToRoom(1);
}


  // Set-up the canvas in the garden
  function garden_canvas_init() {
      // Get the specific canvas element from the HTML document
      canvas = document.getElementById('garden_canvas');

      ctx = $("#garden_canvas")[0].getContext('2d');
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
  room.send({state:'tilt', canvas_pos_x:xOut, canvas_pos_y:yOut});
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

function doneDrawing(){
  room.send({state:'draw'});
  liftBrush();
  room.send({state:'stop'});
}

//call funcs that add and remove listeners for new control type and start or stop animations
function toggle_tilt(){
  console.log("toggle tilt");
  if(tilting){
    enable_touch();
    document.getElementById("message").style.display = "none";
    document.getElementById("player_tag").style.WebkitAnimation = "none";
    document.getElementById("player_tag").style.animation = "none";
  }else{
    enable_tilt();
    //TODO animate icon somehow
    document.getElementById("message").innerHTML = "Tilt your device to move your drawing position on the canvas!"
    document.getElementById("message").style.display = "block";
    document.getElementById("player_tag").style.WebkitAnimation = "pulse 2s ease-in-out infinite";
    document.getElementById("player_tag").style.animation = "pulse 2s ease-in-out infinite";
  }
  tilting = !tilting;
}

function enable_tilt(){
  clearCanvas(garden, ctx);
  window.addEventListener('deviceorientation', handleOrientation);
  window.addEventListener('devicemotion', handleMotion);
  // stop reacting to touch events on the garden
  canvas.removeEventListener('touchstart', handleDraw, false);
  canvas.removeEventListener('touchmove', handleDraw, false);
  canvas.removeEventListener('touchend', doneDrawing, false);
}

function enable_touch(){
  //make sure a player who was guessing last round and isn't now can see the canvas
  document.getElementById("garden_canvas").style.display = 'block';
  document.getElementById("player_selector").style.display = 'none';
  // resizeGarden();
  // stop reacting to orientation and movement events
  window.removeEventListener('deviceorientation', handleOrientation);
  window.removeEventListener('devicemotion', handleMotion);
  // React to touch events on the garden
  canvas.addEventListener('touchstart', handleDraw, false);
  canvas.addEventListener('touchmove', handleDraw, false);
  canvas.addEventListener('touchend', doneDrawing, false);
}
