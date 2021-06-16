export default function checkWinner(board) {
  // Rows
  const row1 = (board[0][0] === board[0][1] && board[0][1] === board[0][2]) ? board[0][0] : null;
  const row2 = (board[1][0] === board[1][1] && board[1][1] === board[1][2]) ? board[1][0] : null;
  const row3 = (board[2][0] === board[2][1] && board[2][1] === board[2][2]) ? board[2][0] : null;

  // Columns
  const col1 = (board[0][0] === board[1][0] && board[1][0] === board[2][0]) ? board[0][0] : null;
  const col2 = (board[0][1] === board[1][1] && board[1][1] === board[2][1]) ? board[0][1] : null;
  const col3 = (board[0][2] === board[1][2] && board[1][2] === board[2][2]) ? board[0][2] : null;

  // Diagonals
  const dia1 = (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ? board[0][0] : null;
  const dia2 = (board[0][2] === board[1][1] && board[1][1] === board[2][0]) ? board[0][2] : null;

  const winner = row1 || row2 || row3 || col1 || col2 || col3 || dia1 || dia2;
  if(!winner) {
    let avail = 0
    for (let i = 0;i < 3; i++) {
      for (let j = 0;j < 3; j++) {
        avail += (board[i][j] === '') ? 1 : 0 
      }
    }
    if( avail === 0) {
      return 'T'
    }
  }
  return winner;
}
