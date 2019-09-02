var openedCards = [];
var counter     =  0;
var rating_stars = $('i');
var clicks      = 0;
var theEnd      = false;
cardsList       = cardsInit();
Display_cards();

$(".card").on('click',function(){
	clicks++;
	clicks == 1 ? setInterval(setTime, 1000) :'';
	$(this).attr("disabled", "disabled");
	matcher(this);
});

 // Create a list that holds all of your cards

function cardsInit(){
	var cards = [];
	cards     = document.getElementsByClassName("card");
	rating_stars.removeClass('fa-star-o').addClass('fa-star');
	return transform(cards);
}

function transform(obj){
	var result = [];
	for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	        result.push(obj[key].innerHTML);
	    }
	}
	return result;
}

function Display_cards(){

	var List    = document.createElement("ul");
	var cards_shuffled = shuffle(cardsList);
	for (var i = 0; i < cards_shuffled.length; i++ ) {
    	// Add to list li
    	var li = document.createElement("li");
    	li.innerHTML    = cards_shuffled[i];
    	li.classList.add("card");
		List.appendChild(li);
     }
    document.getElementsByClassName("deck")[0].innerHTML = List.innerHTML;
}


//handle Maths
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function matcher(card){
	if(isClicked(card)){ return; }
	displaySymbol(card);
	markedOpen(card);

}

//displayCard Symboles
function displaySymbol(card){
	$(card).addClass( "show open" );
}

function isMatch(openedCards){

	var cond1 = $(openedCards[0]).is($(openedCards[1])); // isSameNodeClicked
	var cond2 = openedCards[0].innerHTML != openedCards[1].innerHTML; // notHaveSameContext
	if(cond1 || cond2){
		return false;
	}
	return true;
}
//lockCards
function lockCardsAsOpen(openedCards){
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openedCards[i]).addClass( "open" );
		$(openedCards[i]).click( function() { return false; } );
	}
}
//hideSymbol
function hideSymbol(openedCards){
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openedCards[i]).removeClass( "open show danger animated tada" );
	}
}
// animateTada
function animateTada(openedCards){
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openedCards[i]).addClass("danger animated tada");
	}
}
//markAsMatched
function markAsMatched(openedCards){
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openedCards[i]).addClass("match");
	}
}
// restart
function truncate(openedCards){
   openedCards = [];
}
// rating
function setRating(moves){
  let score = 3;
  if(moves <= 15) {
    rating_stars.eq(3).removeClass('fa-star').addClass('fa-star-o');
    score = 3;
  } else if (moves > 15 && moves <= 25) {
    rating_stars.eq(2).removeClass('fa-star').addClass('fa-star-o');
    score = 2;
  } else if (moves > 25) {
    rating_stars.eq(1).removeClass('fa-star').addClass('fa-star-o');
    score = 1;
  }
  return score;
}

//----------------------------------------------------
function checkMatchedAll(){
	var all = true;
	$('.card').each(function(){
		return all =  $(this).hasClass( "match");
	});
	if(all){
		showStatistics();
		theEnd = true;
	}
}
showStatistics = () =>{
	var score = setRating(counter);
	var time  = getTimer();
	stopTimer(true);
	owesomeAlert('Congratulation! Winning',  ' with ' + counter + 'Moves '+ ' , Scoring ' + score + ' Star!' + '  in ' + time + ' Time ' , 'success', 'Play again', 'Stay');
};

getTimer = () => {
	return $('#timer').text();
};
//handleCounter
function handleCounter(card){
	if(theEnd || $(card).hasClass("match") || $(card).is($(openedCards[0])) ){
		return false;
	}
	counter = counter +1;
	setRating(counter);
	$('.moves').text(counter);
}

function next(openedCards){
	hideSymbol(openedCards);
}
function MatchedCase(card){
	lockCardsAsOpen(openedCards);
	markAsMatched(openedCards);
	openedCards = [];
}
// NotMatchedCase
function NoMatchCase(card){
	var cardUnits = openedCards;
	animateTada(cardUnits)
   	setTimeout(function(){
	  hideSymbol(cardUnits);
	 }, 1000);// setTimeOut
     openedCards = [];

}
// Card is Clicked
function isClicked(card){
	if($(card).hasClass("show")){
		return true;
	}
	return false;
}

function markedOpen(card){
	if(openedCards.length > 0){
		handleCounter(card);
		displaySymbol(card);
		openedCards.push(card);
	   if(isMatch(openedCards)){
	   	 MatchedCase();
	   } else{
	   	 NoMatchCase();
	   }
	} else{
		openedCards.push(card);
		handleCounter(card);
	}
	checkMatchedAll();
}// end of markedOpen to add card to list of open cards
