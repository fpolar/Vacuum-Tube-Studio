var ball;
var garden;
var output;

var maxX;
var maxY;

//only one of these should be true at a time 
//because there is only one div they both write to
var debugOrientation = false;
var debugAcceleration = false;

function resizeGarden(){
  maxX = $(garden).width();
  maxY = $(garden).height();

  ctx.canvas.width  = $('#garden').width();
  ctx.canvas.height = $('#garden').height();

  canvas_width = $("#garden_canvas").width();
  canvas_height = $("#garden_canvas").height();
}

function brush_init(){
  connectToRoom(1);
  $("#buttons").hide();
  $("#brush_ui").show();

  ball   = document.querySelector('#ball');
  garden = document.querySelector('#garden');
  output = document.querySelector('#output');

  garden_canvas_init();
  resizeGarden();
  window.addEventListener("resize", resizeGarden);
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
  room.send({x:xOut, y:yOut, z:zOut, alpha:event.alpha, beta:event.beta, gamma:event.gamma});


  // 10 is half the size of the ball
  // It center the positioning point to the center of the ball
  ball.style.left  = (maxX*x/120 - 10) + "px";
  ball.style.top = (maxY*y/90 - 10) + "px";
  ball.style.width = (5+zOut*20) + "px";
  ball.style.height = (5+zOut*20) + "px";
}

function handleDraw(event){
  if(event.touches && event.touches.length == 1) {
    var touch = event.touches[0];
    var x = touch.clientX;
    var y = touch.clientY;

    x = (x - $(garden).position().left)/$(garden).width();
    y = (y - $(garden).position().top)/$(garden).height();

    room.send({x:x, y:y, z:.5, alpha:null, beta:null, gamma:null});
    drawDot(x, y, .5, "rgb("+main_player.color+")");
  }
  event.preventDefault();
}

function doneDrawing(){
    liftBrush();
    room.send({canvas_state: 'stop'});
}

function enable_tilt(){
  $("#ball").show();
  $("#touch_button").attr("disabled", false);
  $("#tilt_button").attr("disabled", true);
  window.addEventListener('deviceorientation', handleOrientation);
  window.addEventListener('devicemotion', handleMotion);
  // stop reacting to touch events on the garden
  garden.removeEventListener('touchstart', handleDraw, false);
  garden.removeEventListener('touchmove', handleDraw, false);
  garden.removeEventListener('touchend', doneDrawing, false);
}

function enable_touch(){
  $("#ball").hide();
  $("#touch_button").attr("disabled", true);
  $("#tilt_button").attr("disabled", false);
  window.removeEventListener('deviceorientation', handleOrientation);
  window.removeEventListener('devicemotion', handleMotion);
  // React to touch events on the garden
  garden.addEventListener('touchstart', handleDraw, false);
  garden.addEventListener('touchmove', handleDraw, false);
  garden.addEventListener('touchend', doneDrawing, false);
}
