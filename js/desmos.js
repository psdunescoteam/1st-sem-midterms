// Desmos Calculator Integration
class DesmosCalculator {
    constructor() {
        this.isVisible = false;
        this.isMinimized = false;
        this.isMaximized = false;
        this.isDragging = false;
        this.calculator = null;
        this.calculatorInstance = null;
        
        // Drag state
        this.dragOffset = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        // Create the UI immediately
        this.createDesmosWidget();
        this.attachEventListeners();
        this.loadPosition();
        
        // Wait for Desmos API to load
        this.waitForDesmos();
    }
    
    waitForDesmos() {
        if (typeof Desmos !== 'undefined') {
            console.log('Desmos API loaded successfully');
        } else {
            console.log('Waiting for Desmos API...');
            setTimeout(() => this.waitForDesmos(), 500);
        }
    }
    
    createDesmosWidget() {
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'desmos-toggle';
        toggleButton.innerHTML = 'f(x)';
        toggleButton.title = 'Open Desmos Calculator';
        document.body.appendChild(toggleButton);
        
        // Create calculator widget
        const calculator = document.createElement('div');
        calculator.className = 'desmos-calculator-widget';
        calculator.innerHTML = `
            <div class="desmos-header">
                <div class="desmos-title">
                    <span>f(x)</span>
                    Desmos Calculator
                </div>
                <div class="desmos-controls">
                    <button class="desmos-btn minimize" title="Minimize">
                        <i class="fas fa-minus"></i>
                    </button>
                    <button class="desmos-btn maximize" title="Maximize">
                        <i class="fas fa-expand"></i>
                    </button>
                    <button class="desmos-btn close" title="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="desmos-body">
                <div class="desmos-loading">Loading Desmos Calculator...</div>
                <div id="desmos-calculator"></div>
            </div>
        `;
        
        document.body.appendChild(calculator);
        
        // Store references
        this.toggleButton = toggleButton;
        this.calculator = calculator;
        this.header = calculator.querySelector('.desmos-header');
        this.loadingElement = calculator.querySelector('.desmos-loading');
        this.calculatorElement = calculator.querySelector('#desmos-calculator');
    }
    
    initializeCalculator() {
        if (this.calculatorInstance) {
            return;
        }
        
        try {
            // Initialize Desmos calculator
            this.calculatorInstance = Desmos.GraphingCalculator(this.calculatorElement, {
                expressions: true,
                settingsMenu: true,
                zoomButtons: true,
                expressionsTopbar: true,
                pointsOfInterest: true,
                trace: true,
                border: false,
                lockViewport: false,
                images: true,
                folders: true,
                notes: true,
                sliders: true,
                links: true,
                distributions: true,
                pasteGraphLink: true,
                pasteTableData: true,
                degreeMode: false,
                projectorMode: false,
                invertedColors: false,
                fontSize: 16,
                language: 'en',
                keypad: true,
                graphpaper: true,
                showGrid: true,
                showXAxis: true,
                showYAxis: true,
                xAxisNumbers: true,
                yAxisNumbers: true,
                polarNumbers: true
            });
            
            // Add some useful calculus functions for the quiz
            this.setupCalculusExpressions();
            
            // Hide loading indicator
            this.loadingElement.style.display = 'none';
            this.calculatorElement.style.display = 'block';
            
            console.log('Desmos calculator initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Desmos calculator:', error);
            this.loadingElement.innerHTML = 'Failed to load calculator. Please refresh the page.';
        }
    }
    
    setupCalculusExpressions() {
        if (!this.calculatorInstance) return;
        
        // Add some helpful calculus expressions as examples
        const expressions = [
            {
                id: 'derivative_example',
                latex: '\\frac{d}{dx}[x^2] = 2x',
                color: '#c74440',
                hidden: true
            },
            {
                id: 'limit_example', 
                latex: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
                color: '#2d70b3',
                hidden: true
            },
            {
                id: 'integral_example',
                latex: '\\int x^2 dx = \\frac{x^3}{3} + C',
                color: '#388c46',
                hidden: true
            }
        ];
        
        expressions.forEach(expr => {
            this.calculatorInstance.setExpression(expr);
        });
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
        
        // Prevent text selection during drag
        this.header.addEventListener('selectstart', (e) => e.preventDefault());
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.calculatorInstance && this.isVisible) {
                setTimeout(() => this.calculatorInstance.resize(), 100);
            }
        });
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
        this.toggleButton.title = 'Close Desmos Calculator';
        this.isVisible = true;
        
        // Initialize calculator if not already done
        if (!this.calculatorInstance) {
            setTimeout(() => this.initializeCalculator(), 300);
        } else {
            // Resize calculator to fit new container
            setTimeout(() => this.calculatorInstance.resize(), 300);
        }
    }
    
    hide() {
        this.calculator.classList.remove('show');
        this.toggleButton.classList.remove('active');
        this.toggleButton.innerHTML = 'f(x)';
        this.toggleButton.title = 'Open Desmos Calculator';
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
        
        if (!this.isMinimized && this.calculatorInstance) {
            setTimeout(() => this.calculatorInstance.resize(), 100);
        }
    }
    
    maximize() {
        this.isMaximized = !this.isMaximized;
        this.calculator.classList.toggle('maximized');
        const icon = this.calculator.querySelector('.maximize i');
        icon.className = this.isMaximized ? 'fas fa-compress' : 'fas fa-expand';
        
        if (this.calculatorInstance) {
            setTimeout(() => this.calculatorInstance.resize(), 100);
        }
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
            
            // Resize calculator after drag
            if (this.calculatorInstance) {
                setTimeout(() => this.calculatorInstance.resize(), 100);
            }
        }
    }
    
    savePosition() {
        const rect = this.calculator.getBoundingClientRect();
        localStorage.setItem('desmosPosition', JSON.stringify({
            left: rect.left,
            top: rect.top
        }));
    }
    
    loadPosition() {
        const savedPosition = localStorage.getItem('desmosPosition');
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
    
    // Public methods for quiz integration
    setExpression(latex) {
        if (this.calculatorInstance) {
            this.calculatorInstance.setExpression({
                id: 'quiz_expression_' + Date.now(),
                latex: latex
            });
        }
    }
    
    clearExpressions() {
        if (this.calculatorInstance) {
            this.calculatorInstance.setBlank();
        }
    }
    
    getState() {
        if (this.calculatorInstance) {
            return this.calculatorInstance.getState();
        }
        return null;
    }
}

// Initialize Desmos calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Desmos calculator...');
    
    // Initialize immediately - don't wait for specific page detection
    window.desmosCalculator = new DesmosCalculator();
    
    // Add keyboard shortcut to toggle calculator
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            if (window.desmosCalculator) {
                window.desmosCalculator.toggle();
            }
        }
    });
    
    console.log('Desmos calculator widget initialized');
});

// Also try to initialize when window loads as backup
window.addEventListener('load', () => {
    if (!window.desmosCalculator) {
        console.log('Backup initialization for Desmos calculator...');
        window.desmosCalculator = new DesmosCalculator();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DesmosCalculator;
}