var mobile_debug = false;
var client, room;
var players = {};

var main_player;
var isHost = false;

function connectToRoom(mode){

	var url = window.location.hostname;
	var socket =  'wss://'+url;
	if(url=="localhost"){
		socket+=window.location.port;
	}

	client = new Colyseus.Client(socket);
	client.onError.add(function(err) {
		console.log(err);
 		if(mobile_debug) debugOnSite("CLIENT ERROR:<br/>"+objectPropertiesString(err));
	});

	room = client.join("my_room");
	isHost = mode == 0;

	room.onJoin.add(function() {

		room.state.players.onAdd = function(player, sessionId) {
			console.log(client, sessionId, player);

			if(isHost){
				if(room.state.host_canvas_width == -1){
					room.state.host_canvas_width = canvas.offsetWidth;
					room.state.host_canvas_height = canvas.offsetHeight;
					room.send({host_canvas_width: canvas.offsetWidth, host_canvas_height: canvas.offsetHeight});
				}
			}else{
				resizeGarden();
			}

			addNewPlayer(player, sessionId);

			window.addEventListener("error", function (e) {
				room.send({error:e.message})
			});
		}

		room.state.players.onRemove = function(player, sessionId) {
			document.getElementById("canvas_container").removeChild(players[sessionId]);
			delete players[sessionId];
		}

		room.state.players.onChange = function (player, sessionId) {
			console.log(player.state);
			if(player.state == 'draw' && room.sessionId != sessionId){
				console.log('draw',room.state.host_canvas_width,player.canvas_pos_x,player.x,player.device_width);
				var explicit_pos_x = (room.state.host_canvas_width-player.device_width)*player.canvas_pos_x + player.x*player.device_width;
				var explicit_pos_y = (room.state.host_canvas_height-player.device_height)*player.canvas_pos_y + player.y*player.device_height;
				if(!isHost){
					explicit_pos_x -= (room.state.host_canvas_width-main_player.device_width)*main_player.canvas_pos_x;
					explicit_pos_y -= (room.state.host_canvas_height-main_player.device_height)*main_player.canvas_pos_y;
				}
				drawDotExplicitPosition(explicit_pos_x, explicit_pos_y, player.z, "rgba("+player.color+", 1)");
			}

			if(player.state == 'tilt'){
				players[sessionId].style.left = (room.state.host_canvas_width-player.device_width)*player.canvas_pos_x+"px";
				players[sessionId].style.top = (room.state.host_canvas_height-player.device_height)*player.canvas_pos_y+"px";
				console.log('tilt',players[sessionId].style.left, players[sessionId].style.top);
			}

			if(player.state == 'stop'){
				liftBrush();
			}
		}

		room.state.canvas_state.onChange = function (value, state) {
			console.log('value: ', value);
			console.log('state: ', state);
			if(state == 'path' && value == 1){
				draw_path = true;
			}
			if(state == 'path' && value == 0){
				draw_path = false;
			}
			if(state == 'clear' && value == 1){		
		        ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	});
}

function addNewPlayer(player, sessionId){
	var dom = document.createElement("div");
	dom.className = "player";
	dom.id = sessionId;
	dom.innerHTML = player.emoji;
	dom.style.background = "rgb("+player.color+")";

	if(room.sessionId == sessionId){
		main_player = player;

		if(!isHost){
			resizeGarden();
			$("html").css("background-color", "rgba("+player.color+", .2)");
			// document.getElementById("player_tag").appendChild(main_dom);
			$("#player_tag").append("<div class='player' style='background:rgb("+player.color+")'>"+player.emoji+"</div>");
			enable_touch();
		}else{
			//dont show the hosts player icon on canvas, because he cant draw
			dom.style.display = 'none';
		}
	}

	console.log("adding player", dom);
	document.getElementById("canvas_container").appendChild(dom);
	players[sessionId] = dom;
}

