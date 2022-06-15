import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

const rowStyle = {
  display: "flex",
};

const possibleWin = ["123", "456", "789", "147", "258", "369", "159", "357"];

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

export default function App() {
  const [numberIsClick, setNumberisClick] = useState(0);
  const [firstPlayer, setFirstPlayer] = useState([]);
  const [secondPlayer, setSecondPlayer] = useState([]);

  useEffect(()=> {
    checkForWinner()
  })

  function handleGame(index) {
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

  function checkForWinner() {
    const playerOneArr = _.cloneDeep(firstPlayer);
    const playerTwoArr = _.cloneDeep(secondPlayer);

    const playerOneString = getMoveArrangement(playerOneArr);
    console.warn(playerOneString)
    // if(_.find(playerOneString.)
    // const isPlayerOneWinner = _.reduce(playerOneArr,(newstring,data) => {return newstring.concat(data) })
    // const isPlayerTwoWinner = _.reduce(playerTwoArr.sort())
  }

  function getMoveArrangement(moveArray) {
    // let newArray = _.cloneDeep(moveArray.slice(0,3));
    let newArray = moveArray
    // newArray = newArray.sort()
    let newString = "";
    _.forEach(newArray, (data) => {
      newString = newString.concat(data);
    });
    return newString;
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
        <div>{numberIsClick === 9 && <DisplayNoWinner />}</div>
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
