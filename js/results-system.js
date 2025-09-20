// Results System - Handles quiz results display and interaction
class ResultsSystem {
    constructor() {
        this.quizData = null;
        this.showExplanations = false;
        this.currentFilter = 'all';
        
        this.initializeResults();
        this.loadTheme();
    }

    initializeResults() {
        // Load quiz data from localStorage
        const savedResults = localStorage.getItem('quizResults');
        
        if (!savedResults) {
            this.handleNoResults();
            return;
        }
        
        this.quizData = JSON.parse(savedResults);
        this.displayResults();
        this.renderQuestions();
    }

    handleNoResults() {
        document.body.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; padding: 2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #f59e0b; margin-bottom: 1rem;"></i>
                <h2>No Quiz Results Found</h2>
                <p>It looks like you haven't completed a quiz yet or the results have expired.</p>
                <button onclick="window.location.href='index.html'" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: #667eea; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                    <i class="fas fa-home"></i> Back to Home
                </button>
            </div>
        `;
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const moonIcon = document.querySelector('.theme-toggle .fa-moon');
        const sunIcon = document.querySelector('.theme-toggle .fa-sun');
        
        if (moonIcon && sunIcon) {
            if (theme === 'dark') {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'inline-block';
            } else {
                moonIcon.style.display = 'inline-block';
                sunIcon.style.display = 'none';
            }
        }
    }

    displayResults() {
        const { results } = this.quizData;
        
        // Update score circle
        const scoreElement = document.getElementById('score-percentage');
        const scoreCircle = document.querySelector('.score-circle');
        if (scoreElement && scoreCircle) {
            scoreElement.textContent = `${results.percentage}%`;
            
            // Set CSS custom property for the conic gradient
            const angle = (results.percentage / 100) * 360;
            scoreCircle.style.setProperty('--score-angle', `${angle}deg`);
        }
        
        // Update statistics
        const correctElement = document.getElementById('correct-count');
        const incorrectElement = document.getElementById('incorrect-count');
        if (correctElement && incorrectElement) {
            correctElement.textContent = results.correct;
            incorrectElement.textContent = results.incorrect;
        }
        
        // Update time taken
        const timeElement = document.getElementById('time-taken');
        if (timeElement) {
            const minutes = Math.floor(results.timeTaken / 60000);
            const seconds = Math.floor((results.timeTaken % 60000) / 1000);
            timeElement.textContent = `${minutes}m ${seconds}s`;
        }
        
        // Update performance message
        const messageElement = document.getElementById('performance-message');
        if (messageElement) {
            messageElement.textContent = this.getPerformanceMessage(results.percentage);
        }
    }

    getPerformanceMessage(percentage) {
        if (percentage >= 90) {
            return "Outstanding Performance! 🏆";
        } else if (percentage >= 80) {
            return "Excellent Work! 🌟";
        } else if (percentage >= 70) {
            return "Good Job! 👍";
        } else if (percentage >= 60) {
            return "Fair Performance 📚";
        } else {
            return "Needs Improvement 💪";
        }
    }

    renderQuestions() {
        const container = document.getElementById('questions-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.quizData.questions.forEach((question, index) => {
            const userAnswer = this.quizData.userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            
            const questionCard = this.createQuestionCard(question, index, userAnswer, isCorrect);
            container.appendChild(questionCard);
        });
    }

    createQuestionCard(question, index, userAnswer, isCorrect) {
        const card = document.createElement('div');
        card.className = `question-result-card ${isCorrect ? 'correct' : 'incorrect'}`;
        card.setAttribute('data-status', isCorrect ? 'correct' : 'incorrect');
        
        const statusIcon = isCorrect ? 'fa-check-circle' : 'fa-times-circle';
        const statusText = isCorrect ? 'Correct' : 'Incorrect';
        const statusClass = isCorrect ? 'correct' : 'incorrect';
        
        card.innerHTML = `
            <div class="question-header">
                <div class="question-number">
                    <i class="fas fa-question-circle"></i>
                    Question ${index + 1}
                </div>
                <div class="result-status ${statusClass}">
                    <i class="fas ${statusIcon}"></i>
                    ${statusText}
                </div>
            </div>
            
            <div class="question-text">${question.question}</div>
            
            <div class="answer-section">
                ${this.renderAnswerOptions(question, userAnswer)}
            </div>
            
            <div class="explanation ${this.showExplanations ? 'show' : ''}">
                <div class="explanation-label">
                    <i class="fas fa-lightbulb"></i>
                    Explanation:
                </div>
                <div class="explanation-text">${question.explanation}</div>
            </div>
        `;
        
        return card;
    }

    renderAnswerOptions(question, userAnswer) {
        return question.options.map((option, index) => {
            let className = 'answer-option';
            let indicator = '';
            
            if (index === question.correct && index === userAnswer) {
                // User selected correct answer
                className += ' user-correct';
                indicator = '<span class="answer-indicator">✓ Your Answer (Correct)</span>';
            } else if (index === question.correct) {
                // Correct answer (not selected by user)
                className += ' correct-answer';
                indicator = '<span class="answer-indicator">✓ Correct Answer</span>';
            } else if (index === userAnswer) {
                // User's incorrect answer
                className += ' user-answer';
                indicator = '<span class="answer-indicator">✗ Your Answer</span>';
            }
            
            return `
                <div class="${className}">
                    <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${option}</span>
                    ${indicator}
                </div>
            `;
        }).join('');
    }

    filterQuestions(filter) {
        this.currentFilter = filter;
        
        // Update filter button states
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
        });
        
        // Show/hide questions based on filter
        document.querySelectorAll('.question-result-card').forEach(card => {
            const status = card.getAttribute('data-status');
            
            switch(filter) {
                case 'all':
                    card.classList.remove('hidden');
                    break;
                case 'correct':
                    card.classList.toggle('hidden', status !== 'correct');
                    break;
                case 'incorrect':
                    card.classList.toggle('hidden', status !== 'incorrect');
                    break;
            }
        });
        
        // Update visible question count
        this.updateQuestionCount();
    }

    updateQuestionCount() {
        const visibleQuestions = document.querySelectorAll('.question-result-card:not(.hidden)');
        const totalQuestions = this.quizData.questions.length;
        
        // You could add a counter display here if needed
        console.log(`Showing ${visibleQuestions.length} of ${totalQuestions} questions`);
    }

    toggleExplanations() {
        this.showExplanations = !this.showExplanations;
        
        const explanations = document.querySelectorAll('.explanation');
        const toggleButton = document.getElementById('explanation-toggle');
        
        explanations.forEach(explanation => {
            explanation.classList.toggle('show', this.showExplanations);
        });
        
        if (toggleButton) {
            toggleButton.textContent = this.showExplanations ? 'Hide Explanations' : 'Show Explanations';
        }
    }

    printResults() {
        // Temporarily show all explanations for printing
        const wasShowingExplanations = this.showExplanations;
        
        if (!this.showExplanations) {
            this.showExplanations = true;
            document.querySelectorAll('.explanation').forEach(explanation => {
                explanation.classList.add('show');
            });
        }
        
        // Print
        window.print();
        
        // Restore original explanation state
        if (!wasShowingExplanations) {
            this.showExplanations = false;
            document.querySelectorAll('.explanation').forEach(explanation => {
                explanation.classList.remove('show');
            });
        }
    }

    // Keyboard shortcuts
    handleKeyPress(event) {
        switch(event.key.toLowerCase()) {
            case 'a':
                this.filterQuestions('all');
                break;
            case 'c':
                this.filterQuestions('correct');
                break;
            case 'i':
                this.filterQuestions('incorrect');
                break;
            case 'e':
                this.toggleExplanations();
                break;
            case 'p':
                if (event.ctrlKey) {
                    event.preventDefault();
                    this.printResults();
                }
                break;
            case 'h':
                window.location.href = 'index.html';
                break;
            case 'r':
                window.location.href = 'Work-Immersion.html';
                break;
        }
    }
}

// Initialize results system when page loads
let resultsSystem;

document.addEventListener('DOMContentLoaded', () => {
    resultsSystem = new ResultsSystem();
    
    // Enable keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        resultsSystem.handleKeyPress(event);
    });
    
    // Add keyboard shortcut help
    console.log('Keyboard Shortcuts:');
    console.log('A - Show All Questions');
    console.log('C - Show Correct Only');
    console.log('I - Show Incorrect Only');
    console.log('E - Toggle Explanations');
    console.log('Ctrl+P - Print Results');
    console.log('H - Home');
    console.log('R - Retake Quiz');
});
