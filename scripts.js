// Global variables
let winningPlayer;
let limit = 9;

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
    if(!winningPlayer & limit > 0){
        let moveFor = playerOne.hasPlayed ? playerTwo : playerOne;

        // Making the move in the board
        game.gameBoard[index] = moveFor.pick;
        limit--;

        // Checking whether won
        if(game.thresholdBroke(moveFor.pick)){
            winningPlayer = game.checkingForMatch(moveFor.pick);
            if(winningPlayer) showWinner(winningPlayer, playerOne, playerTwo);
        }
        
    }

};

function showWinner(winnerPick, playerOne, playerTwo){
    let winnerDialog = document.querySelector('.winnerBoard');
    let winnerMessage = document.querySelector('.winnerBoard.message')
    let winner;
    winner = playerOne.getPick() == winnerPick ? playerOne.getName() : playerTwo.getName();
        if(limit == 0){
            winnerMessage.innerText = "DRAW!!!!";
            winnerDialog.showModal();
        }
        else{
            winnerMessage.innerText = `${winner} wins!!!`;
            winnerDialog.showModal();
        }
}

