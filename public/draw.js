
    // Variables for referencing the canvas and 2dcanvas context
    var canvas,ctx;

    // Variables to keep track of the mouse position and left-button status 
    var mouseX,mouseY,mouseDown=0;

    // Variables to keep track of the touch position
    var touchX,touchY;

    //structures for keeping track of canvas states for undoing TODO
    var drawing_steps = [];

    var canvas_width;
    var canvas_height;

    // Draws a dot at a specific position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    function drawDot(x,y,size,color) {
        console.log("Drawing Dot", x,y, size, color);

        // Select a fill style
        ctx.fillStyle = color;

        var min_size = 5;
        var max_size = 20 - min_size;//max size is 40, but for calculations subtract min size here

        if(size<0){ size = 0; min_size = 0;}

        // Select a fill style
        ctx.fillStyle = color;

        // Draw a filled circle
        ctx.beginPath();
        ctx.arc(x*canvas_width, y*canvas_height, min_size+size*max_size, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    } 

    function redraw(){

      context.strokeStyle = "#df4b26";
      context.lineJoin = "round";
      context.lineWidth = 5;
                
      for(var i=0; i < clickX.length; i++) {        
        context.beginPath();
        if(clickDrag[i] && i){
          context.moveTo(clickX[i-1], clickY[i-1]);
         }else{
           context.moveTo(clickX[i]-1, clickY[i]);
         }
         context.lineTo(clickX[i], clickY[i]);
         context.closePath();
         context.stroke();
      }
    }

    // Clear the canvas context using the canvas width and height
    function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Keep track of the mouse button being pressed and draw a dot at current location
    function sketchpad_mouseDown() {
        mouseDown=1;
        drawDot(mouseX,mouseY,12, main_player.color);
    }

    // Keep track of the mouse button being released
    function sketchpad_mouseUp() {
        mouseDown=0;
    }

    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    function sketchpad_mouseMove(e) { 
        // Update the mouse co-ordinates when moved
        getMousePos(e);

        // Draw a dot if the mouse button is currently being pressed
        if (mouseDown==1) {
            drawDot(ctx,mouseX,mouseY,12);
        }
    }

    // Get the current mouse position relative to the top-left of the canvas
    function getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }

    // Draw something when a touch start is detected
    function sketchpad_touchStart() {
        // Update the touch co-ordinates
        getTouchPos();

        drawDot(ctx,touchX,touchY,12);

        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }

    // Draw something and prevent the default scrolling when touch movement is detected
    function sketchpad_touchMove(e) { 
        // Update the touch co-ordinates
        getTouchPos(e);

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        drawDot(ctx,touchX,touchY,12); 

        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
    }

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    function getTouchPos(e) {
        if (!e)
            var e = event;

        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
            }
        }
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

        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (canvas.getContext)
            ctx = canvas.getContext('2d');

        // Check that we have a valid context to draw on/with before adding event handlers
        if (ctx) {
            // React to mouse events on the canvas, and mouseup on the entire document
            canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
            canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
            window.addEventListener('mouseup', sketchpad_mouseUp, false);

            // React to touch events on the canvas
            canvas.addEventListener('touchstart', sketchpad_touchStart, false);
            canvas.addEventListener('touchmove', sketchpad_touchMove, false);
        }

        $("#canvas_ui").show();
        $("#buttons").hide();
        connectToRoom(0);

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
    }
