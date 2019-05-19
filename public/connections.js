var mobile_debug = false;
var client, room;
var players = {};

var main_player;

function connectToRoom(mode){

	var url = window.location.hostname;
	var socket =  'wss://'+url;
	if(url=="localhost"){
		socket+=window.location.port;
	}

	client = new Colyseus.Client(socket);
	client.onError.add(function(err) {
		console.log(err);
 		if(mobile_debug) debugOnSite(objectPropertiesString(err));
	});

	room = client.join("my_room");

	room.onJoin.add(function() {

		if(mobile_debug) debugOnSite(client.id + " joined " + room.name);
	    console.log(room.sessionId, " joined ", room.name);

		room.state.players.onAdd = function(player, sessionId) {
			console.log(client, sessionId, player);
	  		var dom = document.createElement("div");
			dom.className = "player";
			dom.id = sessionId;
			dom.innerHTML = player.emoji;
			dom.style.background = player.color;
			players[sessionId] = dom;

			if(room.sessionId == sessionId){
				main_player = player;
				console.log("setting main player", dom);
				$(".ball").css("background-color", player.color);
				$(".ball").append(dom);
				$("#player_tag").append(dom);
			}

			document.getElementById("player_container").appendChild(dom);

			window.addEventListener('deviceorientation', handleOrientation);

			window.addEventListener("error", function (e) {
				room.send({error:e.message})
			});
		}

		room.state.players.onRemove = function(player, sessionId) {
			document.getElementById("player_container").removeChild(players[sessionId]);
			delete players[sessionId];
		}
		if(mode == 0){
			room.state.players.onChange = function (player, sessionId) {
				var dom = players[sessionId];
				drawDot(player.x, player.y, player.z, player.color)
			}
		}
	});
}
