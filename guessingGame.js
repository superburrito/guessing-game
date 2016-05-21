/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateWinningNumber(){
  return Math.floor(Math.random() * 100);
}

// winningNumber left as global variable, as is the storedGuesses 
// array because it is referenced in multiple functions.
var winningNumber = generateWinningNumber();
var storedGuesses = [];

// Fetch the Players Guess
function playersGuessSubmission(){
  return parseInt($('#guessnumber').val());
};

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(currentGuess, winningNumber){
  if (currentGuess > winningNumber) {
    $('#playerview').text('Try again -- try a lower number!');
  } else {
    $('#playerview').text('Try again -- a higher number!');
  }
};

// Check if the Player's Guess is the winning number 
function checkGuess(){
  var currentGuess = playersGuessSubmission();
  // If Duplicate
  if ($.inArray(currentGuess, storedGuesses) > -1) {
    $('#playerview').text('Invalid Entry: Duplicate. Try again!');
  // If player guesses correctly 
  } else if (currentGuess == winningNumber) {
      $('#playerview').text('** You got the right number! You win! **');
      $('#playerview').addClass('highlighted');
      $('#submission').remove();
  // If players guesses wrongly, grow array and...
  } else {
    storedGuesses.push(currentGuess);
    $('#counter').text('Tries Left: ' + (5-storedGuesses.length))
    //  If array is full, player loses 
    if (storedGuesses.length >= 5) {
    $('#playerview').text('** You have no more guesses. Sorry! **');
    $('#playerview').addClass('highlighted');
    $('#submission').remove();
    // If array is not full, continue
    } else {
    lowerOrHigher(currentGuess,winningNumber);
    }
  }
};

// Create a provide hint button that provides additional clues to the "Player"
// Tells the player how far s/he is, but distorts the info slightly.
function provideHint(){
  var arrlength = storedGuesses.length 
  var truedistance = Math.abs(winningNumber - storedGuesses[arrlength-1]);
  var distort = Math.floor(Math.random() * 10);
  var hinteddistance = truedistance + distort;
  $('#playerview').text('You are about ' + hinteddistance + 
                        ' away from the correct answer!');
};

// Allow the "Player" to Play Again
function playAgain(){
  // Reloads the page
  location.reload();
};


/* **** Event Listeners/Handlers ****  */
// General Comment:
// Curious as to why we need to use on() Event Listeners here if 
// we can set the Handlers within the <button> tag! 
// (i.e. onclick="fn()")

