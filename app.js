let currentPlayer = 'X'; // Track current player (X or O)

// Store initial positions of draggable elements
const initialPositions = [];

// Function to allow drop
function allowDrop(event) {
  event.preventDefault();
}

// Function to handle drag start event
function drag(event) {
  if ((currentPlayer === 'X' && event.target.classList.contains('cross')) ||
      (currentPlayer === 'O' && event.target.classList.contains('circle'))) {
    event.dataTransfer.setData("text", event.target.id);
  } else {
    event.preventDefault();
  }
}

// Function to handle drop event
function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var draggableElement = document.getElementById(data);
  if (
    event.target.classList.contains("dropbox") &&
    event.target.childElementCount === 0
  ) {
    event.target.appendChild(draggableElement);
    if (checkForWinner()) {
      announceWinner(currentPlayer);
    }
    // Toggle current player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to announce the winner
function announceWinner(player) {
  var winnerText = document.getElementById("winner-text");
  winnerText.textContent = "Player " + player + " wins!";
}

// Function to check for a winner
function checkForWinner() {
  var dropboxes = document.getElementsByClassName("dropbox");
  var winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var combination = winningCombinations[i];
    var firstBox = dropboxes[combination[0]].firstElementChild;
    var secondBox = dropboxes[combination[1]].firstElementChild;
    var thirdBox = dropboxes[combination[2]].firstElementChild;

    if (
      firstBox &&
      secondBox &&
      thirdBox &&
      firstBox.classList.contains("cross") &&
      secondBox.classList.contains("cross") &&
      thirdBox.classList.contains("cross")
    ) {
      return 'X';
    } else if (
      firstBox &&
      secondBox &&
      thirdBox &&
      firstBox.classList.contains("circle") &&
      secondBox.classList.contains("circle") &&
      thirdBox.classList.contains("circle")
    ) {
      return 'O';
    }
  }

  return null;
}

// Function to start a new game
function startNewGame() {
  var dropboxes = document.getElementsByClassName("dropbox");
  var dragboxes = document.getElementsByClassName("dragbox");

  // Clear the game board
  for (var i = 0; i < dropboxes.length; i++) {
    dropboxes[i].innerHTML = "";
  }

  // Reset the winner text
  var winnerText = document.getElementById("winner-text");
  winnerText.textContent = "";

  // Reset the current player
  currentPlayer = 'X';

  // Reset draggable elements to their initial positions
  for (var j = 0; j < initialPositions.length; j++) {
    var { element, parent } = initialPositions[j];
    parent.appendChild(element);
    element.setAttribute('draggable', true);
  }
}

// Function to reset the game (reload the page)
function resetGame() {
  location.reload();
}

// Store initial positions of draggable elements
window.onload = function() {
  var dragboxes = document.getElementsByClassName("dragbox");
  for (var i = 0; i < dragboxes.length; i++) {
    initialPositions.push({
      element: dragboxes[i].firstElementChild,
      parent: dragboxes[i]
    });
  }
};

// Event listener for the new game button
var newGameBtn = document.getElementById("new-game-btn");
newGameBtn.addEventListener("click", startNewGame);

// Event listener for the reset game button
var resetGameBtn = document.getElementById("reset-game-btn");
resetGameBtn.addEventListener("click", resetGame);