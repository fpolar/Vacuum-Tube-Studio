var client, room;
var players = {};
var colors = ['red', 'green', 'yellow', 'blue', 'cyan', 'magenta'];

function connectToRoom(mode){

	var url = window.location.hostname;
	var socket =  'wss://'+url;
	if(url=="localhost"){
		socket+=window.location.port;
	}
	client = new Colyseus.Client(socket);
	client.onError.add(function(err) {
 		debugOnSite(objectPropertiesString(err));
 		// debugOnSite(objectPropertiesString(client));
 		// debugOnSite(client.id);
	});
	// client.id = "aY_JVTde2"
	room = client.join("my_room");

	room.onJoin.add(function() {
		debugOnSite(client.id + " joined " + room.name);
	    console.log(client.id, " joined ", room.name);
	    console.log(room.state);
		room.state.players.onAdd = function(player, sessionId) {
	  		var dom = document.createElement("div");
			dom.className = "player";
			dom.style.background = colors[Math.floor(Math.random() * colors.length)];
			dom.innerHTML = "Player " + sessionId;
			players[sessionId] = dom;
			document.body.appendChild(dom);

			window.addEventListener('deviceorientation', handleOrientation);

			window.addEventListener("error", function (e) {
				room.send({error:e.message})
			});
		}

		room.state.players.onRemove = function(player, sessionId) {
			document.body.removeChild(players[sessionId]);
			delete players[sessionId];
		}
		if(mode == 0){
			room.state.players.onChange = function (player, sessionId) {
				var dom = players[sessionId];
				// dom.style.left = player.x + "px";
				// dom.style.top = player.y + "px";
				drawDot(player.x, player.y, player.z, dom.style.background)
			}
		}
	});
}
