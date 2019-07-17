
// Variables for referencing the canvas and 2dcanvas ctx
var canvas,ctx;

//variables for drawing on a path instead of dots
var draw_path = true;

//host/canvas
var players_last_draw_index = {};

//client/brush
var last_draw_pos = [-1, -1, -1];

//host redraw function
function canvasDraw(player){
    console.log(player.strokes_x, player.strokes_y, player.strokes_z);
    let player_path = [player.strokes_x, player.strokes_y, player.strokes_z];

    var i = 0;
    if(players_last_draw_index[player.sessionId]) i = players_last_draw_index[player.sessionId];

    ctx.strokeStyle = "rgb("+player.color+")";
    ctx.lineJoin = "round";

    for(; i < player_path[0].length; i++) {        
        ctx.beginPath();
        if(i) ctx.moveTo(player_path[0][i-1], player_path[1][i-1]);
        else ctx.moveTo(player_path[0][i]-1, player_path[1][i]-1);   

        if(player_path[0][i] != -1){
            ctx.lineWidth = player_path[2][i];
            ctx.lineTo(player_path[0][i]-1, player_path[1][i]-1);
        }

        ctx.closePath();
        ctx.stroke();
    }

    players_last_draw_index[player.sessionId] = player_path[0].length;
}

function canvasRedraw(){
    if(!room || !room.state) return;

    for (let key in room.state.players) {
        canvas_draw(room.state.players[key]);
    }

}


//client liftBrush func
function liftPlayerBrush(){
    last_draw_pos = [-1, -1, -1];
    room.send({x:-1, y:-1, z:-1});
}

//client redraw func
function brushDraw(x, y, z){
    console.log("rgb("+main_player.color+")");
    ctx.strokeStyle = "rgb("+main_player.color+")";
    ctx.lineJoin = "round";

    ctx.beginPath();
    
    if(last_draw_pos && last_draw_pos[0] != -1) ctx.moveTo(last_draw_pos[0], last_draw_pos[1]);
    else ctx.moveTo(x-1, y-1);
    ctx.lineWidth = z;
    if(x != -1) ctx.lineTo(x, y);

    ctx.closePath();
    ctx.stroke();

    last_draw_pos = [x, y, z];
}

// Clear the canvas ctx using the canvas width and height
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    room.send({canvas_state:'clear'});
}

// Clear the canvas ctx using the canvas width and height
function clearBrush() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    room.send({clear:'true'});
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
