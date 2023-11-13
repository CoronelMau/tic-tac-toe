import {
  updateBoard,
  updateCounter,
  updateDraw,
  updateModal,
  updatePlayerOne,
  updatePlayerTwo,
  updateWinner,
} from './actions';

describe('code snippet', () => {
  // The 'payload' property should be a string that matches the function name.
  it('should have a "payload" property that matches the function name', () => {
    const result = updateWinner('test');
    expect(result.payload).toBe('UPDATE_WINNER');
  });

  // The 'value' property should be the argument passed to the function.
  it('should have a "value" property that matches the argument passed to the function', () => {
    const result = updateDraw(5);
    expect(result.value).toBe(5);
  });

  // The argument passed to each function should be of the correct type.
  it('should have an argument of the correct type', () => {
    const result = updateCounter(10);
    expect(typeof result.value).toBe('number');
  });

  // The 'payload' property of the returned object should be a string that matches the function name.
  it('should have a "payload" property that matches the function name', () => {
    const result = updatePlayerOne('test');
    expect(result.payload).toBe('UPDATE_PLAYER_ONE');
  });

  // The 'payload' property of the returned object should be a string that matches the function name.
  it('should have a "payload" property that matches the function name', () => {
    const result = updatePlayerTwo('test');
    expect(result.payload).toBe('UPDATE_PLAYER_TWO');
    expect(result.value).toBe('test');
  });

  // The 'value' property of the returned object should be of the correct type.
  it('should have a "value" property of the correct type', () => {
    const result = updateModal(true);
    expect(typeof result.value).toBe('boolean');
  });
});
