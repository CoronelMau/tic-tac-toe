export default function reducer(state, action) {
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
