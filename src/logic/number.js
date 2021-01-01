import { getZerosString, getCurrentExpression } from "./operation";

const handleNumberClickOnZero = (state, num) => {
  const { display, expression } = state;
  const currentExpressionChar = getCurrentExpression(state);
  const currentExpression = expression[currentExpressionChar];
  const { onNegative, zerosAfter } = currentExpression;
  const isDecimal = display.value.includes(".") && !display.onOperation;

  console.log(state);

  if (isDecimal && num === ".")
    if (isDecimal) {
      return {
        display: {
          expression: currentExpressionChar,
          value: `${onNegative ? "-" : ""}0.${getZerosString(
            zerosAfter
          )}${num}`,
          onOperation: false,
        },
        expression: {
          ...expression,
          [currentExpressionChar]: {
            ...currentExpression,
            value: +`${onNegative ? "-" : ""}0.${getZerosString(
              zerosAfter
            )}${num}`,
            zerosAfter: num === 0 ? zerosAfter + 1 : 0,
          },
        },
      };
    }

  if (num === ".") {
    return {
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
    };
  }

  if (onNegative) {
    return {
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
    };
  }

  return {
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
  };
};

const handleNumberClick = (state, num) => {
  const { display, expression } = state;
  const currentExpressionChar = getCurrentExpression(state);
  const currentExpression = expression[currentExpressionChar];
  const { value, clearOnNumberClick, zerosAfter } = currentExpression;
  const isDecimal = value % 1 !== 0;
  const gotDecimal = display.value.includes(".");
  const isLastDecimal = display.value[display.value.length - 1] === ".";

  if (!value && value !== 0) {
    return {
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
    };
  }

  if (clearOnNumberClick) {
    return {
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
    };
  }

  if ((isDecimal || gotDecimal) && num === ".") return;

  if (value === 0) return handleNumberClickOnZero(state, num);

  if (isLastDecimal) {
    return {
      display: {
        value: `${value}.${getZerosString(zerosAfter)}${num}`,
        expression: currentExpressionChar,
        onOperation: false,
      },
      expression: {
        ...expression,
        [currentExpressionChar]: {
          ...currentExpression,
          value: +`${value}.${getZerosString(zerosAfter)}${num}`,
          zerosAfter: num === 0 ? zerosAfter + 1 : 0,
        },
      },
    };
  }

  if (!isDecimal && gotDecimal) {
    return {
      display: {
        value: `${value}.${getZerosString(zerosAfter)}${num}`,
        expression: currentExpressionChar,
        onOperation: false,
      },
      expression: {
        ...expression,
        [currentExpressionChar]: {
          ...currentExpression,
          value: +`${value}.${getZerosString(zerosAfter)}${num}`,
          zerosAfter: num === 0 ? zerosAfter + 1 : 0,
        },
      },
    };
  }

  if (isDecimal) {
    return {
      display: {
        value: `${value}${getZerosString(zerosAfter)}${num}`,
        expression: currentExpressionChar,
        onOperation: false,
      },
      expression: {
        ...expression,
        [currentExpressionChar]: {
          ...currentExpression,
          value: +`${value}${getZerosString(zerosAfter)}${num}`,
          zerosAfter: num === 0 ? zerosAfter + 1 : 0,
        },
      },
    };
  }

  return {
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
  };
};

export default handleNumberClick;
