var wordBank = ["cersei", "tyrion", "winterfell", "needle", "whitewalkers", "direwolf", "targaryen", "daenerys", 
	"ygrette", "arya", "andal", "kingsgaurd", "lannisport", "dragonstone", "riverrun", "highgarden"];

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
	
var targetWord = wordBank[Math.floor(Math.random()*wordBank.length)];

var totalGuesses = []; //creates empty array to track user guesses

var lives = 5; 

var arrWord = []; //creates empty array for secret word

var wins = 0;

var losses = 0;

//for loop to create empty dashes for word

for(var i = 0; i < targetWord.length; i++ ){
arrWord.push("_");
}

//reset function to call on later
		
function reset(){
	targetWord = wordBank[Math.floor(Math.random()*wordBank.length)];
	arrWord = [];
	for(var i = 0; i < targetWord.length; i++ ){
	arrWord.push("_");
	}
	lives = 5;
	guesses = "";
	totalGuesses = [];
	showGuesses.innerHTML = totalGuesses.join(", ");
	showCurrentWord.innerHTML = arrWord.join(" ")
	showLives.innerHTML = lives;
	showLosses.innerHTML = losses;
}

//check array function to call on later

function checkArray(arr, letter, word){ 
	for (var i=0; i < arr.length; i++){
		if (letter == word[i]){
			arr.splice(i, 1, letter);
		}
	}
	console.log(arrWord);
}

//function to forgive for duplicate guess 

function duplicateGuess(letter, arr){
	for (var i = 0; i < arr.length; i++){
		if (letter == arr[i]){
			alert("You've already delt this hand, but a true king shows mercy. Try again.");
			return true;
		}
	}
	return false;
}

//this makes sure user only guesses alphabetical letters

function checkAlphabet(letter, arr){
	for (var i = 0; i < arr.length; i++)
		if (letter == arr[i]){
			return true;
		}
	return false;
}

//set up variables to show stats later

var showCurrentWord = document.getElementById("currentWord");

var showLives = document.getElementById("livesLeft");

var showGuesses = document.getElementById("pastGuesses");

var showWins = document.getElementById("totalWins");

var showLosses = document.getElementById("totalLosses");

//set up display of lives/word BEFORE user starts playing

showLives.innerHTML = lives;
showCurrentWord.innerHTML = arrWord.join(" ")

//now when user presses a key...

document.onkeyup = function(event){

	var letter = String.fromCharCode(event.keyCode).toLowerCase();
		
	var pos = targetWord.indexOf(letter);

	//if index.Of returns -1, we know letter is not in word
	if (!checkAlphabet(letter, alphabet)){
		alert("Please choose a letter between A and Z.")
	}

	if (pos == -1 && !duplicateGuess(letter, totalGuesses) && checkAlphabet(letter, alphabet)){
		lives--;
		showLives.innerHTML = lives;
		totalGuesses.push(letter);
		showGuesses.innerHTML = totalGuesses.join(", ");
	}

	else{
		checkArray(arrWord, letter, targetWord);
		showCurrentWord.innerHTML = arrWord.join(" ");
	}

	if(arrWord.indexOf("_") === -1){
		alert("The iron throne is yours... for now.");
		var audio = new Audio("assets/gotsound.mp3");
		audio.play();
		wins++;
		showWins.innerHTML = wins;
		reset();
	}

	if(lives == 0){
		alert("You know nothing, Jon Snow!");
		losses++;
		reset();
	}
}
