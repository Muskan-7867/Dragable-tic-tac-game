function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggableElement = document.getElementById(data);
    if (event.target.classList.contains("dropbox") && event.target.childElementCount === 0) {
        event.target.appendChild(draggableElement);
        var winner = checkForWinner();
        if (winner) {
            announceWinner();
        }
    }
}


function checkForWinner() {
    var dropboxes = document.querySelectorAll('.dropbox');
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combo of winningCombos) {
        let [a, b, c] = combo;
        if (
            dropboxes[a].childElementCount > 0 &&
            dropboxes[a].firstElementChild.className === dropboxes[b].firstElementChild.className &&
            dropboxes[b].firstElementChild.className === dropboxes[c].firstElementChild.className
        ) {
            return dropboxes[a].firstElementChild.className; 
        }
    }
    return null;
}

function announceWinner() {
    var winner = checkForWinner();
    if (winner) {
        var winnerSymbol = winner === 'cross' ? 'X' : 'O';
        document.getElementById('winner-announcement').textContent = `Congratulations! ${winnerSymbol} wins!`;
    }
}

// Reset the game
function resetGame() {
    var dropboxes = document.querySelectorAll('.dropbox');
    dropboxes.forEach(box => {
        if (box.childElementCount > 0) {
            box.removeChild(box.firstElementChild);
        }
    });

    var crosses = document.querySelectorAll('.cross');
    var circles = document.querySelectorAll('.circle');
    var dragContainers = document.querySelectorAll('.dragbox');

    crosses.forEach((cross, index) => {
        if (!cross.parentElement.classList.contains('dragbox')) {
            dragContainers[index].appendChild(cross);
        }
    });

    circles.forEach((circle, index) => {
        if (!circle.parentElement.classList.contains('dragbox')) {
            dragContainers[index + crosses.length].appendChild(circle);
        }
    });

   
}

function newGame() {
    resetGame(); // Essentially, a new game is just a reset of the board
}

// Add a container for the buttons
var buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');
document.body.appendChild(buttonContainer);


