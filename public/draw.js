
// Variables for referencing the canvas and 2dcanvas ctx
var canvas,ctx;

//variables for drawing on a path instead of dots
var draw_path = true;
const redraw_interval = 3;
var redraw_timer = redraw_interval;

var player_paths = {};
var pointsX = [], pointsY = [], sizes = []

//host draw function
function canvasDraw(x,y,size,player) {
    console.log('host draw function');
    ctx.fillStyle =  "rgb("+player.color+")";

    var min_size = 5;
    var max_size = 20; 

    console.log(x, y);
    if(x<0 || y < 0) return;
    
    if(size<0){ size = 0; min_size = 0;}

    if(draw_path){
        player_paths[player.sessionId].pointsX.push(x);
        player_paths[player.sessionId].pointsY.push(y);
        player_paths[player.sessionId].sizes.push(min_size+size*(max_size-min_size));
        if(--redraw_timer == 0){
            canvasRedraw(player.color);
            redraw_timer = redraw_interval;
        }
    }else{
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, min_size+size*(max_size-min_size), 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    }   
} 

//host liftBrush function
function liftCanvasBrush(player){
    canvasRedraw(player);
    player_paths[player.sessionId].pointsX = [];
    player_paths[player.sessionId].pointsY = [];
    player_paths[player.sessionId].sizes = [];
}

//host redraw function
function canvasRedraw(player){

    if(!player_paths[player.sessionId]) return;

    ctx.strokeStyle = "rgb("+player.color+")";
    ctx.lineJoin = "round";

    for(var i=0; i < player_paths[player.sessionId].pointsX.length; i++) {        
        ctx.beginPath();
        if(i) ctx.moveTo(player_paths[player.sessionId].pointsX[i-1], player_paths[player.sessionId].pointsY[i-1]);
        else ctx.moveTo(player_paths[player.sessionId].pointsX[i]-1, player_paths[player.sessionId].pointsY[i]-1);   
        ctx.lineWidth = player_paths[player.sessionId].sizes[i];
        ctx.lineTo(player_paths[player.sessionId].pointsX[i], player_paths[player.sessionId].pointsY[i]);
        ctx.closePath();
        ctx.stroke();
    }

    //setting path arrays equal to its last element so draw continues path from there later
    player_paths[player.sessionId].pointsX.splice(0, player_paths[player.sessionId].pointsX.length - 1);
    player_paths[player.sessionId].pointsY.splice(0, player_paths[player.sessionId].pointsY.length - 1);
    player_paths[player.sessionId].sizes.splice(0, player_paths[player.sessionId].sizes.length - 1);

}

//client draw func
function brushDraw(x,y,size) {
    console.log('client draw function');
    ctx.fillStyle = "rgb("+main_player.color+")";

    var min_size = 5;
    var max_size = 20; 

    console.log(x, y);
    if(x<0 || y < 0) return;
    
    if(size<0){ size = 0; min_size = 0;}

    if(draw_path){
        pointsX.push(x*canvas.offsetWidth);
        pointsY.push(y*canvas.offsetHeight);
        sizes.push(min_size+size*(max_size-min_size));
        if(--redraw_timer == 0){
            brushRedraw();
            redraw_timer = redraw_interval;
        }
    }else{
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, min_size+size*(max_size-min_size), 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    }   
} 

//client liftBrush func
function liftPlayerBrush(){
    brushRedraw();
    pointsX = [];
    pointsY = [];
    sizes = [];
}

//client redraw func
function brushRedraw(){
    console.log("rgb("+main_player.color+")");
    ctx.strokeStyle = "rgb("+main_player.color+")";
    ctx.lineJoin = "round";

    for(var i=0; i < pointsX.length; i++) {        
        ctx.beginPath();
        if(i) ctx.moveTo(pointsX[i-1], pointsY[i-1]);
        else ctx.moveTo(pointsX[i]-1, pointsY[i]-1);   
        ctx.lineWidth = sizes[i];
        ctx.lineTo(pointsX[i], pointsY[i]);
        ctx.closePath();
        ctx.stroke();
    }
    pointsX = [pointsX[pointsX.length-1]];
    pointsY = [pointsY[pointsY.length-1]];
    sizes = [sizes[sizes.length-1]];

}

// Clear the canvas ctx using the canvas width and height
function clearCanvas(canvas,ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    room.send({canvas_state:'clear'});
}

function resizeCanvas(){
    ctx.canvas.width  = document.getElementById("canvas_container").offsetWidth;
    ctx.canvas.height = document.getElementById("canvas_container").offsetHeight;
}


// Set-up the canvas and add our event handlers after the page has loaded
function canvas_init() {
    $("#canvas_ui").show();
    $("#buttons").hide();
    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('canvas');

    ctx = $("#canvas")[0].getContext('2d');

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    connectToRoom(0);

}
