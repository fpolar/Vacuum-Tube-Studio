var mobile_debug = false;
var client, room;
var players = {};

var main_player;
var isHost = false;

var deviceid = {};
//what problems could a global date var like this create
var date = new Date(); 
var reconnectMilli = 10000

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
	
	console.log('time ', getCookie('exittime'), date.getTime(), getCookie('exittime')+reconnectMilli>date.getTime());

	debugOnSite(getCookie('deviceid')+' '+getCookie('exittime') +' '+date.getTime() +' '+( getCookie('exittime')+reconnectMilli>date.getTime()));

	//rejoin or join
	if(getCookie('deviceid') != "" && 
		getCookie('deviceid') != "undefined" &&
		getCookie('exittime')+reconnectMilli>date.getTime()){
		console.log('rejoining');
		deviceid = {sessionId: getCookie('deviceid')};
		room = client.rejoin("my_room", deviceid);
	}else{
		console.log('joining');
		room = client.join("my_room");
	}

	// deviceId = {sessionId: room.sessionId};
	isHost = mode == 0;

	room.onJoin.add(setupPlayerConnections);
}

function setupPlayerConnections(){
	if(deviceid == {}){
		deviceId = {sessionId: room.sessionId};
	}
	room.state.players.onAdd = function(player, sessionId) {
		// console.log(client, sessionId, player);

		if(isHost){
			if(room.state.host_canvas_width == -1){
				room.state.host_canvas_width = canvas.offsetWidth;
				room.state.host_canvas_height = canvas.offsetHeight;
				room.send({host_canvas_width: canvas.offsetWidth, host_canvas_height: canvas.offsetHeight});
			}
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
		if(player.state == 'draw' && isHost){
			console.log('draw',room.state.host_canvas_width,player.canvas_pos_x,player.x,player.device_width);
			let explicit_pos_x = room.state.host_canvas_width*player.canvas_pos_x
			let explicit_pos_y = room.state.host_canvas_height*player.canvas_pos_y
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
}

function addNewPlayer(player, sessionId){
	var dom = document.createElement("div");
	dom.className = "player";
	dom.id = sessionId;
	dom.innerHTML = player.emoji;
	dom.style.background = "rgb("+player.color+")";

	if(room.sessionId == sessionId){
		main_player = player;
		setCookie('deviceid', room.sessionId, reconnectMilli);

		window.onunload = function(){
			setCookie('deviceid', room.sessionId, reconnectMilli);
	  		setCookie('exittime', date.getTime(), reconnectMilli);
		};
		
		if(!isHost){
			document.body.style.backgroundColor = "rgba("+player.color+", .2)";
			document.getElementById("player_tag").append(dom);
			document.getElementById("player_tag").innerHTML = "<div class='player' style='background:rgb("+
			player.color+")'>"+player.emoji+"</div>";
			
		}else{
			//dont show the hosts player icon on canvas, because he cant draw
			dom.style.display = 'none';
		}
	}

	console.log("adding player", dom);
	document.getElementById("canvas_container").appendChild(dom);
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