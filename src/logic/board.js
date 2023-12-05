import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCkeck) => {
    // Check if there's a winner (X or O)
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
            boardToCkeck[a] &&
            boardToCkeck[a] === boardToCkeck[b] &&
            boardToCkeck[a] === boardToCkeck[c]
        ) {
            return boardToCkeck[a];
        }
    }
    // if there's not a winner
    return null;
};

export const checkEndGame = (newBoard) => {
    // check if there's a tie. if there are not empty space in board
    return newBoard.every((square) => square !== null);
};