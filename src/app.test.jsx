import { fireEvent, render, waitFor, act } from '@testing-library/react';
import * as confetti from 'canvas-confetti';

import App from './App';

jest.mock('canvas-confetti', () => ({
  __esModule: true,
  default: jest.fn(),
  clearRect: jest.fn(),
}));

jest.useFakeTimers();

function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

describe('App main component', () => {
  it('> The main elements are present in the page', async () => {
    const { findByText, findByTestId } = render(<App />);

    const clearButton = await findByText('Reset');
    const boardTable = await findByTestId('board');
    const resultsTable = await findByTestId('results');

    expect(clearButton).not.toBeNull();
    expect(boardTable).not.toBeNull();
    expect(resultsTable).not.toBeNull();

    expect(boardTable.tagName).toBe('TABLE');
    expect(resultsTable.tagName).toBe('TABLE');
  });

  it('> Checking whether is working the clicked cells', async () => {
    const { findByTestId } = render(<App />);

    const clickedCells = [
      [0, 0],
      [0, 2],
      [2, 0],
      [2, 2],
    ];

    for (let i = 0; i < clickedCells.length; ++i) {
      const cellData = clickedCells[i];
      const player = i % 2 === 0 ? 'O' : 'X';

      const cell = await findByTestId(`cell-${cellData[0]}-${cellData[1]}`);

      fireEvent.click(cell);
      expect(cell.textContent).toBe(player);
    }
  });

  it('> Checking when the game is won by O', async () => {
    const { findByTestId } = render(<App />);

    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        const cell = await findByTestId(`cell-${i}-${j}`);

        expect(cell.textContent).toBe('');
        fireEvent.click(cell);
      }
    }

    const oScore = await findByTestId('O-score');
    const xScore = await findByTestId('X-score');
    const drawScore = await findByTestId('draw-score');
    const modal = await findByTestId('modal');

    expect(oScore.textContent).toBe('1');
    expect(xScore.textContent).toBe('0');
    expect(drawScore.textContent).toBe('0');
    expect(confetti.default).toHaveBeenCalledTimes(1);

    await waitFor(() => expect(modal).not.toBeNull());

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() =>
      expect(modal.classList.contains('fade-out-animation')).toBeTruthy()
    );

    act(() => {
      jest.advanceTimersByTime(1100);
    });

    await waitFor(() =>
      expect(modal.classList.contains('fade-out-animation')).toBeFalsy()
    );
  });

  it('> Checking draw', async () => {
    const { findByTestId } = render(<App />);

    const gameStepsDraw = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 1],
      [2, 1],
      [2, 0],
      [2, 2],
      [1, 2],
      [1, 0],
    ];

    for (let i = 0; i < 9; ++i) {
      const cellData = gameStepsDraw[i];
      const cell = await findByTestId(`cell-${cellData[0]}-${cellData[1]}`);
      expect(cell.textContent).toBe('');

      fireEvent.click(cell);
    }

    const oScore = await findByTestId('O-score');
    const xScore = await findByTestId('X-score');
    const drawScore = await findByTestId('draw-score');

    expect(oScore.textContent).toBe('0');
    expect(xScore.textContent).toBe('0');
    expect(drawScore.textContent).toBe('1');
  });

  it('> Checking player one win', async () => {
    const { findByTestId } = render(<App />);

    const gameStepsPlayerOne = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
    ];

    for (let i = 0; i < 5; ++i) {
      const cellData = gameStepsPlayerOne[i];
      const cell = await findByTestId(`cell-${cellData[0]}-${cellData[1]}`);
      expect(cell.textContent).toBe('');

      fireEvent.click(cell);
    }

    const oScore = await findByTestId('O-score');
    const xScore = await findByTestId('X-score');
    const drawScore = await findByTestId('draw-score');

    expect(oScore.textContent).toBe('1');
    expect(xScore.textContent).toBe('0');
    expect(drawScore.textContent).toBe('0');
  });

  it('> Checking player two win', async () => {
    const { findByTestId } = render(<App />);
    const gameStepPlayerTwo = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [0, 2],
      [2, 1],
    ];

    for (let i = 0; i < 6; ++i) {
      const cellData = gameStepPlayerTwo[i];
      const cell = await findByTestId(`cell-${cellData[0]}-${cellData[1]}`);
      expect(cell.textContent).toBe('');

      fireEvent.click(cell);
    }

    const oScore = await findByTestId('O-score');
    const xScore = await findByTestId('X-score');
    const drawScore = await findByTestId('draw-score');

    expect(oScore.textContent).toBe('0');
    expect(xScore.textContent).toBe('1');
    expect(drawScore.textContent).toBe('0');
  });

  it('>Should clear board', async () => {
    const { findByTestId } = render(<App />);

    const resetButton = await findByTestId('resetButton');
    fireEvent.click(resetButton);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = await findByTestId(`cell-${i}-${j}`);
        expect(cell.textContent).toBe('');
      }
    }
  });
});
