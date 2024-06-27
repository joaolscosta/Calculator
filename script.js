document.addEventListener('DOMContentLoaded', function() {
  const screen = document.getElementById('screen');
  let currentInput = '';
  let operator = '';
  let previousInput = '';

  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonText = button.innerText;

      if (buttonText === 'C') { // Clear
        currentInput = '';
        previousInput = '';
        operator = '';
        screen.innerText = '0';
      } else if (buttonText === '←') { // Backspace
        currentInput = currentInput.slice(0, -1);
        screen.innerText = currentInput || '0';
      } else if (buttonText === '=') { // Evaluate
        if (previousInput && currentInput && operator) {
          currentInput = evaluate(previousInput, currentInput, operator);
          screen.innerText = currentInput;
          previousInput = '';
          operator = '';
        }
      } else if (['+', '−', '×', '÷'].includes(buttonText)) { // Operator
        if (currentInput) {
          if (previousInput) { // Already have an operator, calculate the result
            currentInput = evaluate(previousInput, currentInput, operator);
            screen.innerText = currentInput;
          }
          // Save the current input as previous input and clear the current input
          operator = buttonText;
          previousInput = currentInput;
          currentInput = '';
        }
      } else {
        if (buttonText === '.' && currentInput.includes('.')) {
          return;
        }
        currentInput += buttonText;
        screen.innerText = currentInput;
      }
    });
  });

  function evaluate(num1, num2, operator) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    switch (operator) {
      case '+':
        return (a + b).toString();
      case '−':
        return (a - b).toString();
      case '×':
        return (a * b).toString();
      case '÷':
        return (a / b).toString();
      default:
        return '0';
    }
  }
});