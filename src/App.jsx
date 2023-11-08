import { useState } from 'react';

import './App.css';

function App() {
  let [counter, setCounter] = useState(0);

  let [spaces, setSpaces] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  let [player, setPlayer] = useState(false);

  function isWinner(player) {
    for (let i = 0; i < 3; i++) {
      if (
        spaces[i][0] == player &&
        spaces[i][1] == player &&
        spaces[i][2] == player
      ) {
        return true;
      } else if (
        spaces[0][i] == player &&
        spaces[1][i] == player &&
        spaces[2][i] == player
      ) {
        return true;
      }
    }
    if (
      spaces[0][0] == player &&
      spaces[1][1] == player &&
      spaces[2][2] == player
    ) {
      return true;
    } else if (
      spaces[0][2] == player &&
      spaces[1][1] == player &&
      spaces[2][0] == player
    ) {
      return true;
    }
  }

  function handleClick(x, y) {
    const newSpaces = [...spaces];
    setCounter(counter + 1);

    if (newSpaces[x][y]) {
      return;
    } else {
      setPlayer(!player);
      newSpaces[x][y] = player ? 'X' : 'O';
    }

    console.log(counter);

    if (isWinner('X')) {
      alert('X is the winner');
    } else if (isWinner('O')) {
      alert('O is the winner');
    } else if (counter == 8) {
      alert('Draw');
    }

    setSpaces(newSpaces);
  }

  function handleClear() {
    const newSpaces = [...spaces];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        newSpaces[i][j] = null;
      }
    }
    setCounter(0);
    setSpaces(newSpaces);
  }

  return (
    <div>
      <table>
        <tbody>
          {spaces.map((element, index) => (
            <tr key={index}>
              {element.map((e, i) => (
                <td
                  data-x={index}
                  data-y={i}
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
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}

export default App;
