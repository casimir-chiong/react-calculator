const isNumber = (str) => {
  return /[0-9]/.test(str);
};

const calculate = (next, total, operation, id = "") => {
  if (id === "%") return (parseFloat(next || total) / 100).toString();

  const a = parseFloat(total);
  const b = parseFloat(next);

  switch (operation) {
    case "+":
      return (a + b).toString();
    case "-":
      return (a - b).toString();
    case "x":
      return (a * b).toString();
    case "÷":
      return (a / b).toString();
    default:
      break;
  }
};

const operate = ({ next, isNextAfterOperation, total, operation }, id) => {
  if (isNumber(id)) {
    if (!next || isNextAfterOperation)
      return { next: id, isNextAfterOperation: false };

    if (next === "-0") return { next: `-${id}` };

    return { next: next + id };
  }

  let result;

  switch (id) {
    case "clear":
      if (next) return { next: null, isNextAfterOperation: false };

      return {
        next: null,
        total: null,
        operation: null,
        isNextAfterOperation: false,
      };
    case "+/-":
      if (!next) return { next: "-0" };

      if (next[0] === "-") return { next: next.slice(1) };

      return { next: `-${next}` };
    case ".":
      if (!next || isNextAfterOperation) return { next: "0." };

      if (next.includes(".")) return;

      return { next: next + id };
    case "%":
      if (!next || next === "-0" || next === "0." || next === "-0.") return;

      return {
        next: calculate(next, total, operation, id),
        isNextAfterOperation: true,
      };
    case "=":
      if (!operation || !next) return;

      result = calculate(next, total, operation);

      return {
        next: result,
        isNextAfterOperation: true,
        total: null,
        operation: null,
      };
    default:
      result = operation ? calculate(next, total, operation) : null;

      return {
        next: result,
        isNextAfterOperation: false,
        total: next,
        operation: id,
      };
  }
};

export default operate;
