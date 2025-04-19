// Global variables
let winningPlayer;
let limit = 9;
let player1;
let player2;

// Player constructor
function Player(name, pick){
    if(!new.target){
        throw new Error("Use the new keyword. This is a constructor ya idiot!!");
    }

    this.name = name;
    this.pick = pick;
    this.hasPlayed = false;

    this.madeMove = function(){
        this.hasPlayed = true;
    }

    this.moveTime = function(){
        this.hasPlayed = false;
    }

    this.getPick = function(){
        return this.pick;
    }

    this.getName = function(){
        return this.name;
    }
}

// GameBoard and mechanisms as IIFE
let game = (function(){
    let gameBoard = [
        -1,-1,-1,
        -1,-1,-1,
        -1,-1,-1
    ];
    const winningCombination = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]
    ];
    const thresholdBroke = function(playerPick){
        let count = 0;
        for(let i = 0; i < gameBoard.length; i++){
            if(gameBoard[i] == playerPick) count++;
            if(count == 3) return true;
        }
    
        return false;
    }
    const checkingForMatch = function(player){
        let winner;
        for(let i = 0; i < 8; i++){
            let winning = 0;
            for(let j = 0; j < 3; j++){
                if(gameBoard[winningCombination[i][j]-1] == player) winning++;
                if(winning == 3){
                    winner = player;
                    return winner;
                }
            }
        }
        return winner;
    };

    return {gameBoard, thresholdBroke, checkingForMatch};

})();


// Event function for every click
let playGame = function(playerOne, playerTwo, index, game){
    let gameTile = document.querySelector(`div[class="${index}"]`);
    console.log("playgame called")
    if(limit > 0){
        let moveFor = playerOne.hasPlayed ? playerTwo : playerOne;
        let pick = moveFor.pick;
        gameTile.innerText = pick;
        // setting moves 
        if(playerOne.pick == pick){
            playerOne.hasPlayed = true;
            playerTwo.hasPlayed = false;
        }
        else{
            playerTwo.hasPlayed = true;
            playerOne.hasPlayed = false;
        }

        // Making the move in the board
        game.gameBoard[index] = pick;
        limit--;

        // Checking whether someone won
        if(game.thresholdBroke(pick)){
            winningPlayer = game.checkingForMatch(pick);
            if(winningPlayer) showWinner(pick, playerOne, playerTwo);
        }

        if(!winningPlayer && limit == 0) showWinner('NOPE',playerOne,playerTwo);
    }

};

function showWinner(winnerPick, playerOne, playerTwo){
    let winnerDialog = document.querySelector('.winnerBoard');
    let winnerMessage = document.querySelector('.winnerBoard p');
    let closeButton = document.querySelector('.winnerBoard button');
        if(winnerPick == 'NOPE'){
            winnerMessage.innerText = "DRAW!!!!";
        }
        else{
            let winner = playerOne.getPick() == winnerPick ? playerOne.getName() : playerTwo.getName();
            winnerMessage.innerText = `${winner} wins!!!`;
        }
        winnerDialog.showModal();
    closeButton.addEventListener("click", ()=>{
        winnerDialog.close();
        location.reload();
        init();
    })
}

function startGame(){
    console.log('start game called');
    let dialogBox = document.querySelector('.opener');

    // get player 1 details
    let playerOneName = document.querySelector('.opener form input[name="player1Name"]').value;
    let playerOnePick = document.querySelector('.opener form input[name="player1Pick"]:checked').value;

    // get player 2 details
    let playerTwoName = document.querySelector('.opener form input[name="player2Name"]').value;
    let playerTwoPick = document.querySelector('.opener form input[name="player2Pick"]:checked').value;

    // create the objects 
    player1 = new Player(playerOneName, playerOnePick);
    player2 = new Player(playerTwoName, playerTwoPick);

    dialogBox.close();

    let playArea = document.querySelector('.playArea');
    for(let i = 0 ; i < 9; i++){
        let gameTile = document.createElement("div");
        gameTile.setAttribute("class", i)
        gameTile.setAttribute("style", "background-color: blue; border: 1px solid white; font-size:8rem; color: white; text-align: center;")
        playArea.appendChild(gameTile);
        gameTile.addEventListener("click", ()=>{
            console.log("made a move");
            playGame(player1, player2, i, game);
        })
    }


}

let init = function(){
    document.querySelector('.opener').showModal();
    let startButton = document.querySelector('.opener button');
    startButton.addEventListener("click", (e)=>{
        let form = document.querySelector('form');
        if(!form.checkValidity()) return;
        console.log('Button pressed');
        e.preventDefault();
        startGame();
    })

    // accessibility for x and o
    let player1Picks = document.querySelectorAll('input[name="player1Pick"]');

    for(const pick of player1Picks){
        
        pick.addEventListener("change",()=>{
            let p1Pick = pick.value;

            let oppositeValue = p1Pick == "x"? "o":"x";
            let p2Auto = document.querySelector(`input[name="player2Pick"][value="${oppositeValue}"]`);
            p2Auto.checked = true;
        })
    }

    let player2Picks = document.querySelectorAll('input[name="player2Pick"]');

    player2Picks.forEach(pick => {
        pick.addEventListener("change",()=>{
            let p2Pick = pick.value;

            let oppositeValue = p2Pick == "x"? "o":"x";
            let p1Auto = document.querySelector(`input[name="player1Pick"][value="${oppositeValue}"]`);
            p1Auto.checked = true;
        })
    })

    
}

init();

