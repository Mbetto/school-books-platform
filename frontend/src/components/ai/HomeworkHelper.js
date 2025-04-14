// HomeworkHelper.js
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './HomeworkHelper.scss';

const HomeworkHelper = ({ tutorMode = false }) => {
  const { theme } = useTheme();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [subject, setSubject] = useState('math');
  const [gradeLevel, setGradeLevel] = useState('8');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('homeworkHelperHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleGetAnswer = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const simulatedAnswer = generateSimulatedAnswer(question, subject, gradeLevel);
      
      setAnswer(simulatedAnswer);
      
      const newHistoryItem = {
        id: Date.now(),
        question,
        answer: simulatedAnswer,
        subject,
        gradeLevel,
        date: new Date()
      };
      
      const updatedHistory = [newHistoryItem, ...history.slice(0, 9)];
      setHistory(updatedHistory);
      localStorage.setItem('homeworkHelperHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      setAnswer('Error fetching answer. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSimulatedAnswer = (question, subject, grade) => {
    const subjects = {
      math: [
        `For grade ${grade} math, the solution involves breaking the problem into smaller steps.`,
        `This is a common ${grade}th grade math problem. The key concept is...`,
        `The answer can be found by applying the formula we learned in chapter ${Math.ceil(Math.random() * 5)}.`
      ],
      science: [
        `In grade ${grade} science, we study this concept in the unit about...`,
        `The scientific principle behind this is...`,
        `This experiment demonstrates how...`
      ],
      english: [
        `For grade ${grade} English, the proper grammar rule is...`,
        `This literature analysis should focus on...`,
        `The theme of this passage relates to...`
      ],
      history: [
        `In grade ${grade} history, this event was significant because...`,
        `The historical context for this is...`,
        `This period in history is known for...`
      ]
    };
    
    const randomResponse = subjects[subject][Math.floor(Math.random() * subjects[subject].length)];
    return `${randomResponse} Here's a detailed explanation: ${generateDetailedExplanation(subject)}`;
  };

  const generateDetailedExplanation = (subject) => {
    const explanations = {
      math: "First, identify the known and unknown variables. Then, apply the appropriate formula. For example, if it's an algebra problem, you might need to solve for x. Break it down step by step, showing each calculation clearly.",
      science: "Begin by stating the scientific principle involved. Then describe the experiment or observation that demonstrates this principle. Include any relevant formulas or diagrams that would help explain the concept.",
      english: "Analyze the text by looking at the author's use of language, literary devices, and themes. Consider the historical context and how it influences the work. Provide specific examples from the text to support your analysis.",
      history: "Place the event in its historical context. Discuss the causes and consequences, and how it relates to other events of the period. Include perspectives from different groups affected by the event."
    };
    return explanations[subject];
  };

  const handleHistoryClick = (item) => {
    setQuestion(item.question);
    setSubject(item.subject);
    setGradeLevel(item.gradeLevel);
    setAnswer(item.answer);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('homeworkHelperHistory');
  };

  return (
    <div className={`homework-helper ${theme}`}>
      <div className="homework-helper__header">
        {tutorMode ? 'Teaching Assistant' : 'Homework Helper'}
      </div>
      
      <div className="homework-helper__controls">
        <div className="select-group">
          <label htmlFor="subject">Subject:</label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="subject-selector"
          >
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
            <option value="english">English</option>
            <option value="history">History</option>
          </select>
        </div>
        
        <div className="select-group">
          <label htmlFor="grade">Grade:</label>
          <select
            id="grade"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            className="grade-selector"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
              <option key={grade} value={grade}>Grade {grade}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="question-group">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={tutorMode ? 'Enter a student question...' : 'Type your homework question here...'}
          className="question-input"
          rows="4"
        />
        <div className="button-group">
          <button 
            onClick={handleGetAnswer} 
            disabled={!question.trim() || isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Searching...
              </>
            ) : 'Get Answer'}
          </button>
          {history.length > 0 && (
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="history-toggle"
            >
              {showHistory ? 'Hide History' : 'Show History'}
            </button>
          )}
        </div>
      </div>
      
      {answer && (
        <div className="answer-section">
          <h3>Answer:</h3>
          <div className="answer-content">
            {answer.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {tutorMode && (
            <div className="tutor-actions">
              <button className="action-button save-answer">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
                </svg>
                Save to Resources
              </button>
              <button className="action-button share-answer">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
                </svg>
                Share with Student
              </button>
            </div>
          )}
        </div>
      )}
      
      {showHistory && history.length > 0 && (
        <div className="history-section">
          <div className="history-header">
            <h3>Recent Questions</h3>
            <button onClick={clearHistory} className="clear-history">
              Clear History
            </button>
          </div>
          <ul>
            {history.map(item => (
              <li 
                key={item.id} 
                onClick={() => handleHistoryClick(item)}
                className="history-item"
              >
                <div className="question-preview">
                  {item.question.substring(0, 50)}{item.question.length > 50 ? '...' : ''}
                </div>
                <div className="meta-info">
                  <span className={`subject-badge ${item.subject}`}>
                    {item.subject.charAt(0).toUpperCase() + item.subject.slice(1)}
                  </span>
                  <span className="grade">Grade {item.gradeLevel}</span>
                  <span className="date">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomeworkHelper;