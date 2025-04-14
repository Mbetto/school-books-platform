import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './QuizWidget.scss';

const QuizWidget = ({ quiz, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(quiz.timeLimit || 0);
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        let timer;
        if (quizStarted && timeLeft > 0 && !showResults) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !showResults) {
            handleNextQuestion(true);
        }
        return () => clearInterval(timer);
    }, [quizStarted, timeLeft, showResults]);

    const handleOptionSelect = (optionId) => {
        setSelectedOption(optionId);
    };

    const handleNextQuestion = (timeout = false) => {
        const currentQuestion = quiz.questions[currentQuestionIndex];
        const selectedOptionObj = currentQuestion.options.find(opt => opt.id === selectedOption);

        if (selectedOptionObj?.isCorrect) {
            setScore(score + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < quiz.questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedOption(null);
            setTimeLeft(quiz.timeLimit || 0);
        } else {
            setShowResults(true);
            if (onComplete) {
                onComplete({
                    score: score + (selectedOptionObj?.isCorrect ? 1 : 0),
                    total: quiz.questions.length,
                    timeTaken: (quiz.questions.length * (quiz.timeLimit || 0)) - timeLeft
                });
            }
        }

        if (timeout) {
            // Auto-submit when time runs out
            setSelectedOption(null);
        }
    };

    const startQuiz = () => {
        setQuizStarted(true);
        setTimeLeft(quiz.timeLimit || 0);
    };

    if (!quizStarted) {
        return (
            <div className="quiz-start-screen">
                <h2>{quiz.title}</h2>
                <p className="quiz-description">{quiz.description}</p>
                <div className="quiz-meta">
                    <span>{quiz.questions.length} questions</span>
                    {quiz.timeLimit && <span>{quiz.timeLimit} seconds per question</span>}
                </div>
                <button className="start-quiz-button" onClick={startQuiz}>
                    Start Quiz
                </button>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="quiz-results">
                <h2>Quiz Completed!</h2>
                <div className="result-score">
                    You scored {score} out of {quiz.questions.length}
                </div>
                <div className="result-percentage">
                    {Math.round((score / quiz.questions.length) * 100)}%
                </div>
                <div className="result-feedback">
                    {score === quiz.questions.length ? (
                        <span className="perfect">Perfect! 🎉</span>
                    ) : score >= quiz.questions.length * 0.7 ? (
                        <span className="good">Well done! 👍</span>
                    ) : (
                        <span className="improve">Keep practicing! 💪</span>
                    )}
                </div>
                <button 
                    className="retry-button" 
                    onClick={() => {
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setShowResults(false);
                        setSelectedOption(null);
                        setTimeLeft(quiz.timeLimit || 0);
                    }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / quiz.questions.length) * 100;

    return (
        <div className="quiz-widget">
            <div className="quiz-header">
                <div className="quiz-progress">
                    <div 
                        className="progress-bar" 
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="quiz-meta">
                    <span className="question-count">
                        Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </span>
                    {quiz.timeLimit > 0 && (
                        <span className="time-left">
                            Time: {timeLeft}s
                        </span>
                    )}
                </div>
            </div>

            <div className="quiz-content">
                <h3 className="quiz-question">{currentQuestion.text}</h3>
                {currentQuestion.image && (
                    <div className="question-image">
                        <img src={currentQuestion.image} alt="Question visual aid" />
                    </div>
                )}

                <div className="quiz-options">
                    {currentQuestion.options.map((option) => (
                        <div
                            key={option.id}
                            className={`quiz-option ${selectedOption === option.id ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect(option.id)}
                        >
                            <div className="option-selector">
                                {selectedOption === option.id ? '✓' : String.fromCharCode(65 + currentQuestion.options.indexOf(option))}
                            </div>
                            <div className="option-text">{option.text}</div>
                            {option.image && (
                                <div className="option-image">
                                    <img src={option.image} alt="Option visual" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="quiz-footer">
                <button
                    className="quiz-submit"
                    onClick={() => handleNextQuestion()}
                    disabled={!selectedOption}
                >
                    {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
            </div>
        </div>
    );
};

QuizWidget.propTypes = {
    quiz: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        questions: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                image: PropTypes.string,
                options: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.string.isRequired,
                        text: PropTypes.string.isRequired,
                        image: PropTypes.string,
                        isCorrect: PropTypes.bool.isRequired,
                    })
                ).isRequired,
            })
        ).isRequired,
        timeLimit: PropTypes.number,
    }).isRequired,
    onComplete: PropTypes.func,
};

export default QuizWidget;