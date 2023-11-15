# Tic Tac Toe

The main goal for this project was to learn and implement the unit test with Jest. This is a simple tic-tac-toe game, though is a good start for me to learn how tests work and been able to apply this knowladge to more complex projects.

For this project I'm using React with Vite, as main coding library, and Css with no aditional libreries. The main project is written in the App.jsx file, with two additional folders: the first one is store, which contains the reucer and actions, necessary for the useReducer; on the other hand, the other folder contains the code to determinate whether the is a winner, who the winner is, or if it's a draw.

Every main files has it's own test with the name /.test.jsx. Each one of them has the complete test so the coverage it's at 100%.

You can visit the project in:
https://tic-tac-toe-beta-dun-94.vercel.app/

### Install dependencies

The following is the list of depencencies used for this project:

- @babel/preset-env
- @babel/preset-react
- @testing-library/jest-dom
- @testing-library/react
- @types/jest
- @types/react
- @types/react-dom
- @vitejs/plugin-react
- eslint
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- identity-obj-proxy
- jest
- jest-canvas-mock
- jest-environment-jsdom
- jest-svg-transformer
- react-test-renderer
- vite
- canvas-confetti
- react
- react-dom

For installing, you can use the command:

```sh
npm install
```

### Run project

When you run the project, the main and only page shown is the empty board game, in which you can click each cell and it will display either an 'X' or an 'O'. If one player wins, it will show a modal with the text saying who the winner is. Below the board is a button with the label 'Reset', it's function is to reset the board, and also the game. Finally, at the very bottom of the page, you will find the scores of the players, and also the draw score.

To be able to run the page, you must use the command:

```sh
npm run dev
```

## Tests

There are 4 test in the project:

- Action test -> (src/store/action.test.js)
- Reducer test -> (src/store/reducer.test.js)
- Index test -> (src/utils/index.test.js)
- App test -> (src/app.test.jsx)

You can run all tests using:

```sh
npm run test
```

But also, you can run each one with the next example command:

```sh
npm run test -- src/app.test.jsx
```

If you want to see the coverage you can use the next command:

```sh
npm run coverage
```

The command will create a new folder with the name 'coverage', to see the file, you need to open the index.html in your web browser.

> At the moment it's at 100% coverage

## Credits

I want to thank @isanchez-aguilar, for teaching me how to implement unit test, and other functions. This one is for a great mentor.

## License

This project is own by @coronelmau and @isanchez-aguilar. It can be used for educational prurposes. It can't be copied or use comercially.
