let gameBoard = [
    -1,-1,-1,
    -1,-1,-1,
    -1,-1,-1
]

let winningCombination = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

function thresholdBroke(playerPick){
    let count = 0;
    for(let i = 0; i < gameBoard.length; i++){
        if(gameBoard[i] == playerPick) count++;
        if(count == 3) return true;
    }

    return false;
}

function checkingForMatch(player){
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
}




    let playerOne = +(prompt("Pick your play. 0 or 1 ?"));
    let playerTwo;

    if(playerOne == 1) playerTwo = 0;
    else playerTwo = 1;

    alert(`Player one is ${playerOne}`);
    alert(`Player two is ${playerTwo}`);


    let winningPlayer;
    let limit = 9;
    while(!winningPlayer && limit > 0){

        let playerOneMove = +(prompt("Whats your move playerOne?"));
        console.log(playerOneMove);
        gameBoard[playerOneMove-1] = playerOne;
        limit--;

        if(thresholdBroke(playerOne)){
            winningPlayer = checkingForMatch(playerOne);
        }


        if(winningPlayer) break;

        if(!winningPlayer){
            let playerTwoMove = +(prompt("Whats your move playerTwo?"));

            gameBoard[playerTwoMove-1] = playerTwo;
            limit--;

            if(thresholdBroke(playerTwo)){
                winningPlayer = checkingForMatch(playerTwo);
            }


    }
    }


if(limit == 0) winningPlayer = 'No one';

alert(`result: ${winningPlayer}`);
