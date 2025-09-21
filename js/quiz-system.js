/**
 * Quiz System - Complete Quiz Management for Grade 12 Reviewer
 * Handles multi-subject quizzes with theme system, MathJax integration, and progress tracking
 */

class QuizSystem {
    constructor() {
        // Core quiz state
        this.currentSubject = this.detectCurrentSubject();
        this.questions = this.loadQuestionsForSubject(this.currentSubject);
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.revealedAnswers = new Array(this.questions.length).fill(false);
        
        // Selection and submission state
        this.selectedOption = null;
        this.justSubmitted = false;
        this.explanationAnimating = false;
        
        // Quiz timing and completion
        this.startTime = new Date();
        this.endTime = null;
        this.isCompleted = false;
        
        // Shuffle answer choices for randomization
        this.shuffledQuestions = this.shuffleAllAnswerChoices();
        
        // Initialize the quiz
        this.initializeQuiz();
        this.loadTheme();
    }

    /**
     * Detect which subject quiz is currently running based on the page URL
     */
    detectCurrentSubject() {
        const currentPage = window.location.pathname.split('/').pop();
        const subjectMap = {
            'Work-Immersion.html': 'work-immersion',
            'General-Chemistry.html': 'general-chemistry',
            'Contemporary-Arts.html': 'contemporary-arts',
            'Empowerment-Technologies.html': 'empowerment-technologies',
            'General-Mathematics.html': 'general-mathematics'
        };
        return subjectMap[currentPage] || 'work-immersion';
    }

    /**
     * Load questions for the detected subject
     */
    loadQuestionsForSubject(subject) {
        const questionMap = {
            'work-immersion': workImmersionQuestions,
            'general-chemistry': generalChemistryQuestions,
            'contemporary-arts': contemporaryArtsQuestions,
            'empowerment-technologies': empowermentTechnologiesQuestions,
            'general-mathematics': generalMathematicsQuestions
        };
        return questionMap[subject] || workImmersionQuestions;
    }

    /**
     * Shuffle answer choices for all questions to prevent memorization
     */
    shuffleAllAnswerChoices() {
        return this.questions.map(question => {
            // Create array of options with their original indices
            const optionsWithIndices = question.options.map((option, index) => ({
                text: option,
                originalIndex: index
            }));
            
            // Shuffle the options
            const shuffledOptions = this.shuffleArray([...optionsWithIndices]);
            
            // Find new position of correct answer
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

    /**
     * Fisher-Yates shuffle algorithm
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Initialize quiz UI and state
     */
    initializeQuiz() {
        this.updateTotalQuestions();
        this.renderCurrentQuestion();
        this.updateProgress();
        this.updateSubmitButton();
    }

    /**
     * Theme System - Load and apply themes with auto-detection
     */
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'auto';
        if (!['auto', 'light', 'dark'].includes(savedTheme)) {
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

    /**
     * Toggle between theme modes: auto -> light -> dark -> auto
     */
    toggleTheme() {
        const currentThemePreference = localStorage.getItem('theme') || 'auto';
        let newThemePreference;
        
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

    /**
     * Apply the selected theme to the document
     */
    applyTheme() {
        const themePreference = localStorage.getItem('theme') || 'auto';
        let actualTheme;
        
        if (themePreference === 'auto') {
            actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } else {
            actualTheme = themePreference;
        }
        
        document.documentElement.setAttribute('data-theme', actualTheme);
        this.updateThemeIcon(themePreference, actualTheme);
    }

    /**
     * Update theme toggle button icons and tooltips
     */
    updateThemeIcon(themePreference, actualTheme) {
        const themeToggles = document.querySelectorAll('.theme-toggle, .theme-toggle-nav');
        
        themeToggles.forEach(themeToggle => {
            const moonIcon = themeToggle.querySelector('.fa-moon');
            const sunIcon = themeToggle.querySelector('.fa-sun');
            
            if (!themeToggle || !moonIcon || !sunIcon) return;
            
            try {
                // Update button title
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
                
                // Show appropriate icon
                if (actualTheme === 'dark') {
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'inline-block';
                } else {
                    moonIcon.style.display = 'inline-block';
                    sunIcon.style.display = 'none';
                }
                
                // Visual indicator for auto mode
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

    /**
     * Update total question count in UI
     */
    updateTotalQuestions() {
        const totalElements = document.querySelectorAll('#total-questions, #total-count');
        totalElements.forEach(element => {
            element.textContent = this.shuffledQuestions.length;
        });
    }

    /**
     * Render the current question and its options
     */
    renderCurrentQuestion() {
        // Safety checks
        if (!this.shuffledQuestions || this.currentQuestionIndex >= this.shuffledQuestions.length) {
            console.error('Invalid question state');
            return;
        }
        
        const question = this.shuffledQuestions[this.currentQuestionIndex];
        if (!question || !question.question) {
            console.error('Invalid question object:', question);
            return;
        }
        
        // Clear previous explanation
        this.clearExplanation();
        
        // Update question display
        document.getElementById('question-num').textContent = `Question ${this.currentQuestionIndex + 1}`;
        document.getElementById('question-text').innerHTML = question.question;
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        
        // Render answer options
        this.renderOptions(question);
        
        // Setup question state based on previous answers
        this.setupQuestionState();
        
        // Render mathematical expressions
        this.renderMathJax();
    }

    /**
     * Setup question state based on whether it was previously answered
     */
    setupQuestionState() {
        const isAnswered = this.userAnswers[this.currentQuestionIndex] !== null;
        const isRevealed = this.revealedAnswers[this.currentQuestionIndex];
        
        if (isAnswered && isRevealed) {
            // Question completed - show results
            this.selectedOption = null;
            this.showAnswerResults();
            this.displayCompletedExplanation();
        } else if (isAnswered && !isRevealed) {
            // Question answered but not revealed (edge case)
            this.selectedOption = this.userAnswers[this.currentQuestionIndex];
            this.updateVisualSelection();
        } else {
            // Fresh question
            this.selectedOption = null;
            this.explanationAnimating = false;
        }
        
        this.updateSubmitButton();
    }

    /**
     * Update visual selection of answer options
     */
    updateVisualSelection() {
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach((button, index) => {
            if (index === this.selectedOption) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
    }

    /**
     * Display explanation for already completed questions
     */
    displayCompletedExplanation() {
        const currentQuestion = this.shuffledQuestions[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        const correctAnswer = currentQuestion.correct;
        const isCorrect = userAnswer === correctAnswer;
        
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'question-explanation';
        
        const questionCard = document.querySelector('.question-card');
        if (!questionCard) return;
        
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
        
        questionCard.appendChild(explanationDiv);
        this.renderMathJax();
    }

    /**
     * Render mathematical expressions using MathJax
     */
    renderMathJax(retryCount = 0) {
        const maxRetries = 10;
        
        if (typeof MathJax !== 'undefined') {
            if (MathJax.typesetPromise) {
                // MathJax v3
                const elementsToRender = [
                    document.getElementById('question-text'),
                    document.getElementById('options-container')
                ];
                
                const explanationDiv = document.querySelector('.question-explanation');
                if (explanationDiv) {
                    elementsToRender.push(explanationDiv);
                }
                
                MathJax.typesetPromise(elementsToRender).catch(function (err) {
                    console.log('MathJax v3 rendering error:', err.message);
                });
            } else if (MathJax.Hub) {
                // MathJax v2 fallback
                MathJax.Hub.Queue(['Typeset', MathJax.Hub, document.getElementById('question-text')]);
                MathJax.Hub.Queue(['Typeset', MathJax.Hub, document.getElementById('options-container')]);
                
                const explanationDiv = document.querySelector('.question-explanation');
                if (explanationDiv) {
                    MathJax.Hub.Queue(['Typeset', MathJax.Hub, explanationDiv]);
                }
            } else if (retryCount < maxRetries) {
                setTimeout(() => this.renderMathJax(retryCount + 1), 100);
            }
        } else if (retryCount < maxRetries) {
            setTimeout(() => this.renderMathJax(retryCount + 1), 100);
        }
    }

    /**
     * Render answer option buttons
     */
    renderOptions(question) {
        const container = document.getElementById('options-container');
        container.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.className = 'option-button';
            optionButton.onclick = () => this.selectOption(index);
            
            optionButton.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option}</span>
            `;
            
            container.appendChild(optionButton);
        });
    }

    /**
     * Handle user selection of an answer option
     */
    selectOption(optionIndex) {
        // Prevent selection if question already answered and revealed
        if (this.userAnswers[this.currentQuestionIndex] !== null && 
            this.revealedAnswers[this.currentQuestionIndex]) {
            return;
        }
        
        // Store selection
        this.selectedOption = optionIndex;
        
        // Update visual selection
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach((button, index) => {
            if (index === optionIndex) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
        
        // Update submit button
        this.updateSubmitButton();
    }

    /**
     * Update submit/next button state and text
     */
    updateSubmitButton() {
        const nextBtn = document.getElementById('next-btn');
        const isAnswered = this.userAnswers[this.currentQuestionIndex] !== null;
        const isRevealed = this.revealedAnswers[this.currentQuestionIndex];
        const hasSelection = this.selectedOption !== null && this.selectedOption !== undefined;
        
        if (isAnswered && isRevealed) {
            // Question completed
            if (this.explanationAnimating) {
                nextBtn.innerHTML = '<i class="fas fa-hourglass-half"></i> Reading Explanation...';
                nextBtn.disabled = true;
                nextBtn.onclick = null;
            } else {
                if (this.currentQuestionIndex === this.shuffledQuestions.length - 1) {
                    nextBtn.innerHTML = '<i class="fas fa-flag-checkered"></i> Finish Quiz';
                    nextBtn.disabled = false;
                    nextBtn.onclick = () => this.finishQuiz();
                } else {
                    nextBtn.innerHTML = 'Next Question <i class="fas fa-chevron-right"></i>';
                    nextBtn.disabled = false;
                    nextBtn.onclick = () => this.moveToNextQuestion();
                }
            }
        } else if (hasSelection && !isAnswered) {
            // Ready to submit
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Submit Answer';
            nextBtn.disabled = false;
            nextBtn.onclick = () => this.handleSubmitAnswer();
        } else {
            // No selection
            nextBtn.innerHTML = 'Select an Answer';
            nextBtn.disabled = true;
            nextBtn.onclick = null;
        }
    }

    /**
     * Handle answer submission
     */
    handleSubmitAnswer() {
        // Validate selection
        if (this.selectedOption === null || this.selectedOption === undefined) {
            return;
        }
        
        // Prevent double submission
        if (this.userAnswers[this.currentQuestionIndex] !== null) {
            return;
        }
        
        // Store answer
        this.userAnswers[this.currentQuestionIndex] = this.selectedOption;
        this.revealedAnswers[this.currentQuestionIndex] = true;
        
        // Start explanation animation
        this.explanationAnimating = true;
        
        // Update button to processing state
        const nextBtn = document.getElementById('next-btn');
        nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        nextBtn.disabled = true;
        nextBtn.onclick = null;
        
        // Show results and explanation
        this.showAnswerResults();
        
        setTimeout(() => {
            this.displayExplanation();
        }, 1000);
    }

    /**
     * Show correct/incorrect answer results
     */
    showAnswerResults() {
        const currentQuestion = this.shuffledQuestions[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        const correctAnswer = currentQuestion.correct;
        
        const optionButtons = document.querySelectorAll('.option-button');
        
        optionButtons.forEach((button, index) => {
            // Disable all buttons
            button.disabled = true;
            button.style.cursor = 'not-allowed';
            
            // Remove previous states
            button.classList.remove('selected', 'correct-answer', 'incorrect-answer', 'user-correct');
            
            if (index === correctAnswer) {
                button.classList.add('correct-answer');
                if (index === userAnswer) {
                    button.classList.add('user-correct');
                }
            } else if (index === userAnswer) {
                button.classList.add('incorrect-answer');
            }
        });
    }

    /**
     * Display explanation with animation
     */
    displayExplanation() {
        const currentQuestion = this.shuffledQuestions[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        const correctAnswer = currentQuestion.correct;
        const isCorrect = userAnswer === correctAnswer;
        
        // Clear existing explanation
        this.clearExplanation();
        
        // Create explanation element
        const explanationDiv = document.createElement('div');
        explanationDiv.className = 'question-explanation';
        
        const questionCard = document.querySelector('.question-card');
        if (!questionCard) return;
        
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
        
        // Add with animation
        questionCard.appendChild(explanationDiv);
        
        explanationDiv.style.opacity = '0';
        explanationDiv.style.transform = 'translateY(20px)';
        explanationDiv.style.display = 'block';
        
        setTimeout(() => {
            explanationDiv.style.transition = 'all 0.5s ease';
            explanationDiv.style.opacity = '1';
            explanationDiv.style.transform = 'translateY(0)';
            
            // Render MathJax for explanation
            this.renderMathJax();
            
            // Enable next button after animation
            setTimeout(() => {
                this.explanationAnimating = false;
                this.updateSubmitButton();
                this.updateProgress();
            }, 600);
        }, 100);
    }

    /**
     * Move to the next question
     */
    moveToNextQuestion() {
        if (this.currentQuestionIndex < this.shuffledQuestions.length - 1) {
            // Clear current state
            this.selectedOption = null;
            this.explanationAnimating = false;
            this.clearExplanation();
            
            // Move to next question
            this.currentQuestionIndex++;
            
            // Render new question
            this.renderCurrentQuestion();
            this.updateProgress();
            this.updateSubmitButton();
        }
    }

    /**
     * Move to the previous question
     */
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            // Reset flags
            this.justSubmitted = false;
            this.explanationAnimating = false;
            
            this.currentQuestionIndex--;
            
            // Reset selection for unanswered questions
            if (this.userAnswers[this.currentQuestionIndex] === null) {
                this.selectedOption = null;
            }
            
            this.clearExplanation();
            this.renderCurrentQuestion();
            this.updateProgress();
            this.updateSubmitButton();
        }
    }

    /**
     * Clear explanation elements from the DOM
     */
    clearExplanation() {
        const explanationElements = document.querySelectorAll('.question-explanation');
        explanationElements.forEach(element => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        
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

    /**
     * Update progress indicators
     */
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
            const circumference = 2 * Math.PI * 16;
            const offset = circumference - (percentage / 100) * circumference;
            progressRingEl.style.strokeDasharray = `${circumference} ${circumference}`;
            progressRingEl.style.strokeDashoffset = offset;
        }
        
        // Update answered count
        const answeredCountEl = document.getElementById('answered-count');
        if (answeredCountEl) {
            answeredCountEl.textContent = answered;
        }
        
        // Update previous button state
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
        }
    }

    /**
     * Finish the quiz and show results
     */
    finishQuiz() {
        this.endTime = new Date();
        this.isCompleted = true;
        
        // Calculate results
        const results = this.calculateResults();
        
        // Show summary modal
        this.showSummaryModal(results);
        
        // Save results for results page
        localStorage.setItem('quizResults', JSON.stringify({
            results: results,
            userAnswers: this.userAnswers,
            questions: this.shuffledQuestions,
            originalQuestions: this.questions,
            startTime: this.startTime,
            endTime: this.endTime,
            subject: this.currentSubject
        }));
    }

    /**
     * Calculate quiz results
     */
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

    /**
     * Show quiz summary modal
     */
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

    /**
     * Get score message based on percentage
     */
    getScoreMessage(percentage) {
        if (percentage >= 90) {
            return "Excellent! You have mastered this subject!";
        } else if (percentage >= 80) {
            return "Great job! You have a solid understanding.";
        } else if (percentage >= 70) {
            return "Good work! You understand most concepts.";
        } else if (percentage >= 60) {
            return "Fair performance. Consider reviewing the materials.";
        } else {
            return "You may need to study this subject more thoroughly.";
        }
    }

    /**
     * Navigate to results page
     */
    showResults() {
        window.location.href = 'quiz-results.html';
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyPress(event) {
        switch(event.key) {
            case 'ArrowLeft':
                if (!document.getElementById('prev-btn').disabled) {
                    this.previousQuestion();
                }
                break;
            case 'ArrowRight':
                if (!document.getElementById('next-btn').disabled) {
                    this.moveToNextQuestion();
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                const optionIndex = parseInt(event.key) - 1;
                if (optionIndex < this.shuffledQuestions[this.currentQuestionIndex].options.length) {
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

    /**
     * Save quiz progress to localStorage
     */
    saveProgress() {
        const progressData = {
            currentQuestionIndex: this.currentQuestionIndex,
            userAnswers: this.userAnswers,
            selectedOption: this.selectedOption,
            revealedAnswers: this.revealedAnswers,
            startTime: this.startTime,
            subject: this.currentSubject
        };
        localStorage.setItem(`quizProgress_${this.currentSubject}`, JSON.stringify(progressData));
    }

    /**
     * Load saved quiz progress
     */
    loadProgress() {
        const saved = localStorage.getItem(`quizProgress_${this.currentSubject}`);
        if (saved) {
            try {
                const progressData = JSON.parse(saved);
                
                const continueQuiz = confirm('You have an incomplete quiz. Would you like to continue from where you left off?');
                
                if (continueQuiz) {
                    this.currentQuestionIndex = progressData.currentQuestionIndex || 0;
                    this.userAnswers = progressData.userAnswers || new Array(this.shuffledQuestions.length).fill(null);
                    this.selectedOption = progressData.selectedOption || null;
                    this.revealedAnswers = progressData.revealedAnswers || new Array(this.shuffledQuestions.length).fill(false);
                    this.startTime = new Date(progressData.startTime) || new Date();
                    
                    if (this.shuffledQuestions && this.currentQuestionIndex < this.shuffledQuestions.length) {
                        this.renderCurrentQuestion();
                        this.updateProgress();
                        this.updateSubmitButton();
                    } else {
                        console.warn('Invalid progress data, starting fresh');
                        this.clearProgress();
                        this.initializeQuiz();
                    }
                } else {
                    this.clearProgress();
                }
            } catch (error) {
                console.error('Error loading progress:', error);
                this.clearProgress();
            }
        }
    }

    /**
     * Clear saved progress
     */
    clearProgress() {
        localStorage.removeItem(`quizProgress_${this.currentSubject}`);
        this.currentQuestionIndex = 0;
        this.selectedOption = null;
        this.userAnswers = new Array(this.shuffledQuestions.length).fill(null);
        this.revealedAnswers = new Array(this.shuffledQuestions.length).fill(false);
        this.startTime = new Date();
    }

    /**
     * Enable page protection to prevent accidental navigation
     */
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


/**
 * Global theme toggle function for quiz pages
 */
function toggleTheme() {
    if (typeof quizSystem !== 'undefined' && quizSystem) {
        quizSystem.toggleTheme();
    } else {
        // Fallback theme toggle
        console.warn('QuizSystem not initialized yet, using fallback theme toggle');
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
}

/**
 * Initialize quiz system when page loads
 */
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

/**
 * Close modal when clicking backdrop
 */
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-backdrop')) {
        const modal = event.target.closest('.quiz-summary-modal');
        if (modal) {
            modal.classList.remove('show');
        }
    }
});
