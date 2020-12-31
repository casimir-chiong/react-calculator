import React, { Component } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Display from "../Display/Display";

class App extends Component {
  state = {
    display: {
      value: "0",
      expression: "a",
    },
    expression: {
      a: {
        value: 0,
        zerosAfter: 0,
        onNegative: false,
        onPercentage: false,
      },
      b: {
        value: 0,
        zerosAfter: 0,
        onNegative: false,
        onPercentage: false,
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
  isLengthLimit = (str) => {
    const charArr = [];

    for (let i = 0; i < str.length; i++) {
      const char = str[i];

      if (char !== "." && char !== "-") charArr.push(char);
    }

    return charArr.length >= 9 ? true : false;
  };
  gotDecimal = (str) => {
    return str.includes(".");
  };
  getZerosString = (num) => {
    let str = "";

    for (let i = 0; i < num; i++) str += 0;

    return str;
  };
  handleNumberClickOnZero = (num) => {
    const { display, expression } = this.state;
    const currentExpression = expression[display.expression];
    const { onNegative, zerosAfter } = currentExpression;
    const isDecimal = display.value.includes(".");

    if (isDecimal && num === ".") return;

    if (isDecimal) {
      this.setState({
        display: {
          ...display,
          value: `${onNegative ? "-" : ""}0.${this.getZerosString(
            zerosAfter
          )}${num}`,
        },
        expression: {
          ...expression,
          [display.expression]: {
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
          ...display,
          value: `${onNegative ? "-" : ""}0.`,
        },
        expression: {
          ...expression,
          [display.expression]: {
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
          ...display,
          value: `-${num}`,
        },
        expression: {
          ...expression,
          [display.expression]: {
            ...currentExpression,
            value: +`-${num}`,
          },
        },
      });

      return;
    }

    this.setState({
      display: {
        ...display,
        value: `${num}`,
      },
      expression: {
        ...expression,
        [display.expression]: {
          ...currentExpression,
          value: +`${num}`,
        },
      },
    });
  };
  handleNumberClick = (num) => {
    const { display, expression } = this.state;
    const currentExpression = expression[display.expression];
    const { value, onPercentage, zerosAfter } = currentExpression;
    const isDecimal = value % 1 !== 0;
    const gotDecimal = display.value.includes(".");
    const isLastDecimal = display.value[display.value.length - 1] === ".";

    if (onPercentage) {
      this.setState({
        display: {
          ...display,
          value: `${num}`,
        },
        expression: {
          ...expression,
          [display.expression]: {
            value: `${num}`,
            zerosAfter: 0,
            onNegative: false,
            onPercentage: false,
          },
        },
      });

      return;
    }

    if (this.isLengthLimit(display.value)) return;
    if ((isDecimal || gotDecimal) && num === ".") return;
    if (value === 0) return this.handleNumberClickOnZero(num);

    if (isLastDecimal) {
      this.setState({
        display: {
          ...display,
          value: `${value}.${this.getZerosString(zerosAfter)}${num}`,
        },
        expression: {
          ...expression,
          [display.expression]: {
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
          ...display,
          value: `${value}.${this.getZerosString(zerosAfter)}${num}`,
        },
        expression: {
          ...expression,
          [display.expression]: {
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
          ...display,
          value: `${value}${this.getZerosString(zerosAfter)}${num}`,
        },
        expression: {
          ...expression,
          [display.expression]: {
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
        ...display,
        value: `${value}${num}`,
      },
      expression: {
        ...expression,
        [display.expression]: {
          ...currentExpression,
          value: +`${value}${num}`,
        },
      },
    });
  };
  handleClearClick = () => {
    const { display, expression } = this.state;

    if (expression[display.expression].value) {
      this.setState({
        display: {
          ...display,
          value: "0",
        },
        expression: {
          ...expression,
          [display.expression]: {
            value: 0,
            onNegative: false,
            onPercentage: false,
            zerosAfter: 0,
          },
        },
      });
    } else {
      this.setState({
        display: {
          ...display,
          value: "0",
        },
        expression: {
          ...expression,
          a: {
            value: 0,
            onNegative: false,
            onPercentage: false,
            zerosAfter: 0,
          },
          b: {
            value: 0,
            onNegative: false,
            onPercentage: false,
            zerosAfter: 0,
          },
        },
      });
    }
  };
  handleSwitchClick = () => {
    const { display, expression } = this.state;
    const currentExpression = expression[display.expression];

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
            [display.expression]: {
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
            [display.expression]: {
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
          [display.expression]: {
            ...currentExpression,
            value: currentExpression.value * -1,
          },
        },
      });
    }
  };
  handlePercentageClick = () => {
    const { display, expression } = this.state;
    const currentExpression = expression[display.expression];

    let result = currentExpression.value / 100;
    let resultString = result.toString();

    if (this.isLengthLimit(resultString)) {
      if (resultString.includes("e")) {
        let partOne = "";
        let partTwo = "";

        for (let i = 0; i < resultString.length; i++) {
          const char = resultString[i];

          if (i < 6) partOne += char;
          else if (i > resultString.length - 5) partTwo += char;
        }

        if (partTwo[0] !== "e") partTwo = partTwo.slice(1);

        resultString = partTwo.includes("e")
          ? `${+partOne}${partTwo}`
          : "Error";
      } else {
        resultString = (+result.toFixed(8)).toString();
      }
    }

    this.setState({
      display: {
        ...display,
        value: resultString,
      },
      expression: {
        ...expression,
        [display.expression]: {
          ...currentExpression,
          value: result,
          onPercentage: true,
        },
      },
    });
  };
  handleAddition = (a, b) => a + b;
  handleSubtraction = (a, b) => a - b;
  handleMultiplication = (a, b) => a * b;
  handleDivision = (a, b) => a / b;
  handleOperationClick = (type) => {
    console.log(type);
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
          onOperationClick={this.handleOperationClick}
        />
      </div>
    );
  }
}

export default App;
