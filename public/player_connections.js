var mobile_debug = true;
var rejoin_enabled = true;
var client, room;
var players = {};

var main_player;
var isHost = false;

var deviceid = {};
//what problems could a global date var like this create
var date = new Date(); 
var reconnect_timer = 12;

var last_draw_id = '';
var last_word = '';

function connectToRoom(){

	var host = window.document.location.host.replace(/:.*/, '');
	client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));
	client.onError.add(function(err) {
		console.log(err);
		room.send({error:err.message})
		// if (err.includes("rejoin")){
		// 	//TODO display message indicating reconnect failed
		// 	deleteAllCookies();
		// 	connectToRoom();
		// }
 		if(mobile_debug) debugOnSite("CLIENT ERROR:<br/>"+objectPropertiesString(err));
	});
	
	client.isHost = false;

	//SOME REJOIN DEBUG MESSAGES
	// console.log('time ', getCookie('exittime'), date.getTime(), getCookie('exittime')+reconnectMilli>date.getTime());
	// debugOnSite(getCookie('deviceid')+' '+getCookie('exittime') +' '+date.getTime() +' '+( getCookie('exittime')+reconnectMilli>date.getTime()));
	console.log(parseInt(getCookie('exittime'))+reconnect_timer*1000);
	console.log(date.getTime());
	//rejoin or join
	if(rejoin_enabled &&
		getCookie('deviceid') != "" && 
		getCookie('deviceid') != "undefined" &&
		parseInt(getCookie('exittime'))+reconnect_timer*1000>date.getTime()){
		console.log('rejoining');
		deviceid = {sessionId: getCookie('deviceid')};
		try{
			room = client.rejoin("my_room", deviceid);	
		}catch(err){
			console.log('rejoining failed, attempting join');
			deleteAllCookies();
			room = client.join("my_room");
		}
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
	//temporary fix for word always being a round behind
	setInterval(function(){
		if(document.getElementById('word').innerHTML != 'game not started') updateGameClient();
	}, 1234);

	room.state.players.onAdd = function(player, sessionId) {
		// console.log(client, sessionId, player);

		addNewPlayer(player, sessionId);
		resizeGarden();
		room.send({device_width:maxX, device_height:maxY});
		window.addEventListener("error", function (e) {
			room.send({error:e.message})
		});
	}
	room.state.round.onChange = function (round, sessionId) {
		updateGameClient();//no need to pass round info as param b/c it can be accessed from wherever
	}

	room.state.players.onChange = function (player, sessionId) {
		console.log(player.state);
		if(sessionId == main_player.sessionId){
			//updating the local client main_player value b/c of change
			main_player = player;
			if(player.state == 'guess'){
				//start the guessing client user flow
				initGuess();
			}
		}else{
			if(player.state == 'guess'){
				//update client "who's guessing" div
			}
			if(player.state == 'draw'){
				//if the draw of this player is within the current players boundaries
				//draw here
			}
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
	players[sessionId] = dom;

	if(room.sessionId == sessionId){ 
		main_player = player;
		setCookie('deviceid', room.sessionId, reconnect_timer*1000);

		window.onunload = function(){
			setCookie('deviceid', room.sessionId, reconnect_timer*1000);
	  		setCookie('exittime', date.getTime(), reconnect_timer*1000);
		};
		console.log(players);
		resizeGarden();
		$("html").css("background-color", "rgba("+player.color+", .2)");
		document.getElementById("player_tag").appendChild(dom.cloneNode(true));

		//check for previous player state incase of reconnect
		if(player.state == 'init'){
			setPlayerAsLeader();
		}else if(player.state == 'guess'){
			initGuess();
			updateGameClient();
		}else if(player.state == 'draw' || room.state.current_word != 'game not started'){
			enable_touch();
			updateGameClient();
		}else{
			setPlayerAsLeader();
		}
	}
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