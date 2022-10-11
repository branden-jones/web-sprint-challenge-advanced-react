import React from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const initialCoordX = 2;
const initialCoordY = 2;

const initialState = {};
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

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor(props) {
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      x: initialCoordX,
      y: initialCoordY,
    };
  }

  // x = coordinates[this.index][0,0];
  // y = coordinates[this.index][0,1];
  // console.log(`x`, x, `y`, y);
  // x = coordinates[this.state.index][(0, 0)];
  // y = coordinates[this.state.index][(0, 1)];

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return console.log(this.state.index);
    // return { x: coordinates[this.state.index][(0, 0)], y: coordinates[this.state.index][(0, 1)] };
  };

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  };

  reset = (evt) => {
    // Use this helper to reset all states to their initial values.
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      x: initialCoordX,
      y: initialCoordY,
    };
  };

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  };

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const move = evt.target.id;
    evt.preventDefault();
    this.setState({ ...this.state, steps: this.state.steps + 1 });
    if (move === "up") {
      if (this.state.y - 1 > 0 && this.state.index - 3 >= 0) {
        console.log(`up`);
        this.state.index = this.state.index - 3;
        this.state.y = this.state.y - 1;
      } else {
        this.setState({ ...this.state, message: `You can't go up` });
      }
    }
    if (move === "right") {
      if (this.state.x + 1 < 4 && this.state.index <= 8) {
        console.log(`right`);
        this.state.index = this.state.index + 1;
        this.state.x = this.state.x + 1;
      } else {
        this.setState({ ...this.state, message: `You can't go right` });
      }
    }
    if (move === "down") {
      if (this.state.y + 1 < 4 && this.index <= 8) {
        console.log(`down`);
        this.state.index = this.state.index + 3;
        this.state.y = this.state.y + 1;
      } else {
        this.setState({ ...this.state, message: `You can't go down` });
      }
    }
    if (move === "left") {
      if (this.state.x - 1 > 0 && this.state.index >= 0) {
        console.log(`left`);
        this.state.index = this.state.index - 1;
        this.state.x = this.state.x - 1;
      } else {
        this.setState({ ...this.state, message: `You can't go down` });
      }
    }
    console.log(`x`, this.state.x, `y`, this.state.y, `index`, this.state.index);
  };

  onChange = (evt) => {
    // You will need this to update the value of the input.
    evt.preventDefault();
    this.setState({ ...this.state, email: evt.target.value });
  };

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    axios
      .post(`http://localhost:9000/api/result`, { x: this.state.x, y: this.state.y, steps: this.state.steps, email: this.state.email })
      .then((res) => {
        this.setState({ ...this.state, message: res.data.message });
      })
      .catch((err) => console.log(`Woops... somethings wrong`, err.response.data.message));
    this.reset();
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({this.state.x},{this.state.y})
          </h3>
          <h3 id="steps">
            You moved {this.state.steps} {this.state.steps === 1 ? "time" : "times"}{" "}
          </h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === this.state.index ? " active" : ""}`}>
              {idx === this.state.index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>
            LEFT
          </button>
          <button id="up" onClick={this.move}>
            UP
          </button>
          <button id="right" onClick={this.move}>
            RIGHT
          </button>
          <button id="down" onClick={this.move}>
            DOWN
          </button>
          <button id="reset" onClick={this.reset}>
            reset
          </button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.email} />
          <input id="submit" type="submit" onClick={this.onSubmit} />
        </form>
      </div>
    );
  }
}
