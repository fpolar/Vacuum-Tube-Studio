var client, room;
var players = {};
var colors = ['red', 'green', 'yellow', 'blue', 'cyan', 'magenta'];

function connectToRoom(mode){

	client = new Colyseus.Client('wss://localhost:3000');
	room = client.join("my_room");
	console.log("joined" + room);

	window.addEventListener("error", function (e) {
		room.send({error:e.message})
	});

	room.onJoin.add(function() {
	    console.log(client.id, "joined", room.name);
	    console.log(room.state);
		room.state.players.onAdd = function(player, sessionId) {
	  		var dom = document.createElement("div");
			dom.className = "player";
			dom.style.background = colors[Math.floor(Math.random() * colors.length)];
			dom.innerHTML = "Player " + sessionId;
			players[sessionId] = dom;
			document.body.appendChild(dom);
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
