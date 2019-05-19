var mobile_debug = false;
var client, room;
var players = {};


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
	    console.log(client.id, " joined ", room.name);
		room.state.players.onAdd = function(player, sessionId) {
			console.log(player);
	  		var dom = document.createElement("div");
			dom.className = "player";
			dom.id = sessionId;

			// var bgColor = player.color;
			// var playerEmoji = player.emoji;
			// if(playerEmoji == ""){
			// 	console.log("setting player emoji");
			// 	playerEmoji = emojis[Math.floor(Math.random() * emojis.length)];
			// 	room.send({emoji: playerEmoji});
			// }
			// if(bgColor == ""){
			// 	console.log("setting player color");
			// 	bgColor = colors[Math.floor(Math.random() * colors.length)]
			// 	room.send({color: bgColor});
			// }
			dom.innerHTML = player.emoji;
			dom.style.background = player.color;
			players[sessionId] = dom;

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
