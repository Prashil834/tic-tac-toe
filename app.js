let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

let winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            box.classList.add("o-sign");
        } else {
            box.innerText = "X";
            turnO = true;
            box.classList.add("x-sign");
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
    }
};

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let winnerPlayer = false;
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                winnerPlayer = true;
                boxes[pattern[0]].classList.add("win");
                boxes[pattern[1]].classList.add("win");
                boxes[pattern[2]].classList.add("win");
                showWinner(pos1Val);
            }
        }
    }

    let allBoxFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allBoxFilled = false;
        }
    });

    if (allBoxFilled && !winnerPlayer) {
        msg.innerText = `It's Draw!`;
        msgContainer.classList.remove("hide");
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("win", "o-sign", "x-sign");
    });
    msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
