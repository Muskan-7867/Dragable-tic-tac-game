function allowDrop(event) {
    event.preventDefault();
}



function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    if (event.target.className === "dropbox" && event.target.children.length === 0) {
        event.target.appendChild(document.getElementById(data));
        checkWinner();
    }
}

function resetGame() {
    // Clear the game board
    const dropboxes = document.querySelectorAll(".dropbox");
    dropboxes.forEach(dropbox => {
        if (dropbox.firstChild) {
            const draggable = dropbox.firstChild;
            draggable.removeAttribute("style"); // Remove any inline styles
            const originalParent = document.querySelector(`.drag .dragbox:not(:has(div))`);
            originalParent.appendChild(draggable);
        }
    });

    // Hide the winner announcement
    document.getElementById("winner-announcement").classList.add("hide");

    // Enable the board for dropping elements
    enableBoard();
}

function newGame() {
    resetGame();
   
}


function disableBoard() {
    const dropboxes = document.querySelectorAll(".dropbox");
    dropboxes.forEach((box) => {
        box.removeEventListener("click", handleClick);
        box.style.pointerEvents = "none";
    });
}

function enableBoard() {
    const dropboxes = document.querySelectorAll(".dropbox");
    dropboxes.forEach(dropbox => {
        dropbox.setAttribute("ondrop", "drop(event)");
        dropbox.setAttribute("ondragover", "allowDrop(event)");
    });
}
function announceWinner(winner) {
    alert(`Congratulations, ${winner} wins!`);
    // or display the winner on the page
    document.getElementById("winner").textContent = `Congratulations, ${winner} wins!`;
}

