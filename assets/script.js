function Word (word,hint){
	this.word = word,
	this.hint = hint
}

var cersei = new Word("cersei","Queen Regent of the Seven Kingdoms, she loves nothing more than her children.");

var tyrion = new Word("tyrion", "What he lacks in height, he makes up for in intelligence.");

var winterfell = new Word("winterfell", "The current seat of house Bolton.");

var needle = new Word("needle", "Arya Stark's most beloved possession.");

var whitewalkers = new Word("whitewalkers", "Killed only by Dragonglass.");

var direwolf = new Word("direwolf", "One for each Stark child...");

var daenerys = new Word("daenerys", "Mother of Dragons.");

var ygrette = new Word("ygrette", "You know nothing, Jon Snow.");

var lannisport = new Word("lannisport", "Walled city in the westerlands.");

var riverrun = new Word("riverrun", "Home of Catelyn Stark.");

var highgarden = new Word("highgarden", "Seat of House Tyrell");


var wordBank = [cersei, tyrion, winterfell, needle, whitewalkers, direwolf, daenerys, ygrette, lannisport, riverrun, highgarden];

var alphabet = /^[a-zA-Z]+$/;

var targetObject = wordBank[Math.floor(Math.random()*wordBank.length)];

var targetWord = targetObject.word;

var targetHint = targetObject.hint;

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
	targetObject = wordBank[Math.floor(Math.random()*wordBank.length)];
	targetWord = targetObject.word
	targetHint = targetObject.hint 
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
	showCurrentHint.innerHTML = targetHint;
}

//check array function to call on later

function checkArray(arr, letter, word){ 
	for (var i=0; i < arr.length; i++){
		if (letter == word[i]){
			arr.splice(i, 1, letter);
		}
	}
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

//set up variables to show stats later

var showCurrentWord = document.getElementById("currentWord");

var showLives = document.getElementById("livesLeft");

var showGuesses = document.getElementById("pastGuesses");

var showWins = document.getElementById("totalWins");

var showLosses = document.getElementById("totalLosses");

var showCurrentHint = document.getElementById("currentHint");

//set up display of lives/word BEFORE user starts playing

showLives.innerHTML = lives;
showCurrentWord.innerHTML = arrWord.join(" ");
showCurrentHint.innerHTML = targetHint;

//set up hints for each variable

//now when user presses a key...

document.onkeyup = function(event){

	var letter = String.fromCharCode(event.keyCode).toLowerCase();
		
	var pos = targetWord.indexOf(letter);

	var alphabetTest = alphabet.test(letter);

	//if index.Of returns -1, we know letter is not in word
	if (!alphabetTest){
		alert("Please choose a letter between A and Z.")
	}

	if (pos == -1 && !duplicateGuess(letter, totalGuesses) && alphabetTest){
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
