import { useReducer, useRef } from 'react';
import confetti from 'canvas-confetti';

import {
  updateBoard,
  updateDraw,
  updateWinner,
  updatePlayerOne,
  updatePlayerTwo,
  updateCounter,
} from './store/actions';
import { createEmptyBoard, isWinner } from './utils';

import './App.css';

const initialState = {
  board: createEmptyBoard(),
  draw: 0,
  winner: null,
  playerOne: 0,
  playerTwo: 0,
  counter: 0,
  modal: false,
};

function reducer(state, action) {
  const { payload, value } = action;

  if (payload === 'UPDATE_WINNER') return { ...state, winner: value };

  if (payload === 'UPDATE_BOARD') return { ...state, board: value };

  if (payload === 'UPDATE_DRAW') return { ...state, draw: value };

  if (payload === 'UPDATE_PLAYER_ONE') return { ...state, playerOne: value };

  if (payload === 'UPDATE_PLAYER_TWO') return { ...state, playerTwo: value };

  if (payload === 'UPDATE_COUNTER') return { ...state, counter: value };

  if (payload === 'UPDATE_MODAL') return { ...state, modal: value };

  return state;
}

export default function App() {
  const modalRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { board, draw, winner, playerOne, playerTwo, counter } = state;

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

      if (currentTurn === 'X') return dispatch(updatePlayerOne(playerOne + 1));

      modalRef.current.show();
      setTimeout(() => {
        modalRef.current.classList.toggle('fade-out-animation');
        modalRef.current.close();
      }, 2000);

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
      <table className="board">
        <tbody>
          {board.map((element, index) => (
            <tr key={index}>
              {element.map((e, i) => (
                <td
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
      <button onClick={handleClear}>Reset</button>
      <table className="results">
        <tbody>
          <tr>
            <th className="title">Player 1</th>
            <th className="title">Player 2</th>
            <th className="title">Draw</th>
          </tr>
          <tr>
            <td className="points">{playerTwo}</td>
            <td className="points">{playerOne}</td>
            <td className="points">{draw}</td>
          </tr>
        </tbody>
      </table>

      <dialog ref={modalRef}>Test</dialog>
    </div>
  );
}
