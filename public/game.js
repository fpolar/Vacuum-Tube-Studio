var winners = [];
var round_num = 0;

var submit_button = document.createElement("div");
submit_button.id = "submit_winners";
submit_button.innerHTML = "</br>Submit Winners</br></br>";
submit_button.style.background = "Gainsboro";
submit_button.style.textAlign = "center";

var guesser_instructions = document.createElement("div");
guesser_instructions.id = "guesser_instructions";
guesser_instructions.innerHTML = "</br></br>Tap the players with the best drawings</br></br></br>";
guesser_instructions.style.background = "Gainsboro";
guesser_instructions.style.textAlign = "center";

function setPlayerAsLeader(){
    document.getElementById("message").innerHTML = "Tap Anywhere to start the game!"
    document.getElementById("message").style.display = "block";
    document.addEventListener("click", startGame);
	document.addEventListener('touchstart', startGame, false);
	document.addEventListener('touchmove', startGame, false);
	document.addEventListener('touchend', startGame, false);
}

function startGame(){
	console.log('start game ',Object.keys(players).length);
	//only start the game if there is more than 1 player and 1 host in the room
	if(Object.keys(players).length > 2){
		room.send({start: 'start'});
	    document.getElementById("message").style.display = "none";
	    document.removeEventListener("click", startGame);
		document.removeEventListener('touchstart', startGame, false);
		document.removeEventListener('touchmove', startGame, false);
		document.removeEventListener('touchend', startGame, false);
	}else{
		//display some message, or add to current
	}
}

//should setup guess div in garden, fill with players, set word div to ???
//and disable the canvas touch maybe, idk if that last one is necessary
function initGuess(){
	submit_button.onclick = submitWinners;
	document.getElementById("garden_canvas").style.display = 'none';
	document.getElementById("word").style.display = 'none';

	if(!document.getElementById("player_selector").innerHTML.includes('submit')){
		document.getElementById("player_selector").append(guesser_instructions);
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
	if(winners.includes(player_id)){
        var w_index = winners.indexOf(player_id);
        if (w_index > -1) {
            winners.splice(w_index, 1);
        }
		player_elem.style.filter = 'saturate(100%) brightness(100%)';
	}else{
		winners.push(player_id);
		player_elem.style.filter = 'saturate(66%) brightness(77%)';
	}
}

function submitWinners(){
	winners.forEach(function(id) {
		console.log(id);
		room.send({round_winner:id});
	});
	room.send({start:'next_round'});
	reset_brush_ui();
	let p_selector_list = [...document.getElementById('player_selector').children];
	p_selector_list.forEach(function(p_selector){
		p_selector.style.filter = '';
	});
	winners = [];
}