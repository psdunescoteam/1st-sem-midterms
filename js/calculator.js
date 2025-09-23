// Floating Calculator System
class FloatingCalculator {
    constructor() {
        this.isVisible = false;
        this.isMinimized = false;
        this.isMaximized = false;
        this.isDragging = false;
        this.currentExpression = '';
        this.currentResult = '0';
        this.lastResult = null;
        this.memory = 0;
        
        // Drag state
        this.dragOffset = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.createCalculator();
        this.attachEventListeners();
        this.loadPosition();
    }
    
    createCalculator() {
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'calculator-toggle';
        toggleButton.innerHTML = '<i class="fas fa-calculator"></i>';
        toggleButton.title = 'Open Calculator';
        document.body.appendChild(toggleButton);
        
        // Create calculator widget
        const calculator = document.createElement('div');
        calculator.className = 'calculator-widget';
        calculator.innerHTML = `
            <div class="calculator-header">
                <div class="calculator-title">
                    <i class="fas fa-calculator"></i>
                    Scientific Calculator
                </div>
                <div class="calculator-controls">
                    <button class="calculator-btn minimize" title="Minimize">
                        <i class="fas fa-minus"></i>
                    </button>
                    <button class="calculator-btn maximize" title="Maximize">
                        <i class="fas fa-expand"></i>
                    </button>
                    <button class="calculator-btn close" title="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="calculator-body">
                <div class="calculator-display">
                    <div class="calculator-expression" id="calc-expression"></div>
                    <div class="calculator-result" id="calc-result">0</div>
                </div>
                <div class="scientific-panel">
                    <button class="sci-btn" data-action="function" data-value="sin">sin</button>
                    <button class="sci-btn" data-action="function" data-value="cos">cos</button>
                    <button class="sci-btn" data-action="function" data-value="tan">tan</button>
                    <button class="sci-btn" data-action="function" data-value="log">log</button>
                    <button class="sci-btn" data-action="function" data-value="ln">ln</button>
                    <button class="sci-btn" data-action="function" data-value="sqrt">√</button>
                    <button class="sci-btn" data-action="operator" data-value="^">x²</button>
                    <button class="sci-btn" data-action="operator" data-value="^">xʸ</button>
                    <button class="sci-btn" data-action="constant" data-value="π">π</button>
                    <button class="sci-btn" data-action="constant" data-value="e">e</button>
                </div>
                <div class="calculator-buttons">
                    <button class="calc-btn clear" data-action="clear">C</button>
                    <button class="calc-btn clear" data-action="clear-entry">CE</button>
                    <button class="calc-btn operator" data-action="operator" data-value="%">%</button>
                    <button class="calc-btn operator" data-action="operator" data-value="/">÷</button>
                    
                    <button class="calc-btn" data-action="number" data-value="7">7</button>
                    <button class="calc-btn" data-action="number" data-value="8">8</button>
                    <button class="calc-btn" data-action="number" data-value="9">9</button>
                    <button class="calc-btn operator" data-action="operator" data-value="*">×</button>
                    
                    <button class="calc-btn" data-action="number" data-value="4">4</button>
                    <button class="calc-btn" data-action="number" data-value="5">5</button>
                    <button class="calc-btn" data-action="number" data-value="6">6</button>
                    <button class="calc-btn operator" data-action="operator" data-value="-">−</button>
                    
                    <button class="calc-btn" data-action="number" data-value="1">1</button>
                    <button class="calc-btn" data-action="number" data-value="2">2</button>
                    <button class="calc-btn" data-action="number" data-value="3">3</button>
                    <button class="calc-btn operator" data-action="operator" data-value="+">+</button>
                    
                    <button class="calc-btn zero" data-action="number" data-value="0">0</button>
                    <button class="calc-btn" data-action="decimal">.</button>
                    <button class="calc-btn equals" data-action="equals">=</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(calculator);
        
        // Store references
        this.toggleButton = toggleButton;
        this.calculator = calculator;
        this.header = calculator.querySelector('.calculator-header');
        this.expressionDisplay = calculator.querySelector('#calc-expression');
        this.resultDisplay = calculator.querySelector('#calc-result');
    }
    
    attachEventListeners() {
        // Toggle button
        this.toggleButton.addEventListener('click', () => this.toggle());
        
        // Window controls
        this.calculator.querySelector('.minimize').addEventListener('click', () => this.minimize());
        this.calculator.querySelector('.maximize').addEventListener('click', () => this.maximize());
        this.calculator.querySelector('.close').addEventListener('click', () => this.hide());
        
        // Dragging
        this.header.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDrag());
        
        // Calculator buttons
        this.calculator.addEventListener('click', (e) => {
            if (e.target.matches('[data-action]')) {
                this.handleButtonClick(e.target);
            }
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (this.isVisible && !this.isMinimized) {
                this.handleKeyboard(e);
            }
        });
        
        // Prevent text selection during drag
        this.header.addEventListener('selectstart', (e) => e.preventDefault());
    }
    
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    show() {
        this.calculator.classList.add('show');
        this.toggleButton.classList.add('active');
        this.toggleButton.innerHTML = '<i class="fas fa-times"></i>';
        this.toggleButton.title = 'Close Calculator';
        this.isVisible = true;
    }
    
    hide() {
        this.calculator.classList.remove('show');
        this.toggleButton.classList.remove('active');
        this.toggleButton.innerHTML = '<i class="fas fa-calculator"></i>';
        this.toggleButton.title = 'Open Calculator';
        this.isVisible = false;
        this.isMinimized = false;
        this.isMaximized = false;
        this.calculator.classList.remove('minimized', 'maximized');
    }
    
    minimize() {
        this.isMinimized = !this.isMinimized;
        this.calculator.classList.toggle('minimized');
        const icon = this.calculator.querySelector('.minimize i');
        icon.className = this.isMinimized ? 'fas fa-window-maximize' : 'fas fa-minus';
    }
    
    maximize() {
        this.isMaximized = !this.isMaximized;
        this.calculator.classList.toggle('maximized');
        const icon = this.calculator.querySelector('.maximize i');
        icon.className = this.isMaximized ? 'fas fa-compress' : 'fas fa-expand';
    }
    
    startDrag(e) {
        if (this.isMaximized) return;
        
        this.isDragging = true;
        const rect = this.calculator.getBoundingClientRect();
        this.dragOffset.x = e.clientX - rect.left;
        this.dragOffset.y = e.clientY - rect.top;
        this.calculator.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
    }
    
    drag(e) {
        if (!this.isDragging || this.isMaximized) return;
        
        const newX = e.clientX - this.dragOffset.x;
        const newY = e.clientY - this.dragOffset.y;
        
        // Constrain to viewport
        const maxX = window.innerWidth - this.calculator.offsetWidth;
        const maxY = window.innerHeight - this.calculator.offsetHeight;
        
        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));
        
        this.calculator.style.left = constrainedX + 'px';
        this.calculator.style.top = constrainedY + 'px';
        this.calculator.style.right = 'auto';
        this.calculator.style.bottom = 'auto';
    }
    
    stopDrag() {
        if (this.isDragging) {
            this.isDragging = false;
            this.calculator.style.cursor = '';
            document.body.style.userSelect = '';
            this.savePosition();
        }
    }
    
    handleButtonClick(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;
        
        switch (action) {
            case 'number':
                this.appendNumber(value);
                break;
            case 'operator':
                this.appendOperator(value);
                break;
            case 'decimal':
                this.appendDecimal();
                break;
            case 'equals':
                this.calculate();
                break;
            case 'clear':
                this.clear();
                break;
            case 'clear-entry':
                this.clearEntry();
                break;
            case 'function':
                this.appendFunction(value);
                break;
            case 'constant':
                this.appendConstant(value);
                break;
        }
        
        this.updateDisplay();
    }
    
    appendNumber(num) {
        if (this.currentResult === '0' || this.lastResult !== null) {
            this.currentResult = num;
            this.lastResult = null;
        } else {
            this.currentResult += num;
        }
    }
    
    appendOperator(op) {
        if (this.currentExpression && !this.isLastCharOperator()) {
            this.calculate();
        }
        this.currentExpression = this.currentResult + ' ' + this.formatOperator(op) + ' ';
        this.lastResult = this.currentResult;
    }
    
    appendDecimal() {
        if (!this.currentResult.includes('.')) {
            this.currentResult += '.';
        }
    }
    
    appendFunction(func) {
        this.currentExpression = func + '(' + this.currentResult + ')';
        this.calculate();
    }
    
    appendConstant(constant) {
        const value = constant === 'π' ? Math.PI : Math.E;
        this.currentResult = value.toString();
        this.lastResult = null;
    }
    
    formatOperator(op) {
        const operatorMap = {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷',
            '%': '%',
            '^': '^'
        };
        return operatorMap[op] || op;
    }
    
    isLastCharOperator() {
        return /[+\-×÷%^]\s*$/.test(this.currentExpression);
    }
    
    calculate() {
        try {
            let expression = this.currentExpression + this.currentResult;
            
            // Replace display operators with JavaScript operators
            expression = expression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/π/g, Math.PI)
                .replace(/e/g, Math.E);
            
            // Handle scientific functions
            expression = this.processFunctions(expression);
            
            // Calculate result
            const result = Function('"use strict"; return (' + expression + ')')();
            
            if (isFinite(result)) {
                this.currentResult = this.formatResult(result);
                this.currentExpression = '';
            } else {
                throw new Error('Invalid result');
            }
        } catch (error) {
            this.currentResult = 'Error';
            this.currentExpression = '';
        }
        
        this.lastResult = this.currentResult;
    }
    
    processFunctions(expression) {
        // Handle scientific functions
        expression = expression.replace(/sin\(([^)]+)\)/g, (match, arg) => Math.sin(parseFloat(arg) * Math.PI / 180));
        expression = expression.replace(/cos\(([^)]+)\)/g, (match, arg) => Math.cos(parseFloat(arg) * Math.PI / 180));
        expression = expression.replace(/tan\(([^)]+)\)/g, (match, arg) => Math.tan(parseFloat(arg) * Math.PI / 180));
        expression = expression.replace(/log\(([^)]+)\)/g, (match, arg) => Math.log10(parseFloat(arg)));
        expression = expression.replace(/ln\(([^)]+)\)/g, (match, arg) => Math.log(parseFloat(arg)));
        expression = expression.replace(/sqrt\(([^)]+)\)/g, (match, arg) => Math.sqrt(parseFloat(arg)));
        
        return expression;
    }
    
    formatResult(num) {
        if (Number.isInteger(num) && Math.abs(num) < 1e10) {
            return num.toString();
        }
        
        if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
            return num.toExponential(6);
        }
        
        return parseFloat(num.toFixed(10)).toString();
    }
    
    clear() {
        this.currentExpression = '';
        this.currentResult = '0';
        this.lastResult = null;
    }
    
    clearEntry() {
        this.currentResult = '0';
    }
    
    updateDisplay() {
        this.expressionDisplay.textContent = this.currentExpression;
        this.resultDisplay.textContent = this.currentResult;
    }
    
    handleKeyboard(e) {
        const key = e.key;
        
        // Prevent default behavior for calculator keys
        if (/[0-9+\-*/.=]/.test(key) || key === 'Enter' || key === 'Escape') {
            e.preventDefault();
        }
        
        if (/[0-9]/.test(key)) {
            this.appendNumber(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            this.appendOperator(key);
        } else if (key === '.') {
            this.appendDecimal();
        } else if (key === 'Enter' || key === '=') {
            this.calculate();
        } else if (key === 'Escape') {
            this.clear();
        } else if (key === 'Backspace') {
            if (this.currentResult.length > 1) {
                this.currentResult = this.currentResult.slice(0, -1);
            } else {
                this.currentResult = '0';
            }
        }
        
        this.updateDisplay();
    }
    
    savePosition() {
        const rect = this.calculator.getBoundingClientRect();
        localStorage.setItem('calculatorPosition', JSON.stringify({
            left: rect.left,
            top: rect.top
        }));
    }
    
    loadPosition() {
        const savedPosition = localStorage.getItem('calculatorPosition');
        if (savedPosition) {
            try {
                const position = JSON.parse(savedPosition);
                this.calculator.style.left = position.left + 'px';
                this.calculator.style.top = position.top + 'px';
                this.calculator.style.right = 'auto';
                this.calculator.style.bottom = 'auto';
            } catch (error) {
                // Invalid position data, ignore
            }
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.floatingCalculator = new FloatingCalculator();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FloatingCalculator;
}