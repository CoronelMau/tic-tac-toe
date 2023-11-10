import { createEmptyBoard, isWinner } from './index';

describe('Utils functions', () => {
  it('> Create empty board', () => {
    const board = createEmptyBoard();

    expect(board).not.toBeNull();
    expect(typeof board).toBe(typeof []);

    expect(board).toMatchSnapshot();
  });

  it('> Is winner checking winner is ❌', () => {
    const board = [
      ['❌', '❌', '❌'],
      ['❌', '🅾️', '🅾️'],
      ['🅾️', '️❌', '🅾️'],
    ];

    expect(isWinner(board, '❌')).toBeTruthy();
  });

  it('> Is winner checking winner is 🅾️', () => {
    const board = [
      ['❌', '❌', '❌'],
      ['❌', '🅾️', '🅾️'],
      ['🅾️', '️❌', '🅾️'],
    ];

    expect(isWinner(board, '🅾️')).not.toBeTruthy();
  });

  it('> Is winner checking winner is not o', () => {
    const board = [
      ['x', '', 'o'],
      ['x', '', ''],
      ['x', 'o', 'o'],
    ];

    expect(isWinner(board, 'o')).not.toBeTruthy();
  });

  it('> Is winner checking winner is x', () => {
    const board = [
      ['x', '', 'o'],
      ['x', '', ''],
      ['x', 'o', 'o'],
    ];

    expect(isWinner(board, 'x')).toBeTruthy();
  });

  it('> Is winner checking winner is 🅾️', () => {
    const board = [
      ['x', '', 'o'],
      ['o', 'x', 'o'],
      ['', '', 'x'],
    ];

    expect(isWinner(board, 'o')).not.toBeTruthy();
  });

  //TODO: add all functions.
});
