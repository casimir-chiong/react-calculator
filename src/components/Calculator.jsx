import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Display from "./Display";
import operate from "../logic";

class Calculator extends Component {
  state = {
    next: null,
    isNextAfterOperation: false,
    total: null,
    operation: null,
  };

  handleClick = (id) => {
    this.setState(operate(this.state, id));
  };

  render() {
    const { next, total, operation } = this.state;
    const displayText = operation && !next ? total : next;

    return (
      <div className="app">
        <Display text={displayText || "0"} />
        <Dashboard display={this.state.next} onClick={this.handleClick} />
      </div>
    );
  }
}

export default Calculator;
