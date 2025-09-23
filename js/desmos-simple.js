// Advanced Desmos Calculator Integration with drag, resize, minimize, maximize
console.log('Desmos script loading...');

// State variables
let isMinimized = false;
let isMaximized = false;
let isDragging = false;
let isResizing = false;
let dragOffset = { x: 0, y: 0 };
let originalSize = { width: 620, height: 450 };
let originalPosition = { top: 80, right: 20 };

// Create the calculator toggle button
function createCalculatorButton() {
    console.log('Creating calculator button...');
    
    const existingButton = document.querySelector('.desmos-toggle');
    if (existingButton) {
        existingButton.remove();
    }
    
    const toggleButton = document.createElement('button');
    toggleButton.className = 'desmos-toggle';
    toggleButton.innerHTML = 'f(x)';
    toggleButton.title = 'Open Desmos Calculator';
    toggleButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 65px;
        height: 65px;
        background: linear-gradient(135deg, #2F7ED8 0%, #1B4F91 100%);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(47, 126, 216, 0.4);
        z-index: 99999;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(toggleButton);
    
    toggleButton.addEventListener('click', () => {
        console.log('Calculator button clicked!');
        showCalculator();
    });
    
    return toggleButton;
}

// Create the calculator widget with all controls
function createCalculatorWidget() {
    console.log('Creating calculator widget...');
    
    const existingWidget = document.querySelector('.desmos-calculator-widget');
    if (existingWidget) {
        existingWidget.remove();
    }
    
    const calculator = document.createElement('div');
    calculator.className = 'desmos-calculator-widget';
    calculator.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        width: 620px;
        height: 450px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        border: 1px solid #e1e5e9;
        z-index: 99998;
        overflow: hidden;
        display: none;
        resize: horizontal;
        min-width: 400px;
        max-width: 95vw;
    `;
    
    calculator.innerHTML = `
        <div class="desmos-header" style="background: linear-gradient(135deg, #2F7ED8 0%, #1B4F91 100%); color: white; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; cursor: move; user-select: none;">
            <div style="font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 8px;">
                <span>f(x)</span> Desmos Calculator
                <div style="width: 20px; height: 3px; background: rgba(255,255,255,0.4); border-radius: 2px; margin-left: 10px;"></div>
            </div>
            <div class="desmos-controls" style="display: flex; gap: 6px;">
                <button class="minimize-btn" title="Minimize" style="background: rgba(255, 255, 255, 0.2); border: none; color: white; width: 28px; height: 28px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                    <i class="fas fa-minus"></i>
                </button>
                <button class="maximize-btn" title="Maximize" style="background: rgba(255, 255, 255, 0.2); border: none; color: white; width: 28px; height: 28px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                    <i class="fas fa-expand"></i>
                </button>
                <button class="close-btn" title="Close" style="background: rgba(255, 255, 255, 0.2); border: none; color: white; width: 28px; height: 28px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <div class="desmos-body" style="height: calc(100% - 50px); position: relative;">
            <div id="calculator" style="width: 100%; height: 100%;"></div>
        </div>
        <div class="resize-handle" style="position: absolute; bottom: 10px; right: 0; width: 20px; height: 40px; cursor: ew-resize; background: linear-gradient(to right, transparent 40%, #ccc 50%, transparent 60%); opacity: 0.7;"></div>
    `;
    
    document.body.appendChild(calculator);
    
    // Add event listeners for all controls
    setupCalculatorControls(calculator);
    
    return calculator;
}

// Setup all calculator controls (drag, resize, minimize, etc.)
function setupCalculatorControls(calculator) {
    const header = calculator.querySelector('.desmos-header');
    const minimizeBtn = calculator.querySelector('.minimize-btn');
    const maximizeBtn = calculator.querySelector('.maximize-btn');
    const closeBtn = calculator.querySelector('.close-btn');
    const resizeHandle = calculator.querySelector('.resize-handle');
    const body = calculator.querySelector('.desmos-body');
    
    // Drag functionality
    header.addEventListener('mousedown', startDrag);
    
    // Window controls
    minimizeBtn.addEventListener('click', toggleMinimize);
    maximizeBtn.addEventListener('click', toggleMaximize);
    closeBtn.addEventListener('click', hideCalculator);
    
    // Resize functionality
    resizeHandle.addEventListener('mousedown', startResize);
    
    // Global mouse events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    function startDrag(e) {
        if (isMaximized) return;
        
        isDragging = true;
        const rect = calculator.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
        calculator.style.cursor = 'grabbing';
        header.style.cursor = 'grabbing';
        e.preventDefault();
    }
    
    function startResize(e) {
        if (isMaximized || isMinimized) return;
        
        isResizing = true;
        e.preventDefault();
        e.stopPropagation();
    }
    
    function handleMouseMove(e) {
        if (isDragging && !isMaximized) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            
            // Constrain to viewport
            const maxX = window.innerWidth - calculator.offsetWidth;
            const maxY = window.innerHeight - calculator.offsetHeight;
            
            const constrainedX = Math.max(0, Math.min(newX, maxX));
            const constrainedY = Math.max(0, Math.min(newY, maxY));
            
            calculator.style.left = constrainedX + 'px';
            calculator.style.top = constrainedY + 'px';
            calculator.style.right = 'auto';
            calculator.style.bottom = 'auto';
        }
        
        if (isResizing && !isMaximized && !isMinimized) {
            const rect = calculator.getBoundingClientRect();
            const newWidth = e.clientX - rect.left;
            
            // Apply width constraints only
            const minWidth = 400;
            const maxWidth = window.innerWidth * 0.95;
            
            const constrainedWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
            
            calculator.style.width = constrainedWidth + 'px';
            // Keep height fixed - don't change it
            
            // Resize Desmos calculator if it exists
            if (window.desmosCalculatorInstance) {
                setTimeout(() => window.desmosCalculatorInstance.resize(), 10);
            }
        }
    }
    
    function handleMouseUp() {
        if (isDragging || isResizing) {
            isDragging = false;
            isResizing = false;
            calculator.style.cursor = '';
            header.style.cursor = 'move';
        }
    }
    
    function toggleMinimize() {
        isMinimized = !isMinimized;
        
        if (isMinimized) {
            body.style.display = 'none';
            calculator.style.height = '50px';
            calculator.style.resize = 'none';
            minimizeBtn.innerHTML = '<i class="fas fa-window-maximize"></i>';
            minimizeBtn.title = 'Restore';
        } else {
            body.style.display = 'block';
            calculator.style.height = isMaximized ? '100vh' : originalSize.height + 'px';
            calculator.style.resize = isMaximized ? 'none' : 'horizontal';
            minimizeBtn.innerHTML = '<i class="fas fa-minus"></i>';
            minimizeBtn.title = 'Minimize';
            
            // Resize Desmos after restore
            if (window.desmosCalculatorInstance) {
                setTimeout(() => window.desmosCalculatorInstance.resize(), 100);
            }
        }
    }
    
    function toggleMaximize() {
        isMaximized = !isMaximized;
        
        if (isMaximized) {
            // Store current position and size
            const rect = calculator.getBoundingClientRect();
            originalPosition = { top: rect.top, left: rect.left };
            originalSize = { width: rect.width, height: rect.height };
            
            // Maximize
            calculator.style.top = '0px';
            calculator.style.left = '0px';
            calculator.style.right = '0px';
            calculator.style.bottom = '0px';
            calculator.style.width = '100vw';
            calculator.style.height = '100vh';
            calculator.style.resize = 'none';
            calculator.style.borderRadius = '0px';
            
            maximizeBtn.innerHTML = '<i class="fas fa-compress"></i>';
            maximizeBtn.title = 'Restore';
        } else {
            // Restore
            calculator.style.top = originalPosition.top + 'px';
            calculator.style.left = originalPosition.left + 'px';
            calculator.style.right = 'auto';
            calculator.style.bottom = 'auto';
            calculator.style.width = originalSize.width + 'px';
            calculator.style.height = originalSize.height + 'px';
            calculator.style.resize = 'horizontal';
            calculator.style.borderRadius = '12px';
            
            maximizeBtn.innerHTML = '<i class="fas fa-expand"></i>';
            maximizeBtn.title = 'Maximize';
        }
        
        // Resize Desmos after maximize/restore
        if (window.desmosCalculatorInstance) {
            setTimeout(() => window.desmosCalculatorInstance.resize(), 100);
        }
    }
}

// Global calculator variable
var calculator = null;

// Show calculator
window.showCalculator = function() {
    console.log('Showing calculator...');
    
    let widget = document.querySelector('.desmos-calculator-widget');
    if (!widget) {
        widget = createCalculatorWidget();
    }
    
    widget.style.display = 'block';
    
    // Initialize Desmos if not already done
    if (!calculator) {
        console.log('Initializing Desmos calculator...');
        
        if (typeof Desmos !== 'undefined') {
            try {
                var elt = document.getElementById('calculator');
                calculator = Desmos.GraphingCalculator(elt);
                window.desmosCalculatorInstance = calculator; // Store globally for resize
                
                console.log('Desmos calculator initialized successfully!');
            } catch (error) {
                console.error('Error initializing Desmos:', error);
                document.getElementById('calculator').innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Failed to load Desmos calculator. Please refresh the page.</div>';
            }
        } else {
            console.log('Desmos API not loaded yet, showing message...');
            document.getElementById('calculator').innerHTML = '<div style="padding: 20px; text-align: center;">Loading Desmos calculator...</div>';
            
            setTimeout(() => {
                if (typeof Desmos !== 'undefined') {
                    window.showCalculator();
                }
            }, 1000);
        }
    }
};

// Hide calculator
window.hideCalculator = function() {
    console.log('Hiding calculator...');
    const widget = document.querySelector('.desmos-calculator-widget');
    if (widget) {
        widget.style.display = 'none';
        // Reset states
        isMinimized = false;
        isMaximized = false;
        isDragging = false;
        isResizing = false;
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, creating calculator button...');
    createCalculatorButton();
});

// Backup initialization
window.addEventListener('load', function() {
    console.log('Window loaded, ensuring calculator button exists...');
    if (!document.querySelector('.desmos-toggle')) {
        createCalculatorButton();
    }
});

console.log('Desmos script loaded successfully!');