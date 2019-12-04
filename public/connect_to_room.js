var date = new Date();
var rejoin_enabled = true;
var reconnect_timer = 12;

function connectToRoom(){

	var host = window.document.location.host.replace(/:.*/, '');
	client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));
	client.onError.add(function(err) {
		console.log(err);
		room.send({error:err.message})
 		if(mobile_debug) debugOnSite("CLIENT ERROR:<br/>"+objectPropertiesString(err));
	});

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