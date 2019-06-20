
    // Variables for referencing the canvas and 2dcanvas ctx
    var canvas,ctx;

    //variables for drawing on a path instead of dots
    var draw_path = true;
    const redraw_interval = 3;
    var pointsX = [], pointsY = [], sizes = [], redraw_timer = redraw_interval;

    function path_toggle(p){
        draw_path = p;
        document.getElementById("pathbutton").disabled = !draw_path;
        document.getElementById("dotbutton").disabled = draw_path;
        if(draw_path) room.send({canvas_state: 'path'});
        else room.send({canvas_state: 'dots'});
    }

    function drawDot(x,y,size,color) {
        ctx.fillStyle = color;

        var min_size = 5;
        var max_size = 20;

        if(size<0){ size = 0; min_size = 0;}

        if(draw_path){
            pointsX.push(x*canvas.offsetWidth);
            pointsY.push(y*canvas.offsetHeight);
            sizes.push(min_size+size*(max_size-min_size));
            if(--redraw_timer == 0){
                redraw(color);
                redraw_timer = redraw_interval;
            }
        }else{
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x*canvas.offsetWidth, y*canvas.offsetHeight, min_size+size*(max_size-min_size), 0, Math.PI*2, true); 
            ctx.closePath();
            ctx.fill();
        }   
    } 

    function drawDotExplicitPosition(x,y,size,color) {
        ctx.fillStyle = color;

        var min_size = 5;
        var max_size = 20; 

        console.log(x, y);
        if(x<0 || y < 0) return;
        
        if(size<0){ size = 0; min_size = 0;}

        if(draw_path){
            pointsX.push(x);
            pointsY.push(y);
            sizes.push(min_size+size*(max_size-min_size));
            if(--redraw_timer == 0){
                redraw(color);
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

    function liftBrush(){
        redraw(main_player.color);
        pointsX = [];
        pointsY = [];
        sizes = [];
    }

    function redraw(color){

        ctx.strokeStyle = color;
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
