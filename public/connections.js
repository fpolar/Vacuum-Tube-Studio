
var client = new Colyseus.Client('wss://localhost:3000');
var room = client.join("my_room");
console.log(room);


var players = {};
var colors = ['red', 'green', 'yellow', 'blue', 'cyan', 'magenta'];


room.onJoin.add(function() {
	if(mode == 0){
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

		room.state.players.onChange = function (player, sessionId) {
			var dom = players[sessionId];
			// dom.style.left = player.x + "px";
			// dom.style.top = player.y + "px";
			drawDot(players.x, players.y, players.z, dom.style.background)
		}
	}
});

window.addEventListener("error", function (e) {
	room.send({error:e.type})
});