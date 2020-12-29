import React, { Component } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Display from "../Display/Display";

class App extends Component {
  state = {
    display: "0",
    expression: {
      a: 0,
      b: null,
    },
    dashboard: [
      [
        { id: "clear", type: "other", label: "AC" },
        { id: "switch", type: "other", label: "+/-" },
        { id: "percentage", type: "other", label: "%" },
        { id: "division", type: "operation", label: "÷" },
      ],
      [
        { id: "7", type: "number", label: "7" },
        { id: "8", type: "number", label: "8" },
        { id: "9", type: "number", label: "9" },
        { id: "multiplication", type: "operation", label: "x" },
      ],
      [
        { id: "4", type: "number", label: "4" },
        { id: "5", type: "number", label: "5" },
        { id: "6", type: "number", label: "6" },
        { id: "subtraction", type: "operation", label: "-" },
      ],
      [
        { id: "1", type: "number", label: "1" },
        { id: "2", type: "number", label: "2" },
        { id: "3", type: "number", label: "3" },
        { id: "addition", type: "operation", label: "+" },
      ],
      [
        { id: "0", type: "number", label: "0" },
        { id: ".", type: "number", label: "." },
        { id: "equal", type: "operation", label: "=" },
      ],
    ],
  };
  getDisplayExpression = () => {
    const displayExpression = this.state.expression.b ? "b" : "a";

    return {
      displayExpression,
      valueOfDisplayExpression: this.state.expression[displayExpression],
    };
  };
  isLengthLimit = () => {
    const { valueOfDisplayExpression: value } = this.getDisplayExpression();
    const arr = [];

    for (let i = 0; i < value.toString().length; i++) {
      if (value[i] !== "-" && value[i] !== ".") {
        arr.push(value[i]);
      }
    }

    return arr.length < 9 ? true : false;
  };
  handleNumberClick = (num) => {
    const {
      displayExpression,
      valueOfDisplayExpression: value,
    } = this.getDisplayExpression();

    let result;

    switch (value) {
      case 0:
        result = +num;
        break;
      case -0:
        result = +`-${num}`;
        break;
      default:
        if (this.isLengthLimit()) {
          result = +`${value}${num}`;
        } else result = value;
        break;
    }

    this.setClickState(displayExpression, result);
  };
  handleClearClick = () => {
    const { displayExpression } = this.getDisplayExpression();

    this.setClickState(displayExpression, 0);
  };
  handleSwitchClick = () => {
    const { display } = this.state;
    const { displayExpression } = this.getDisplayExpression();
    let result;

    if (display[0] !== "-") {
      result = parseInt(`-${display}`);
    } else {
      result = parseInt(display.slice(1, display.toString().length));
    }

    this.setClickState(displayExpression, result);
  };
  handlePercentageClick = () => {
    const {
      displayExpression,
      valueOfDisplayExpression: value,
    } = this.getDisplayExpression();
    let result = (value / 100).toString();
    let e;

    for (let i = 0; i < result.length; i++) {
      if (result[i] === "e") {
        e = true;
        break;
      }
    }

    e = e ? true : false;

    console.log(e, result);

    result = result.slice(0, 9);

    this.setClickState(displayExpression, result);
  };
  setClickState = (displayExpression, result) => {
    this.setState(({ expression }) => ({
      display: result.toString(),
      expression: {
        ...expression,
        [displayExpression]: result,
      },
    }));
  };
  renderDisplay = () => {
    const { a, b } = this.state.expression;
    this.setState({ display: b || a });
  };
  render() {
    return (
      <div className="app">
        <Display display={this.state.display || "0"} />
        <Dashboard
          display={this.state.display}
          dashboard={this.state.dashboard}
          onNumberClick={this.handleNumberClick}
          onClearClick={this.handleClearClick}
          onSwitchClick={this.handleSwitchClick}
          onPercentageClick={this.handlePercentageClick}
        />
      </div>
    );
  }
}

export default App;
