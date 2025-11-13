// --- Operations Map ---
const ops = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => b === 0 ? NaN : a / b
};

// --- Helper to update calculator display ---
const updateDisplay = (value) => {
    const display = document.getElementById("display");
    if (display) display.textContent = value;
};

// --- Calculator Factory Function ---
function createCalculator() {
    return {
        current: "0",
        operand: null,
        operator: null,
        history: [],

        // Handles number or decimal input
        inputDigit(d) {
            if (d === "." && this.current.includes(".")) return;
            if (this.current === "0" && d !== ".") {
                this.current = d;
            } else {
                this.current += d;
            }
            updateDisplay(this.current);
        },

        // Handles operator input (+, -, *, /)
        chooseOperator(op) {
            if (this.operator && this.operand !== null) {
                this.evaluate();
            }
            this.operator = op;
            this.operand = parseFloat(this.current);
            this.current = "0";
        },

        // Performs calculation
        evaluate() {
            if (this.operator === null || this.operand === null) return;

            const a = this.operand;
            const b = parseFloat(this.current);
            const fn = ops[this.operator];

            const result = fn(a, b);
            if (isNaN(result)) {
                updateDisplay("Cannot divide by zero");
                this.current = "0";
                return;
            }

            const expression = `${a} ${this.operator} ${b} = ${result}`;
            this.history.unshift(expression);
            if (this.history.length > 10) this.history.pop();

            this.current = String(result);
            this.operator = null;
            this.operand = null;
            updateDisplay(this.current);

            // Optionally, log history to console
            console.log("History:", this.history);
        },

        // Clears current input only
        clear() {
            this.current = "0";
            updateDisplay(this.current);
        },

        // Clears everything
        allClear() {
            Object.assign(this, createCalculator());
            updateDisplay("0");
        },

        // Deletes last digit
        backspace() {
            if (this.current.length > 1) {
                this.current = this.current.slice(0, -1);
            } else {
                this.current = "0";
            }
            updateDisplay(this.current);
        }
    };
}

// --- Initialize Calculator ---
const calc = createCalculator();

// --- Button Event Listeners ---
document.querySelectorAll("button[data-digit]").forEach(btn =>
    btn.addEventListener("click", () => calc.inputDigit(btn.dataset.digit))
);

document.querySelectorAll("button[data-op]").forEach(btn =>
    btn.addEventListener("click", () => calc.chooseOperator(btn.dataset.op))
);

document.getElementById("equals").addEventListener("click", () => calc.evaluate());
document.getElementById("c").addEventListener("click", () => calc.clear());
document.getElementById("ac").addEventListener("click", () => calc.allClear());
document.getElementById("back").addEventListener("click", () => calc.backspace());

// --- Keyboard Support ---
document.addEventListener("keydown", (e) => {
    const { key } = e;
    if (!isNaN(key)) calc.inputDigit(key);
    else if (key === ".") calc.inputDigit(".");
    else if (["+", "-", "*", "/"].includes(key)) calc.chooseOperator(key);
    else if (key === "Enter" || key === "=") calc.evaluate();
    else if (key === "Backspace") calc.backspace();
    else if (key.toUpperCase() === "C") calc.clear();
});









// const ops = {
//     "+": (a, b) => a + b,
//     "-": (a, b) => a - b,
//     "*": (a, b) => a * b,
//     "/": (a, b) => b === 0 ? NaN : a / b
// };
//
//
// function updateDisplay(value) {
//     const display = document.getElementById("display");
//     if (display) display.textContent = value;
// }
//
// function createCalculator() {
//     return {
//         current: "0",
//         operand: null,
//         operator: null,
//         history: [],
//         inputDigit(d) {
//             if (d === "." && this.current.includes(".")) return; // не допускаем двойную точку
//
//             // если текущее значение "0", заменяем его
//             if (this.current === "0" && d !== ".") {
//                 this.current = d;
//             } else {
//                 this.current += d;
//             }
//
//             updateDisplay(this.current);
//         },
//         chooseOperator(op) { /* добавим позже */ },
//         evaluate() { /* добавим позже */ },
//         clear() { this.current = "0"; },
//         allClear() { Object.assign(this, createCalculator()); }
//     };
// }
// const calc = createCalculator();
// document.querySelectorAll("button[data-digit]").forEach(btn => {
//     btn.addEventListener("click", () => calc.inputDigit(btn.dataset.digit));
// });
//
//
