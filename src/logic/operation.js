export const getZerosString = (num) => {
  let str = "";

  for (let i = 0; i < num; i++) str += 0;

  return str;
};

export const getCurrentExpression = (state) => {
  console.log(state.display);

  const { expression, onOperation } = state.display;

  if (onOperation) {
    if (expression === "a") return "b";
    if (expression === "b") return "a";
  } else return expression;
};

const handleClearClick = (state) => {
  const { display, expression } = state;

  if (expression[getCurrentExpression(state)].value) {
    return {
      display: {
        ...display,
        value: "0",
      },
      expression: {
        ...expression,
        [getCurrentExpression(state)]: {
          value: 0,
          onNegative: false,
          clearOnNumberClick: false,
          zerosAfter: 0,
        },
      },
    };
  } else {
    return {
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
    };
  }
};

const handleSwitchClick = (state) => {
  const { display, expression } = state;
  const currentExpression = expression[getCurrentExpression(state)];

  if (currentExpression.value === 0) {
    let displayValue;

    displayValue = currentExpression.onNegative ? "0" : "-0";

    if (currentExpression.onDecimal) {
      return {
        display: {
          ...display,
          value: `${displayValue}.`,
        },
        expression: {
          ...expression,
          [getCurrentExpression(state)]: {
            ...currentExpression,
            onNegative: !currentExpression.onNegative,
          },
        },
      };
    } else {
      return {
        display: {
          ...display,
          value: displayValue,
        },
        expression: {
          ...expression,
          [getCurrentExpression(state)]: {
            ...currentExpression,
            onNegative: !currentExpression.onNegative,
          },
        },
      };
    }
  } else {
    return {
      display: {
        ...display,
        value: `${currentExpression.value * -1}`,
      },
      expression: {
        ...expression,
        [getCurrentExpression(state)]: {
          ...currentExpression,
          value: currentExpression.value * -1,
        },
      },
    };
  }
};

const handlePercentageClick = (state) => {
  const { display, expression } = state;
  const currentExpression = expression[getCurrentExpression(state)];

  let result = currentExpression.value / 100;
  let resultString = result.toString();

  return {
    display: {
      ...display,
      value: resultString,
    },
    expression: {
      ...expression,
      [getCurrentExpression(state)]: {
        ...currentExpression,
        value: result,
        clearOnNumberClick: true,
      },
    },
  };
};

const handleOperationClick = (state, type) => {
  switch (type) {
    case "clear":
      return handleClearClick(state);
    case "switch":
      return handleSwitchClick(state);
    case "percentage":
      return handlePercentageClick(state);
    default:
      return state;
  }
};

export default handleOperationClick;
