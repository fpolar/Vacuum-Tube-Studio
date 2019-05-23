
    // Variables for referencing the canvas and 2dcanvas ctx
    var canvas,ctx;

    //variables for dynamically resizing the canvases
    var canvas_width;
    var canvas_height;

    //variables for drawing on a path instead of dots
    const draw_path = true;
    const redraw_interval = 10;
    var pointsX = [], pointsY = [], sizes = [], redraw_timer = redraw_interval;

    // Draws a dot at a specific position on the supplied canvas name
    // Parameters are: A canvas ctx, the x position, the y position, the size of the dot
    function drawDot(x,y,size,color) {
        console.log("Drawing Dot", x,y, size, color, ctx);

        // Select a fill style
        ctx.fillStyle = color;

        var min_size = 5;
        var max_size = 20;

        if(size<0){ size = 0; min_size = 0;}

        if(draw_path){
            console.log("Drawing Path", color, ctx);
            pointsX.push(x*canvas_width);
            pointsY.push(y*canvas_height);
            sizes.push(min_size+size*(max_size-min_size));
            if(--redraw_timer == 0){
                redraw(color);
                redraw_timer = redraw_interval;
            }
        }else{
            console.log("Drawing Dot", x,y, size, color, ctx);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x*canvas_width, y*canvas_height, min_size+size*(max_size-min_size), 0, Math.PI*2, true); 
            ctx.closePath();
            ctx.fill();
        }   
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
    }

    function resizeCanvas(){
        ctx.canvas.width  = $('#canvas_container').width();
        ctx.canvas.height = $('#canvas_container').height();

        canvas_width = $("#canvas").width();
        canvas_height = $("#canvas").height();
    }


    // Set-up the canvas and add our event handlers after the page has loaded
    function canvas_init() {
        // Get the specific canvas element from the HTML document
        canvas = document.getElementById('canvas');

        ctx = $("#canvas")[0].getContext('2d');

        $("#canvas_ui").show();
        $("#buttons").hide();
        connectToRoom(0);

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
    }
