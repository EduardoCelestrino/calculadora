const numberButtons = document.querySelectorAll("[data-number]");
const operationsButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    }

    formatDisplayNumber(number){
        const _stringNumber = number.toString();

        const _integerDigits = parseFloat(_stringNumber.split(".")[0])
        const _decimalsDigits = _stringNumber.split(".")[1]

        let intergerDisplay;

        if (isNaN(_integerDigits)) {
            intergerDisplay = ""
        }
        else {
            intergerDisplay = _integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (_decimalsDigits != null){
            return `${intergerDisplay}.${_decimalsDigits}`
        }
        else{
            return intergerDisplay;
        }
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    calculate(){
        let result;

        const _previousOperandFloat = parseFloat(this.previousOperand)
        const _currentOperandFloat = parseFloat(this.currentOperand)

        if(isNaN(_previousOperandFloat) || isNaN(_currentOperandFloat)) return;

        switch(this.operation){
            case "+":
                result = _previousOperandFloat + _currentOperandFloat;
                break;
            case "-":
                result = _previousOperandFloat - _currentOperandFloat;
                break;
            case "*":
                result = _previousOperandFloat * _currentOperandFloat;
                break;
            case "÷":
                result = _previousOperandFloat / _currentOperandFloat;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    chooseOperation(operation){
        if(this.currentOperand == "") return;
        
        if (this.previousOperand !=''){
            this.calculate()
        }
        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    appendNumber(number){
        if (this.currentOperand.includes('.') && number == '.') return;
       this.currentOperand = `${this.currentOperand}${number.toString()}`;  
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    updateDisplay(){
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation || ''}`
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

// Eventos

for (const numberButton of numberButtons){
    numberButton.addEventListener("click", () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    })
}

for(const operationButton of operationsButtons){
    operationButton.addEventListener("click", () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
}

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();

});