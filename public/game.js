function setPlayerAsLeader(){
    document.getElementById("message").innerHTML = "Tap Anywhere to start the game!"
    document.getElementById("message").style.display = "block";
    document.onclick = function(){
	    document.getElementById("message").style.display = "none";
	    startGame();
    }
}
function setPlayerWaiting(){
    document.getElementById("message").innerHTML = "Waiting for the leader to start the game"
    document.getElementById("message").style.display = "block";
}

function startGame(){
	room.send({})
}

//should setup guess div in garden, fill with players, set word div to ???
//and disable the canvas touch maybe, idk if that last one is necessary
function initGuess(){
	document.getElementById("garden_canvas").style.display = 'none';

	//fill player selector div
	//set the onclick for player selector

	document.getElementById("player_selector").style.display = 'block';
}