import React from "react";
import { useState, useEffect } from "react";
import Die from "./Components/Die";
import Timer from "./Components/Timer";
import Time from "./Components/Time";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [gameStarted, setGameStarted] = useState(true);
  const [bestRolls, setBestRolls] = useState(localStorage.getItem("rolls"));
  const [bestTime, setBestTime] = useState(localStorage.getItem("time"));

  // =========== SAVING BEST RESULT =========== //

  useEffect(() => {
    if (tenzies) {
      setBestRolls(prevBestRolls => (
         !prevBestRolls || rolls < prevBestRolls ? rolls : prevBestRolls
      ))
    }
  }, [tenzies])

  useEffect(() => {
    localStorage.setItem("rolls", bestRolls);
    localStorage.setItem("time", bestTime);
  }, [bestRolls, bestTime])

  const handleBestTime = (time) => {
    if (tenzies) {
        setBestTime(prevBestTime => (
        !prevBestTime || time < prevBestTime ? time : prevBestTime
        ))
    }
  }

  // =========== CHECK WINNING =========== //

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
        endGame()
    }
  }, [dice]);

  // =========== GAME PROCESS =========== //

  function startGame() {
    setRolls(0);
    setGameStarted(true);
    setTenzies(false);
    setDice(allNewDice());
  }

  function endGame() {
    setTenzies(true);
    setGameStarted(false);
  }  

  // =========== OPERATIONS WITH DICE =========== //

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
    setRolls((prevRolls) => prevRolls + 1);
    setGameStarted(true);
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  // =========== CREATING ELEMENTS =========== //

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

// =========== RETURNING COMPONENT =========== //

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <div className="result">
        <h3>Rolls: {rolls}</h3>
        <h3>Time:&nbsp;
          <Timer 
            gameStarted={gameStarted}
            handleBestTime={handleBestTime}
          />
        </h3>
        <h4 className="grey-text">Best rolls: {bestRolls}</h4>
        <h4 className="grey-text">Best time:&nbsp;
          <Time 
            time={bestTime}
          />
        </h4>
      </div>
      <button className="roll-dice" onClick={tenzies ? startGame : rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
