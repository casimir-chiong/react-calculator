const getAddition = (a, b) => a + b;
const getSubtraction = (a, b) => a - b;
const getMultiplication = (a, b) => a * b;
const getDivision = (a, b) => {
  return b === 0 ? "Error" : a / b;
};
const getAnswer = (operation, a, b) => {
  switch (operation) {
    case "addition":
      return getAddition(a, b);
    case "subtraction":
      return getSubtraction(a, b);
    case "multiplication":
      return getMultiplication(a, b);
    case "division":
      return getDivision(a, b);
    default:
      break;
  }
};

const handleCalculateClick = (state, type) => {
  const { display, expression } = state;
  const { a, b, operation } = expression;

  if (operation && b.value) {
    let result = getAnswer(operation, a.value, b.value);
    let resultString = result.toString();

    return {
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
    };
  } else {
    return {
      display: {
        ...display,
        onOperation: type !== "equal",
      },
      expression: {
        ...expression,
        operation: type !== "equal" ? type : undefined,
      },
    };
  }
};

export default handleCalculateClick;
