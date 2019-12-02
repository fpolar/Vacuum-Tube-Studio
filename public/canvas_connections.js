var mobile_debug = true;
var rejoin_enabled = false;
var client, room;
var players = {};

var main_player;
var isHost = false;

var deviceid = {};
//what problems could a global date var like this create
var date = new Date(); 
var reconnectMilli = 10000;

var last_draw_id = '';
var last_word = '';

function connectToRoom(){

	var host = window.document.location.host.replace(/:.*/, '');
	client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));
	client.onError.add(function(err) {
		console.log(err);
 		if(mobile_debug) debugOnSite("CLIENT ERROR:<br/>"+objectPropertiesString(err));
	});
	
	// console.log('time ', getCookie('exittime'), date.getTime(), getCookie('exittime')+reconnectMilli>date.getTime());

	// debugOnSite(getCookie('deviceid')+' '+getCookie('exittime') +' '+date.getTime() +' '+( getCookie('exittime')+reconnectMilli>date.getTime()));

	//rejoin or join
	if(rejoin_enabled &&
		getCookie('deviceid') != "" && 
		getCookie('deviceid') != "undefined" &&
		getCookie('exittime')+reconnectMilli>date.getTime()){
		console.log('rejoining');
		deviceid = {sessionId: getCookie('deviceid')};
		room = client.rejoin("my_room", deviceid);
	}else{
		console.log('joining');
		room = client.join("my_room");
	}

	room.onJoin.add(setupPlayerConnections);
}

function setupPlayerConnections(){
	if(deviceid == {}){
		deviceId = {sessionId: room.sessionId};
	}

	room.state.players.onAdd = function(player, sessionId) {
		// console.log(client, sessionId, player);
		addNewPlayer(player, sessionId);
		window.addEventListener("error", function (e) {
			room.send({error:e.message})
		});
	}

	room.state.players.onRemove = function(player, sessionId) {
		if(players[sessionId] && document.getElementById("canvas_container").contains(players[sessionId])){
			document.getElementById("canvas_container").removeChild(players[sessionId]);
			delete players[sessionId];
		}
	}

	room.state.round.onChange = function (round, sessionId) {
		console.log("round change - ", round.round_number, round.current_word);
	}

	room.state.players.onChange = function (player, sessionId) {
		console.log("player change - ", player.sessionId, player.state);
		if(player.state == 'draw'){
			//may be able to just pass player beca and do these explicit pos calculations in the draw func
			console.log('draw on canvas');
			canvasDraw(player);
		}

		if(player.state == 'tilt' || player.state == 'init'){
			players[sessionId].style.left = (room.state.host_canvas_width-player.device_width)*player.canvas_pos_x+"px";
			players[sessionId].style.top = (room.state.host_canvas_height-player.device_height)*player.canvas_pos_y+"px";
			console.log('tilt',players[sessionId].style.left, players[sessionId].style.top);
		}
	}
}

function addNewPlayer(player, sessionId){
	console.log(player, sessionId, isHost)
	var dom = document.createElement("div");
	dom.className = "player";
	//giving it an id could cause problems if i ever use it for something 
	//since I clone the element
	dom.id = sessionId;
	dom.innerHTML = player.emoji;
	dom.style.background = "rgb("+player.color+")";

	console.log("adding player", sessionId, dom);
	document.getElementById("canvas_container").appendChild(dom);
	document.getElementById("player_container").appendChild(dom.cloneNode(true));

	players[sessionId] = dom;
}

//w3 cookie example functions
function setCookie(cname, cvalue, expiremilli) {
  var d = new Date();
  d.setTime(d.getTime() + expiremilli);
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

//code from Robert J. Walker on stackoverflow
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}