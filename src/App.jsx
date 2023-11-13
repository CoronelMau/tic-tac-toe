import { useReducer, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

import {
  updateBoard,
  updateDraw,
  updateWinner,
  updatePlayerOne,
  updatePlayerTwo,
  updateCounter,
  updateModal,
} from './store/actions';
import { createEmptyBoard, isWinner } from './utils';
import reducer from './store/reducer';

import './App.css';

export default function App() {
  const initialState = {
    board: createEmptyBoard(),
    draw: 0,
    winner: null,
    playerOne: 0,
    playerTwo: 0,
    counter: 0,
    modal: false,
  };

  const modalRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { board, draw, winner, playerOne, playerTwo, counter, modal } = state;

  const openModal = () => {
    dispatch(updateModal(true));

    setTimeout(() => {
      modalRef.current.classList.toggle('fade-out-animation');

      setTimeout(() => {
        dispatch(updateModal(false));
        modalRef.current.classList.toggle('fade-out-animation');
      }, 1100);
    }, 2000);
  };

  const handleClick = (x, y) => {
    if (board[x][y] || !!winner) return;

    const newBoard = [...board];
    const currentTurn = counter % 2 ? 'X' : 'O';

    newBoard[x][y] = currentTurn;
    dispatch(updateCounter(counter + 1));
    dispatch(updateBoard(newBoard));

    if (isWinner(newBoard, currentTurn)) {
      confetti();
      dispatch(updateWinner(currentTurn));

      openModal();

      if (currentTurn === 'O') return dispatch(updatePlayerOne(playerOne + 1));

      return dispatch(updatePlayerTwo(playerTwo + 1));
    }

    if (counter == 8) {
      dispatch(updateDraw(draw + 1));
    }
  };

  const handleClear = () => {
    const newBoard = createEmptyBoard();
    dispatch(updateCounter(0));
    dispatch(updateBoard(newBoard));
    dispatch(updateWinner(null));
  };

  return (
    <div>
      <table data-testid="board" className="board">
        <tbody>
          {board.map((element, index) => (
            <tr key={index}>
              {element.map((e, i) => (
                <td
                  data-testid={`cell-${index}-${i}`}
                  className="space"
                  onClick={() => handleClick(index, i)}
                  key={i}
                >
                  {e}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button data-testid="resetButton" onClick={handleClear}>
        Reset
      </button>

      <table data-testid="results" className="results">
        <tbody>
          <tr>
            <th className="title">Player O</th>
            <th className="title">Player X</th>
            <th className="title">Draw</th>
          </tr>
          <tr>
            <td data-testid="O-score" className="points">
              {playerOne}
            </td>
            <td data-testid="X-score" className="points">
              {playerTwo}
            </td>
            <td data-testid="draw-score" className="points">
              {draw}
            </td>
          </tr>
        </tbody>
      </table>

      {modal && (
        <div data-testid="modal" ref={modalRef} className="modal">
          {winner} wins!
        </div>
      )}
    </div>
  );
}
