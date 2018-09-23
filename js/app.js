
// Funcionamento do shuffle.
let deckSymbols = [];
let deckCards = document.getElementsByClassName("card");
for (deckSymbols, iteration = deckCards.length; iteration;) {
	deckSymbols[--iteration] = deckCards[iteration].getElementsByTagName("i")[0].className;
}
function shuffle() {
	var currentIndex = deckSymbols.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = deckSymbols[currentIndex];
		deckSymbols[currentIndex] = deckSymbols[randomIndex];
		deckSymbols[randomIndex] = temporaryValue;
	}
}
shuffle();
for (deckSymbols, iteration = deckCards.length; iteration;) {
	deckCards[--iteration].getElementsByTagName("i")[0].className = deckSymbols[iteration];
}

// Estruturação do sistema de pontuação.
let stars = document.getElementsByClassName("stars");
let starInitial = stars[0].cloneNode(true);
function decreaseScore(moveCounter){
	if (moveCounter === 17){
		stars[0].lastElementChild.remove();
	};
	if (moveCounter === 25){
		stars[0].lastElementChild.remove();
	};
}

//Marcador de movimentos.
let moveCounter = 0;
let movesElement = document.getElementsByClassName("moves");
function incrementMoveCounter(){
	moveCounter ++;
	movesElement[0].innerHTML = moveCounter;
	decreaseScore(moveCounter);
};

let cardCompareList = [];

function showCard(card){
	if($(card).hasClass("open show") === false && $(card).hasClass("match") === false){
		$(card).toggleClass("open show");
	}};

function hideCard(card){
	$(card).toggleClass("open show");
};

function cardMatch(cardCompareList){
	$(cardCompareList).toggleClass("open show match");
	cardCompareList.pop(cardCompareList[0]);
	cardCompareList.pop(cardCompareList[1]);
	incrementMoveCounter();
};

function cardNotMatch(cardCompareList)	{
	$(deckCards).css("pointer-events", "none")
	setTimeout(function() {
	hideCard(cardCompareList);
	$(deckCards).css("pointer-events", "auto")
	$(".match").css("pointer-events", "none")
	cardCompareList.pop(cardCompareList[0]);
	cardCompareList.pop(cardCompareList[1]);
	incrementMoveCounter();
}, 1100)
};

function winCheck(){

	function getCardStatus(){
		let cardStatus = [];
		let deckCards = document.getElementsByClassName("card");
		for (cardStatus, iteration = deckCards.length; iteration;) {
			cardStatus[--iteration] = deckCards[iteration].className;
		}
		return cardStatus;
	}

	let cardStatus = getCardStatus();

	function ValidateMatch(cardStatus) {
		return cardStatus === "card match";
	}

	checkResult = cardStatus.every(ValidateMatch);

	return checkResult;

}

function cardCompareListAdd(currentCard){
		if (cardCompareList.length < 2){
			cardCompareList.push(currentCard);
		}
	};

function cardCompare(card1, card2){
		if(card1 === card2) {
			cardMatch(cardCompareList)
			let result = winCheck();
			if (result == true) {
				endGame();
			}
		} else {
			cardNotMatch(cardCompareList)
		;}
	};

var modal = document.getElementById('myModal');

function endGame() {
		clearInterval(timer);
		let movesFinal, timerFinal, starsFinal;
		movesFinal = document.getElementById("movesFinal");
		timerFinal = document.getElementById("timerFinal");
		starsFinal = document.getElementById("starsFinal");
		movesFinal.textContent = moveCounter
		timerFinal.textContent = toHHMMSS(second);
		$(starsFinal).append($(stars[0].cloneNode(true)));
		modal.style.display = "block";
	}

function toHHMMSS (seconds) {
		/* converte o dado fornecido pela função de timer para o formato minutos:segundos
		baseado de https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss*/
	var sec_num = parseInt(seconds, 10); // don't forget the second param
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	return minutes+':'+seconds;
}

let second = 0;
let timer;
let domTimer = document.getElementById("timer");

function StartTimer() {
	timer = setInterval(function() {
		second ++;
		domTimer.textContent =  toHHMMSS(second);
	}, 1000);
};

function startGame() {
	$(".card").click(function(event) {
		let currentCard = event.target;
		$(currentCard).css("pointer-events", "none");
		showCard(currentCard);
		cardCompareListAdd(currentCard);
		if (cardCompareList.length === 2) {
			let card1 = cardCompareList[0].children[0].className;
			let card2 = cardCompareList[1].children[0].className;
			cardCompare(card1, card2);
		}
		if(moveCounter === 0 && cardCompareList[0] != undefined && second === 0){
			StartTimer();
		};
	});
}

startGame();

function restart (){

	$(".restart").click(function() {
		if(cardCompareList[0] != undefined) {
			cardCompareList.pop(cardCompareList[0]);
		}
		shuffle();
		for (deckSymbols, iteration = deckCards.length; iteration;) {
			deckCards[--iteration].getElementsByTagName("i")[0].className = deckSymbols[iteration];
		}
		$(deckCards).removeClass("open show match");
		$(deckCards).css("pointer-events", "auto");
		let starInitialCopy = starInitial.cloneNode(true);
		$(stars).remove();
		$(".score-panel").prepend($(starInitialCopy));
		modal.style.display = "none";
		let result = winCheck();
		if (result == false) {
			clearInterval(timer);
		};
		second = 0;
		domTimer.textContent =  toHHMMSS(second);
		moveCounter = 0;
		movesElement[0].innerHTML = moveCounter;
	})
};

restart();
