import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Gameboard } from "./gameboard/gameboard";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reset: 0 };
  }

  render() {
    return (
      <>
        <div className="solitare-header">
          <div>
            <h1>Solitare</h1>
            <button onClick={() => this.setState({ reset: Math.random() })}>
              Reset
            </button>
          </div>
          {/* <div className="solitare-score">score</div> */}
        </div>
        <Gameboard reset={this.state.reset} />
      </>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
