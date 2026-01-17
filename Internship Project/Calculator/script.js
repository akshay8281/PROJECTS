let expression = document.getElementById("expression");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");
let historyPanel = document.getElementById("historyPanel");
let themeToggleBtn = document.getElementById("themeToggle");

let currentInput = "";
let memory = 0;
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

function blurBtn(btn) {
  setTimeout(() => btn.blur(), 50);
}

/* History */
function toggleHistory() {
  historyPanel.classList.toggle("active");
}

function renderHistory() {
  historyList.innerHTML = "";
  history.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.exp} = ${item.res}`;
    li.onclick = () => {
      currentInput = item.exp;
      expression.innerText = currentInput;
      liveCalculate();
      toggleHistory();
    };
    historyList.appendChild(li);
  });
}
renderHistory();

function clearHistory() {
  history = [];
  localStorage.removeItem("calcHistory");
  renderHistory();
}

/* Calculator */
function append(val) {
  currentInput += val;
  expression.innerText = currentInput;
  liveCalculate();
}

function clearDisplay() {
  currentInput = "";
  expression.innerText = "";
  result.innerText = "0";
}

function liveCalculate() {
  try {
    if (!currentInput || /[+\-*/.]$/.test(currentInput)) {
      result.innerText = "...";
      return;
    }
    result.innerText = eval(currentInput);
  } catch {
    result.innerText = "Error";
  }
}

function calculate() {
  try {
    if (!currentInput || /[+\-*/.]$/.test(currentInput)) {
      result.innerText = "Error";
      return;
    }
    let res = eval(currentInput);
    history.unshift({ exp: currentInput, res });
    localStorage.setItem("calcHistory", JSON.stringify(history));
    renderHistory();
    currentInput = res.toString();
    expression.innerText = "";
    result.innerText = currentInput;
  } catch {
    result.innerText = "Error";
  }
}

function squareRoot() {
  try {
    currentInput = Math.sqrt(eval(currentInput)).toString();
    expression.innerText = "";
    result.innerText = currentInput;
  } catch {
    result.innerText = "Error";
  }
}

/* Memory */
function memoryAdd() {
  memory += Number(result.innerText || 0);
}
function memorySubtract() {
  memory -= Number(result.innerText || 0);
}
function memoryRecall() {
  currentInput = memory.toString();
  expression.innerText = currentInput;
  liveCalculate();
}
function memoryClear() {
  memory = 0;
}

/* Keyboard */
document.addEventListener("keydown", (e) => {
  if ("0123456789+-*/.".includes(e.key)) append(e.key);
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    expression.innerText = currentInput;
    liveCalculate();
  }
});

/* Theme */
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeToggleBtn.textContent = document.body.classList.contains("dark-theme")
    ? "🌙"
    : "☀️";
});
