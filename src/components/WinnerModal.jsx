import { useState } from "react";
import { Square } from "./Square";

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Tie" : "Won!";
  const [sectionClass, setSectionClass] = useState("winner");
  return (
    <section className={sectionClass}>
      <div className="text">
        <button
          className="close-window-button"
          onClick={() => setSectionClass("closeWindow")}
        >
          X
        </button>
        <h2>{winnerText}</h2>
        {winner ? (
          <header className="win">
            {winner && <Square>{winner}</Square>}{" "}
          </header>
        ) : (
          <header>🤛🏻❌⚪🤜🏻 </header>
        )}
        <footer>
          <button onClick={resetGame}>Restart</button>
        </footer>
      </div>
    </section>
  );
}
