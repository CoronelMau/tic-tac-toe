import reducer from './reducer';
import { createEmptyBoard } from '../utils';

const getState = () => ({
  board: createEmptyBoard(),
  draw: 0,
  winner: null,
  playerOne: 0,
  playerTwo: 0,
  counter: 0,
  modal: false,
});

describe('Reducer actions test', () => {
  it('Should return the same state with invalid action', () => {
    const state = getState();
    const invalidAction = {
      payload: 'TEST_INVALID',
      value: null,
    };

    const newState = reducer(state, invalidAction);

    expect(newState).toBe(state);
  });

  it('> Should update winner', () => {
    const state = getState();

    const updateWinnerAction = {
      payload: 'UPDATE_WINNER',
      value: 1,
    };

    const newState = reducer(state, updateWinnerAction);

    expect(newState).toEqual({
      ...state,
      winner: 1,
    });
  });

  it('> Should update Player One', () => {
    const state = getState();
    const updatePlayerOne = {
      payload: 'UPDATE_PLAYER_ONE',
      value: 1,
    };

    const newState = reducer(state, updatePlayerOne);
    expect(newState).toEqual({ ...state, playerOne: 1 });
  });

  it('> Should update player two', () => {
    const state = getState();
    const updatePlayerTwo = {
      payload: 'UPDATE_PLAYER_TWO',
      value: 1,
    };

    const newState = reducer(state, updatePlayerTwo);
    expect(newState).toEqual({
      ...state,
      playerTwo: 1,
    });
  });

  it('> Shoud update Draw', () => {
    const state = getState();
    const updateDraw = {
      payload: 'UPDATE_DRAW',
      value: 1,
    };

    const newState = reducer(state, updateDraw);
    expect(newState).toEqual({
      ...state,
      draw: 1,
    });
  });

  it('> Shoud update modal', () => {
    const state = getState();
    const updateModal = {
      payload: 'UPDATE_MODAL',
      value: true,
    };

    const newState = reducer(state, updateModal);
    expect(newState).toEqual({ ...state, modal: true });
  });

  it('>Should update counter', () => {
    const state = getState();
    const updateCounter = {
      payload: 'UPDATE_COUNTER',
      value: 1,
    };

    const newState = reducer(state, updateCounter);
    expect(newState).toEqual({
      ...state,
      counter: 1,
    });
  });

  it('>Should update board', () => {
    const state = getState();
    const updateBoard = {
      payload: 'UPDATE_BOARD',
      value: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    };

    const newState = reducer(state, updateBoard);
    expect(newState).toEqual({
      ...state,
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    });
  });
});
