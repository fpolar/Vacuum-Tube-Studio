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

const firebaseConfig = {
  apiKey: "AIzaSyBMAW7qT7q6jsjdWyS0VltpbaBAYaOrNFY",
  authDomain: "vacuum-tube-studio.firebaseapp.com",
  databaseURL: "https://vacuum-tube-studio.firebaseio.com",
  projectId: "vacuum-tube-studio",
  storageBucket: "vacuum-tube-studio.appspot.com",
  messagingSenderId: "399300729320",
  appId: "1:399300729320:web:c84ae2e42ec4d30a38ec5d",
  measurementId: "G-D5PZ99QBPC"
};

function connectToRoom(mode){

	// Initialize Firebase
	var testFirebaseApp = firebase.initializeApp(firebaseConfig, "test");

	var url = window.location.hostname;
	if(url=="localhost"){
		url+=":"+window.location.port;
	}
	var socket =  'ws://'+url;
	if(location.protocol == "https:"){
		socket = 'wss://'+url;
	} 

	//var host = window.document.location.host.replace(/:.*/, '');
	//client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));
	
	client = new Colyseus.Client(socket);
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

	// deviceId = {sessionId: room.sessionId};
	isHost = mode == 0;

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

		if(main_player && main_player.sessionId == sessionId && isHost){
			if(room.state.host_canvas_width == -1){
				room.send({state:'host',
					host_canvas_width: canvas.offsetWidth, 
					host_canvas_height: canvas.offsetHeight});
			}else{
				console.log('host already in room');
				return;
			}
		}else if(!isHost){
			resizeGarden();
		}

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

	room.state.players.onChange = function (player, sessionId) {
		console.log(player.state);
		if(sessionId == main_player.sessionId){
			main_player = player;
		}
		if(player.state == 'ready'){
			console.log("player ready", room.state.current_word);
			if(main_player.sessionId == sessionId){
				//remove redundant calls if word concurrency issue is fixed
				reset_brush_ui();
			}
			updateGameClient();
		}
		if(player.state == 'guess'){
			if(main_player.sessionId == sessionId){
				console.log('player guessing');
				reset_brush_ui();
				initGuess();
			}
			updateGameClient();
		}
		if(player.state == 'clear' && isHost){
			//may be able to just pass player beca and do these explicit pos calculations in the draw func
			console.log('player cleared, reseting canvas');
			canvasRedraw();

		}
		if(player.state == 'draw' && isHost){
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

	room.state.canvas_state.onChange = function (value, state) {
		if(state == 'path' && value == 1){
			draw_path = true;
		}
		if(state == 'path' && value == 0){
			draw_path = false;
		}
		// if(state == 'clear' && value == 1){		
		// 	clearCanvas();
		// }
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
	players[sessionId] = dom;

	if(room.sessionId == sessionId){ 
		main_player = player;
		// fillPlayerSelector();
		setCookie('deviceid', room.sessionId, reconnectMilli);

		window.onunload = function(){
			setCookie('deviceid', room.sessionId, reconnectMilli);
	  		setCookie('exittime', date.getTime(), reconnectMilli);
		};
		console.log(players);
		if(!isHost){
			resizeGarden();
			$("html").css("background-color", "rgba("+player.color+", .2)");
			// document.getElementById("player_tag").appendChild(main_dom);
			// $("#player_tag").append("<div class='player' id='"+player.sessionId+
			// 	"' style='background:rgb("+player.color+")'>"+player.emoji+"</div>");
			document.getElementById("player_tag").appendChild(dom.cloneNode(true));

			//check for previous player state incase of reconnect
			
			if(player.state == 'guess'){
				initGuess();
				updateGameClient();
			}else if(player.state == 'draw' || room.state.current_word != 'game not started'){
				enable_touch();
				updateGameClient();
			}else{
				setPlayerAsLeader();
			}
		}else{
			//dont show the hosts player icon on canvas, because he cant draw
			dom.style.display = 'none';
		}
	} else{ 
		console.log(main_player);
		if(isHost){
			document.getElementById("player_container").appendChild(dom.cloneNode(true));
			if(document.getElementById(player.sessionId)){
				//add something to show score
			}
		}else if(main_player && main_player.state == 'guess'){
			insertInPlayerSelector(dom.cloneNode(true));
			// fillPlayerSelector();
		}
	}
	// if(player.state != 'host') players[sessionId] = dom;
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