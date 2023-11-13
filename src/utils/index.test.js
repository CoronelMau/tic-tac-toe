import { createEmptyBoard, isWinner } from './index';

describe('Utils functions', () => {
  it('> Create empty board', () => {
    const board = createEmptyBoard();

    expect(board).not.toBeNull();
    expect(typeof board).toBe(typeof []);

    expect(board).toMatchSnapshot();
  });

  // Winner X is true - Horizontal
  it('> Is winner, checking winner is X - Horizontal', () => {
    const board = [
      ['X', 'X', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'O'],
    ];

    expect(isWinner(board, 'X')).toBeTruthy();
  });

  //Winner O is false - Horizontal
  it('> Is winner, checking winner is not O - Horizontal', () => {
    const board = [
      ['X', 'X', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'O'],
    ];

    expect(isWinner(board, 'O')).not.toBeTruthy();
  });

  // Is winner X true - Vertical
  it('> Is winner checking winner is x - Vertical', () => {
    const board = [
      ['x', '', 'o'],
      ['x', '', ''],
      ['x', 'o', 'o'],
    ];

    expect(isWinner(board, 'x')).toBeTruthy();
  });

  //Is winner 0 false - Vertical
  it('> Is winner checking winner is not o', () => {
    const board = [
      ['x', '', 'o'],
      ['x', '', ''],
      ['x', 'o', 'o'],
    ];

    expect(isWinner(board, 'o')).not.toBeTruthy();
  });

  //Is winner X true - First Diagonal
  it('> Is winner, checking winner is X - First Diagonal', () => {
    const board = [
      ['x', '', ''],
      ['', 'x', ''],
      ['', '', 'x'],
    ];

    expect(isWinner(board, 'x')).toBeTruthy();
  });

  //Is winner o false - First Diagonal
  it('> Is winner, checking winner is not O - First Diagonal', () => {
    const board = [
      ['x', '', 'o'],
      ['o', 'x', 'o'],
      ['', '', 'x'],
    ];

    expect(isWinner(board, 'o')).not.toBeTruthy();
  });

  //Is winner, winner is X - Second Diagonal
  it('> Is winner, winner is X - Second Diagonal', () => {
    const board = [
      ['', '', 'x'],
      ['', 'x', ''],
      ['x', '', ''],
    ];

    expect(isWinner(board, 'x')).toBeTruthy();
  });

  it('> Is winner, winner is not 0, Second Diagonal', () => {
    const board = [
      ['', '', 'x'],
      ['', 'x', ''],
      ['x', '', ''],
    ];

    expect(isWinner(board, 'o')).not.toBeTruthy();
  });
});
