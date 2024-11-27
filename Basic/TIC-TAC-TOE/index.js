// Select elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const playComputerBtn = document.querySelector("#play-computer-btn");
const multiplayerBtn = document.querySelector("#multiplayer-btn");
const messageContainer = document.querySelector(".msg");
const message = document.querySelector("#message");

let turnO = true; // 'O' starts first
let computerPlayer = false; // Default mode is multiplayer

// Winning patterns
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Computer's move
function computerMove() {
    if (computerPlayer && !turnO) {
        const emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
        const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        if (randomBox) {
            randomBox.innerText = "X";
            randomBox.disabled = true;
            checkWin();
            turnO = true;
        }
    }
}

// Handle box clicks
function handleBoxClick(event) {
    const box = event.target;
    if (box.innerText === "") {
        box.innerText = turnO ? "O" : "X";
        box.disabled = true;
        turnO = !turnO;
        checkWin();
        computerMove();
    }
}

// Check for win or draw
function checkWin() {
    let winner = null;

    // Check all win patterns
    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            winner = boxes[a].innerText;
        }
    });

    // Display result
    if (winner) {
        displayMessage(`${winner === "O" ? "Player O" : "Player X"} wins!`);
        disableBoxes();
    } else if (Array.from(boxes).every(box => box.innerText)) {
        displayMessage("It's a draw!");
    }
}

// Disable all boxes
function disableBoxes() {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

// Enable all boxes (reset)
function enableBoxes() {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
}

// Display message
function displayMessage(msg) {
    messageContainer.classList.add("show");
    message.innerText = msg;
}

// Reset game
function resetGame() {
    enableBoxes();
    turnO = true;
    messageContainer.classList.remove("show");
}

// Event listeners
boxes.forEach(box => box.addEventListener("click", handleBoxClick));
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

playComputerBtn.addEventListener("click", () => {
    computerPlayer = true;
    resetGame();
});

multiplayerBtn.addEventListener("click", () => {
    computerPlayer = false;
    resetGame();
});
