import React, { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialBLocation = 4;

const coordinates = [
  [1, 1],
  [2, 1],
  [3, 1],
  [1, 2],
  [2, 2],
  [3, 2],
  [1, 3],
  [2, 3],
  [3, 3],
];
// the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [bLocation, setBLocation] = useState(initialBLocation);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  let x = coordinates[bLocation][(0, 0)];
  let y = coordinates[bLocation][(0, 1)];

  function getXY(move) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setBLocation(initialBLocation);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setMessage(initialMessage);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    evt.preventDefault();

    let move = evt.target.id;
    setMessage(initialMessage);
    if (move === "up") {
      if (y - 1 > 0 && bLocation - 3 >= 0) {
        setBLocation(bLocation - 3);
        setSteps(steps + 1);
      } else {
        setMessage(`You can't go up`);
      }
    }
    if (move === "down") {
      if (y + 1 < 4 && bLocation + 3 <= 8) {
        setBLocation(bLocation + 3);
        setSteps(steps + 1);
      } else {
        setMessage(`You can't go down`);
      }
    }
    if (move === "right") {
      if (x + 1 < 4 && bLocation + 1 <= 8) {
        setBLocation(bLocation + 1);
        setSteps(steps + 1);
      } else {
        setMessage(`You can't go right`);
      }
    }
    if (move === "left") {
      if (x - 1 > 0 && bLocation - 1 >= 0) {
        setBLocation(bLocation - 1);
        setSteps(steps + 1);
      } else {
        setMessage(`You can't go left`);
      }
    }
  }
  console.log(`x`, x, `y`, y);
  function onChange(evt) {
    // You will need this to update the value of the input.
    evt.preventDefault();
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    // Use a POST request to send a payload to the server.
    axios
      .post(`http://localhost:9000/api/result`, { x: x, y: y, steps: steps, email: `${email}` })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => setMessage(err.response.data.message));
    reset();
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {`(${x}, ${y})`}</h3>
        <h3 id="steps">
          You moved {steps} {steps === 1 ? `time` : `times`}
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === bLocation ? " active" : ""}`}>
            {idx === bLocation ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
        <input id="submit" type="submit" onClick={onSubmit}></input>
      </form>
    </div>
  );
}
