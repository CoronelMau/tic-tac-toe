import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';

import App from './App';

describe('App main component', () => {
  afterEach(() => {
    cleanup();
    console.log(document.body.innerHTML);
  });
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
      await waitFor(() => {
        expect(cell.textContent).toBe(player);
      });
    }
  });

  it('> Checking when the game is won by O', async () => {
    const { findByTestId, unmount } = render(<App />);

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

    expect(oScore.textContent).toBe('1');
    expect(xScore.textContent).toBe('0');
    expect(drawScore.textContent).toBe('0');
  });

  // it('> Checking draw', async () => {
  //   const { findByTestId } = render(<App />);

  //   const gameStepsDraw = [
  //     [0, 0],
  //     [0, 1],
  //     [0, 2],
  //     [1, 1],
  //     [2, 1],
  //     [2, 0],
  //     [2, 2],
  //     [1, 2],
  //     [1, 0],
  //   ];

  //   for (let i = 0; i < 9; ++i) {
  //     const cellData = gameStepsDraw[i];
  //     const cell = await findByTestId(`cell-${cellData[0]}-${cellData[1]}`);
  //     console.log(cellData[0], cellData[1], cell.textContent);
  //     expect(cell.textContent).toBe('');

  //     fireEvent.click(cell);
  //   }

  //   const oScore = await findByTestId('O-score');
  //   const xScore = await findByTestId('X-score');
  //   const drawScore = await findByTestId('draw-score');

  //   expect(oScore.textContent).toBe('0');
  //   expect(xScore.textContent).toBe('0');
  //   expect(drawScore.textContent).toBe('1');
  //   cleanup();
  // });
});
