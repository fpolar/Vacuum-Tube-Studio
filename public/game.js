var winners = [];

var submit_button = document.createElement("div");
submit_button.className = "player";
submit_button.id = "submit_winners";
submit_button.innerHTML = "Submit Winners";
submit_button.style.background = "grey";

function setPlayerAsLeader(){
    document.getElementById("message").innerHTML = "Tap Anywhere to start the game!"
    document.getElementById("message").style.display = "block";
    document.addEventListener("click", startGame);
	document.removeEventListener('touchstart', startGame, false);
	document.removeEventListener('touchmove', startGame, false);
	document.removeEventListener('touchend', startGame, false);
}

function startGame(){
	console.log('start game ',Object.keys(players).length);
	//only start the game if there is more than 1 player and 1 host in the room
	if(Object.keys(players).length > 2){
		room.send({start: 'start'});
	    document.getElementById("message").style.display = "none";
	    document.removeEventListener("click", startGame);
	}else{
		//display some message, or add to current
	}
}

//should setup guess div in garden, fill with players, set word div to ???
//and disable the canvas touch maybe, idk if that last one is necessary
function initGuess(){
	submit_button.onclick = submitWinners;
	document.getElementById("garden_canvas").style.display = 'none';

	if(!document.getElementById("player_selector").innerHTML.includes('submit')){
		//fill player selector div
		for (var key in players) {
			console.log(key);
			if(main_player.sessionId != key && room.state.players[key].state != 'host'){
				console.log(key);
				let p_selector = players[key];
				p_selector.addEventListener('click', function(e){
					toggleWinner(e.target, e.target.id);
				});
				document.getElementById("player_selector").append(p_selector);
			}
		}
		document.getElementById("player_selector").append(submit_button);
	}
	//set the onclick for player selector
	document.getElementById("player_selector").style.display = 'block';
}

function updateGameClient(){
	document.getElementById("word").innerHTML = room.state.current_word;
	document.querySelector("#text .score").innerHTML = room.state.players[main_player.sessionId].score;
}

function toggleWinner(player_elem, player_id){
	console.log(player_id+" is a winner!", player_elem);
	let player_color_raw = player_elem.style.backgroundColor.replace("rgb(", "").replace(")", "");
	let color_nums = player_color_raw.split(",");
	console.log(player_color_raw, color_nums);
	if(winners.includes(player_id)){
        var w_index = winners.indexOf(player_id);
        if (w_index > -1) {
            winners.splice(w_index, 1);
        }
		let r = Math.round(parseInt(color_nums[0])*10/7);
		let g = Math.round(parseInt(color_nums[1])*10/7);
		let b = Math.round(parseInt(color_nums[2])*10/7);
		console.log(r,g,b);
		document.getElementById("9XRky3mCz").style.backgroundColor = 'rgb(0,0,0)'
		player_elem.style.backgroundColor= "rgb("+r+","+g+","+b+","+")";
	}else{
		winners.push(player_id);
		let r = Math.round(parseInt(color_nums[0])*.7);
		let g = Math.round(parseInt(color_nums[1])*.7);
		let b = Math.round(parseInt(color_nums[2])*.7);
		console.log(r,g,b);
		document.getElementById("9XRky3mCz").style.backgroundColor = 'rgb(0,0,0)'
		player_elem.style.backgroundColor= "rgb("+r+","+g+","+b+","+")";
	}
}

function submitWinners(){
	winners.forEach(function(id) {
		console.log(id);
		room.send({round_winner:id});
	});
	room.send({start:'next_round'});
	winners = [];
	reset_brush_ui();
}