import checkWinner from './winner'

const X = 'X'
const O = 'O'

const scores = {
  'X': 1,
  'O': -1,
  'T': 0
}

export function getRndMove(board) {
  let avail = []
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if(board[i][j] === '') {
        avail.push({row: i, col: j})
      }
    }
  }

  // Get Random
  console.log(avail)
  const rndPair = Math.floor(Math.random() * avail.length)
  return avail[rndPair]
}

export function getBestMove(board, side) {
  let bestScore = -Infinity
  let bestMove;
  if(checkWinner(board)) return {row: null, col: null};
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if(board[i][j] === '') {
        board[i][j] = X
        let score = minimax(board, 0, false, side)
        board[i][j] = ''
        if( score > bestScore ) {
          bestScore = score
          bestMove = {i, j}
        }
      }
    }
  }
  return {row: bestMove.i, col: bestMove.j}
}

function minimax(board, depth, isMax, side) {
  let result = checkWinner(board)
  if(result !== null) {
    return scores[result]
  }
  if(isMax) {
    let bestScore = -Infinity
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(board[i][j] === '') {
          board[i][j] = side ? 'X' : 'O'
          let score = minimax(board, depth + 1, false)
          board[i][j] = ''
          bestScore = Math.max(score, bestScore)
        }
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(board[i][j] === '') {
          board[i][j] = !side ? 'X' : 'O'
          let score = minimax(board, depth + 1, true)
          board[i][j] = ''
          bestScore = Math.min(score, bestScore)
        }
      }
    }
    return bestScore
  }
}
