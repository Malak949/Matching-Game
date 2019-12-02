/*
Name :
Version = 1.0 
*/
(function() {
var cards=[ "fa fa-cube" , "fa fa-stop" , "fa fa-paper-plane-o" , "fa fa-snowflake-o" , "fa fa-heart-o" , "fa fa-cog" , "fa fa-birthday-cake" , "fa fa-globe" ,  "fa fa-cube" , "fa fa-stop" , "fa fa-paper-plane-o" , "fa fa-snowflake-o" , "fa fa-heart-o" , "fa fa-cog" , "fa fa-birthday-cake" , "fa fa-globe" ];

//Declare Game Variables such as Number of moves and stars
var count = 0;
var Moves = 0;
var SelectedCard1 , SelectedCard2;
var counter;
var AllowPlaying = true;
var Stars = 3;
var Matched = 14;

//Start the game at the start of page laod
init()

//This function called when two unmatched cards opened so we reset them and hide the icons
function resetOpendCards() {
    SelectedCard1.removeClass("open");
    SelectedCard1.removeClass("show");
    SelectedCard2.removeClass("open");
    SelectedCard2.removeClass("show");
    SelectedCard1 = null;
    SelectedCard2 = null;
    AllowPlaying = true;
}

//Every 15 or 20 clicked on cards we decrease the number of total cards by 1
function DecrementStar() {
    var StarsList = $(".stars i");
    for (var i = 0; i < StarsList.length; i++) {
        if(i == Stars - 1) {
            $(StarsList[i]).toggleClass("fa-star fa-star-o");
        }
    }
}

//At the start of game reset stars to the begin of game
function ResetStars() {
    $(".stars").empty();
    for(var i = 0 ; i < 3 ; i++) {
        $(".stars").append('<li><i class="fa fa-star"></i></li>');
    }
    Stars=3;
}

//We handle Card Placement here and create 16 diffrent cards with random icons positions
function addCardsToBoard() {
    //Empty the list first
    $('ul').empty();

    /*
    Loop here to create each card and insert it in the list of deck
    -we give each card a child of i element with card icon on it and hide them
    -then insert a click event to handle the click of hidden card and show it to the player
    */
    for(var i = 0 ; i <= 15 ; i++) {
        var listItem = document.createElement('li');
        listItem.className = "card";
        listItem.id = i.toString();
        var item = document.createElement('i');
        item.className = cards[i];
        listItem.appendChild(item);
        
        listItem.addEventListener("click", function() {
            if(AllowPlaying) {
            if(Moves == 0) {
                StartGame();
            }
            var Card = $(this);
            
            if(Card.hasClass("open") == false) {
                
                if(SelectedCard1 == null) {
                    Card.addClass("open"); 
                    Card.addClass("show");
                    SelectedCard1 = Card;
                }else if(SelectedCard2 == null) {
                    Card.addClass("open"); 
                    Card.addClass("show");
                    SelectedCard2 = Card;
                    if(SelectedCard1.children().attr("class") == SelectedCard2.children().attr("class")) {
                        AllowPlaying = true;
                        Matched = Matched + 2;

                        SelectedCard1.addClass("match");
                        SelectedCard2.addClass("match");

                        SelectedCard1 = null;
                        SelectedCard2 = null;
                    }else{
                        AllowPlaying = false;
                        setTimeout(resetOpendCards, 700);
                    }
                }else {

                }

                if(Matched == 16) {
                    // Won
                    WinMessage();
                    StopTimer();
                }
                Moves++;
            }

            
            $('.moves').html(Moves.toString());

            if(Moves == 15 || Moves == 20){
                DecrementStar();
                Stars--;
            }

            }
        });


        $('.deck').append(listItem);
    }
}

//Restart the game by calling the init method we declaerd
$(".restart").click(function() {	
    init();
});

//Here is the function that handle inital phase of game by clearing out all variables and reset them to the default values
function init() {
    $('#winModal').modal('hide'); 
    EndGame();
    
    shuffle(cards);
    addCardsToBoard();
    count = 0;
    Moves = 0;
    SelectedCard1 = null;
    SelectedCard2 = null;
    AllowPlaying = true;
    Stars = 3;
    Matched = 0;
    ResetStars();
    $('.moves').html(Moves.toString());
    
    
}

//When 16 matched card happen we show the player a Modal Message Window with his final stats of the game
function WinMessage() {
    $('#winModal').modal('show'); 
    $('.modal-body').empty();
    var WinTime = document.getElementById("basicUsage").innerHTML;
    var WinMessage = "<center><h1>You Won</h1></center><br>";
    var WinMessage = WinMessage + "<center><h2>Stars : " + Stars +"</h2></center><br>";
    var WinMessage = WinMessage + "<center><h2>Moves : " + Moves +"</h2></center><br>";
    var WinMessage = WinMessage + "<center><h2>Time : " + WinTime +"</h2></center><br>";
    var WinMessage = WinMessage + "<center><h2><button  onclick='init()'>Restart</button></h2></center><br>";
    $(".modal-body").append(WinMessage);
}

//Begin of game by setting the time interval
function StartGame() {
    counter = setInterval(timer, 1000);
}
//Stop the timer when game finished or reseted
function StopTimer() {
    clearInterval(counter);
}

//Clear time and reset time div content to zeroes
function EndGame() {
    clearInterval(counter);
    document.getElementById("basicUsage").innerHTML = "00:00:00";
    $('ul').empty();
}

//this function handle the calculation of time in seconds , mins , hours
function timer() {
    count = count + 1;
    var seconds = count % 60;
    var minutes = Math.floor(count / 60);
    var hours = Math.floor(minutes / 60);
    var formattedSeconds = ("0" + seconds).slice(-2);
    var formattedMins = ("0" + minutes).slice(-2);
    var formattedHours = ("0" + hours).slice(-2);
    minutes %= 60;
    hours %= 60;
    document.getElementById("basicUsage").innerHTML = formattedHours + ":" + formattedMins + ":" + formattedSeconds + "";
}

//Shuffle method we use to randomize the cards at each new game
function shuffle(a) {
    var n, temp, i;
    for (i = a.length - 1; i > 0; i--) {
        n = Math.floor(Math.random() * (i + 1));
        temp = a[i];
        a[i] = a[n];
        a[n] = temp;
    }
    return a;
}})()