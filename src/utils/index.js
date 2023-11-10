export function createEmptyBoard() {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

export function isWinner(board, player) {
  for (let i = 0; i < 3; i++) {
    if (isLineRow(board[i], player)) {
      return true;
    }

    if (
      board[0][i] == player &&
      board[1][i] == player &&
      board[2][i] == player
    ) {
      return true;
    }
  }

  return isDiagonal(board, player);
}

export function isLineRow(row, player) {
  return row[0] == player && row[1] == player && row[2] == player;
}

export function isDiagonal(board, player) {
  return (
    (board[0][0] == player && board[1][1] == player && board[2][2] == player) ||
    (board[0][2] == player && board[1][1] == player && board[2][0] == player)
  );
}
