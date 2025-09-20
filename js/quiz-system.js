// Quiz System - Handles all quiz functionality
class QuizSystem {
    constructor() {
        // Detect current subject based on page
        this.currentSubject = this.detectCurrentSubject();
        this.questions = this.loadQuestionsForSubject(this.currentSubject);
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.selectedOption = null; // Currently selected option (before submission)
        this.justSubmitted = false; // Flag to track if answer was just submitted
        this.explanationAnimating = false; // Flag to track if explanation is animating
        this.startTime = new Date();
        this.endTime = null;
        this.isCompleted = false;
        
        // Shuffle answer choices for each question
        this.shuffledQuestions = this.shuffleAllAnswerChoices();
        
        this.initializeQuiz();
        this.loadTheme();
    }

    detectCurrentSubject() {
        const currentPage = window.location.pathname.split('/').pop();
        const subjectMap = {
            'Work-Immersion.html': 'work-immersion',
            'General-Chemistry.html': 'general-chemistry',
            'Contemporary-Arts.html': 'contemporary-arts',
            'Empowerment-Technologies.html': 'empowerment-technologies'
        };
        return subjectMap[currentPage] || 'work-immersion';
    }

    loadQuestionsForSubject(subject) {
        const questionMap = {
            'work-immersion': workImmersionQuestions,
            'general-chemistry': generalChemistryQuestions,
            'contemporary-arts': contemporaryArtsQuestions,
            'empowerment-technologies': empowermentTechnologiesQuestions
        };
        return questionMap[subject] || workImmersionQuestions;
    }

    shuffleAllAnswerChoices() {
        return this.questions.map(question => {
            // Create an array of options with their original indices
            const optionsWithIndices = question.options.map((option, index) => ({
                text: option,
                originalIndex: index
            }));
            
            // Shuffle the options
            const shuffledOptions = this.shuffleArray([...optionsWithIndices]);
            
            // Find the new position of the correct answer
            const newCorrectIndex = shuffledOptions.findIndex(
                option => option.originalIndex === question.correct
            );
            
            return {
                ...question,
                options: shuffledOptions.map(option => option.text),
                correct: newCorrectIndex,
                originalCorrect: question.correct,
                optionMapping: shuffledOptions.map(option => option.originalIndex)
            };
        });
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    initializeQuiz() {
        this.updateTotalQuestions();
        this.renderCurrentQuestion();
        this.updateProgress();
        this.updateControls();
    }

    loadTheme() {
        // Set default to auto if no preference is saved
        const savedTheme = localStorage.getItem('theme') || 'auto';
        if (savedTheme !== 'auto' && savedTheme !== 'light' && savedTheme !== 'dark') {
            localStorage.setItem('theme', 'auto');
        }
        
        this.applyTheme();
        
        // Listen for system theme changes
        this.systemThemeListener = window.matchMedia('(prefers-color-scheme: dark)');
        this.systemThemeListener.addEventListener('change', () => {
            if (localStorage.getItem('theme') === 'auto') {
                this.applyTheme();
            }
        });
    }

    toggleTheme() {
        const currentThemePreference = localStorage.getItem('theme') || 'auto';
        let newThemePreference;
        
        // Cycle through: auto -> light -> dark -> auto
        if (currentThemePreference === 'auto') {
            newThemePreference = 'light';
        } else if (currentThemePreference === 'light') {
            newThemePreference = 'dark';
        } else {
            newThemePreference = 'auto';
        }
        
        localStorage.setItem('theme', newThemePreference);
        this.applyTheme();
    }

    applyTheme() {
        const themePreference = localStorage.getItem('theme') || 'auto';
        let actualTheme;
        
        if (themePreference === 'auto') {
            // Follow system preference
            actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
            // Use manual preference
            actualTheme = themePreference;
        }
        
        document.documentElement.setAttribute('data-theme', actualTheme);
        this.updateThemeIcon(themePreference, actualTheme);
    }

    updateThemeIcon(themePreference, actualTheme) {
        // Update both fixed and navbar theme toggles
        const themeToggles = document.querySelectorAll('.theme-toggle, .theme-toggle-nav');
        
        themeToggles.forEach(themeToggle => {
            const moonIcon = themeToggle.querySelector('.fa-moon');
            const sunIcon = themeToggle.querySelector('.fa-sun');
            
            if (!themeToggle || !moonIcon || !sunIcon) {
                return; // Skip this button if elements are missing
            }
            
            try {
                // Update button title to show current mode
                let title;
                if (themePreference === 'auto') {
                    title = `Auto (${actualTheme === 'dark' ? 'Dark' : 'Light'}) - Click for Light mode`;
                } else if (themePreference === 'light') {
                    title = 'Light mode - Click for Dark mode';
                } else {
                    title = 'Dark mode - Click for Auto mode';
                }
                themeToggle.setAttribute('aria-label', title);
                themeToggle.title = title;
                
                // Show appropriate icon based on actual theme
                if (actualTheme === 'dark') {
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'inline-block';
                } else {
                    moonIcon.style.display = 'inline-block';
                    sunIcon.style.display = 'none';
                }
                
                // Add visual indicator for auto mode
                if (themePreference === 'auto') {
                    themeToggle.classList.add('auto-mode');
                } else {
                    themeToggle.classList.remove('auto-mode');
                }
            } catch (error) {
                console.error('Error updating theme icon:', error);
            }
        });
    }

    updateTotalQuestions() {
        const totalElements = document.querySelectorAll('#total-questions, #total-count');
        totalElements.forEach(element => {
            element.textContent = this.shuffledQuestions.length;
        });
    }

    renderCurrentQuestion() {
        const question = this.shuffledQuestions[this.currentQuestionIndex];
        
        // Aggressive explanation clearing at the start
        this.clearExplanation();
        
        // Update question number and text
        document.getElementById('question-num').textContent = `Question ${this.currentQuestionIndex + 1}`;
        document.getElementById('question-text').innerHTML = question.question;
        
        // Update progress counters
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        
        // Clear again before rendering options
        this.clearExplanation();
        
        // Render options first
        this.renderOptions(question);
        
        // Check if this question was already answered and revealed
        const isAnswered = this.userAnswers[this.currentQuestionIndex] !== null;
        const isRevealed = this.isAnswerRevealed(this.currentQuestionIndex);
        
        if (isAnswered && isRevealed) {
            // Reset selected option for already answered questions
            this.selectedOption = null;
            // Show the revealed state for this specific question
            this.revealAnswer();
        } else if (isAnswered && !isRevealed) {
            // Question was answered but not revealed (shouldn't happen in normal flow)
            this.selectedOption = this.userAnswers[this.currentQuestionIndex];
            // Show the selected state
            const optionButtons = document.querySelectorAll('.option-button');
            optionButtons.forEach((button, index) => {
                button.classList.toggle('selected', index === this.selectedOption);
            });
        } else {
            // Reset selected option for new/unanswered questions
            this.selectedOption = null;
        }
        
        // Final clear after everything is set up
        setTimeout(() => {
            if (!isRevealed) {
                this.clearExplanation();
            }
        }, 50);
    }

    renderOptions(question) {
        const container = document.getElementById('options-container');
        container.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'option-button';
            optionButton.onclick = () => this.selectOption(index);
            
            // Start with clean button - no pre-selected states
            // The renderCurrentQuestion method will handle setting states appropriately
            
            optionButton.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option}</span>
            `;
            
            container.appendChild(optionButton);
        });
    }

    selectOption(optionIndex) {
        // Check if this question has already been submitted and revealed
        if (this.userAnswers[this.currentQuestionIndex] !== null && this.isAnswerRevealed(this.currentQuestionIndex)) {
            return; // Prevent changing answer after reveal
        }
        
        // Store the selected option (but don't submit yet)
        this.selectedOption = optionIndex;
        
        // Update visual selection
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach((button, index) => {
            button.classList.toggle('selected', index === optionIndex);
        });
        
        // Update controls to show submit button
        this.updateControls();
    }

    submitAnswer() {
        // Check if an option is selected
        if (this.selectedOption === null || this.selectedOption === undefined) {
            return;
        }
        
        // Check if already submitted
        if (this.userAnswers[this.currentQuestionIndex] !== null && this.isAnswerRevealed(this.currentQuestionIndex)) {
            return;
        }
        
        // Store the user's final answer
        this.userAnswers[this.currentQuestionIndex] = this.selectedOption;
        
        // Set flag to indicate this is a fresh submission
        this.justSubmitted = true;
        
        // Set animation flag to disable next button immediately
        this.explanationAnimating = true;
        
        // Show correct answer immediately
        this.revealAnswer();
        
        // Update controls and progress
        this.updateControls();
        this.updateProgress();
    }

    isAnswerRevealed(questionIndex) {
        return this.revealedAnswers && this.revealedAnswers[questionIndex];
    }

    revealAnswer() {
        const currentQuestion = this.shuffledQuestions[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        const correctAnswer = currentQuestion.correct;
        
        // Initialize revealed answers array if not exists
        if (!this.revealedAnswers) {
            this.revealedAnswers = new Array(this.shuffledQuestions.length).fill(false);
        }
        
        // Mark this answer as revealed
        this.revealedAnswers[this.currentQuestionIndex] = true;
        
        const optionButtons = document.querySelectorAll('.option-button');
        
        optionButtons.forEach((button, index) => {
            // Disable all buttons
            button.disabled = true;
            button.style.cursor = 'not-allowed';
            
            // Remove any existing state classes
            button.classList.remove('selected', 'correct-answer', 'incorrect-answer', 'user-correct');
            
            if (index === correctAnswer) {
                // Show correct answer
                button.classList.add('correct-answer');
                if (index === userAnswer) {
                    // User got it right
                    button.classList.add('user-correct');
                }
            } else if (index === userAnswer) {
                // Show user's incorrect answer
                button.classList.add('incorrect-answer');
            }
        });
        
        // Only show explanation if this is a fresh submission (not navigation)
        if (this.justSubmitted) {
            setTimeout(() => {
                this.showExplanation();
                this.justSubmitted = false; // Reset the flag
            }, 1000);
        }
    }

    showExplanation() {
        // Use the current question context
        const currentQuestion = this.shuffledQuestions[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        const correctAnswer = currentQuestion.correct;
        
        // Clear any existing explanation first
        this.clearExplanation();
        
        // Set animation flag and disable next button
        this.explanationAnimating = true;
        this.updateControls(); // This will disable the next button
        
        // Create new explanation element
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'question-explanation';
        
        const questionCard = document.querySelector('.question-card');
        if (!questionCard) return; // Safety check
        
        questionCard.appendChild(explanationDiv);
        
        // Determine if the current question was answered correctly
        const isCorrect = userAnswer === correctAnswer;
        const resultIcon = isCorrect ? 'fa-check-circle' : 'fa-times-circle';
        const resultClass = isCorrect ? 'correct' : 'incorrect';
        const resultText = isCorrect ? 'Correct!' : 'Incorrect';
        
        explanationDiv.innerHTML = `
            <div class="answer-result ${resultClass}">
                <i class="fas ${resultIcon}"></i>
                <span>${resultText}</span>
            </div>
            <div class="explanation-content">
                <h4><i class="fas fa-lightbulb"></i> Explanation:</h4>
                <p>${currentQuestion.explanation}</p>
            </div>
        `;
        
        // Animate in
        explanationDiv.style.opacity = '0';
        explanationDiv.style.transform = 'translateY(20px)';
        explanationDiv.style.display = 'block';
        
        setTimeout(() => {
            explanationDiv.style.transition = 'all 0.5s ease';
            explanationDiv.style.opacity = '1';
            explanationDiv.style.transform = 'translateY(0)';
            
            // After animation completes (0.5s transition + buffer), enable next button
            setTimeout(() => {
                this.explanationAnimating = false;
                this.updateControls(); // Re-enable the next button
            }, 800); // 500ms transition + 300ms buffer for reading
            
        }, 100);
    }

    updateProgress() {
        const answered = this.userAnswers.filter(answer => answer !== null).length;
        const percentage = Math.round((this.currentQuestionIndex + 1) / this.shuffledQuestions.length * 100);
        
        // Update current question number
        const currentQuestionEl = document.getElementById('current-question');
        if (currentQuestionEl) {
            currentQuestionEl.textContent = this.currentQuestionIndex + 1;
        }
        
        // Update total questions
        const totalQuestionsEl = document.getElementById('total-questions');
        if (totalQuestionsEl) {
            totalQuestionsEl.textContent = this.shuffledQuestions.length;
        }
        
        // Update percentage display
        const percentageTextEl = document.getElementById('progress-percent') || document.getElementById('progress-percentage');
        if (percentageTextEl) {
            percentageTextEl.textContent = `${percentage}%`;
        }
        
        // Update progress bar
        const progressFillEl = document.getElementById('progress-fill') || document.getElementById('progress-bar');
        if (progressFillEl) {
            progressFillEl.style.width = `${percentage}%`;
        }
        
        // Update progress glow
        const progressGlowEl = document.getElementById('progress-glow');
        if (progressGlowEl) {
            progressGlowEl.style.width = `${percentage}%`;
        }
        
        // Update circular progress ring
        const progressRingEl = document.getElementById('progress-ring');
        if (progressRingEl) {
            const circumference = 2 * Math.PI * 16; // radius = 16
            const offset = circumference - (percentage / 100) * circumference;
            progressRingEl.style.strokeDasharray = `${circumference} ${circumference}`;
            progressRingEl.style.strokeDashoffset = offset;
        }
        
        // Update answered count (if element exists)
        const answeredCountEl = document.getElementById('answered-count');
        if (answeredCountEl) {
            answeredCountEl.textContent = answered;
        }
    }

    updateControls() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const hasSelection = this.selectedOption !== null && this.selectedOption !== undefined;
        const isSubmitted = this.userAnswers[this.currentQuestionIndex] !== null;
        const isRevealed = this.isAnswerRevealed(this.currentQuestionIndex);
        
        // Previous button state
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // Next/Submit button state and text
        if (!isSubmitted) {
            // Not yet submitted - show submit button
            if (hasSelection) {
                nextBtn.innerHTML = '<i class="fas fa-check"></i> Submit Answer';
                nextBtn.disabled = false;
                nextBtn.onclick = () => this.submitAnswer();
            } else {
                nextBtn.innerHTML = 'Select an Answer';
                nextBtn.disabled = true;
                nextBtn.onclick = null;
            }
        } else if (isRevealed) {
            // Already submitted and revealed - show next/finish button
            if (this.currentQuestionIndex === this.shuffledQuestions.length - 1) {
                if (this.explanationAnimating) {
                    // During explanation animation for last question
                    nextBtn.innerHTML = '<i class="fas fa-hourglass-half"></i> Reading Explanation...';
                    nextBtn.disabled = true;
                    nextBtn.onclick = null;
                } else {
                    nextBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> Finish Quiz';
                    nextBtn.disabled = false;
                    nextBtn.onclick = () => this.finishQuiz();
                }
            } else {
                if (this.explanationAnimating) {
                    // During explanation animation
                    nextBtn.innerHTML = '<i class="fas fa-hourglass-half"></i> Reading Explanation...';
                    nextBtn.disabled = true;
                    nextBtn.onclick = null;
                } else {
                    // Animation finished, ready to proceed
                    nextBtn.innerHTML = 'Next Question <i class="fas fa-chevron-right"></i>';
                    nextBtn.disabled = false;
                    nextBtn.onclick = () => {
                        // Force clear explanation before moving to next question
                        this.clearExplanation();
                        this.nextQuestion();
                    };
                }
            }
        } else if (this.explanationAnimating) {
            // Just submitted but explanation hasn't appeared yet
            nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Answer...';
            nextBtn.disabled = true;
            nextBtn.onclick = null;
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.shuffledQuestions.length - 1) {
            // Reset all animation and submission flags
            this.justSubmitted = false;
            this.explanationAnimating = false;
            
            // Force clear explanation immediately
            this.clearExplanation();
            
            this.currentQuestionIndex++;
            
            // Clear explanation again after incrementing
            this.clearExplanation();
            
            this.renderCurrentQuestion();
            this.updateProgress();
            this.updateControls();
            
            // Final clear to be absolutely sure
            setTimeout(() => {
                this.clearExplanation();
            }, 100);
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            // Reset all animation and submission flags
            this.justSubmitted = false;
            this.explanationAnimating = false;
            
            this.currentQuestionIndex--;
            
            // Reset selection for the current question if it wasn't submitted
            if (this.userAnswers[this.currentQuestionIndex] === null) {
                this.selectedOption = null;
            }
            
            // Clear any existing explanation completely
            this.clearExplanation();
            
            this.renderCurrentQuestion();
            this.updateProgress();
            this.updateControls();
        }
    }

    clearExplanation() {
        // Remove all possible explanation elements - be very thorough
        const explanationElements = document.querySelectorAll('.question-explanation');
        explanationElements.forEach(element => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        
        // Also check for any orphaned explanation elements
        const answerResults = document.querySelectorAll('.answer-result');
        answerResults.forEach(element => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        
        const explanationContents = document.querySelectorAll('.explanation-content');
        explanationContents.forEach(element => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
    }

    finishQuiz() {
        this.endTime = new Date();
        this.isCompleted = true;
        
        // Calculate results
        const results = this.calculateResults();
        
        // Show summary modal
        this.showSummaryModal(results);
        
        // Save results to localStorage for results page
        localStorage.setItem('quizResults', JSON.stringify({
            results: results,
            userAnswers: this.userAnswers,
            questions: this.shuffledQuestions, // Use shuffled questions
            originalQuestions: this.questions, // Keep original for reference
            startTime: this.startTime,
            endTime: this.endTime,
            subject: this.currentSubject
        }));
    }

    calculateResults() {
        let correct = 0;
        let incorrect = 0;
        
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.shuffledQuestions[index].correct) {
                correct++;
            } else {
                incorrect++;
            }
        });
        
        const percentage = Math.round((correct / this.shuffledQuestions.length) * 100);
        
        return {
            correct,
            incorrect,
            total: this.shuffledQuestions.length,
            percentage,
            timeTaken: this.endTime - this.startTime
        };
    }

    showSummaryModal(results) {
        const modal = document.getElementById('summary-modal');
        
        // Update statistics
        document.getElementById('correct-answers').textContent = results.correct;
        document.getElementById('incorrect-answers').textContent = results.incorrect;
        document.getElementById('final-score').textContent = `${results.percentage}%`;
        
        // Update score message
        const scoreMessage = this.getScoreMessage(results.percentage);
        document.getElementById('score-message').textContent = scoreMessage;
        
        // Show modal
        modal.classList.add('show');
    }

    getScoreMessage(percentage) {
        if (percentage >= 90) {
            return "Excellent! You have mastered Work Immersion concepts!";
        } else if (percentage >= 80) {
            return "Great job! You have a solid understanding of Work Immersion.";
        } else if (percentage >= 70) {
            return "Good work! You understand most Work Immersion concepts.";
        } else if (percentage >= 60) {
            return "Fair performance. Consider reviewing Work Immersion materials.";
        } else {
            return "You may need to study Work Immersion concepts more thoroughly.";
        }
    }

    showResults() {
        // Redirect to results page
        window.location.href = 'quiz-results.html';
    }

    // Keyboard navigation
    handleKeyPress(event) {
        switch(event.key) {
            case 'ArrowLeft':
                if (!document.getElementById('prev-btn').disabled) {
                    this.previousQuestion();
                }
                break;
            case 'ArrowRight':
                if (!document.getElementById('next-btn').disabled) {
                    this.nextQuestion();
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                const optionIndex = parseInt(event.key) - 1;
                if (optionIndex < this.questions[this.currentQuestionIndex].options.length) {
                    this.selectOption(optionIndex);
                }
                break;
            case 'a':
            case 'A':
                this.selectOption(0);
                break;
            case 'b':
            case 'B':
                this.selectOption(1);
                break;
            case 'c':
            case 'C':
                this.selectOption(2);
                break;
            case 'd':
            case 'D':
                this.selectOption(3);
                break;
        }
    }

    // Auto-save progress
    saveProgress() {
        const progressData = {
            currentQuestionIndex: this.currentQuestionIndex,
            userAnswers: this.userAnswers,
            selectedOption: this.selectedOption,
            revealedAnswers: this.revealedAnswers || [],
            startTime: this.startTime
        };
        localStorage.setItem('workImmersionProgress', JSON.stringify(progressData));
    }

    // Load saved progress
    loadProgress() {
        const saved = localStorage.getItem('workImmersionProgress');
        if (saved) {
            const progressData = JSON.parse(saved);
            
            // Ask user if they want to continue from where they left off
            const continueQuiz = confirm('You have an incomplete quiz. Would you like to continue from where you left off?');
            
            if (continueQuiz) {
                this.currentQuestionIndex = progressData.currentQuestionIndex;
                this.userAnswers = progressData.userAnswers;
                this.selectedOption = progressData.selectedOption || null;
                this.revealedAnswers = progressData.revealedAnswers || [];
                this.startTime = new Date(progressData.startTime);
                
                this.renderCurrentQuestion();
                this.updateProgress();
                this.updateControls();
            } else {
                // Clear saved progress
                localStorage.removeItem('workImmersionProgress');
            }
        }
    }

    // Prevent accidental page refresh/close
    enablePageProtection() {
        window.addEventListener('beforeunload', (event) => {
            if (!this.isCompleted) {
                event.preventDefault();
                event.returnValue = 'You have an incomplete quiz. Are you sure you want to leave?';
                this.saveProgress();
            }
        });
    }
}

// Global theme toggle function for quiz pages
function toggleTheme() {
    if (typeof quizSystem !== 'undefined' && quizSystem) {
        quizSystem.toggleTheme();
    } else {
        // Fallback if quizSystem is not ready
        console.warn('QuizSystem not initialized yet, using fallback theme toggle');
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
}

// Initialize quiz system when page loads
let quizSystem;

document.addEventListener('DOMContentLoaded', () => {
    quizSystem = new QuizSystem();
    
    // Add event listeners for navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!prevBtn.disabled) {
                quizSystem.previousQuestion();
            }
        });
    }
    
    // Next button click is handled dynamically in updateControls()
    
    // Load any saved progress
    quizSystem.loadProgress();
    
    // Enable keyboard navigation
    document.addEventListener('keydown', (event) => {
        quizSystem.handleKeyPress(event);
    });
    
    // Enable page protection
    quizSystem.enablePageProtection();
    
    // Auto-save progress every 30 seconds
    setInterval(() => {
        if (!quizSystem.isCompleted) {
            quizSystem.saveProgress();
        }
    }, 30000);
});

// Close modal when clicking backdrop
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-backdrop')) {
        const modal = event.target.closest('.quiz-summary-modal');
        if (modal) {
            modal.classList.remove('show');
        }
    }
});
