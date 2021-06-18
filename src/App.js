import React, { useEffect, useState } from 'react'
import Cell from './Cell.js'

// import { getRndMove }from './ai.js'
import { getBestMove }from './ai.js'
import checkWinner from './winner.js'
import './App.css'

export default function App() {
  const [{board, turn, game, player, winner}, setBoard] = useState(
    {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: true,
      game: false,
      player: true,
      winner: null
    }
  )

  useEffect(() => {
    play()
    console.log({turn, player})
    checkWin()
  }, [turn, player, game]) // eslint-disable-line react-hooks/exhaustive-deps

  function play() {
    if(turn === player) {
      const { row, col } = getBestMove(board, player)
      if(row !== null || col !== null) {
        toggleBlock(row, col)
      }
    }
  }

  function changeSides() {
    setBoard({
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: true,
      game: false,
      player: (player) ? false : true,
      winner: null
    })
  }

  function checkWin() {
    const winner = checkWinner(board)
    if(winner) {
      setBoard({
        board: board,
        turn: true,
        game: true,
        player: player,
        winner: winner
      })
    }
  }

  function toggleBlock(row, column) {
    const newBoard = board
    if(newBoard[row][column] === '') {
      newBoard[row][column] = (turn) ? 'X' : 'O'
      setBoard({
        board: newBoard,
        turn : !turn,
        game: game,
        player: player,
        winner: winner
      })
    }
  }

  function clearBoard() {
    setBoard({
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: true,
      game: false,
      player: player,
      winner: null
    })
    console.log({board, turn, game, player})
    play()
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
    <button onClick={changeSides}>Change Sides </button>
    <div>
    {
      (game) 
      ?  (winner === 'T')
        ?  <h2> Game Over: Tie </h2>
        : <h2> Game Over: {winner} wins </h2>
      : <h2>{turn ? 'X' : 'O'}'s Turn</h2>
    }
    </div>
    <div>
      {player ? 'X' : 'O'}
    </div>
    </div>
    </>
  )
}
