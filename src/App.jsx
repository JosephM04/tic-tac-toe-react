import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";

import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { saveGameStorage, resetGameStorage } from "./storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorate = window.localStorage.getItem("board");
    if (boardFromStorate) return JSON.parse(boardFromStorate);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage == TURNS.X;
  });
  const [winner, setWinner] = useState(null); // false for no winner/tie

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const updateBoard = (index) => {
    // Don´t update the board if already have a value
    if (board[index] || winner) return;
    // update board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // change turns
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // Save game
    saveGameStorage({
      board: newBoard,
      turn: newTurn,
    });
    // check if there's a winner
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // if all the movements have been made there's a tie
    }
  };
  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}> {TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}> {TURNS.O}</Square>
      </section>
      <button className="board-button" onClick={resetGame}>Reset</button>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
