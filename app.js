const ops = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => b === 0 ? NaN : a / b
};


function updateDisplay(value) {
    const display = document.getElementById("display");
    if (display) display.textContent = value;
}

function createCalculator() {
    return {
        current: "0",
        operand: null,
        operator: null,
        history: [],
        inputDigit(d) {
            if (d === "." && this.current.includes(".")) return; // не допускаем двойную точку

            // если текущее значение "0", заменяем его
            if (this.current === "0" && d !== ".") {
                this.current = d;
            } else {
                this.current += d;
            }

            updateDisplay(this.current);
        },
        chooseOperator(op) { /* добавим позже */ },
        evaluate() { /* добавим позже */ },
        clear() { this.current = "0"; },
        allClear() { Object.assign(this, createCalculator()); }
    };
}
const calc = createCalculator();
document.querySelectorAll("button[data-digit]").forEach(btn => {
    btn.addEventListener("click", () => calc.inputDigit(btn.dataset.digit));
});


