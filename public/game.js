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