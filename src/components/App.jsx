import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Display from "./Display";
import handleNumberClick from "./../logic/number";
import handleOperationClick from "./../logic/operation";
import handleCalculateClick from "./../logic/calculate";

class App extends Component {
  state = {
    display: {
      value: "0",
      expression: "a",
      onOperation: false,
    },
    expression: {
      operation: undefined,
      a: {
        value: 0,
        zerosAfter: 0,
        onNegative: false,
        clearOnNumberClick: false,
      },
      b: {
        value: 0,
        zerosAfter: 0,
        onNegative: false,
        clearOnNumberClick: false,
      },
    },
    dashboard: [
      [
        { id: "clear", type: "operation", label: "AC" },
        { id: "switch", type: "operation", label: "+/-" },
        { id: "percentage", type: "operation", label: "%" },
        { id: "division", type: "calculate", label: "÷" },
      ],
      [
        { id: 7, type: "number", label: "7" },
        { id: 8, type: "number", label: "8" },
        { id: 9, type: "number", label: "9" },
        { id: "multiplication", type: "calculate", label: "x" },
      ],
      [
        { id: 4, type: "number", label: "4" },
        { id: 5, type: "number", label: "5" },
        { id: 6, type: "number", label: "6" },
        { id: "subtraction", type: "calculate", label: "-" },
      ],
      [
        { id: 1, type: "number", label: "1" },
        { id: 2, type: "number", label: "2" },
        { id: 3, type: "number", label: "3" },
        { id: "addition", type: "calculate", label: "+" },
      ],
      [
        { id: 0, type: "number", label: "0" },
        { id: ".", type: "number", label: "." },
        { id: "equal", type: "calculate", label: "=" },
      ],
    ],
  };
  handleClick = (type, id) => {
    switch (type) {
      case "number":
        this.setState(handleNumberClick(this.state, id));
        break;
      case "operation":
        this.setState(handleOperationClick(this.state, id));
        break;
      case "calculate":
        this.setState(handleCalculateClick(this.state, id));
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div className="app">
        <Display display={this.state.display || "0"} />
        <Dashboard
          display={this.state.display}
          dashboard={this.state.dashboard}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default App;
