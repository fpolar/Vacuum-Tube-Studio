
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
    console.log(player)
    let player_path = player.brush_strokes;

    var offset_x = (room.state.host_canvas_width-player.device_width)*player.canvas_pos_x;
    var offset_y = (room.state.host_canvas_height-player.device_height)*player.canvas_pos_y;
    
    var i = 0;
    if(players_last_draw_index[player.sessionId]) i = players_last_draw_index[player.sessionId];

    ctx.strokeStyle = "rgb("+player.color+")";
    ctx.lineJoin = "round";

    for(; i < player_path.length; i++) {        
        ctx.beginPath();
        if(i && player_path[i-1].x != -1){
            ctx.moveTo(
                offset_x + player_path[i-1].x * player.device_width, 
                offset_y + player_path[i-1].y * player.device_height
                );
        }
        else{
            ctx.moveTo(
                offset_x + (player_path[i].x-.0001) * player.device_width, 
                offset_y + (player_path[i].y-.0001) * player.device_height 
                );   
        }

        if(player_path[i].x != -1){
            ctx.lineWidth = player_path[i].z;
            ctx.lineTo(
                offset_x + (player_path[i].x) * player.device_width, 
                offset_y + player_path[i].y * player.device_height
                );
        }

        ctx.closePath();
        ctx.stroke();
    }

    players_last_draw_index[player.sessionId] = player_path.length;
}

function canvasRedraw(){
    if(!room || !room.state) return;

    for (let key in room.state.players) {
        canvasDraw(room.state.players[key]);
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
    ctx.lineWidth = 10;
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
    canvas = document.getElementById('canvas');

    ctx = $("#canvas")[0].getContext('2d');

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    connectToRoom();

}
