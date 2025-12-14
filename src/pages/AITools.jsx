import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockAIResponse } from '../data/mockData';
import { Sparkles, FileText, BookMarked, Send, X, CheckCircle } from 'lucide-react';

const AITools = () => {
  const [studyTopic, setStudyTopic] = useState('');
  const [studyMaterial, setStudyMaterial] = useState('');
  const [isGeneratingStudy, setIsGeneratingStudy] = useState(false);

  const [quizTopic, setQuizTopic] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const [flashcardTopic, setFlashcardTopic] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [isGeneratingFlashcards, setIsGeneratingFlashcards] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleGenerateStudyMaterial = () => {
    if (!studyTopic.trim()) return;
    
    setIsGeneratingStudy(true);
    setStudyMaterial('');
    
    setTimeout(() => {
      setStudyMaterial(mockAIResponse(studyTopic, 'study'));
      setIsGeneratingStudy(false);
    }, 2000);
  };

  const handleGenerateQuiz = () => {
    if (!quizTopic.trim()) return;
    
    setIsGeneratingQuiz(true);
    setQuizQuestions([]);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    
    setTimeout(() => {
      setQuizQuestions(mockAIResponse(quizTopic, 'quiz'));
      setIsGeneratingQuiz(false);
    }, 2000);
  };

  const handleGenerateFlashcards = () => {
    if (!flashcardTopic.trim()) return;
    
    setIsGeneratingFlashcards(true);
    setFlashcards([]);
    setCurrentFlashcard(0);
    setFlipped(false);
    
    setTimeout(() => {
      setFlashcards(mockAIResponse(flashcardTopic, 'flashcards'));
      setIsGeneratingFlashcards(false);
    }, 2000);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const getScore = () => {
    let score = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const handleNextFlashcard = () => {
    if (currentFlashcard < flashcards.length - 1) {
      setCurrentFlashcard(currentFlashcard + 1);
      setFlipped(false);
    }
  };

  const handlePrevFlashcard = () => {
    if (currentFlashcard > 0) {
      setCurrentFlashcard(currentFlashcard - 1);
      setFlipped(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
            AI-Powered Learning Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate study materials, quizzes, and flashcards instantly with AI
          </p>
        </motion.div>

        {/* Study Material Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <div className="flex items-center mb-6">
            <Sparkles className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Study Material Generator</h2>
          </div>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={studyTopic}
              onChange={(e) => setStudyTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateStudyMaterial()}
              placeholder="Enter a topic (e.g., Machine Learning, React Hooks)"
              className="flex-1 input-field"
            />
            <button
              onClick={handleGenerateStudyMaterial}
              disabled={!studyTopic.trim() || isGeneratingStudy}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>Generate Notes</span>
            </button>
          </div>

          <AnimatePresence>
            {isGeneratingStudy && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-12"
              >
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">Generating study material with AI...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {studyMaterial && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                AI-Generated Study Material for "{studyTopic}"
              </h3>
              <div className="prose max-w-none whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {studyMaterial}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Quiz Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <div className="flex items-center mb-6">
            <FileText className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz Generator</h2>
          </div>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={quizTopic}
              onChange={(e) => setQuizTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateQuiz()}
              placeholder="Enter a topic for quiz questions"
              className="flex-1 input-field"
            />
            <button
              onClick={handleGenerateQuiz}
              disabled={!quizTopic.trim() || isGeneratingQuiz}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>Generate Quiz</span>
            </button>
          </div>

          <AnimatePresence>
            {isGeneratingQuiz && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-12"
              >
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">Generating quiz questions with AI...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {quizQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                AI-Generated Quiz for "{quizTopic}"
              </h3>
              <div className="space-y-6">
                {quizQuestions.map((question, index) => {
                  const isSelected = selectedAnswers[index] !== undefined;
                  const isCorrect = selectedAnswers[index] === question.correct;
                  const showAnswer = quizSubmitted;

                  return (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {index + 1}. {question.question}
                      </h4>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => {
                          const optionSelected = selectedAnswers[index] === optIndex;
                          const optionCorrect = optIndex === question.correct;

                          return (
                            <button
                              key={optIndex}
                              onClick={() => {
                                if (!quizSubmitted) {
                                  setSelectedAnswers({ ...selectedAnswers, [index]: optIndex });
                                }
                              }}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                showAnswer && optionCorrect
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400'
                                  : showAnswer && optionSelected && !optionCorrect
                                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-400'
                                  : optionSelected
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-400'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 bg-white dark:bg-gray-700'
                              } ${quizSubmitted ? 'cursor-default' : 'cursor-pointer'} text-gray-900 dark:text-gray-200`}
                            >
                              <div className="flex items-center">
                                {showAnswer && optionCorrect && (
                                  <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-2" />
                                )}
                                <span>{option}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  className="btn-primary mt-6 w-full"
                >
                  Submit Quiz
                </button>
              ) : (
                <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Score: {getScore()} / {quizQuestions.length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {((getScore() / quizQuestions.length) * 100).toFixed(0)}% Correct
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Flashcard Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center mb-6">
            <BookMarked className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Flashcard Generator</h2>
          </div>
          
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={flashcardTopic}
              onChange={(e) => setFlashcardTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateFlashcards()}
              placeholder="Enter a topic for flashcards"
              className="flex-1 input-field"
            />
            <button
              onClick={handleGenerateFlashcards}
              disabled={!flashcardTopic.trim() || isGeneratingFlashcards}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>Generate Flashcards</span>
            </button>
          </div>

          <AnimatePresence>
            {isGeneratingFlashcards && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-12"
              >
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">Generating flashcards with AI...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {flashcards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Flashcards for "{flashcardTopic}"
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-md h-64 perspective-1000 mb-6">
                  <motion.div
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full h-full preserve-3d"
                    onClick={() => setFlipped(!flipped)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={`absolute inset-0 backface-hidden ${flipped ? 'hidden' : ''}`}>
                      <div className="card h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 border-2 border-primary-200 dark:border-primary-700">
                        <p className="text-xl font-semibold text-gray-900 dark:text-white text-center p-6">
                          {flashcards[currentFlashcard].front}
                        </p>
                      </div>
                    </div>
                    <div className={`absolute inset-0 backface-hidden rotate-y-180 ${!flipped ? 'hidden' : ''}`}>
                      <div className="card h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-2 border-green-200 dark:border-green-700">
                        <p className="text-lg text-gray-700 dark:text-gray-200 text-center p-6">
                          {flashcards[currentFlashcard].back}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Click the card to flip</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePrevFlashcard}
                    disabled={currentFlashcard === 0}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-gray-600 dark:text-gray-300">
                    {currentFlashcard + 1} / {flashcards.length}
                  </span>
                  <button
                    onClick={handleNextFlashcard}
                    disabled={currentFlashcard === flashcards.length - 1}
                    className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default AITools;

