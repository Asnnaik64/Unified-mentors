// Initialize the current display value
let currentDisplay = "";

// Memory variable
let memoryValue = 0;

// Clear the display and reset the value
function clearDisplay() {
  currentDisplay = "";
  document.querySelector("#display").value = currentDisplay;
}

// Append value to the current display
function appendValue(value) {
  currentDisplay += value;
  document.querySelector("#display").value = currentDisplay;
}

// Evaluate the current expression and display the result
function calculateResult() {
  try {
    currentDisplay = eval(currentDisplay).toString();
    document.querySelector("#display").value = currentDisplay;
  } catch (error) {
    document.querySelector("#display").value = "Error";
    currentDisplay = "";
  }
}

// Calculate the square root of the current value
function calculateSquareRoot() {
  try {
    currentDisplay = Math.sqrt(eval(currentDisplay)).toString();
    document.querySelector("#display").value = currentDisplay;
  } catch (error) {
    document.querySelector("#display").value = "Error";
    currentDisplay = "";
  }
}

// Calculate percentage
function calculatePercentage() {
  try {
    currentDisplay = (eval(currentDisplay) / 100).toString();
    document.querySelector("#display").value = currentDisplay;
  } catch (error) {
    document.querySelector("#display").value = "Error";
    currentDisplay = "";
  }
}

// Memory functions
function memoryStore() {
  memoryValue = parseFloat(document.querySelector("#display").value) || 0;
}

function memorySubtract() {
  memoryValue -= parseFloat(document.querySelector("#display").value) || 0;
}

function memoryRecall() {
  currentDisplay = memoryValue.toString();
  document.querySelector("#display").value = currentDisplay;
}

function memoryClear() {
  memoryValue = 0;
}

// Handle keyboard inputs
document.addEventListener("keydown", function (event) {
  const key = event.key;
  if ("0123456789+-*/.".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === "Backspace") {
    currentDisplay = currentDisplay.slice(0, -1);
    document.querySelector("#display").value = currentDisplay;
  }
});
