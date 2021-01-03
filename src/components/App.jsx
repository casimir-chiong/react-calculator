import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Display from "./Display";

class App extends Component {
  state = {
    next: null,
    total: null,
    operation: null,
    dashboard: [
      [
        { id: "clear", grey: true, label: "AC" },
        { id: "+/-", grey: true },
        { id: "%", grey: true },
        { id: "÷", orange: true },
      ],
      [{ id: "7" }, { id: "8" }, { id: "9" }, { id: "x", orange: true }],
      [{ id: "4" }, { id: "5" }, { id: "6" }, { id: "-", orange: true }],
      [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "+", orange: true }],
      [{ id: "0", wide: true }, { id: "." }, { id: "=", orange: true }],
    ],
  };

  handleClick = () => {
    console.log("click");
  };

  render() {
    return (
      <div className="app">
        <Display display={this.state.next} />
        <Dashboard
          display={this.state.next}
          dashboard={this.state.dashboard}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default App;
