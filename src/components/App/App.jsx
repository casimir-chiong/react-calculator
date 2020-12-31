import React, { Component } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Display from "../Display/Display";

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
        { id: "clear", type: "other", label: "AC" },
        { id: "switch", type: "other", label: "+/-" },
        { id: "percentage", type: "other", label: "%" },
        { id: "division", type: "operation", label: "÷" },
      ],
      [
        { id: 7, type: "number", label: "7" },
        { id: 8, type: "number", label: "8" },
        { id: 9, type: "number", label: "9" },
        { id: "multiplication", type: "operation", label: "x" },
      ],
      [
        { id: 4, type: "number", label: "4" },
        { id: 5, type: "number", label: "5" },
        { id: 6, type: "number", label: "6" },
        { id: "subtraction", type: "operation", label: "-" },
      ],
      [
        { id: 1, type: "number", label: "1" },
        { id: 2, type: "number", label: "2" },
        { id: 3, type: "number", label: "3" },
        { id: "addition", type: "operation", label: "+" },
      ],
      [
        { id: 0, type: "number", label: "0" },
        { id: ".", type: "number", label: "." },
        { id: "equal", type: "operation", label: "=" },
      ],
    ],
  };
  gotDecimal = (str) => {
    return str.includes(".");
  };
  getZerosString = (num) => {
    let str = "";

    for (let i = 0; i < num; i++) str += 0;

    return str;
  };
  getCurrentExpression = () => {
    const { expression, onOperation } = this.state.display;

    if (onOperation) {
      if (expression === "a") return "b";
      if (expression === "b") return "a";
    } else return expression;
  };
  handleNumberClickOnZero = (num) => {
    const { display, expression } = this.state;
    const currentExpressionChar = this.getCurrentExpression();
    const currentExpression = expression[currentExpressionChar];
    const { onNegative, zerosAfter } = currentExpression;
    const isDecimal = display.value.includes(".") && !display.onOperation;

    if (isDecimal && num === ".") return;

    if (isDecimal) {
      this.setState({
        display: {
          expression: currentExpressionChar,
          value: `${onNegative ? "-" : ""}0.${this.getZerosString(
            zerosAfter
          )}${num}`,
          onOperation: false,
        },
        expression: {
          ...expression,
          [currentExpressionChar]: {
            ...currentExpression,
            value: +`${onNegative ? "-" : ""}0.${this.getZerosString(
              zerosAfter
            )}${num}`,
            zerosAfter: num === 0 ? zerosAfter + 1 : 0,
          },
        },
      });

      return;
    }

    if (num === ".") {
      this.setState({
        display: {
          expression: currentExpressionChar,
          value: `${onNegative ? "-" : ""}0.`,
          onOperation: false,
        },
        expression: {
          ...expression,
          [currentExpressionChar]: {
            ...currentExpression,
            value: 0,
          },
        },
      });

      return;
    }

    if (onNegative) {
      this.setState({
        display: {
          expression: currentExpressionChar,
          value: `-${num}`,
          onOperation: false,
        },
        expression: {
          ...expression,
          [currentExpressionChar]: {
            ...currentExpression,
            value: +`-${num}`,
          },
        },
      });

      return;
    }

    this.setState({
      display: {
        expression: currentExpressionChar,
        value: `${num}`,
        onOperation: false,
      },
      expression: {
        ...expression,
        [currentExpressionChar]: {
          ...currentExpression,
          value: +`${num}`,
        },
      },
    });
  };
  handleNumberClick = (num) => {
    const { display, expression } = this.state;
    const currentExpressionChar = this.getCurrentExpression();
    const currentExpression = expression[currentExpressionChar];
    const { value, clearOnNumberClick, zerosAfter } = currentExpression;
    const isDecimal = value % 1 !== 0;
    const gotDecimal = display.value.includes(".");
    const isLastDecimal = display.value[display.value.length - 1] === ".";

    if (!value && value !== 0) {
      this.setState({
        display: {
          value: `Error`,
          expression: currentExpressionChar,
          onOperation: false,
        },
        expression: {
          ...expression,
          [currentExpressionChar]: {
            ...currentExpression,
            value,
          },
        },
      });

      return;
    }

    if (clearOnNumberClick) {
      this.setState({
        display: {
          value: `${num}`,
          expression: currentExpressionChar,
          onOperation: false,
        },
        expression: {
          ...expression,
          [currentExpressionChar]: {
            value: `${num}`,
            zerosAfter: 0,
            onNegative: false,
            clearOnNumberClick: false,
          },
        },
      });

      return;
    }

    if ((isDecimal || gotDecimal) && num === ".") return;
    if (value === 0) return this.handleNumberClickOnZero(num);

    if (isLastDecimal) {
      this.setState({
        display: {
          value: `${value}.${this.getZerosString(zerosAfter)}${num}`,
          expression: currentExpressionChar,
          onOperation: false,
        },
        expression: {
          ...expression,
          [currentExpressionChar]: {
            ...currentExpression,
            value: +`${value}.${this.getZerosString(zerosAfter)}${num}`,
            zerosAfter: num === 0 ? zerosAfter + 1 : 0,
          },
        },
      });

      return;
    }

    if (!isDecimal && gotDecimal) {
      this.setState({
        display: {
          value: `${value}.${this.getZerosString(zerosAfter)}${num}`,
          expression: currentExpressionChar,
          onOperation: false,
        },
        expression: {
          ...expression,
          [currentExpressionChar]: {
            ...currentExpression,
            value: +`${value}.${this.getZerosString(zerosAfter)}${num}`,
            zerosAfter: num === 0 ? zerosAfter + 1 : 0,
          },
        },
      });
      return;
    }

    if (isDecimal) {
      this.setState({
        display: {
          value: `${value}${this.getZerosString(zerosAfter)}${num}`,
          expression: currentExpressionChar,
          onOperation: false,
        },
        expression: {
          ...expression,
          [currentExpressionChar]: {
            ...currentExpression,
            value: +`${value}${this.getZerosString(zerosAfter)}${num}`,
            zerosAfter: num === 0 ? zerosAfter + 1 : 0,
          },
        },
      });

      return;
    }

    this.setState({
      display: {
        value: `${value}${num}`,
        expression: currentExpressionChar,
        onOperation: false,
      },
      expression: {
        ...expression,
        [currentExpressionChar]: {
          ...currentExpression,
          value: +`${value}${num}`,
        },
      },
    });
  };
  handleClearClick = () => {
    const { display, expression } = this.state;

    if (expression[this.getCurrentExpression()].value) {
      this.setState({
        display: {
          ...display,
          value: "0",
        },
        expression: {
          ...expression,
          [this.getCurrentExpression()]: {
            value: 0,
            onNegative: false,
            clearOnNumberClick: false,
            zerosAfter: 0,
          },
        },
      });
    } else {
      this.setState({
        display: {
          expression: "a",
          value: "0",
          onOperation: false,
        },
        expression: {
          ...expression,
          a: {
            value: 0,
            onNegative: false,
            clearOnNumberClick: false,
            zerosAfter: 0,
          },
          b: {
            value: 0,
            onNegative: false,
            clearOnNumberClick: false,
            zerosAfter: 0,
          },
        },
      });
    }
  };
  handleSwitchClick = () => {
    const { display, expression } = this.state;
    const currentExpression = expression[this.getCurrentExpression()];

    if (currentExpression.value === 0) {
      let displayValue;

      displayValue = currentExpression.onNegative ? "0" : "-0";

      if (currentExpression.onDecimal) {
        this.setState({
          display: {
            ...display,
            value: `${displayValue}.`,
          },
          expression: {
            ...expression,
            [this.getCurrentExpression()]: {
              ...currentExpression,
              onNegative: !currentExpression.onNegative,
            },
          },
        });
      } else {
        this.setState({
          display: {
            ...display,
            value: displayValue,
          },
          expression: {
            ...expression,
            [this.getCurrentExpression()]: {
              ...currentExpression,
              onNegative: !currentExpression.onNegative,
            },
          },
        });
      }
    } else {
      this.setState({
        display: {
          ...display,
          value: `${currentExpression.value * -1}`,
        },
        expression: {
          ...expression,
          [this.getCurrentExpression()]: {
            ...currentExpression,
            value: currentExpression.value * -1,
          },
        },
      });
    }
  };
  handlePercentageClick = () => {
    const { display, expression } = this.state;
    const currentExpression = expression[this.getCurrentExpression()];

    let result = currentExpression.value / 100;
    let resultString = result.toString();

    this.setState({
      display: {
        ...display,
        value: resultString,
      },
      expression: {
        ...expression,
        [this.getCurrentExpression()]: {
          ...currentExpression,
          value: result,
          clearOnNumberClick: true,
        },
      },
    });
  };
  handleOperationClick = (type) => {
    const { display, expression } = this.state;
    const { a, b, operation } = expression;

    if (operation && b.value) {
      let result = this.getAnswer(operation, a.value, b.value);
      let resultString = result.toString();

      this.setState({
        display: {
          ...display,
          value: resultString,
          onOperation: type !== "equal",
          expression: "a",
        },
        expression: {
          ...expression,
          a: {
            onNegative: false,
            clearOnNumberClick: true,
            value: result,
            zerosAfter: 0,
          },
          b: {
            onNegative: false,
            clearOnNumberClick: false,
            value: 0,
            zerosAfter: 0,
          },
          operation: type !== "equal" ? type : undefined,
        },
      });
    } else {
      this.setState({
        display: {
          ...display,
          onOperation: type !== "equal",
        },
        expression: {
          ...expression,
          operation: type !== "equal" ? type : undefined,
        },
      });
    }
  };
  getAnswer = (operation, a, b) => {
    switch (operation) {
      case "addition":
        return this.getAddition(a, b);
      case "subtraction":
        return this.getSubtraction(a, b);
      case "multiplication":
        return this.getMultiplication(a, b);
      case "division":
        return this.getDivision(a, b);
      default:
        break;
    }
  };
  getAddition = (a, b) => a + b;
  getSubtraction = (a, b) => a - b;
  getMultiplication = (a, b) => a * b;
  getDivision = (a, b) => a / b;
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
          onOperationClick={this.handleOperationClick}
          onPercentageClick={this.handlePercentageClick}
        />
      </div>
    );
  }
}

export default App;
