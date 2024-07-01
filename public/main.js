document.addEventListener("DOMContentLoaded", (_) => {

  let playerOneDices = document.querySelectorAll(".player-one>.dice");
  let playerTwoDices = document.querySelectorAll(".player-two>.dice");
  let resultHeadings = document.querySelectorAll(".result>h2");
  let btn = document.getElementsByTagName("button")[0];
  let playerOneScore = 0;
  let playerTwoScore = 0;

  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      // to avoid repeated clicks while key is held down
      if (event.repeat) { return; }
      // updating button classes to show proper animation
      btn.classList.remove("keyup");
      btn.classList.add("keydown");
      // firing the button click
      btn.click();
    }
    console.log("\nonKeyDown()=> " + event.key)
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      // updating button classes to show proper animation
      btn.classList.remove("keydown");
      btn.classList.add("keyup");
    }
    console.log("\nonKeyUp()=> " + event.key)
  });

  btn.addEventListener("click", (_) => {
    console.log("onClick() => previous playerOneScore: " + playerOneScore + " previous playerTwoScore: " + playerTwoScore);
    // resettin the dices and headings if there was a previous roll
    if (playerOneScore || playerTwoScore != 0) {
      console.log("onClick() => restting Dices and Headings...");
      resetDice(playerOneDices, playerOneScore);
      resetDice(playerTwoDices, playerTwoScore);
      resetResultsText(resultHeadings);
      playerOneScore = 0;
      playerTwoScore = 0;
    }
    // getting new scores
    playerOneScore = getPlayerScore();
    playerTwoScore = getPlayerScore();
    // this timer make sure that the dices and headings are updated even when they are same as before
    setTimeout(() => {
      setPlayerDice(playerOneDices, playerOneScore);
      setPlayerDice(playerTwoDices, playerTwoScore);
      updateResultsHeadings(playerOneScore, playerTwoScore, resultHeadings);
    }, 50);
  });
});

function updateResultsHeadings(playerOneScore, playerTwoScore, resultsHeadings) {
  if (playerOneScore === playerTwoScore) {
    resultsHeadings[0].classList.remove("show");
    resultsHeadings[1].classList.remove("show");
    resultsHeadings[2].classList.remove("show");
    resultsHeadings[3].classList.add("show");
  } else if (playerOneScore > playerTwoScore) {
    resultsHeadings[0].classList.remove("show");
    resultsHeadings[1].classList.add("show");
    resultsHeadings[2].classList.remove("show");
    resultsHeadings[3].classList.remove("show");
  } else {
    resultsHeadings[0].classList.remove("show");
    resultsHeadings[1].classList.remove("show");
    resultsHeadings[2].classList.add("show");
    resultsHeadings[3].classList.remove("show");
  }
  console.log("updateResultsHeadings() => playerOneScore: " + playerOneScore + " playerTwoScore: " + playerTwoScore);
}

function resetResultsText(resultsHeadings) {
  resultsHeadings[0].classList.add("show");
  resultsHeadings[1].classList.remove("show");
  resultsHeadings[2].classList.remove("show");
  resultsHeadings[3].classList.remove("show");
  console.log("resetResultsText()=> done");
}
// hides the previously .show(ed) dice and shows the .empty
function resetDice(playerDices, playerScore) {
  for (let index = 0; index < playerDices.length; index++) {
    let dice = playerDices[index];
    if (index == 0) {
      dice.classList.toggle("show");
    } else if (index === playerScore) {
      dice.classList.toggle("show");
    } else { }
  }
  console.log("resetDice()=> " + playerScore);
}

// hides the .empty and .show(s) the dice corresponding to player's score
function setPlayerDice(playerDices, playerScore) {
  playerDices[0].classList.toggle("show");
  switch (playerScore) {
    case 1:
      playerDices[1].classList.toggle("show");
      break;
    case 2:
      playerDices[2].classList.toggle("show");
      break;
    case 3:
      playerDices[3].classList.toggle("show");
      break;
    case 4:
      playerDices[4].classList.toggle("show");
      break;
    case 5:
      playerDices[5].classList.toggle("show");
      break;
    case 6:
      playerDices[6].classList.toggle("show");
      break;
    default:
      break;
  }
  console.log("setPlayerDice() => " + playerScore);
}

function getPlayerScore() {
  let playerScore = (Math.random() * 6);
  playerScore = Math.ceil(playerScore);
  console.log("getPlayerScore() => " + playerScore);
  return playerScore;
}
