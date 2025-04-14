import React, { useState } from 'react';

const QuizWidget = ({ questions, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setShowResults(true);
            if (onComplete) {
                onComplete(score + (isCorrect ? 1 : 0));
            }
        }
    };

    if (showResults) {
        return (
            <div>
                <h2>Quiz Completed!</h2>
                <p>Your Score: {score} / {questions.length}</p>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h2>{currentQuestion.question}</h2>
            <div>
                {currentQuestion.answers.map((answer, index) => (
                    <button key={index} onClick={() => handleAnswer(answer.isCorrect)}>
                        {answer.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizWidget;