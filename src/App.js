import React, { useEffect, useState } from 'react'
import Cell from './Cell.js'

// import { getRndMove }from './ai.js'
import { getBestMove }from './ai.js'
import checkWinner from './winner.js'
import './App.css'

export default function App() {
  const [{board, turn}, setBoard] = useState(
    {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: true
    }
  )

  useEffect(() => {
    checkWin()
    if(turn) {
      // const { row, col } = getRndMove(board)
      const { row, col } = getBestMove(board)
      toggleBlock(row, col)
    }
  }, [turn]) //  eslint-disable-line react-hooks/exhaustive-deps

  function checkWin() {
    const winner = checkWinner(board)
    if(winner) {
      if(winner === 'T') alert('Tied')
      else alert(winner + " is the winner")
      clearBoard();
    }
  }

  function toggleBlock(row, column) {
    const newBoard = board
    if(newBoard[row][column] === '') {
      newBoard[row][column] = (turn) ? 'X' : 'O'
    }
    setBoard({ board: newBoard, turn : !turn})
  }

  function clearBoard() {
    setBoard({
      turn: true,
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]
    })
  }

  return (
    <>
    <div className="container" >
      <table>
        <tbody>
          <tr>
            <td><Cell value={board[0][0]} row={0} col={0} toggleBlock={toggleBlock} /></td>
            <td><Cell value={board[0][1]} row={0} col={1} toggleBlock={toggleBlock} /></td>
            <td><Cell value={board[0][2]} row={0} col={2} toggleBlock={toggleBlock} /></td>
          </tr>
          <tr>
            <td><Cell value={board[1][0]} row={1} col={0} toggleBlock={toggleBlock} /></td>
            <td><Cell value={board[1][1]} row={1} col={1} toggleBlock={toggleBlock} /></td>
            <td><Cell value={board[1][2]} row={1} col={2} toggleBlock={toggleBlock} /></td>
          </tr>
          <tr>
            <td><Cell value={board[2][0]} row={2} col={0} toggleBlock={toggleBlock} /></td>
            <td><Cell value={board[2][1]} row={2} col={1} toggleBlock={toggleBlock} /></td>
            <td><Cell value={board[2][2]} row={2} col={2} toggleBlock={toggleBlock} /></td>
          </tr>
        </tbody>
      </table>
    <button onClick={clearBoard}>Clear Game</button>
    <h2>{turn ? 'X' : 'O'}'s Turn</h2>
    </div>
    </>
  )
}
