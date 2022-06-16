import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

const rowStyle = {
  display: "flex",
};

const possibleWin = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const displayNoWinnerStyle = {
  color: "Red",
  fontWeight: "bold",
  fontSize: "20px",
  marginTop: "10px",
};

const displayWinnerStyle = {
  color: "Green",
  fontWeight: "bold",
  fontSize: "20px",
  marginTop: "10px",
};



export default function App() {
  const [numberIsClick, setNumberisClick] = useState(0);
  const [firstPlayer, setFirstPlayer] = useState([]);
  const [secondPlayer, setSecondPlayer] = useState([]);
  const [gameFinish,setGameFinish] = useState(false)

  useEffect(() => {
    CheckForWinner()
  })

  function handleGame(index) {
    if(gameFinish) return
    let newNumberClick = _.cloneDeep(numberIsClick);

    // to determine which player turn
    decidePlayerTurn(newNumberClick, index);

    // prevent any input if the square is already filled
    if (_.includes(firstPlayer, index) || _.includes(secondPlayer, index))
      return;

    newNumberClick = newNumberClick + 1;
    setNumberisClick(newNumberClick);
  }

  function decidePlayerTurn(numberIsClick, index) {
    // check if theres already existing array in each player
    if (_.includes(firstPlayer, index) || _.includes(secondPlayer, index))
      return;

    // check odd or even to determine which player is being input
    const isEven = numberIsClick % 2 === 0 ? true : false;
    if (isEven) {
      const tempArray = _.cloneDeep(firstPlayer);
      tempArray.push(index);
      setFirstPlayer(tempArray);
    } else {
      const tempArray = _.cloneDeep(secondPlayer);
      tempArray.push(index);
      setSecondPlayer(tempArray);
    }
  }

  function Square({ index }) {
    return (
      <div
        onClick={() => {
          handleGame(index);
        }}
        className="square"
        style={squareStyle}
      >
        {firstPlayer.includes(index)
          ? "X"
          : secondPlayer.includes(index)
            ? "O"
            : ""}
      </div>
    );
  }

  function CheckForWinner() {
    const playerOneArr = _.cloneDeep(firstPlayer);
    const playerTwoArr = _.cloneDeep(secondPlayer);

    //avoid pointless checking for perfomance
    if (playerOneArr.length < 3 || playerTwoArr < 3) return

    const isPlayerOneWin = getWinner(playerOneArr)
    const isPlayerTwoWIn = getWinner(playerTwoArr)

    if (isPlayerOneWin) {
      setGameFinish(true)
      return (<div style={displayWinnerStyle}>
        Player 1 Win
      </div>)
    }
    if(isPlayerTwoWIn) {
      setGameFinish(true)
      return (<div style={displayWinnerStyle}>
        Player 2 Win
      </div>)
    }
  }

   function getWinner(moveArray) {
    let isWin = false

     _.forEach(possibleWin, (data) => {
      if(isWin === true) return
      isWin = _.difference(data, moveArray).length === 0
    })
    return isWin
  }

  function DisplayNoWinner() {
    return (
      <div style={displayNoWinnerStyle}>There's No Winner In This Round</div>
    );
  }

  function resetGame() {
    setFirstPlayer([]);
    setSecondPlayer([]);
    setNumberisClick(0);
    setGameFinish(false)
  }

  function Board() {
    return (
      <div style={containerStyle} className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>
          Next player: <span>X</span>
        </div>
        <div id="winnerArea" className="winner" style={instructionsStyle}>
          Winner: <span>None</span>
        </div>
        <button
          onClick={() => {
            resetGame();
          }}
          style={buttonStyle}
        >
          Reset
        </button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square index={1} />
            <Square index={2} />
            <Square index={3} />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square index={4} />
            <Square index={5} />
            <Square index={6} />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square index={7} />
            <Square index={8} />
            <Square index={9} />
          </div>
        </div>
        <div>{numberIsClick === 8 && <DisplayNoWinner />}</div>
        <CheckForWinner />
      </div>
    );
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );
