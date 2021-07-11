import { useEffect, useState } from 'react';
import './TicTacToe.css';

export function TicTacToe() {

  const [winner, setWinner] = useState(null)


  const checkWinner = () => {
    const waysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ]

    if (board.every(cell => cell !== "")) {
      setWinner("E")
    }
    waysToWin.forEach(cells => {
      if (cells.every(cell => cell === "O")) {
        setWinner("O")
      }
      if (cells.every(cell => cell === "X")) {
        setWinner("X")
      }
    })

  }
  const boardInit = Array(9).fill('')
  const [board, setBoard] = useState(boardInit)
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const handleCellClick = (index) => {
    if (board[index] === "") {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
      setBoard(
        board.map((item, itemIndex) => index === itemIndex ? currentPlayer : item)
      )
      checkWinner()
    }
  }

  const resetGame = () => {
    setBoard(boardInit)
    setCurrentPlayer(winner === "E" ? "O" : winner)
    setWinner(null)
  }

  useEffect(checkWinner, [board])

  return (
    <main className={winner ? "game-over" : null}>
      <h1 className="title">TicTacToe Game React</h1>
      <div className="board">
        {board.map((item, index) => (
          <div
            className={`cell  ${item}`}
            key={index} //Não entendi por que tem que usar isso
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))}
        <div className="result">
          <h1 className={winner}>{winner === "E" ? "Draw" : winner}</h1>
          <span>{winner === "E" ? "Oww, try again" : "is the winner"}</span>
          <button onClick={resetGame}>Restat Game</button>
        </div>
      </div>
    </main >
  );
}
